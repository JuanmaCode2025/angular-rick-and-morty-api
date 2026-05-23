// Importa el decorador Injectable y la función inject de Angular
import { Injectable, inject } from '@angular/core';

// Importa HttpClient para hacer peticiones HTTP
// e HttpParams para agregar parámetros a la URL
import { HttpClient, HttpParams } from '@angular/common/http';

// Observable: maneja datos asíncronos
// map: transforma datos recibidos
import { Observable, map } from 'rxjs';


// Interfaz que define la estructura de un personaje
// Sirve para decirle a TypeScript cómo son los datos
export interface Character {
  id: number;       // ID del personaje
  name: string;     // Nombre
  status: string;   // Estado (Alive, Dead...)
  species: string;  // Especie
  image: string;    // URL de imagen
}


// Interfaz de la respuesta de la API
// La API Rick and Morty devuelve muchos datos,
// pero aquí solo nos interesa results
interface ApiResponse {
  results: Character[];
}


// Convierte esta clase en un servicio inyectable
@Injectable({
  
  // available globalmente
  // Angular crea una sola instancia
  // y puede usarse en cualquier componente
  providedIn: 'root'
})
export class RickMortyService {

  // inject() obtiene HttpClient
  // Similar a usar constructor(private http:HttpClient)
  private http = inject(HttpClient);

  
  // URL principal de la API
  private apiUrl = 'https://rickandmortyapi.com/api/character';


  /**
   * Función para obtener personajes
   * status es opcional
   * Puede recibir:
   *
   * "alive"
   * "dead"
   * o vacío
   */

  getCharacters(status?: string): Observable<Character[]> {

    // Crea parámetros vacíos
    let params = new HttpParams();


    // Si existe un estado...
    if (status) {

      // agrega:
      // ?status=alive
      // o ?status=dead

      params = params.set('status', status);
    }


    // Hace una petición GET
    // Ejemplo:
    //
    // https://rickandmortyapi.com/api/character
    //
    // o:
    //
    // https://rickandmortyapi.com/api/character?status=alive

    return this.http.get<ApiResponse>(
      this.apiUrl,
      { params }
    )

    // pipe permite encadenar operadores RxJS
    .pipe(

      // transforma la respuesta
      // porque la API devuelve:

      /*
      {
        info:{...},
        results:[...]
      }
      */

      // Nosotros queremos solo:
      // results

      map(response => response.results)

    );
  }
}