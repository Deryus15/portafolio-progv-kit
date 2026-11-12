# Kit del portafolio de Programación V

> **Para:** compañeros de **Programación V** · Universidad Autónoma de Chiriquí (UNACHI) · Prof. Alexis Flores
> **Creado por Dereck Martinez ([@Deryus15](https://github.com/Deryus15))**

Con este kit armas **tu propio portafolio web** con los **8 laboratorios** de la materia, publicado en internet y con los laboratorios **ejecutables en vivo** (desde la computadora o el celular), **sin pasar por los problemas que ya resolvimos** al construir el primero. Un asistente (Claude) te guía y hace el trabajo pesado; tú respondes preguntas y apruebas los pasos.

---

## ¿Qué vas a obtener?

| Resultado | Dónde queda |
|---|---|
| Un repositorio **tuyo** y público (`portafolio-progv`) con el portafolio y todo el material de los 8 laboratorios | `github.com/TU-USUARIO/portafolio-progv` |
| Tu portafolio publicado en internet, con **tu diseño** (no igual al de los demás) | `https://TU-USUARIO.github.io/portafolio-progv/` (u otra URL, según tu caso) |
| Los laboratorios **corriendo en vivo** (Java, Tomcat, base de datos) en un servidor gratuito | `https://progv-TU-USUARIO.onrender.com` |
| `README.md` e `HISTORIAL.md` actualizados en tu repositorio | dentro de tu repo |

## Inicio rápido en 3 pasos

1. **Instala lo mínimo** → [guía 01](guia/01-programas-y-cuentas.md): Git, Node.js, GitHub CLI, un navegador (Chrome recomendado) y **Claude Code** (necesitas un plan de pago de Claude; ver la guía). Cuentas: GitHub y Render (gratis).
2. **Abre esta carpeta con Claude Code** y pega el prompt de [`PROMPT.md`](PROMPT.md):
   ```powershell
   cd RUTA\DE\ESTA\CARPETA
   claude --chrome
   ```
3. **Responde las preguntas** (nombre, cédula, usuario de GitHub, diseño que quieres…). Claude crea tu repositorio, publica tu portafolio y despliega los laboratorios, y te va diciendo qué hacer en cada punto (iniciar sesión, aprobar permisos, etc.).

> ⏱️ Tiempo total aproximado: **1 a 2 horas** (la mayor parte es esperar construcciones). Detalle en [guia/00](guia/00-vision-general.md).

## Mapa de carpetas del kit

```
portafolio-progv-kit/
├─ README.md                 ← estás aquí
├─ PROMPT.md                 ← el prompt que pegas en Claude Code
├─ CLAUDE.md                 ← instrucciones permanentes del asistente (flujo, verificaciones, preguntas)
├─ guia/                     ← la guía definitiva (9 documentos, abajo)
├─ plantillas/               ← README e HISTORIAL que se instalan en TU repositorio
├─ herramientas/             ← scripts: crear tu proyecto, verificar tu entorno
├─ plantilla-portafolio/     ← el código del portafolio (web, servidor, Docker, GitHub Pages)
└─ material/                 ← los 8 laboratorios: enunciados (PDF), código, SQL y README por lab
```

> ⚠️ **Este kit NO es tu portafolio.** Tu portafolio se crea en una carpeta y un repositorio **nuevos y tuyos**. Nunca hagas `git push` desde la carpeta del kit.

## Índice de la guía

| # | Documento | Para qué |
|---|---|---|
| 00 | [Visión general](guia/00-vision-general.md) | El flujo completo y qué corre dónde |
| 01 | [Programas y cuentas](guia/01-programas-y-cuentas.md) | Qué instalar y dónde registrarte |
| 02 | [Claude y la extensión del navegador](guia/02-claude-y-extension-navegador.md) | Instalar Claude Code y conectarlo al navegador |
| 03 | [GitHub: cuenta y repositorio](guia/03-github-cuenta-y-repositorio.md) | Verificar que es TU cuenta y crear tu repo |
| 04 | [Publicar en GitHub Pages](guia/04-publicar-en-github-pages.md) | Tu URL pública (y qué hacer si ya tienes un dominio en tu GitHub) |
| 05 | [Laboratorios en vivo (Render)](guia/05-laboratorios-en-vivo-render.md) | El servidor gratuito que ejecuta los labs |
| 06 | [README e historial](guia/06-readme-e-historial.md) | Mantener tu repo documentado |
| 07 | [Diseño](guia/07-diseno.md) | Cómo pedir tu propio estilo |
| 08 | [Problemas comunes](guia/08-problemas-comunes.md) | Síntoma → causa → solución |

## Uso responsable (léelo, es corto)

- Los **enunciados y el código base** de los laboratorios vienen de **Moodle / del profesor**; las soluciones de referencia de este kit sirven para **aprender y armar tu portafolio**.
- Tu portafolio es para **presentarlo**: el profesor puede pedirte **explicar o ejecutar cualquier laboratorio**. Lee el código de cada uno y pruébalo; así lo defiendes sin problema.

## Sobre tu cédula (dato personal)

Tu repositorio y tu portafolio son **públicos**: cualquiera en internet puede ver lo que pongas. Claude te preguntará tu cédula y tú eliges cómo mostrarla:

| Opción | Ejemplo | Recomendación |
|---|---|---|
| **Completa** | `8-123-4567` | Solo si el profesor la exige tal cual |
| **Parcial** | `8-123-****` | Equilibrio razonable |
| **Oculta** | *(no se muestra)* | La más segura; es el valor por defecto sugerido |

Puedes cambiarla después editando `portafolio/web/js/perfil.js`.

---

*Material y guía mantenidos por Dereck Martinez ([@Deryus15](https://github.com/Deryus15)). Estado de la guía: 12/11/2026. Si una página oficial (Claude, Render, GitHub) cambió desde entonces, verifica en ella.*
