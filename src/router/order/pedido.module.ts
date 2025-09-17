import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UsuarioEntity } from '../user/entity/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity])],
    controllers: [PedidoController],
    providers: [PedidoService],
})

export class PedidoModule { }