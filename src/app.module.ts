import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './router/product/produto.module';
import { UsuarioModule } from './router/user/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';

@Module({
    imports: [
        UsuarioModule,
        ProdutoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
    ],
})
export class AppModule {}
