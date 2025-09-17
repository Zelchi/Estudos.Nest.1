import { UsuarioEntity } from '../../user/entity/usuario.entity';
import { StatusPedido } from '../enum/statusPedido.enum';
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    Entity,
    ManyToOne,
} from 'typeorm';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'valor_total', nullable: false })
    valorTotal: number;

    @Column({ name: 'status', enum: StatusPedido, nullable: false })
    status: StatusPedido;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
    usuario: UsuarioEntity;
}