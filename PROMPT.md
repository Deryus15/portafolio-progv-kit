# El prompt (cópialo y pégalo en Claude Code)

## Cómo usarlo

1. Abre una terminal **dentro de la carpeta de este kit** (en Windows: clic derecho en la carpeta → *Abrir en Terminal*).
2. Escribe `claude` y pulsa Enter para abrir Claude Code.
3. Pega el texto de abajo y responde las preguntas que te haga. **Tú haces los inicios de sesión; Claude hace el resto.**

> Claude Code lee automáticamente el archivo [`CLAUDE.md`](./CLAUDE.md) de esta carpeta: ahí están todas las reglas y fases. Si usas Claude en otro lugar que no lo lee solo (por ejemplo, la web), pega este prompt y adjunta o pega también el contenido de `CLAUDE.md`.

## El prompt

```text
Hola. Soy estudiante de Programación V (UNACHI, prof. Alexis Flores) y quiero crear mi propio portafolio web con mis 8 laboratorios, ejecutables en vivo desde cualquier dispositivo, publicado en MI propio repositorio de GitHub.

Lee primero el archivo CLAUDE.md de esta carpeta y síguelo al pie de la letra, fase por fase, en español. Resumen de lo que espero de ti:

1. Comprueba mi equipo con herramientas/verificar-entorno.js y ayúdame a instalar lo que falte (incluida la extensión de Claude para mi navegador: Chrome, Brave u Opera, si no la tengo).
2. Pregúntame mi nombre completo, mi cédula (y cómo quiero mostrarla), mi usuario de GitHub, si ya tengo un dominio en GitHub, y CÓMO quiero el diseño de mi portafolio (para que no sea igual al de mis compañeros).
3. Antes de crear o subir nada, verifica que la cuenta de GitHub con la que estoy conectado/a es realmente MÍA.
4. Crea mi portafolio en una carpeta nueva y mi repositorio público en mi cuenta, con el material de los 8 laboratorios, README e HISTORIAL.
5. Aplica mi diseño, publícalo (GitHub Pages) y deja los laboratorios en vivo en un servidor gratuito (Render), sin pagar nada.
6. Pídeme confirmación antes de cada acción que publique algo, y yo haré los inicios de sesión (nunca me pidas contraseñas ni tokens).
7. Mantén el HISTORIAL.md actualizado y, al final, dame las URLs y una lista de verificación.

Empieza ahora con la Fase 0.
```

## ¿Y si algo sale mal?

Mira [`guia/08-problemas-comunes.md`](./guia/08-problemas-comunes.md). Si Claude se desvía, dile: *«Vuelve a leer CLAUDE.md y continúa en la fase en la que íbamos.»*
