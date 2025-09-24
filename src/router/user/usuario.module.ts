import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UniqueEmailValidator } from './validator/email.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entity/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEntity]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'defaultSecretKey',
            signOptions: { expiresIn: '1d' },
        })],
    controllers: [UsuarioController],
    providers: [UsuarioService, UniqueEmailValidator],
})
export class UsuarioModule { }