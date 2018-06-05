import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Materia, PokemonService} from "./pokemon.service";
import {PokemonPipe} from "../pipes/pokemon-pipe.service";
import {POKEMON_SCHEMA} from "./pokemon.schema";

@Controller('Pokemon')
export class PokemonController {

    constructor(private  pokemonService: PokemonService){

    }

    //Body params
    @Post('crear')
    crearMateria(@Body(new PokemonPipe(POKEMON_SCHEMA)) bodyParams){
        const pokemon1 = new  Materia(
            bodyParams.numeroPokemon,
            bodyParams.nombrePokemon,
            bodyParams.poderEspecial1,
            bodyParams.poderEspecial2,
            bodyParams.fechaCaptura,
            bodyParams.nivel,
            bodyParams.entrenadorId,
        );

        return this.pokemonService.crearPokemon(pokemon1);

    }

    @Get('listar')
    listarTodosLosPokemons(@Res () response, @Req () request){
        var arregloPokemon = this.pokemonService.listarPokemon();
        if(Object.keys(arregloPokemon).length === 0){
            return response.send({
                mensaje:'No existe ningun Pokemon',
                estado: HttpStatus.NOT_FOUND + ' Not found',
            });
        } else{
            return response.status(202).send(arregloPokemon);
        }

    }

    @Get('/:id')
    mostrarPokemon(@Res () response, @Req () request, @Param() params){
        let arregloPokemon = this.pokemonService.obtenerUno(params.id);
        if(arregloPokemon){
            return response.send(arregloPokemon);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Pokemon no encontrada',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarPokemon(@Res () response, @Req () request, @Param() params, @Body(new PokemonPipe(POKEMON_SCHEMA)) body){
        let arregloPokemon = this.pokemonService.obtenerUno(params.id);
        if(arregloPokemon){
            return response.send(
                this.pokemonService.editarUno(
                    params.id,
                    body.numeroPokemon,
                    body.nombrePokemon,
                    body.poderEspecial1,
                    body.poderEspecial2,
                    body.fechaCaptura,
                    body.nivel,
                    body.entrenadorId,
                ));
        } else{
            return response.send({
                mensaje:'Pokemon no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
            });
        }
    }
}