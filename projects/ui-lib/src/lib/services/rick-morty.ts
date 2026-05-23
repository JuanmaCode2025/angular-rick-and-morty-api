import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Estructura de un personaje según la API oficial
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

// Estructura de la respuesta general de la API
interface ApiResponse {
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  // Inyección moderna de dependencias en Angular
  private http = inject(HttpClient); 
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  /**
   * Obtiene todos los personajes desde la API de Rick y Morty
   * Usamos .pipe(map(...)) para extraer solo el array de 'results' que nos interesa
   */
  getCharacters(): Observable<Character[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.results)
    );
  }
}