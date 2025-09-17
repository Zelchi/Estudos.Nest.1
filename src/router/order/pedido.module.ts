import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PedidoEntity])],
    controllers: [PedidoController],
    providers: [PedidoService],
})

export class PedidoModule { }