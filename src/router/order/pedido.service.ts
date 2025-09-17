import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entity/pedido.entity';

@Injectable()
export class PedidoService {
    constructor(@InjectRepository(PedidoEntity) private readonly pedidoRepository: Repository<PedidoEntity>) { }

    
}