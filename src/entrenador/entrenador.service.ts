import {Injectable} from "@nestjs/common/decorators";
@Injectable()

export class EntrenadorService {

    //Metodo Crear entrenador
    entrenadores: Entrenador[] = [];
    crearEntrenador(entrenador: Entrenador): Entrenador[]{
        this.entrenadores.push(entrenador);
        return this.entrenadores;
    }

    //Metodo Listar Todos los entrenador
    listarEntrenador(){
        return this.entrenadores;
    }

    //Metodo obtener un entrenador
    obtenerUno(entrenadorID){

        console.log(this.entrenadores[entrenadorID]);
        return this.entrenadores[entrenadorID];
    }

    //Metodo editar un entrenador
    editarUno(idEntrenador, nombreEntrenador, apellidoEntrenador, fechaNacimientoEntre, numeroMedallasEntre, campeonActualEntre){
        let entrenadorActualizado = this.obtenerUno(idEntrenador);

        entrenadorActualizado.nombres = nombreEntrenador;
        entrenadorActualizado.apellidos = apellidoEntrenador;
        entrenadorActualizado.fechaNacimiento = fechaNacimientoEntre;
        entrenadorActualizado.numeroMedallas = numeroMedallasEntre;
        entrenadorActualizado.campeonActual = campeonActualEntre;

        return entrenadorActualizado;
    }
}


export class Entrenador {

    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public numeroMedallas:number,
        public campeonActual:boolean,
    ){};

}