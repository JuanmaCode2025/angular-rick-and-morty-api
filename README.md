# 🪐 LABORATORIO DE COMPONENTES DE ANGULAR

Este proyecto ha sido desarrollado como una **Prueba Técnica de Angular** avanzada. Consiste en un ecosistema monorrepo modular que consume la API pública de **Rick & Morty**, diseñado bajo estándares rigurosos de arquitectura limpia, reactividad fina y una interfaz visual inmersiva de estilo **HUD Cyberpunk** (*Centro de Comando de la Ciudadela*).

---

## 🏛️ 1. Arquitectura del Proyecto y Decisiones de Diseño

El espacio de trabajo está estructurado bajo un patrón desacoplado y modular, dividiendo las responsabilidades en dos áreas independientes:

###  📦 `ui-lib` (Capa de Librería de Componentes)

Librería nativa de componentes de presentación (*Dumb Components*) puros, reutilizables y standalone:

- `ui-table`
- `ui-card`
- `ui-select`
- `ui-button`

Estos componentes:

✅ No conocen lógica de negocio  
✅ No realizan peticiones HTTP  
✅ Son totalmente reutilizables

---

###  🧠 `demo-app` (Capa de Aplicación / Orquestador)

Cliente inteligente encargado de:

- Consumir la librería UI
- Inyectar servicios
- Gestionar estado reactivo
- Controlar interacciones del usuario
- Coordinar flujos de datos

---

##  🎯 Decisiones Clave de Ingeniería

### ⚡ Reactividad basada en Angular Signals

La comunicación clásica mediante propiedades fue reemplazada por `input()` signals:

- Menor costo de Change Detection
- Renderizado dirigido
- Mejor rendimiento
- Arquitectura moderna Angular

---

### 🔒 Política estricta de cero `any`

Todo el flujo fue estrictamente tipado:

- Interfaces
- Modelos
- Contratos HTTP
- Componentes

---

### 🎨 Interfaz HUD Cyberpunk

La interfaz trasciende el diseño tradicional mediante:

- Esquineros HUD decorativos
- Posicionamiento absoluto
- Sombras fosforescentes
- `animate-ping`
- Gradientes dinámicos
- Escáner holográfico visual

---

##  ⚙️ 2. Instalación y Ejecución

Ejecuta los siguientes comandos desde PowerShell CMD:

###  Paso 1: Descargar y abrir el Proyecto de GitHub

```bash
https://github.com/JuanmaCode2025/angular-rick-and-morty-api.git
```
Ingresa al repositorio descargado:

```bash
cd angular-rick-and-morty-api
```

## Paso 2: Instalar dependencias

```bash
npm install
```

Instala Angular, Tailwind y dependencias del proyecto.

---

## Paso 3: Construir librería `ui-lib`

```bash
ng build ui-lib
```

La aplicación requiere la librería compilada antes de iniciar.

---

## Paso 4: Ejecutar proyecto

```bash
ng serve demo-app -o
```

La bandera `-o` abrirá automáticamente el navegador.

---

##  ⚙️  Ejecución De las Pruebas Unitarias

El siguiente comando le muestra las pruebas unitarias de los componentes Card y Button
```bash
npm run test -- --watch  
```

# 📚 3. API de Componentes (`ui-lib`)

# 🎴 `<ui-card>`

Contenedor táctico HUD con soporte de gradientes dinámicos y efectos visuales.

## Inputs

| Propiedad | Tipo | Descripción |
|---|---:|---|
| title | Signal<string> | Título principal |
| subtitle | Signal<string> | Texto secundario |
| elevation | `'flat' \| 'raised' \| 'outlined'` | Intensidad visual |
| footerId | Signal<string> | Registro técnico |

---

### Ejemplo:

```html
<ui-card
 [title]="personajeSeleccionado()?.name || ''"
 subtitle="ANÁLISIS DE ESPECIMEN TRANSMITIDO"
 [footerId]="'AUTENTICACIÓN: #' + personajeSeleccionado()?.id"
 elevation="outlined">

<div class="flex flex-col gap-4">

<img
[src]="personajeSeleccionado()?.image"
class="w-full h-64 object-cover rounded-2xl">

<p class="font-mono text-base">
Especie:
{{ personajeSeleccionado()?.species }}
</p>

</div>

</ui-card>
```

---

# 📊 `<ui-table>`

Grilla estructurada con acciones integradas.

## API

| Elemento | Nombre | Tipo | Descripción |
|---|---:|---|---|
| Input | data | Signal<Character[]> | Colección a renderizar |
| Output | onView | EventEmitter<Character> | Abrir detalle |
| Output | onDelete | EventEmitter<Character> | Eliminar registro |

---

### Ejemplo:

```html
<ui-table
[data]="listadoPersonajes()"
(onView)="abrirEscanerModal($event)"
(onDelete)="eliminarEspecimen($event)">
</ui-table>
```

---

# 🔬 4. Contratos de Datos

Para evitar el uso de `any`, la API fue modelada mediante interfaces estrictas.

```ts
export interface Location {
name:string;
url:string;
}

export interface Character{
id:number;
name:string;

status:
| 'Alive'
| 'Dead'
| 'unknown';

species:string;

type:string;

gender:string;

origin:Location;

location:Location;

image:string;

episode:string[];

url:string;

created:string;
}

export interface SelectOption{
value:string;
label:string;
}
```

---

# 📝 5. Estándar JSDoc

Todo el código público incorpora documentación descriptiva.

```ts
/**
* Componente de presentación HUD para renderizar
* contenedores tácticos.
*
* Gestiona iluminación y decoraciones HUD.
*/

@Component({
selector:'ui-card',
standalone:true
})

export class UiCardComponent{

/**
* Registro opcional
*/

footerId=input<string>('');


/**
* Genera un log diagnóstico.
*
* @returns void
*/

onHeaderClick():void{

console.log(
`[Citadel Lab]
Interceptando nodo:
${this.title()}`
);

}

}
```

---

# 📁 Estructura del Proyecto

```bash
└── mi-proyecto-rickandmorty
    ├── .angular
    ├── projects
    │   ├── demo-app
    │   │   ├── public
    │   │   │   └── favicon.ico
    │   │   ├── src
    │   │   │   ├── app
    │   │   │   │   ├── app.config.ts
    │   │   │   │   ├── app.css
    │   │   │   │   ├── app.html
    │   │   │   │   ├── app.routes.ts
    │   │   │   │   ├── app.spec.ts
    │   │   │   │   └── app.ts
    │   │   │   ├── index.html
    │   │   │   ├── main.ts
    │   │   │   └── styles.css
    │   │   ├── .postcssrc.json
    │   │   ├── tsconfig.app.json
    │   │   └── tsconfig.spec.json
    │   └── ui-lib
    │       ├── src
    │       │   ├── lib
    │       │   │   ├── components
    │       │   │   │   ├── ui-button
    │       │   │   │   │   ├── ui-button.component.css
    │       │   │   │   │   ├── ui-button.component.html
    │       │   │   │   │   ├── ui-button.component.spec.ts
    │       │   │   │   │   └── ui-button.component.ts
    │       │   │   │   ├── ui-card
    │       │   │   │   │   ├── ui-card.component.css
    │       │   │   │   │   ├── ui-card.component.html
    │       │   │   │   │   ├── ui-card.component.spec.ts
    │       │   │   │   │   └── ui-card.component.ts
    │       │   │   │   ├── ui-select
    │       │   │   │   │   ├── ui-select.component.css
    │       │   │   │   │   ├── ui-select.component.html
    │       │   │   │   │   ├── ui-select.component.spec.ts
    │       │   │   │   │   └── ui-select.component.ts
    │       │   │   │   └── ui-table
    │       │   │   │       ├── ui-table.component.css
    │       │   │   │       ├── ui-table.component.html
    │       │   │   │       ├── ui-table.component.spec.ts
    │       │   │   │       └── ui-table.component.ts
    │       │   │   ├── models
    │       │   │   │   └── select.model.ts
    │       │   │   ├── services
    │       │   │   │   ├── rick-morty.spec.ts
    │       │   │   │   └── rick-morty.ts
    │       │   │   ├── src
    │       │   │   │   └── lib
    │       │   │   │       └── components
    │       │   │   ├── ui-lib.spec.ts
    │       │   │   └── ui-lib.ts
    │       │   └── public-api.ts
    │       ├── README.md
    │       ├── ng-package.json
    │       ├── package.json
    │       ├── tsconfig.lib.json
    │       ├── tsconfig.lib.prod.json
    │       └── tsconfig.spec.json
    ├── .editorconfig
    ├── .gitignore
    ├── .prettierrc
    ├── README.md
    ├── angular.json
    ├── package-lock.json
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```
# ✨ ¿Por qué este proyecto destaca?

### ✅ Arquitectura desacoplada

Separación clara entre presentación y lógica.

### ✅ Angular moderno

Uso de:

- Signals
- Standalone Components
- Reutilización extrema

### ✅ Código estricto

Sin `any`.

Tipado fuerte mediante interfaces.

### ✅ Interfaz visual avanzada

HUD inmersivo con estética Cyberpunk.

### ✅ Código documentado

JSDoc aplicado en toda API pública.

---

# 🚀 Estado del Proyecto

🟢 Laboratorio multiversal completamente operativo y listo para despliegue.
##  📌 Link Del Despliegue del Proyecto en Render:
```bash
https://angular-rick-and-morty-api.onrender.com/
```

