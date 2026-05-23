/*
 * PUBLIC API del proyecto ui-lib
 * Aquí listamos todo lo que queremos que el mundo exterior pueda usar.
 */

// Exportamos nuestro nuevo botón para que la demo-app pueda importarlo
export * from './lib/components/ui-button/ui-button.component';
// Exportamos nuestro nuevo Card para que la demo-app pueda importarlo
export * from './lib/components/ui-card/ui-card.component';
// Exportamos nuessto Nuevo componeste select para que demo-app pueda importarlo
export * from './lib/models/select.model'; // Importante exportar la interfaz también
export * from './lib/components/ui-select/ui-select.component';
//Exportamos nuestto Nuevo componentes tabla Para que demo-app pueda importarlo
export * from './lib/components/ui-table/ui-table.component';
//Exportacion del Servicio 
export * from './lib/services/rick-morty';