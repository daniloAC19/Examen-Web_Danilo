import { Injectable} from "@nestjs/common/decorators";

@Injectable()
export class PokemonService {

    //Metodo Crear Materia
    pokemon: Materia[] = [];
    crearPokemon(pokemon: Materia): Materia[]{
        this.pokemon.push(pokemon);
        return this.pokemon;
    }

    //Metodo Listar Todos los pokemon
    listarPokemon(){
        return this.pokemon;
    }

    //Metodo obtener un pokemon
    obtenerUno(pokemonID){

        console.log(this.pokemon[pokemonID]);
        return this.pokemon[pokemonID];
    }

    //Metodo editar un pokemon
    editarUno(pokemonID, numeroPokemon, nombrePokemon, poderEspecial1, poderEspecial2, fechaCaptura, nivel, entrenadorId){
        let materiaActualizada = this.obtenerUno(pokemonID);

        materiaActualizada.numeroPokemon = numeroPokemon;
        materiaActualizada.nombrePokemon = nombrePokemon;
        materiaActualizada.poderEspecial1 = poderEspecial1;
        materiaActualizada.poderEspecial2 = poderEspecial2;
        materiaActualizada.fechaCaptura = fechaCaptura;
        materiaActualizada.nivel = nivel;
        materiaActualizada.entrenadorId = entrenadorId;

        return materiaActualizada;
    }

}


export class Materia {
    constructor(
        public numeroPokemon:number,
        public nombrePokemon:string,
        public poderEspecial1:string,
        public poderEspecial2:boolean,
        public fechaCaptura:string,
        public nivel:number,
        public entrenadorId:number,
    ){};
}