import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface ApiResponse {
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private http = inject(HttpClient); 
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  /**
   * Obtiene los personajes aplicando filtros opcionales por URL
   */
  getCharacters(status?: string): Observable<Character[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status); // Añade ?status=alive o ?status=dead a la URL
    }

    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map(response => response.results)
    );
  }
}