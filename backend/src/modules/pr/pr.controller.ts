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

@UseGuards(JwtAuthGuard)
@Controller('pr')
export class PrController {
    constructor(private readonly prService: PrService) { }

    // 🔹 CREATE PR
    @Post()
    async create(@Body() body: any, @Req() req: any) {
        return this.prService.createPR(body, req.user.userId);
    }

    // 🔹 GET LIST
    @Get()
    async getList(@Query('status') status?: string) {
        return this.prService.getPRList(status);
    }

    // 🔹 GET DETAIL
    @Get(':id')
    async getDetail(@Param('id') id: string) {
        return this.prService.getPRDetail(Number(id));
    }

    // 🔹 UPDATE
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
        return this.prService.updatePR(Number(id), body);
    }

    // 🔹 DELETE
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.prService.deletePR(Number(id));
    }
}