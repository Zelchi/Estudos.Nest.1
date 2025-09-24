import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { UsuarioService } from './usuario.service';
import { ValidaUsuarioDTO } from './dto/valida-usuario.dto';
import { HashPipe } from '../../utils/hash.pipe';

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Post()
    async criaUsuario(
        @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
        @Body('senha', HashPipe) hashSenha: string,
    ) {
        const usuarioCriado = await this.usuarioService.criaUsuario(
            { ...dadosDoUsuario, senha: hashSenha },
        );

        return {
            usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
            messagem: 'usuário criado com sucesso',
        };
    }

    @Post('/login')
    async login(@Body() dadosDoUsuario: ValidaUsuarioDTO) {
        const usuario = await this.usuarioService.validaUsuario(dadosDoUsuario);
        return {
            usuario: new ListaUsuarioDTO(usuario.id, usuario.nome),
            messagem: 'Login realizado com sucesso',
        };
    }

    @Get()
    async listUsuarios() {
        const usuariosSalvos = await this.usuarioService.listUsuarios();

        return usuariosSalvos;
    }

    @Put('/:id')
    async atualizaUsuario(
        @Param('id') id: string,
        @Body() novosDados: AtualizaUsuarioDTO,
    ) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
            id,
            novosDados,
        );

        return {
            usuario: usuarioAtualizado,
            messagem: 'usuário atualizado com sucesso',
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

        return {
            usuario: usuarioRemovido,
            messagem: 'usuário removido com suceso',
        };
    }
}
