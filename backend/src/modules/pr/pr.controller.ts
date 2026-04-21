import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// 🔥 Swagger imports
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)

// 🔥 แบ่งหมวดใน Swagger
@ApiTags('PR')

// 🔥 ทำให้มีปุ่ม Authorize 🔒
@ApiBearerAuth()

@Controller('pr')
export class PrController {
    constructor(private readonly prService: PrService) { }

    // 🔹 CREATE PR
    @ApiOperation({ summary: 'Create purchase request' })
    @Post()
    async create(@Body() body: any, @Req() req: any) {
        return this.prService.createPR(body, req.user.userId);
    }

    // 🔹 GET LIST
    @ApiOperation({ summary: 'Get all purchase requests (filter by status optional)' })
    @Get()
    async getList(@Query('status') status?: string) {
        return this.prService.getPRList(status);
    }

    // 🔹 GET DETAIL
    @ApiOperation({ summary: 'Get purchase request detail by ID' })
    @Get(':id')
    async getDetail(@Param('id') id: string) {
        return this.prService.getPRDetail(Number(id));
    }

    // 🔹 UPDATE
    @ApiOperation({ summary: 'Update purchase request by ID' })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
        return this.prService.updatePR(Number(id), body);
    }

    // 🔹 DELETE
    @ApiOperation({ summary: 'Delete purchase request by ID' })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.prService.deletePR(Number(id));
    }
}