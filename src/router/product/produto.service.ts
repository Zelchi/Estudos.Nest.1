import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/lista-produto.dto';
import { ProdutoEntity } from './entity/produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/atualiza-produto.dto';
import { CriaProdutoDTO } from './dto/cria-produto.dto';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>,
    ) { }

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        Object.assign(produtoEntity, dadosProduto);

        return this.produtoRepository.save(produtoEntity);
    }
    async listProdutos() {
        const produtosSalvos = await this.produtoRepository.find({
            relations: {
                imagens: true,
                caracteristicas: true,
            },
        });
        const produtosLista = produtosSalvos.map(
            (produto) =>
                new ListaProdutoDTO(
                    produto.id,
                    produto.nome,
                    produto.caracteristicas,
                    produto.imagens,
                ),
        );
        return produtosLista;
    }
    async listProduto(id: string) {
        if (!id || id.length !== 36) throw new BadRequestException('ID inválido');
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: {
                imagens: true,
                caracteristicas: true,
            },
        });
        if (!produto) throw new NotFoundException('Produto não encontrado');
        return produto;
    }
    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        if (!id || id.length !== 36) throw new BadRequestException('ID inválido');
        const entityName = await this.produtoRepository.findOneBy({ id });
        if (!entityName) throw new NotFoundException('Produto não encontrado');
        Object.assign(entityName, novosDados);
        return this.produtoRepository.save(entityName);
    }
    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
    }
}