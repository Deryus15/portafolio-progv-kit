# 05 · Laboratorios en vivo con Render

Render es el hosting gratuito que **ejecuta de verdad** tus laboratorios (Java, Tomcat, MariaDB) para que el profe pueda pulsar “Ejecutar” desde cualquier dispositivo. Aquí está el paso a paso **tal como se hizo con el primer portafolio** (interfaz de Render el 12/11/2026; si algo cambió, guíate por los nombres de los botones).

## 0. Antes de empezar

- Tu repositorio debe ser **público** y estar subido a GitHub ([guía 03](03-github-cuenta-y-repositorio.md)). Debe contener el `Dockerfile` en la raíz (la plantilla ya lo trae).
- Tienes cuenta de Render ([guía 01](01-programas-y-cuentas.md)).

## 1. Crear el servicio (Web Service)

1. Entra a <https://dashboard.render.com/> (inicia sesión con GitHub si te lo pide; **ese paso lo haces tú**).
2. **New** (arriba) → **Web Services** (o *New Web Service*).
3. En **Source Code** elige la pestaña **Public Git Repository** (no necesitas conectar tu cuenta de GitHub).
4. Pega la URL de **tu** repo: `https://github.com/TU-USUARIO/portafolio-progv` → **Connect**.
5. Render dice *“It looks like you’re using Docker, so we’ve autofilled some fields”*. ✅ Es lo esperado: usará tu `Dockerfile`.
6. **Name:** debe ser **único en todo Render**. Usa `progv-TU-USUARIO` (si está ocupado, agrega algo: `progv-TU-USUARIO-2`). Tu URL será `https://NOMBRE.onrender.com`.
7. **Region:** la que te sugiera (p. ej. Oregon) está bien.

## 2. ⚠️ Elegir el plan **Free** — ANTES de desplegar

> **El valor por defecto es de pago** (en la barra inferior verás **$7 / month · 0.5 CPU · 512 MB**). Si despliegas así, **te cobrarán**.

1. Baja hasta la sección **Compute** (*Instance Type*).
2. Selecciona **Free — $0 / month · 0.1 CPU · 512 MB RAM**. Aparece el aviso *“Free instances spin down after periods of inactivity…”*.
3. Comprueba que la barra inferior ahora diga **$0 / month**.
4. Deja las variables de entorno vacías (no hacen falta).
5. Pulsa **Deploy web service**.

> Si Render te **pide una tarjeta** en este punto, **no la pongas por obligación**: avisa al asistente (tienes opciones en [guía 04 · C](04-publicar-en-github-pages.md) y [guía 08](08-problemas-comunes.md)). En el primer portafolio, el plan Free no pidió tarjeta.

## 3. Esperar el primer despliegue

- Verás los registros de construcción. Construir la imagen (Maven + Tomcat + MariaDB) tarda **varios minutos** la primera vez.
- Termina con el estado **Live** y el mensaje **“Your service is live”**. Cierra los cuadros de bienvenida si te estorban.
- Copia tu URL: `https://NOMBRE.onrender.com`.
- Prueba rápida: abre `https://NOMBRE.onrender.com/api/estado` → debe mostrar JSON con `"ok":true`. Y `https://NOMBRE.onrender.com/` → tu portafolio completo.

## 4. Conectar tu página publicada con el servidor

Edita **`portafolio/web/js/config.js`**:

```js
window.PORTAFOLIO_BACKEND = 'https://NOMBRE.onrender.com';
```

Si usas **dominio propio** (guía 04, opción A) o una organización (opción B), agrega ese origen a **`portafolio/web/js/perfil.js`**:

```js
origenes: ['https://TU-USUARIO.github.io', 'https://progv.midominio.com']
```

Luego sube los cambios (`git add -A && git commit -m "Conecta el servidor en vivo" && git push`). Pages se actualiza solo. **Para que Render conozca los nuevos `origenes`** debes redesplegar (siguiente sección) **o** usar la variable opcional de abajo.

## 5. Redesplegar cuando cambies código (Manual Deploy)

Render **no** se actualiza solo con cada push (el auto-deploy no existe para repos públicos sin “Blueprints”). Cuando cambies `server.js`, `Dockerfile`, `perfil.js`… :

1. Dashboard → tu servicio → botón **Manual Deploy** → **Deploy latest commit**.
2. Espera **Live** otra vez.

*(Los cambios solo visuales —`style.css`, `main.js`, textos— se publican con Pages y no necesitan redeploy de Render, salvo que cambies algo que use el servidor.)*

## 6. Variable opcional `PORTAFOLIO_ORIGINS` (autorizar dominios sin redeploy de código)

El servidor solo acepta peticiones de las páginas listadas en `perfil.js → origenes`. Para autorizar otra sin tocar el código:

1. Tu servicio → **Environment** → **Add Environment Variable**.
2. Key: `PORTAFOLIO_ORIGINS` · Value: `https://TU-USUARIO.github.io,https://progv.midominio.com` (separados por coma).
3. Guarda (Render reinicia el servicio).

## 7. Limitaciones reales del plan Free (léelas antes de presentar)

| Limitación | Consecuencia | Qué hacer |
|---|---|---|
| **Duerme a los 15 min** sin visitas | Despierta en **~50 s** | **Abre tu portafolio 5 minutos antes** de presentar |
| **0.1 CPU** | Labs pesados arrancan lento: el **lab 4 (Spring Boot) tarda ~90 s** | La página **espera sola** y se actualiza; no la recargues |
| **512 MB de RAM** | Solo **un laboratorio web a la vez** (4, 5 y 8 comparten el puerto 8080) | Es normal: al iniciar uno, se detiene el otro |
| **Bases de datos efímeras** | Se **reinician** cada vez que el servidor arranca | Es una demo; no esperes que los datos persistan |
| Apagado por inactividad propio | Los labs se apagan solos a los **10 min** sin uso (ahorra memoria) | Pulsa “Iniciar” de nuevo |

Mientras el servidor duerme o no responde, la página muestra *“demo grabada · conectando…”* con las ejecuciones grabadas, y **se conecta sola** cuando despierta.

## 8. Generar las capturas contra tu propio servidor

Las capturas son **ejecuciones reales** (salidas de consola, respuestas de las APIs y pantallazos de los labs 4 y 5) que la página publicada muestra cuando el servidor está dormido. Se generan contra **tu servicio de Render**, **sin instalar Java ni XAMPP**:

**Despierta el servicio** (abre su URL y espera a que cargue), y en la carpeta de tu portafolio:

```powershell
# PowerShell (Windows)
$env:PORTAFOLIO_URL="https://NOMBRE.onrender.com"; node portafolio/scripts/capturar.js
```

```bash
# macOS / Linux / Git Bash
PORTAFOLIO_URL=https://NOMBRE.onrender.com node portafolio/scripts/capturar.js
```

- Tarda unos **5 a 10 minutos** (en la prueba tardó ≈5; arranca cada lab con 0.1 CPU y espera a cada uno). Verás una línea por lab y petición.
- Necesita un navegador **Chrome, Edge o Brave** instalado para los pantallazos (`NAVEGADOR=` si está en otra ruta; ver [guía 08](08-problemas-comunes.md)).
- Genera `portafolio/web/js/capturas.js` y `portafolio/web/img/capturas/*.png`. Súbelos:
  ```powershell
  git add -A; git commit -m "Capturas de ejecuciones reales"; git push
  ```
- Solo hace peticiones de lectura a las apps con base de datos (no modifica datos).

## 9. Alternativas a Render (y por qué no las usamos)

Estado a **12/11/2026**; si cambió, verifica en cada sitio:

| Servicio | Resultado |
|---|---|
| **Hugging Face Spaces** | ❌ Docker y Gradio son **de pago** (plan PRO); solo Static es gratis |
| **Koyeb** | ❌ Ahora **pide tarjeta** |
| **Fly.io** | ❌ **Ya no tiene plan gratuito** para cuentas nuevas |
| **Render (Free)** | ✅ 512 MB, duerme a los 15 min, en nuestro caso sin tarjeta. **Condiciones sujetas a cambio: verifícalas al registrarte** |

✅ **Listo cuando…** `https://NOMBRE.onrender.com/api/estado` responde `"ok":true`, tu portafolio publicado muestra **“servidor en vivo”** arriba a la derecha, y puedes ejecutar el lab 1 y el lab 8 desde tu URL pública (también desde el celular).

➡️ **Siguiente:** [06 · README e historial](06-readme-e-historial.md)
