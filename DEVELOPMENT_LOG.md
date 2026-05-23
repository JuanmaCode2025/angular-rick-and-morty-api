# 📓 BITÁCORA DE DESARROLLO — DEVELOPMENT_LOG.md

Este documento describe el proceso de desarrollo del proyecto, las decisiones tomadas, los retos encontrados y el uso de herramientas de Inteligencia Artificial durante la implementación.

El objetivo de esta bitácora es documentar de forma transparente cómo se construyó la solución, qué apoyo se utilizó y qué decisiones fueron tomadas conscientemente durante el desarrollo.

---

# 🤖 1. Uso de Herramientas de IA

Durante el desarrollo del proyecto se utilizaron herramientas de Inteligencia Artificial como apoyo técnico y acelerador de productividad.

Las herramientas fueron utilizadas principalmente para:

- Resolver dudas relacionadas con Angular
- Comprender conceptos nuevos del framework
- Guiar la estructura inicial del proyecto
- Mejorar componentes visuales
- Resolver errores específicos
- Organizar documentación

Debido a que era mi primera experiencia trabajando con Angular, la IA se utilizó como un apoyo de aprendizaje y orientación, pero todas las decisiones finales fueron revisadas, comprendidas y adaptadas manualmente.

---

## 🔹 Uso #1 — Diseño del Agente IA y Guía Inicial del Proyecto

Al ser mi primera experiencia utilizando Angular, inicialmente necesitaba una guía estructurada que me ayudara a comprender el framework y construir el proyecto al mismo tiempo.

Por esta razón decidí darle un rol específico a la IA para que actuara como un mentor técnico y mantuviera una estructura consistente durante todo el desarrollo.

### Prompt utilizado

> "Actúa como un Arquitecto de Software Senior y Experto en Angular 17+. Me vas a ayudar a construir una prueba técnica con restricciones estrictas de arquitectura, Angular moderno, tipado estricto, componentes standalone, Signals API y buenas prácticas."

(Se incluyeron reglas detalladas sobre monorepos, componentes, Signals, Tailwind, restricciones de `any`, documentación y estructura general del proyecto.)

---

### ✅ Qué se aceptó y por qué

Se aceptó:

- La estructura general del proyecto
- La división entre `ui-lib` y `demo-app`
- Recomendaciones de Angular moderno
- Uso de componentes Standalone
- Uso de Signals
- Organización de la arquitectura

Estas decisiones fueron aceptadas porque:

- Mejoraban la organización
- Facilitaban el mantenimiento
- Seguían prácticas modernas
- Cumplían los requisitos de la prueba técnica

Además, al ser mi primera experiencia con Angular, sirvieron como guía para comprender cómo debía organizarse correctamente un proyecto real.

---

### ❌ Qué se rechazó o modificó

Algunas sugerencias generadas por IA fueron modificadas manualmente:

- Código excesivamente complejo
- Estructuras innecesarias
- Implementaciones poco adaptadas al proyecto
- Soluciones que no seguían exactamente las restricciones solicitadas

Las modificaciones se realizaron para:

- Mantener simplicidad
- Adaptar el código al nivel requerido
- Comprender completamente cada implementación

---

## 🔹 Uso #2 — Diseño visual HUD Cyberpunk

### Prompt utilizado

> "Necesito mejorar el diseño visual de mi componente ui-card en Angular. Quiero una estética estilo HUD Cyberpunk inspirada en Rick & Morty, con bordes fosforescentes, esquineros absolutos, indicadores animados y apariencia de escáner holográfico."

---

### ✅ Qué se aceptó y por qué

Se aceptaron:

- Clases utilitarias de Tailwind
- `animate-ping`
- Sombras luminosas
- Bordes translúcidos
- Posicionamiento absoluto

Estas propuestas se aceptaron porque:

- Mejoraban la experiencia visual
- Mantenían la temática del proyecto
- Reducían CSS adicional
- Aprovechaban Tailwind correctamente

---

### ❌ Qué se rechazó o modificó

La IA propuso inicialmente:

- CSS global
- tamaños fijos
- estructuras tipo pixel-perfect

No se aceptó porque:

- afectaban la responsividad
- dificultaban mantenimiento
- reducían adaptabilidad

Se reemplazó por:

- CSS Grid
- Flexbox
- diseño responsive

---

# ⚙️ 2. Decisiones Técnicas Tomadas

Durante el desarrollo se tomaron varias decisiones importantes.

---

## Arquitectura desacoplada

El proyecto se dividió en:

```bash
ui-lib
```

Librería de componentes reutilizables.

y:

```bash
demo-app
```

Aplicación encargada de la lógica y consumo de datos.

Esto permite:

- separación de responsabilidades
- reutilización
- escalabilidad
- mantenimiento

---

## Tipado estricto sin `any`

Se decidió evitar completamente:

```ts
any
```

y reemplazarlo mediante interfaces:

```ts
interface Character {}

interface Location {}

interface SelectOption {}
```

Beneficios:

- seguridad
- mejor mantenimiento
- autocompletado
- detección temprana de errores

---

## Componentes Standalone + Signals

Se decidió adoptar Angular moderno utilizando:

```ts
standalone:true
```

y:

```ts
input()

output()

model()
```

Esto permite:

- menos dependencias
- mejor rendimiento
- arquitectura actualizada
- menor complejidad

---

# 🛠️ 3. Retos Encontrados y Soluciones

---

## ❌ Reto 1: Curva de aprendizaje Angular + Tailwind

### Problema

Esta fue mi primera experiencia utilizando Angular.

Inicialmente tuve dificultades entendiendo:

- estructura del framework
- compilación
- monorepos
- librerías
- Signals
- integración con Tailwind

---

### Solución

Se consultó:

- documentación oficial
- ejemplos
- apoyo mediante IA

La IA ayudó a:

- entender arquitectura
- explicar errores
- proponer soluciones
- orientar el flujo de trabajo

Esto permitió avanzar mientras aprendía el framework.

---

## ❌ Reto 2: Desincronización de propiedades en la librería

### Problema

Después de agregar:

```ts
footerId
```

al componente:

```ts
ui-card
```

apareció el error:

```bash
NG8002:
Can't bind to 'footerId'
since it isn't a known property
```

---

### Causa

La aplicación consumía:

```bash
dist/ui-lib
```

y la librería compilada aún no se había actualizado.

---

### Solución

Se reconstruyó la librería:

```bash
ng build ui-lib
```

Posteriormente:

```bash
ng serve demo-app
```

Esta recomendación surgió inicialmente mediante IA y luego fue comprendida y aplicada manualmente.

---

## ❌ Reto 3: Error de limpieza PowerShell o la Terminal

### Problema

Se ejecutó:

```bash
rmdir /s /q .angular
```

y PowerShell generó errores.

---

### Causa

Los parámetros utilizados pertenecían a CMD y no a PowerShell.

---

### Solución

Se reemplazó por:

```powershell
Remove-Item -Recurse -Force .angular
```

## ❌ Reto 4: Curva de aprendizaje y errores iniciales con Angular

### Problema

Como se mencionó anteriormente, esta fue mi primera experiencia trabajando con Angular y Tailwind CSS. Durante el desarrollo aparecieron múltiples errores relacionados con:

- Compilación
- Configuración inicial
- Estructura del proyecto
- Uso del framework
- Integración entre componentes
- Tipado y flujo de datos

En lugar de documentar cada error individual, se decidió agruparlos como una dificultad general asociada al proceso de aprendizaje inicial del ecosistema Angular.

---

### Causa

La principal causa fue la falta de experiencia previa utilizando:

- Angular
- Tailwind CSS
- Monorepos
- Angular Signals
- Librerías reutilizables

Al ser tecnologías nuevas para mí, inicialmente hubo una curva de aprendizaje importante para comprender su funcionamiento y estructura.

---

### Solución

Para superar estos bloqueos se combinaron varias fuentes de apoyo:

- Documentación oficial
- Investigación
- Pruebas y experimentación
- Uso de herramientas de Inteligencia Artificial

La IA se utilizó principalmente para comprender errores específicos. Cuando aparecía un error de compilación o estructura, se analizaba el mensaje generado y se consultaban posibles soluciones.

Posteriormente cada solución era probada, revisada y comprendida antes de incorporarla al proyecto.

Este proceso permitió avanzar en el desarrollo mientras se adquirían conocimientos prácticos sobre Angular y su ecosistema.

---


# 🎯 4. Conclusión

La Inteligencia Artificial fue utilizada como herramienta de apoyo y aprendizaje, especialmente debido a que era la primera vez trabajando con Angular.

Sin embargo, cada decisión implementada fue:

✅ Revisada  
✅ Comprendida  
✅ Adaptada  
✅ Probada manualmente  

Más importante que utilizar IA fue comprender el funcionamiento de cada parte implementada y poder explicar las decisiones tomadas durante una revisión técnica.

Además del proyecto funcional, este proceso permitió adquirir conocimientos iniciales sobre Angular, arquitectura modular y buenas prácticas modernas.

---

🟢 Desarrollo finalizado y proyecto listo para evaluación.