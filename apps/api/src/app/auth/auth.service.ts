import { User } from '.prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../users/user.service';

export enum Provider {
    TWITCH = 'twitch',
}

@Injectable()
export class AuthService {
    private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    constructor(private readonly usersService: UserService) {}

    async validateTwitchOAuthLogin(
        thirdPartyId: string,
        provider: Provider,
        accessToken: string,
        refreshToken: string,
        expiration: number,
        profile: any
    ): Promise<string> {
        try {
            // You can add some registration logic here,
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            let user: User = (
                await this.usersService.users({
                    take: 1,
                    where: {
                        twitch: {
                            id: thirdPartyId,
                        },
                    },
                })
            )[0];

            if (!user) {
                user = await this.usersService.createUser({
                    twitch: {
                        create: {
                            accessToken,
                            refreshToken,
                            accessTokenExpires: expiration,
                            id: profile.id,
                        },
                    },
                    email: profile.email,
                });
            }

            // if (!user)
            // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

            const payload = {
                thirdPartyId,
                provider,
            };

            console.log('payload', payload);

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
                expiresIn: 7200,
            });

            return jwt;
        } catch (err) {
            throw new InternalServerErrorException(
                'validateOAuthLogin',
                err.message
            );
        }
    }
}
