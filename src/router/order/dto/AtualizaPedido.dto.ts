import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statusPedido.enum';

export class AtualizaPedidoDto {
    @IsEnum(StatusPedido)
    status: StatusPedido;
}