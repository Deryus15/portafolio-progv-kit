# 08 · Problemas comunes

Todo lo que nos pasó construyendo el primer portafolio, con su solución. Busca tu **síntoma** en la tabla de la sección que corresponda.

## GitHub y Git

| Síntoma | Causa | Solución |
|---|---|---|
| `gh: command not found` / “no se reconoce el comando” | `gh` no instalado o la terminal no se reinició | Instálalo ([guía 01](01-programas-y-cuentas.md)), **cierra y abre** PowerShell |
| `gh auth status` dice *not logged in* | No iniciaste sesión | `gh auth login` ([guía 03](03-github-cuenta-y-repositorio.md)) |
| `gh api user --jq .login` muestra un usuario que **no es el tuyo** | `gh` quedó con otra cuenta | `gh auth logout` y `gh auth login` con la tuya. **No continúes** hasta que coincida |
| `git push` rechazado o va a un repo ajeno | `origin` apunta a otro usuario (p. ej. al del kit) | `git remote -v`; corrige con `git remote set-url origin https://github.com/TU-USUARIO/portafolio-progv.git`. **Nunca** empujes desde la carpeta del kit |
| `Author identity unknown` al hacer commit | Falta tu identidad de Git | `git config --global user.name "Tu Nombre"` y `user.email` |
| Mensajes `LF will be replaced by CRLF` | Aviso normal de Windows | Ignóralo; no es un error |

## GitHub Pages

| Síntoma | Causa | Solución |
|---|---|---|
| Tu URL `TU-USUARIO.github.io/portafolio-progv/` **redirige a otro dominio / da 404** | Tienes un repo `TU-USUARIO.github.io` con **dominio personalizado** | [Guía 04 §4](04-publicar-en-github-pages.md): subdominio (A), organización (B) o usar Render (C). **No borres** tu dominio |
| 404 y no hay redirección | Pages **no activado** o el workflow aún no corrió | `gh api -X POST repos/U/R/pages -f build_type=workflow`; `gh run list`; espera 1 min |
| El workflow “Publicar portafolio en GitHub Pages” **falló** (`failure`) | Falta activar Pages, o error en `pages.yml` | `gh run view --log-failed`; activa Pages primero y relanza: `gh workflow run pages.yml` |
| La página abre pero **sin estilos / sin imágenes** | Rutas rotas o carpeta mal publicada | Verifica que `portafolio/web/` tiene `index.html`, `css/`, `js/`; el workflow copia esa carpeta |
| **HTTPS pendiente** (`https_certificate` vacío) con dominio propio | GitHub aún no emite el certificado (minutos a horas) | Espera; cuando exista: `gh api -X PUT repos/U/R/pages -F https_enforced=true`. Si pasan horas, revisa registros **CAA** en tu DNS |

## Render

| Síntoma | Causa | Solución |
|---|---|---|
| Render **pide tarjeta / plan de pago** | Elegiste una instancia de pago o Render cambió condiciones | Selecciona **Free ($0, 0.1 CPU, 512 MB)** en *Compute* **antes** de desplegar. Si exige tarjeta igual, **no la pongas por obligación**: usa la opción C de la [guía 04](04-publicar-en-github-pages.md) o consulta a tu profesor |
| La barra inferior dice **$7 / month** | Es el valor por defecto | Cambia a **Free** antes de pulsar *Deploy* |
| *“Name already in use”* / nombre ocupado | Los nombres son únicos globalmente | Usa `progv-TU-USUARIO` u otro sufijo |
| El **build es lento** (varios minutos) | Compila Maven + descarga Tomcat/MariaDB | Normal la primera vez (~8–10 min). Espera a **Live** |
| El **build falla** | Falta el `Dockerfile` en la raíz, repo privado o commit incompleto | Comprueba que el repo es **público** y tiene `Dockerfile`, `docker/init-db.sh` y `prog-v/`; revisa el log de Render |
| Cambié código y el servidor sigue igual | No hay auto-deploy | **Manual Deploy → Deploy latest commit** |
| `https://NOMBRE.onrender.com` tarda ~50 s | El servicio estaba **dormido** | Normal en el plan Free; ábrelo antes de presentar |

## La página (“En vivo”, capturas, CORS)

| Síntoma | Causa | Solución |
|---|---|---|
| Arriba dice **“demo grabada · conectando…”** y no pasa a “servidor en vivo” | (1) Servidor dormido o aún despertando · (2) `config.js` con URL mal escrita/vacía · (3) tu página **no está autorizada** (CORS) | (1) Espera ~1 min · (2) revisa `window.PORTAFOLIO_BACKEND = 'https://NOMBRE.onrender.com'` (sin `/` final) · (3) agrega tu URL/dominio a `perfil.js → origenes` o a la variable `PORTAFOLIO_ORIGINS` en Render y **redespliega** |
| En el celular nunca conecta | Igual que arriba, o estás en `http://` y el navegador bloquea algo | Prueba la URL con `https://`; verifica el origen en `origenes` |
| El **lab 4 tarda mucho** en iniciar | 0.1 CPU de Render: Spring Boot ~**90 s** | Normal. Deja la página abierta: espera sola y actualiza |
| El lab 5 abre “404” justo después de iniciar | Tomcat aún publicaba la aplicación | La página espera a que responda; si persiste, vuelve a pulsar **Iniciar** |
| Al iniciar un lab se **detiene otro** | 4, 5 y 8 comparten el puerto 8080 y hay 512 MB | Es normal: uno a la vez |
| Los datos creados **desaparecen** | Las bases se reinician cuando el servidor arranca | Es una demo; es esperado |
| Falla un lab con *Too many requests* (429) | Límite de peticiones por IP | Espera 1 minuto |
| La portada se ve **estática** (no sube el código, no parpadea) | Windows tiene **“Efectos de animación” desactivados** (reducir movimiento) | Es intencional (accesibilidad). **Sigue funcionando** lo que responde al mouse (mirada, lente, ondas al hacer clic). Para ver todo: *Configuración → Accesibilidad → Efectos visuales → Efectos de animación → Activado* |
| La ventana de código tapa el ojo / el fondo | Tamaño de pantalla pequeño | Revisa el diseño en el celular ([guía 07](07-diseno.md)) o pide al asistente reubicarlo |

## Capturas (`capturar.js`)

| Síntoma | Causa | Solución |
|---|---|---|
| *“No se encontró Chrome, Edge ni Brave”* | Ningún navegador Chromium en la ruta esperada | Instala Chrome, o indica la ruta: PowerShell `$env:NAVEGADOR="C:\Ruta\chrome.exe"` |
| `PORTAFOLIO_URL=… node …` da error en PowerShell | Esa sintaxis es de **Bash** | En PowerShell: `$env:PORTAFOLIO_URL="https://…"; node portafolio/scripts/capturar.js` |
| *“El servidor no respondió”* | Render dormido o URL mal | Abre la URL, espera a que cargue, reintenta |
| El script tarda muchísimo o se corta | 0.1 CPU de Render | Reintenta con el servicio despierto; es normal que tarde 10–20 min |

## Claude y la extensión

| Síntoma | Causa | Solución |
|---|---|---|
| `claude` “no se reconoce” | PATH sin actualizar | Cierra y abre la terminal; `claude doctor`; ver <https://code.claude.com/docs/en/troubleshoot-install.md> |
| *“Browser extension is not connected”* | Extensión sin instalar, o **otra cuenta/organización** | Misma cuenta y organización en la extensión y en Claude Code (`/status`); `/chrome` → **Reconnect extension**; reinicia navegador y Claude |
| *“No browsers are connected”* | Navegador cerrado | Abre Chrome con la extensión iniciada |
| `/chrome` dice “Not detected” | Extensión deshabilitada | `chrome://extensions` → habilítala |
| No detecta la extensión la **primera vez** | El navegador aún no leyó la configuración nueva | **Reinicia el navegador** |
| En **Brave/Opera** no conecta | Soporte no oficial | Usa **Chrome** o Edge para este proyecto ([guía 02](02-claude-y-extension-navegador.md)) |
| Claude Code “ignora” Chrome con clave de API | La integración requiere login con `/login`, no API key | Inicia sesión con tu cuenta de claude.ai |
| Dentro de **WSL** no funciona el navegador | No es compatible | Instala Claude Code nativo en Windows |

## Ejecutar los labs 100 % en tu PC (opcional)

No lo necesitas para el portafolio. Si quieres hacerlo:

| Síntoma | Causa | Solución |
|---|---|---|
| `Port 8080 was already in use` | Otro lab o programa usa el 8080 | Detén el otro (4, 5 y 8 comparten puerto; corre uno a la vez) |
| `release version 21 not supported` (lab 4) | Maven corre con JDK 17 | Usa **JDK 21** (`JAVA_HOME` apuntando a un JDK 21) |
| Error de conexión a la base (labs 4 y 5) | MySQL/MariaDB apagado | Enciéndelo (XAMPP → *Start* en MySQL; Apache no hace falta). Más detalle en el `README.md` de cada `prog-v/laboratorioN/` |
| Línea de comandos rota en `init-db.sh` (`$'\r': command not found`) | Finales de línea **CRLF** de Windows | Ya lo previene `.gitattributes` (`*.sh text eol=lf`) y el `Dockerfile` los limpia. Si lo editaste a mano, guarda con finales **LF** |
| Docker local no arranca | Docker Desktop apagado | Inicia Docker Desktop y espera a que el motor esté listo; luego `docker build -t progv . && docker run -p 7860:7860 progv` |

## Si nada de esto resuelve tu caso

1. Copia el **mensaje de error exacto** y dile al asistente en qué paso estabas.
2. Revisa tu `HISTORIAL.md`: ¿qué fue lo último que funcionaba?
3. Verifica en las páginas oficiales (Claude, GitHub, Render): las interfaces cambian.

✅ **Listo cuando…** puedes resolver (o ubicar rápidamente) los errores más comunes sin quedarte trabado.

➡️ **Volver al** [README del kit](../README.md)
