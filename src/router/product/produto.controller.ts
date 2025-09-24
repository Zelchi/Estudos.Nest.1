import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor, CACHE_MANAGER, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProdutoEntity } from './entity/produto.entity';

@Controller('produtos')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    @Post()
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(
            dadosProduto,
        );

        return {
            mensagem: 'Produto criado com sucesso.',
            produto: produtoCadastrado,
        };
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async listaTodos() {
        return this.produtoService.listProdutos();
    }

    @Get('/:id')
    async listaUm(@Param('id') id: string) {

        let produto = await this.cacheManager.get<ProdutoEntity>(`produto-${id}`);

        if (!produto) {
            console.log('Buscando no banco de dados...');
            produto = await this.produtoService.listProduto(id);
            await this.cacheManager.set(`produto-${id}`, produto);
        }

        return {
            mensagem: 'produto encontrado',
            produto: produto,
        }
    }

    @Put('/:id')
    async atualiza(
        @Param('id') id: string,
        @Body() dadosProduto: AtualizaProdutoDTO,
    ) {
        const produtoAlterado = await this.produtoService.atualizaProduto(
            id,
            dadosProduto,
        );

        return {
            mensagem: 'produto atualizado com sucesso',
            produto: produtoAlterado,
        };
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);

        return {
            mensagem: 'produto removido com sucesso',
            produto: produtoRemovido,
        };
    }
}
