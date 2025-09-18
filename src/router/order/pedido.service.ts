import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { UsuarioEntity } from '../user/entity/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './entity/itemPedido.entity';
import { ProdutoEntity } from '../product/entity/produto.entity';
import { In } from 'typeorm';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(PedidoEntity)
        private readonly pedidoRepository: Repository<PedidoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>,
    ) { }

    async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
        const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId })
        const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
        const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });

        const pedidoEntity = new PedidoEntity();

        pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
        pedidoEntity.usuario = usuario

        const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
            const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);
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