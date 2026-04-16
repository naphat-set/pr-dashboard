import { Injectable, UnauthorizedException } from '@nestjs/common';
import { pool } from '../../database/database';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(body: any) {
        const { email, password } = body;

        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Wrong password');
        }

        const payload = {
            userId: user.id,
            email: user.email,
        };

        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user,
        };
    }
}