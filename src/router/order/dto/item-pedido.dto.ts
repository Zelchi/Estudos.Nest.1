import { IsUUID, IsInt } from "class-validator";

export class ItemPedidoDTO {
    @IsUUID()
    produtoId: string;
    @IsInt()
    quantidade: number;
}