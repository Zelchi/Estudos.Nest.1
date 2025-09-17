import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProdutoModule } from './router/product/produto.module';
import { UsuarioModule } from './router/user/usuario.module';
import { PedidoModule } from './router/order/pedido.module';

@Module({
    imports: [
        UsuarioModule,
        ProdutoModule,
        PedidoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
    ],
})

export class AppModule { }