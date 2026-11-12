# 01 · Programas y cuentas

Lista exacta de lo que necesitas. **Es poco**: no hace falta Java, Docker ni XAMPP ([por qué](00-vision-general.md#por-qué-no-necesitas-instalar-java-docker-ni-xampp)).

## Resumen

| # | Qué | Para qué | Costo |
|---|---|---|---|
| 1 | **Git** | Subir tu código a GitHub | Gratis |
| 2 | **Node.js (LTS)** | Ejecutar los scripts del kit y del portafolio | Gratis |
| 3 | **GitHub CLI (`gh`)** | Iniciar sesión en GitHub y crear tu repo desde la terminal | Gratis |
| 4 | **Navegador Chromium** (Chrome recomendado; Edge, Brave u Opera) | Abrir tu portafolio, la extensión de Claude y generar capturas | Gratis |
| 5 | **Claude Code** | El asistente que hace el trabajo | Requiere plan de pago de Claude (ver abajo) |
| 6 | Cuenta de **Claude** con plan que incluya Claude Code | Iniciar sesión en Claude Code y en la extensión | De pago |
| 7 | Cuenta de **GitHub** | Tu repositorio y tu página pública | Gratis |
| 8 | Cuenta de **Render** | El servidor en vivo de los laboratorios | Gratis (plan Free) |

> 💡 En **Windows** puedes instalar casi todo con `winget` (viene con Windows 10/11). Abre **PowerShell** (menú Inicio → escribe “PowerShell”). Después de instalar algo, **cierra y vuelve a abrir** la terminal para que reconozca el comando.

---

## 1. Git

- Descarga: <https://git-scm.com/downloads>
- Con winget: `winget install --id Git.Git -e`
- Verifica: `git --version` → debe imprimir algo como `git version 2.x.x`.
- Configura tu identidad (una sola vez; usa **tu** nombre y el correo de **tu** GitHub):
  ```powershell
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu-correo@ejemplo.com"
  ```

## 2. Node.js (versión LTS)

- Descarga la **LTS**: <https://nodejs.org/>
- Con winget: `winget install OpenJS.NodeJS.LTS`
- Verifica: `node -v` (v18 o superior) y `npm -v`.

## 3. GitHub CLI (`gh`)

- Descarga: <https://cli.github.com/>
- Con winget: `winget install --id GitHub.cli`
- Verifica: `gh --version`
- Inicio de sesión (paso a paso en la [guía 03](03-github-cuenta-y-repositorio.md)): `gh auth login`

## 4. Un navegador Chromium

| Navegador | Descarga | ¿Funciona con la extensión de Claude? |
|---|---|---|
| **Google Chrome** | <https://www.google.com/chrome/> | ✅ Soporte oficial |
| **Microsoft Edge** | <https://www.microsoft.com/edge> (ya viene con Windows) | ✅ Soporte oficial para Claude Code |
| **Brave** | <https://brave.com/download/> | ⚠️ No oficial (ver [guía 02](02-claude-y-extension-navegador.md)) |
| **Opera** | <https://www.opera.com/download> | ⚠️ No oficial (ver [guía 02](02-claude-y-extension-navegador.md)) |

> ✅ **Recomendación práctica:** aunque uses Brave u Opera a diario, **instala Chrome** y úsalo para este proyecto. Es lo que menos problemas da.

## 5 y 6. Claude Code y tu cuenta de Claude

**Requisito importante:** Claude Code necesita una cuenta de Claude con **plan de pago** (Pro, Max, Ultra, Team o Enterprise) o una cuenta de Console (API). El plan **gratuito de claude.ai no incluye Claude Code**. La extensión de Chrome también requiere un plan de pago. Revisa los planes vigentes en <https://claude.com/pricing>.

Instalación (según la documentación oficial, <https://code.claude.com/docs/en/setup>):

| Sistema | Comando |
|---|---|
| **Windows — PowerShell** (el prompt muestra `PS C:\…`) | `irm https://claude.ai/install.ps1 \| iex` |
| **Windows — CMD** (el prompt muestra `C:\…` sin `PS`) | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` |
| **Windows — winget** | `winget install Anthropic.ClaudeCode` |
| **macOS / Linux / WSL** | `curl -fsSL https://claude.ai/install.sh \| bash` |

- No necesitas ejecutar como administrador. El instalador **no muestra progreso** mientras descarga: espera a que termine.
- **Cierra y abre** una terminal nueva y verifica: `claude --version` (debe imprimir un número de versión). Diagnóstico completo: `claude doctor`.
- Con el instalador nativo, Claude Code se actualiza solo; con winget, actualiza a mano con `winget upgrade Anthropic.ClaudeCode`.
- Requisitos del sistema: Windows 10 (1809+), macOS 13+, 4 GB de RAM o más.
- **Iniciar sesión:** ejecuta `claude` y sigue las instrucciones en el navegador (también puedes usar `/login` dentro de Claude Code).

Detalles de uso y de la extensión: [guía 02](02-claude-y-extension-navegador.md).

## 7. Cuenta de GitHub

- Regístrate en <https://github.com/signup> (usuario, correo y contraseña; **verifica tu correo**).
- Elige un nombre de usuario que puedas mostrar con orgullo: será parte de tu URL pública (`TU-USUARIO.github.io`).
- Activa la **autenticación en dos pasos** (Settings → Password and authentication). Es muy recomendable.

## 8. Cuenta de Render

- Entra a <https://render.com> → **Get Started** → **Sign in with GitHub** (así quedan enlazadas tus cuentas y no creas otra contraseña).
- En el caso de Dereck, el plan **Free** **no pidió tarjeta** (12/11/2026). **Si a ti te pide tarjeta, detente**: no estás obligado a ponerla; consulta [guía 05](05-laboratorios-en-vivo-render.md) y [guía 08](08-problemas-comunes.md).

---

## macOS y Linux (notas breves)

- **macOS:** instala con [Homebrew](https://brew.sh): `brew install git node gh` y `brew install --cask claude-code` (o el `curl` de la tabla). Chrome: <https://www.google.com/chrome/>.
- **Linux:** usa el gestor de tu distro (`apt`, `dnf`…) para `git`, `nodejs` y `gh` (para `gh` ver <https://github.com/cli/cli/blob/trunk/docs/install_linux.md>) y el `curl` de la tabla para Claude Code.
- En ambos, para variables de entorno se usa Bash: `PORTAFOLIO_URL=https://… node …` (en PowerShell cambia; ver [guía 05](05-laboratorios-en-vivo-render.md)).
- La integración de Claude Code con el navegador **no** funciona dentro de WSL; en Windows instala Claude Code de forma nativa.

## Comprobación rápida (copia y pega en PowerShell)

```powershell
git --version; node -v; npm -v; gh --version; claude --version
```

Si alguno dice “no se reconoce el comando”, cierra y abre la terminal; si persiste, repite su instalación. (El asistente también puede revisarlo con `node herramientas/verificar-entorno.js`.)

✅ **Listo cuando…** los cinco comandos anteriores imprimen una versión, tienes cuenta de GitHub y de Render, y `claude` abre y ya iniciaste sesión.

➡️ **Siguiente:** [02 · Claude y la extensión del navegador](02-claude-y-extension-navegador.md)
