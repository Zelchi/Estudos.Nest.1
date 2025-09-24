import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPipe implements PipeTransform {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async transform(value: string) {
        const salt = this.configService.get<string>('SALT_HASH');
        if (!salt) throw new Error("SALT_HASH not defined in environment variables");
        const senhaHasheada = await bcrypt.hash(value, Number(salt));
        return senhaHasheada;
    }
};