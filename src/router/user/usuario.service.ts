import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = Object.assign(new UsuarioEntity, dadosDoUsuario)
        return this.usuarioRepository.save(usuarioEntity);
    }

    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
        );
        return usuariosLista;
    }

    async buscaPorEmail(email: string) {
        const checkEmail = await this.usuarioRepository.findOne({
            where: { email },
        });

        return checkEmail;
    }

    async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) throw new NotFoundException("Usuario não encontrado!");
        Object.assign(usuario, novosDados);
        await this.usuarioRepository.update(id, novosDados);
    }

    async deletaUsuario(id: string) {
        const result = await this.usuarioRepository.softDelete(id);
        if (!result) throw new NotFoundException("Usuario não encontrado!");
    }
}