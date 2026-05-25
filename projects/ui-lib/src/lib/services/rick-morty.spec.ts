import { TestBed } from '@angular/core/testing';

// CORRECCIÓN AQUÍ: Cambiar 'RickMorty' por 'RickMortyService'
import { RickMortyService } from './rick-morty'; 

describe('RickMortyService', () => {
  // CORRECCIÓN AQUÍ: Cambiar el tipo de la variable
  let service: RickMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // CORRECCIÓN AQUÍ: Inyectar la clase correcta
    service = TestBed.inject(RickMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});