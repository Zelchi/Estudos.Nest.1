import { PostgresConfigService } from './config/postgres.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProdutoModule } from './router/product/produto.module';
import { UsuarioModule } from './router/user/usuario.module';
import { PedidoModule } from './router/order/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpFilterException } from './utils/filter.http';
import { CacheModule } from '@nestjs/cache-manager';

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
        CacheModule.register({ isGlobal: true, ttl: 10000 })
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpFilterException
        },
    ],
})

export class AppModule { }