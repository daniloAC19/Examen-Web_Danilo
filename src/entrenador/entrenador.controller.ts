import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {EntrenadorService,Entrenador} from "./entrenador.service";
import {EntrenadorPipe} from "../pipes/entrenador-pipe.service";
import {ENTRENADOR_SCHEMA} from "./entrenador.schema";


@Controller('Entrenador')
export  class EntrenadorController {

    constructor(private  entrenadorService: EntrenadorService){

    }
    //Body params
    @Post() //uso pipe
    crearEntrenador(@Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) bodyParams) {
            const entrenador1 = new Entrenador(
                bodyParams.nombres,
                bodyParams.apellidos,
                bodyParams.fechaNacimiento,
                bodyParams.numeroMedallas,
                bodyParams.campeonActual,
            );
            return this.entrenadorService.crearEntrenador(entrenador1);
    }

    @Get('listar')
    listarTodosLosEntrenadores(@Res () response, @Req () request){
        var arregloEntrenador = this.entrenadorService.listarEntrenador();
        if(Object.keys(arregloEntrenador).length === 0){
            return response.send({
                mensaje:'No existe ningun entrenador',
                estado: HttpStatus.NOT_FOUND + ' Not found',
            });
        } else{
            return response.status(202).send(arregloEntrenador);
        }

    }


    @Get('/:id')
    mostrarEntrenador(@Res () response, @Req () request, @Param() params){

        let arregloEntrenador = this.entrenadorService.obtenerUno(params.id);
        if(arregloEntrenador){
            return response.send(arregloEntrenador);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Entrenador no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
                //cabeceras: request.headers,
            });
        }

    }

    @Put('/:id') //Uso pipe
    modificarEntrenador(@Res () response, @Req () request, @Param() params, @Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) body){
        let arregloEntrenador = this.entrenadorService.obtenerUno(params.id);
        if(arregloEntrenador) {
            return response.send(
                this.entrenadorService.editarUno(
                    params.id,
                    body.nombres,
                    body.apellidos,
                    body.fechaNacimiento,
                    body.numeroMedallas,
                    body.campeonActual,
                ));
        } else{
            return response.send({
                mensaje:'Entrenador no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
               //headers: request.headers,
            });
        }
    }
}

