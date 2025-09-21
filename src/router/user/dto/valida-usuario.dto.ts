import { CriaUsuarioDTO } from './cria-usuario.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';

export class ValidaUsuarioDTO extends OmitType(CriaUsuarioDTO, ["nome", "email"]) {
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;
}