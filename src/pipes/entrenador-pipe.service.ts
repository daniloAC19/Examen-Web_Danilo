import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class EntrenadorPipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarEntrenador: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarEntrenador, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Entrenador no valido',
                },
                10
            )
        }else{
            return jsonValidarEntrenador;
        }

    }
}