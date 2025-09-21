import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(
        private usuarioService: UsuarioService
    ) { };
    async validate(value: string): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
            value,
        );
        return !usuarioComEmailExiste;
    }
}

export const UniqueEmail = (options: ValidationOptions) => {
    return (objeto: object, propertyName: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName,
            options,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
};