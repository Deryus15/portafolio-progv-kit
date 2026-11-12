# 07 · Tu diseño (que no sea igual al de los demás)

La plantilla trae un diseño de ejemplo (oscuro, portada con un editor de código sobre un ojo hecho de código). **No tienes que quedarte con él.** Si todos lo dejamos igual, los portafolios serían clones; el asistente te ayuda a hacer **el tuyo**.

## 1. Primero decide: las preguntas guía

El asistente te las hará. Ve pensando tus respuestas:

| Pregunta | Ejemplos |
|---|---|
| **Estilo general** | terminal retro, editorial/minimalista, tarjetas, neón, documento claro, glassmorphism, brutalista… |
| **Colores** | “negro con verde fosforescente”, “crema y azul marino”, “pastel suave” (o dale 2–3 colores en hexadecimal) |
| **Tipografía** | monoespaciada (técnica), serif (elegante), sans moderna; fuentes de [Google Fonts](https://fonts.google.com/) |
| **Portada** | ¿ventana de código? ¿un título gigante? ¿una animación de fondo? ¿una foto/ilustración tuya? |
| **Nivel de animación** | ninguna · sutil · interactiva con el mouse |
| **Claro u oscuro** | uno, otro, o ambos con interruptor |
| **Referencias** | enlaces de portafolios o páginas que te gusten (o capturas) |

## 2. Qué archivo controla cada cosa

| Quiero cambiar… | Archivo | Dónde |
|---|---|---|
| **Colores** (fondo, acento, textos) | `portafolio/web/css/style.css` | Variables al inicio (`:root { --bg, --acc, --ok, --warn … }`) |
| **Tipografías** | `portafolio/web/index.html` (enlace a Google Fonts) y `style.css` (`--sans`, `--mono`) | |
| **Maquetación, tarjetas, tamaños, espacios** | `portafolio/web/css/style.css` | Secciones por comentario (`/* ---- Hero … ---- */`, `/* ---- Secciones ---- */`) |
| **Contenido de la portada** | `portafolio/web/js/main.js` | Función **`buildHero()`** (qué líneas/textos aparecen y cómo se ven) |
| **Fondo animado de la portada** | `portafolio/web/js/ojo.js` | Dibuja el ojo/fondo en un `<canvas>`; se puede reemplazar por otra animación o quitar |
| **Tu nombre, materia, cédula, usuario, URLs** | `portafolio/web/js/perfil.js` | Único archivo con datos personales |
| **Textos de cada laboratorio** | `portafolio/web/js/main.js` | Arreglo `LABS` (título, resumen, puntos) — puedes reescribirlos con tus palabras |

> 🔒 **No cambies** lo que hace funcionar los labs (`server.js`, `Dockerfile`, `docker/`, la parte “En vivo” de `main.js`). El diseño vive en CSS, en `buildHero()` y en `ojo.js`.

## 3. Ideas de estilos (para inspirarte)

| Estilo | Cómo se ve | Pista para pedirlo |
|---|---|---|
| **Terminal retro** | Fondo negro, texto verde/ámbar, tipografía monoespaciada, cursor parpadeante, tipo “consola de los 80” | “portada como una terminal que ‘escribe’ mis datos y comandos clicables para cada lab” |
| **Editorial minimalista** | Mucho blanco, tipografía serif grande, pocos colores, líneas finas | “estilo revista: titulares grandes, columnas, casi sin animación” |
| **Cartas / tarjetas** | Cada lab es una carta que se voltea o se levanta al pasar el mouse | “un tablero de cartas, una por laboratorio, con efecto al pasar el mouse” |
| **Neón / cyberpunk** | Fondo oscuro, brillos magenta/cian, bordes luminosos | “neón cian y magenta con sombras brillantes” |
| **Documento claro** | Parece un informe técnico limpio, fondo claro, tablas y notas al margen | “como un documento académico claro, con índice lateral” |
| **Glassmorphism** | Paneles translúcidos con desenfoque sobre un fondo de colores suaves | “paneles de vidrio esmerilado sobre un degradado” |
| **Brutalista** | Bordes gruesos, colores planos y fuertes, tipografía enorme, nada “suave” | “brutalista: bloques de color, bordes negros gruesos, sin sombras” |
| **Mapa / metro** | Los 8 labs como estaciones de una línea de metro | “una línea de metro con 8 estaciones que llevan a cada lab” |

## 4. Cómo pedírselo al asistente (ejemplos de frases)

- *“Quiero un diseño **claro** tipo documento académico, con azul marino como acento y tipografía serif. La portada sin animaciones.”*
- *“Cambia la portada por un **título gigante** con mi nombre y debajo 8 tarjetas, una por laboratorio. Colores: crema y terracota.”*
- *“Quiero **terminal retro** en verde sobre negro; que al cargar ‘escriba’ mis datos y que cada lab sea un comando clicable.”*
- *“Mantén el fondo animado pero cámbialo por **lluvia de código** en vez del ojo, en color ámbar.”*
- *“Se ve muy cargado: **simplifícalo** y deja más espacio entre secciones.”*

Trabaja **por iteraciones**: pide un cambio, míralo (en tu PC y en el celular), pide el siguiente. Es normal pedir 5–10 ajustes.

## 5. Accesibilidad (importa, y se nota en la evaluación)

- **Contraste:** el texto debe leerse bien sobre el fondo (prueba con <https://webaim.org/resources/contrastchecker/>). Evita gris claro sobre blanco o letras de colores similares al fondo.
- **“Reducir movimiento”:** si el sistema del usuario lo pide (en Windows: *Configuración → Accesibilidad → Efectos visuales → Efectos de animación*), tu diseño debería **calmar las animaciones automáticas**. La plantilla ya lo respeta: apaga el código que sube, el parpadeo y la escritura animada, pero mantiene lo que responde al mouse. Si ves tu portada “estática” en tu computadora, **revisa ese ajuste** ([guía 08](08-problemas-comunes.md)).
- **Texto legible:** no menos de ~14 px en el cuerpo del texto en celular.
- **Teclado:** botones y enlaces deben poder usarse con Tab/Enter.

## 6. Revísalo en el celular

Mucha gente abrirá tu portafolio desde el teléfono (incluido el profesor). Antes de presentar:

1. Abre tu URL pública en tu **celular real**.
2. Comprueba: ¿la portada cabe? ¿los botones son tocables? ¿el código se lee o se desborda? ¿los labs se ejecutan?
3. En PC también puedes simular: en Chrome, `F12` → icono de **dispositivo móvil** (Ctrl+Shift+M).
4. Si algo falla, dile al asistente exactamente qué ves (“en el celular la ventana de código se sale por la derecha”).

✅ **Listo cuando…** tu portafolio tiene un diseño que **elegiste tú**, se lee bien (contraste), funciona con “reducir movimiento” y se ve bien en un celular real.

➡️ **Siguiente:** [08 · Problemas comunes](08-problemas-comunes.md)
