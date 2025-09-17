import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('/pedidos')
export class PedidoController {
    constructor(private pedidoService: PedidoService) { }

    @Get()
    async pedidoPorUsuario(@Param('usuarioId') usuarioId: string) {
        const pedidos = await this.pedidoService.pedidoPorUsuario(usuarioId);

        return {
            pedidos,
            messagem: 'pedidos do usuário retornados com sucesso',
        };
    }

    @Post()
    async cadastraPedido(@Param('usuarioId') usuarioId: string) {
        const pedidoCriado = await this.pedidoService.cadastraPedido(
            usuarioId,
        );

        return {
            pedido: pedidoCriado,
            messagem: 'pedido criado com sucesso',
        };
    }

}