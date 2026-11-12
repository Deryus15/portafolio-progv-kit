# 02 · Claude Code y la extensión del navegador

La extensión **Claude in Chrome** permite que Claude abra páginas, haga clic y lea lo que ves **en tu navegador** (por ejemplo, para crear el servicio en Render o comprobar tu portafolio). **Es muy recomendable, pero no imprescindible**: sin ella, Claude te da los pasos y tú los haces a mano.

> Información verificada en la documentación oficial el 12/11/2026: [Claude Code + Chrome](https://code.claude.com/docs/en/chrome) y [Primeros pasos con Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome). Los menús y textos de las tiendas de extensiones pueden cambiar: si algo no coincide, guíate por la página oficial.

## Requisitos

- Claude Code instalado y con sesión iniciada con **`/login`** (cuenta de claude.ai con plan de pago). *Con una clave de API o un token de `claude setup-token`, la integración con Chrome queda desactivada.*
- La extensión **Claude in Chrome** versión **1.0.36 o superior**.
- Windows, macOS o Linux **nativos** (no funciona dentro de WSL).

## ¿Qué navegador uso? (la verdad sobre Brave y Opera)

| Navegador | Estado |
|---|---|
| **Google Chrome** | ✅ Oficial |
| **Microsoft Edge** | ✅ Oficial para la integración con Claude Code |
| **Brave, Opera, Arc, Vivaldi** | ⚠️ **No oficial.** La documentación de *Claude Code* dice que detecta la extensión y configura la conexión también en estos navegadores, **pero** el artículo de ayuda de la extensión dice que *no* están soportados. Puede funcionar o fallar. |

**Recomendación:** instala **Google Chrome** (o usa Edge) **solo para este proyecto**, aunque tu navegador diario sea Brave u Opera. Si insistes en Brave u Opera, abajo está cómo intentarlo.

## Paso a paso (Chrome o Edge)

1. **Instala la extensión** desde la Chrome Web Store (Edge también la usa):
   <https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn>
   → botón **Añadir a Chrome** (*Add to Chrome*) → confirma.
2. **Inicia sesión en la extensión** con **la misma cuenta de Claude** que usas en Claude Code. (Si perteneces a más de una organización de claude.ai, debe ser **la misma organización**; verifícala en Claude Code con `/status`.)
3. **Fija la extensión** (opcional pero cómodo): icono de rompecabezas 🧩 → chincheta 📌 junto a “Claude”.
4. **Conecta Claude Code con el navegador.** En la terminal, dentro de la carpeta del kit:
   ```powershell
   claude --chrome
   ```
   La primera vez aparece un cuadro explicando la integración y los permisos: pulsa **Enter** para continuar.
5. **Comprueba la conexión:** dentro de Claude Code escribe `/chrome`. Debe decir **Status: Enabled** y **Extension: Installed**.
6. *(Opcional)* En ese mismo menú `/chrome` elige **Enabled by default** para no tener que escribir `--chrome` cada vez.
7. **Prueba:** pídele *“Abre https://github.com y dime qué usuario aparece conectado”*. Claude abrirá una pestaña nueva y te contará.

> 🔁 Si es la **primera vez** y no detecta la extensión, **reinicia el navegador**: Claude Code instala un archivo de configuración (*native messaging*) que el navegador lee al arrancar.

## Brave y Opera (intento no oficial)

- **Brave** soporta las extensiones de la Chrome Web Store: abre el enlace de arriba en Brave y pulsa **Añadir a Brave**.
- **Opera** no usa directamente la tienda de Chrome: normalmente se instala primero el complemento **“Install Chrome Extensions”** desde la tienda de Opera (<https://addons.opera.com/>) y luego se añade la extensión desde la Chrome Web Store. *No pudimos verificar estos pasos en la documentación oficial; si te complican, usa Chrome.*
- Después sigue los pasos 2–7 de arriba. Si `/chrome` dice que no detecta la extensión, **no pierdas tiempo**: instala Chrome.

## Permisos: qué le estás concediendo

- Claude **abre pestañas nuevas** (las agrupa en un grupo de pestañas) y **comparte el estado de inicio de sesión** de tu navegador: puede usar las páginas donde ya estás conectado.
- Puede hacer clic, escribir, leer la página y capturar pantalla. Los **permisos por sitio** se piden con un cuadro “Claude in Chrome wants to…”; puedes aprobar acción por acción o permitir el sitio para la sesión.
- Cuando aparece un inicio de sesión o un **CAPTCHA**, Claude **se detiene y te pide que lo hagas tú**.
- **Nunca** escribe contraseñas, claves ni tokens por ti. Las sesiones (GitHub, Render) las inicias **tú**.
- Aviso oficial: la extensión “sigue siendo riesgosa”: revisa lo que aprueba y usa una sesión de navegador donde solo estés conectado a lo necesario para este proyecto.

## Si Claude no “ve” el navegador

| Intento | Qué hacer |
|---|---|
| 1 | Verifica que la extensión está **instalada y habilitada** en `chrome://extensions` |
| 2 | Asegúrate de que el navegador está **abierto** |
| 3 | En Claude Code: `/chrome` → **Reconnect extension** (reconectar extensión) |
| 4 | Comprueba que la extensión y Claude Code usan la **misma cuenta y organización** |
| 5 | Actualiza Claude Code (`claude update`) y comprueba `claude --version` |
| 6 | Cierra y abre **Claude Code y el navegador** |
| 7 | Si hay una ventana emergente (alert/confirm) bloqueando una página, ciérrala a mano |
| 8 | Si se cae tras mucho rato inactivo: `/chrome` → **Reconnect extension** |

Errores frecuentes: *“Browser extension is not connected”* (cuenta u organización distinta, o extensión no instalada) y *“No browsers are connected”* (navegador cerrado). Más en la [guía 08](08-problemas-comunes.md).

## Lo que Claude **no** hará por ti (y es a propósito)

Crear cuentas, escribir contraseñas o tokens, completar CAPTCHAs, aceptar permisos OAuth ni pagar planes. Esos pasos los haces tú; Claude te dice cuándo.

✅ **Listo cuando…** `/chrome` muestra *Enabled* e *Installed* y Claude logra abrir una pestaña y decirte qué cuenta de GitHub aparece. (Si no usas la extensión, avisa al asistente: seguirá dándote los pasos manuales.)

➡️ **Siguiente:** [03 · GitHub: cuenta y repositorio](03-github-cuenta-y-repositorio.md)
