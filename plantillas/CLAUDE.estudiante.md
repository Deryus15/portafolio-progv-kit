# Portafolio de {{MATERIA}} — {{NOMBRE}}

Repositorio del portafolio web de **{{NOMBRE}}** ({{MATERIA}} · {{UNIVERSIDAD}} · prof. {{PROFESOR}}). Responde SIEMPRE en español, con tildes. Fechas `dd/MM/yyyy`.

**Retomar el trabajo:** lee primero `HISTORIAL.md` (qué se hizo y qué falta) y resume al estudiante dónde se quedaron.

## Qué es
Sitio estático (HTML/CSS/JS puros) con los 8 laboratorios: descripción, código fuente, documentos y **ejecución en vivo**.
- **Pública:** {{URL_PAGES}} (GitHub Pages; se publica sola con cada `push` a `main` mediante `.github/workflows/pages.yml`).
- **En vivo:** servidor en Render ({{URL_RENDER}}, plan gratuito). La página usa `window.PORTAFOLIO_BACKEND` (en `portafolio/web/js/config.js`); si el servidor duerme o no responde, muestra ejecuciones grabadas y se reconecta sola.

## Estructura
```
portafolio/web/            la página (index.html, css/style.css, js/main.js, js/ojo.js, js/perfil.js, js/config.js, js/codigo.js, js/capturas.js)
portafolio/server.js       servidor que ejecuta los labs (local en Windows o dentro del contenedor)
portafolio/scripts/        capturar.js (ejecuciones reales) y build-codigo.js (visor de código)
prog-v/laboratorio1..8/    código, enunciados y SQL de cada laboratorio (material del curso)
Dockerfile · docker/       contenedor Linux: Java 21 + Tomcat 10 + MariaDB + Node (lo que corre en Render)
.github/workflows/         publicación en GitHub Pages
README.md · HISTORIAL.md   documentación viva: mantenlos al día
```

## Reglas de trabajo
1. **Lo personal vive en `portafolio/web/js/perfil.js`** (nombre, cédula, usuario, repo, orígenes autorizados). No lo repitas a mano en otros archivos.
2. **No modifiques `prog-v/`** (material del curso) salvo que el estudiante lo pida expresamente.
3. **Después de cada cambio importante:** actualiza `HISTORIAL.md` (fecha `dd/MM/yyyy`, qué se hizo, qué queda) y haz commit con un mensaje claro. Mantén `README.md` coherente con la realidad (URLs, pasos).
4. Antes de `git push`, de desplegar en Render o de tocar DNS: explica qué se hará público y pide confirmación.
5. **Nunca** pidas ni escribas contraseñas, tokens o códigos 2FA; los inicios de sesión los hace el estudiante. **Nada de pagos**: en Render el plan debe ser *Free* ($0).
6. La cédula solo se muestra como el estudiante acordó (`perfil.js` → `cedula`).
7. Respeta accesibilidad: contraste legible, “reducir movimiento” y pantallas angostas.

## Comandos útiles
| Para… | Comando |
|---|---|
| Ver la página en local | `node portafolio/server.js` → http://localhost:5173 |
| Regenerar capturas reales contra Render (PowerShell) | `$env:PORTAFOLIO_URL="{{URL_RENDER}}"; node portafolio/scripts/capturar.js` |
| Regenerar capturas (Bash/macOS/Linux) | `PORTAFOLIO_URL={{URL_RENDER}} node portafolio/scripts/capturar.js` |
| Regenerar el visor de código tras tocar los labs | `node portafolio/scripts/build-codigo.js` |
| Ver el estado de la publicación | `gh run list --limit 3` |
| Probar el contenedor en tu PC (opcional, Docker) | `docker build -t progv . && docker run --rm -p 7860:7860 progv` |

## Detalles que importan (aprendidos a golpes)
- **Render gratis:** duerme a los 15 min (≈50 s para despertar); con 0.1 CPU el lab 4 tarda ≈90 s en arrancar (la página espera sola); las bases se reinician al arrancar; solo un lab web a la vez (comparten el puerto 8080). Tras cambiar **código del servidor** o `perfil.js` hay que hacer en Render *Manual Deploy → Deploy latest commit* (no hay auto-deploy). Cambiar solo la página (CSS/JS de `web/`) **no** requiere redeploy: lo publica GitHub Pages.
- **CORS:** el servidor solo acepta peticiones de los orígenes de `perfil.js → origenes` (o de la variable `PORTAFOLIO_ORIGINS` en Render). Si la página dice “demo grabada · conectando…” con el servidor despierto, revisa eso y `config.js`.
- **Dominio propio en tu usuario de GitHub:** si existe `{{USUARIO}}.github.io` con un dominio personalizado, las URLs de proyecto redirigen a él. Alternativas en `guia/04` del kit.
- El `.gitattributes` fuerza finales de línea LF en `*.sh` y `Dockerfile`; no lo quites (el contenedor falla con CRLF).
- Los labs **no necesitan** Java/Docker/XAMPP en tu PC para publicarse: corren en el contenedor de Render.
