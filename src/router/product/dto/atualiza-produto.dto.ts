import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './cria-produto.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) { };