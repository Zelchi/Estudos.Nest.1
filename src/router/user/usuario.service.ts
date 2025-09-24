import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { ValidaUsuarioDTO } from './dto/valida-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
        console.log(dadosDoUsuario);
        return this.usuarioRepository.save(UsuarioEntity.From(dadosDoUsuario));
    }

    async validaUsuario(dadosDoUsuario: ValidaUsuarioDTO) {
        const usuario = await this.usuarioRepository.findOne({
            where: { email: dadosDoUsuario.email },
        });
        if (!usuario) throw new NotFoundException("O email ou a senha estão incorretos!");
        const usuarioFound = await bcrypt.compare(dadosDoUsuario.senha, usuario?.senha);
        if (!usuarioFound) throw new UnauthorizedException("O email ou a senha estão incorretos!");
        const payload = { sub: usuario.id, email: usuario.email };

        return await this.jwtService.signAsync(payload)
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
        await this.usuarioRepository.update(id, { ...usuario, ...novosDados });
    }

    async deletaUsuario(id: string) {
        const result = await this.usuarioRepository.softDelete(id);
        if (!result) throw new NotFoundException("Usuario não encontrado!");
    }
}