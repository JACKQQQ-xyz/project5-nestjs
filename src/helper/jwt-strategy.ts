import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService} from "@nestjs/config";

type Payload = {
    id: number
    name: string
    role: string
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET_KEY") || 'jackk',
        });
    }

    async validate(payload: Payload) {
    return payload
    }
}

