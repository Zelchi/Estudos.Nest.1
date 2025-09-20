import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { UsuarioEntity } from '../user/entity/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './entity/itemPedido.entity';
import { ProdutoEntity } from '../product/entity/produto.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { In } from 'typeorm';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(PedidoEntity)
        private readonly pedidoRepository: Repository<PedidoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>,
    ) { }

    private async buscarUsuario(id: string) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) throw new NotFoundException('Usuario não encontrado');
        return usuario;
    }

    async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
        const usuario = await this.buscarUsuario(usuarioId);
        const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
        const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });

        const pedidoEntity = new PedidoEntity();

        pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
        pedidoEntity.usuario = usuario

        const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
            const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);
            if (!produtoRelacionado) throw new NotFoundException(`O produto com o ID: ${itemPedido.produtoId} não foi encontrada.`);

            const itemPedidoEntity = new ItemPedidoEntity();

            itemPedidoEntity.produto = produtoRelacionado;
            itemPedidoEntity.precoVenda = produtoRelacionado.valor;
            itemPedidoEntity.quantidade = itemPedido.quantidade;
            itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

            return itemPedidoEntity;
        });

        const valorTotal = itensPedidoEntidades.reduce((total, item) => {
            return total + item.precoVenda * item.quantidade
        }, 0);

        pedidoEntity.itensPedido = itensPedidoEntidades;
        pedidoEntity.valorTotal = valorTotal;

        const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)
        return pedidoCriado
    }

    async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
        const pedido = await this.pedidoRepository.findOneBy({ id });
        if (!pedido) throw new NotFoundException(`O pedido com o ID: ${id} não foi encontrado`);
        Object.assign(pedido, dto);

        return this.pedidoRepository.save(pedido);
    }

    async obtemPedidosDeUsuario(usuarioId: string) {
        return this.pedidoRepository.find({
            where: {
                usuario: { id: usuarioId },
            },
            relations: {
                usuario: true,
            },
        });
    }
}