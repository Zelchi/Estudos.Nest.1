import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/email.validator';

export class CriaUsuarioDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @UniqueEmail({ message: 'Já existe um usuário com este e-mail' })
    email: string;

    @Matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/, {
        message: 'A senha precisa ter letras maiúsculas, minúsculas, números e caracteres especiais e deve ter entre 6 e 20 caracteres',
    })
    senha: string;
}