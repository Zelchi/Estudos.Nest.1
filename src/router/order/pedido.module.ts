import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UsuarioEntity } from '../user/entity/usuario.entity';
import { ProdutoEntity } from '../product/entity/produto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity])],
    controllers: [PedidoController],
    providers: [PedidoService],
})

export class PedidoModule { }