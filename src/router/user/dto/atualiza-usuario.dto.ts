import { CriaUsuarioDTO } from './cria-usuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) { };
// export class AtualizaUsuarioDTO extends CriaUsuarioDTO {
//     @IsOptional()
//     nome: string;

//     @IsOptional()
//     email: string;

//     @IsOptional()
//     senha: string;
// }