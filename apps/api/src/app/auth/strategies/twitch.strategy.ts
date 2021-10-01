import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-new';
import { AuthService, Provider } from '../auth.service';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';

type TwitchProfile = {
    id: string;
    email: string;
};

const twitchValidateUrl = 'https://id.twitch.tv/oauth2/validate';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
    constructor(
        private authService: AuthService,
        private httpService: HttpService
    ) {
        super({
            clientID: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET, // <- Replace this with your client secret
            callbackURL: process.env.TWITCH_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['user_read'],
        });
    }

    async validate(
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: TwitchProfile,
        done: (err: Error, result: string | boolean) => void
    ) {
        try {
            const validateReq = await this.httpService.axiosRef.get(
                twitchValidateUrl,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const validate = validateReq.data;
            console.log(validate);
            const secondsSinceEpoch = Math.round(Date.now() / 1000);
            const user: string =
                await this.authService.validateTwitchOAuthLogin(
                    profile.id,
                    Provider.TWITCH,
                    accessToken,
                    refreshToken,
                    secondsSinceEpoch + validate.expires_in,
                    profile
                );

            done(null, user);
        } catch (err) {
            // console.log(err)
            done(err, false);
        }
    }
}
