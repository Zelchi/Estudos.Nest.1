import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';
import { UsuarioEntity } from '../user/entity/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(PedidoEntity)
        private readonly pedidoRepository: Repository<PedidoEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async cadastraPedido(usuarioId: string) {
        const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId })
        const pedidoEntity = new PedidoEntity();

        pedidoEntity.valorTotal = 0;
        pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
        pedidoEntity.usuario = usuario

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