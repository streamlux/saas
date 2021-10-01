import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Provider = createParamDecorator<unknown, ExecutionContext, string>(
    (data: unknown, ctx: ExecutionContext) => {
        if (ctx.getType() === 'http') {
            const request = ctx.switchToHttp().getRequest();
            console.log(request.user);
            return request.user;
        }
    }
);

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('twitch')
    @UseGuards(AuthGuard('twitch'))
    async twitchAuth(): Promise<void> {
        // empty on purpose
    }

    @Get('twitch/callback')
    @UseGuards(AuthGuard('twitch'))
    async twitchCallback(
        @Req() req,
        @Res({ passthrough: true }) res: Response
    ): Promise<void> {
        // Learn about setting cookies server-side
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
        res.cookie('X-JWT', req.user, {
            httpOnly: true,
            secure: true,
            path: '/',
        });
        res.redirect('../protected');
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource(@Provider() provider: any) {
        return 'JWT is working!\n' + JSON.stringify(provider, null, 2);
    }
}
