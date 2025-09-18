import { ItemPedidoDTO } from './ItemPedido.dto';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from 'class-validator';

export class CriaPedidoDTO {
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ItemPedidoDTO)
    itensPedido: ItemPedidoDTO[];
}