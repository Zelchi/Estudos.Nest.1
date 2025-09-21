import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UniqueEmailValidator } from './validator/email.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entity/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UniqueEmailValidator],
})
export class UsuarioModule { }
