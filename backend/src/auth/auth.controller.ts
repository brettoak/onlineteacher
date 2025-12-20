import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: any) {
        // In a real app, use a LocalAuthGuard here to validate credentials first
        // For now we will manually validate or assume the body contains valid credentials if we had a LocalStrategy
        // But to match the plan, let's just use the service to validate and login
        // Or better, let's implement validation in the service calls or use a guard

        // Simple implementation for this task:
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() data: Prisma.UserCreateInput) {
        return this.authService.register(data);
    }
}
