import * as Joi from 'joi';
export const POKEMON_SCHEMA = Joi
    .object()
    .keys({
        numeroPokemon:Joi.number().required(),
        nombrePokemon: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        poderEspecial1:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        poderEspecial2:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        fechaCaptura:Joi.date().required(),
        nivel:Joi.number().integer().required(),
        entrenadorId:Joi.number().integer().required(),
    });