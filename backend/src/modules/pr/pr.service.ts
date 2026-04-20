import { Injectable, BadRequestException } from '@nestjs/common';
import { pool } from '../../database/database';

@Injectable()
export class PrService {

    async createPR(body: any, userId: number) {
        const { title, department, priority, items, status } = body;

        const created_by = userId;

        // ✅ จำกัด status
        const finalStatus = status === 'submitted' ? 'submitted' : 'draft';

        // 🧮 calculate total
        let total = 0;
        for (const item of items) {
            total += item.quantity * item.price;
        }



        // 📥 insert PR
        const prResult = await pool.query(
            `
      INSERT INTO purchase_requests 
      (title, department, priority, status, total, created_by, created_at)
VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
      `,
            [title, department, priority, finalStatus, total, created_by],
        );

        const pr = prResult.rows[0];

        // 📦 insert items
        for (const item of items) {
            const itemTotal = item.quantity * item.price;

            await pool.query(
                `
        INSERT INTO pr_items
        (pr_id, description, quantity, price, total)
        VALUES ($1, $2, $3, $4, $5)
        `,
                [pr.id, item.description, item.quantity, item.price, itemTotal],
            );
        }

        return pr;
    }

    async getPRList(status?: string) {
        let query = `
      SELECT pr.*, u.first_name, u.last_name
      FROM purchase_requests pr
      JOIN users u ON pr.created_by = u.id
    `;

        const values: any[] = [];

        if (status) {
            query += ` WHERE pr.status = $1`;
            values.push(status);
        }

        query += ` ORDER BY pr.created_at DESC`;

        const result = await pool.query(query, values);
        return result.rows;
    }

    async getPRDetail(id: number) {
        const prResult = await pool.query(
            `
      SELECT pr.*, u.first_name, u.last_name
      FROM purchase_requests pr
      JOIN users u ON pr.created_by = u.id
      WHERE pr.id = $1
      `,
            [id],
        );

        const pr = prResult.rows[0];

        const itemsResult = await pool.query(
            `
      SELECT * FROM pr_items
      WHERE pr_id = $1
      `,
            [id],
        );

        return {
            ...pr,
            items: itemsResult.rows,
        };
    }

    async updatePR(id: number, body: any) {
        const { title, department, priority, status, items } = body;
        console.log("UPDATE PR DEBUG:");
        console.log({
            id,
            title,
            department,
            priority,
            status,
            items
        });
        const currentResult = await pool.query(
            `SELECT status FROM purchase_requests WHERE id = $1`,
            [id]
        );

        const currentStatus = currentResult.rows[0]?.status;

        if (!currentStatus) {
            throw new BadRequestException('PR not found');
        }

        // 🔹 update status อย่างเดียว
        if (status && !items) {
            const result = await pool.query(
                `
        UPDATE purchase_requests
        SET status = $1
        WHERE id = $2
        RETURNING *
        `,
                [status, id],
            );

            return result.rows[0];
        }

        // 🔹 update PR + items
        let total = 0;
        for (const item of items) {
            total += item.quantity * item.price;
        }

        const result = await pool.query(
            `
  UPDATE purchase_requests
  SET title = $1,
      department = $2,
      priority = $3,
      total = $4,
      status = $5
  WHERE id = $6
  RETURNING *
  `,
            [title, department, priority, total, status, id]
        );

        await pool.query(
            `DELETE FROM pr_items WHERE pr_id = $1`,
            [id],
        );

        for (const item of items) {
            const itemTotal = item.quantity * item.price;

            await pool.query(
                `
        INSERT INTO pr_items
        (pr_id, description, quantity, price, total)
        VALUES ($1, $2, $3, $4, $5)
        `,
                [id, item.description, item.quantity, item.price, itemTotal],
            );
        }

        return result.rows[0];
    }

    async deletePR(id: number) {
        await pool.query(
            `DELETE FROM pr_items WHERE pr_id = $1`,
            [id],
        );

        await pool.query(
            `DELETE FROM purchase_requests WHERE id = $1`,
            [id],
        );

        return { message: 'Deleted successfully' };
    }
}