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

}