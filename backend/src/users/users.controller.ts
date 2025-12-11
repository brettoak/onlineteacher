import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any) {
        const user = await this.usersService.findOne(req.user.email);
        if (!user) {
             throw new Error('User not found');
        }
        const { password, ...result } = user;
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Request() req: any, @Body() data: Prisma.UserUpdateInput) {
        // Prevent password update through this endpoint for safety.
        // Cast to any to delete fields that might not strictly exist in the Input type but could be passed in body
        const updateData: any = data;
        delete updateData.password;
        delete updateData.id;
        delete updateData.email; // Usually email changes require verification
        delete updateData.role; // Prevent role escalation

        return this.usersService.update(req.user.userId, updateData);
    }
}
