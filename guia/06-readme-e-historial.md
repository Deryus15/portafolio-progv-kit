# 06 · README e historial en tu repositorio

Tu portafolio es un **proyecto con historia**: quién lo hizo, cómo se ejecuta y qué se hizo en cada momento. Dos archivos lo cuentan, y **deben estar siempre al día** en **tu** repositorio:

| Archivo | Para quién | Contiene |
|---|---|---|
| `README.md` | Quien visita tu repo (profe, compañeros, reclutadores) | Qué es, URL pública, cómo ejecutarlo, estructura, tabla de labs, créditos |
| `HISTORIAL.md` | Tú (y el asistente en sesiones futuras) | Diario de lo hecho, decisiones, pendientes |

El asistente los crea desde las plantillas de [`plantillas/`](../plantillas/) al armar tu proyecto, y **los actualiza por ti** después de cada cambio importante. **Tú debes revisarlos**: son tu evidencia de trabajo y cualquier error en ellos es tu error.

## Qué debe tener el README

- Título con tu nombre, materia, profesor y universidad.
- **URL pública** de tu portafolio y **URL del servidor en vivo**.
- Cómo verlo, cómo correrlo en local (opcional) y cómo regenerar capturas y el visor de código.
- Estructura de carpetas y tabla de los 8 laboratorios.
- Créditos: “Basado en el kit de Dereck Martinez, @Deryus15”.
- **Sin** contraseñas ni datos privados. (La cédula, solo si decidiste mostrarla.)

## Qué debe tener el historial

Una **entrada por día de trabajo** (o por hito), con fecha **dd/MM/yyyy**, qué se hizo, qué decisión se tomó y **qué quedó pendiente**:

```markdown
## 12/11/2026 — Publicado el portafolio y desplegados los laboratorios
- Creado el repositorio `portafolio-progv` desde el kit (commit `a1b2c3d`).
- Activado GitHub Pages: https://TU-USUARIO.github.io/portafolio-progv/ (workflow OK).
- Render: servicio `progv-TU-USUARIO` (plan Free, 0.1 CPU/512 MB). Primer despliegue OK en ~9 min.
- `config.js` apunta al servidor; la página muestra “servidor en vivo”.
- Decisión: la cédula se muestra parcial (`8-123-****`).
- **Pendiente:** generar capturas (`capturar.js`), aplicar mi diseño, revisar en el celular.
```

Buenas prácticas:

- Escribe **hechos verificables** (“Pages devolvió 200”, “el lab 4 tardó 90 s en arrancar”), no deseos.
- Anota **problemas y cómo se resolvieron**: te ahorra horas la próxima vez.
- Mantén una **lista de pendientes** al final de la última entrada.

## La rutina (después de cada cambio importante)

1. **Prueba** que lo que cambiaste funciona (abre la página, ejecuta el lab).
2. **Actualiza `HISTORIAL.md`** (entrada nueva o ampliar la de hoy) y, si cambió algo visible, el `README.md`.
3. **Commit con mensaje claro** y push:
   ```powershell
   git add -A
   git commit -m "Diseño propio: portada estilo terminal retro"
   git push
   ```
4. Si cambió el servidor (Dockerfile, `server.js`, `perfil.js` con `origenes`): **Manual Deploy** en Render ([guía 05](05-laboratorios-en-vivo-render.md)).

Mensajes de commit buenos: “Conecta el servidor en vivo (config.js)”, “Agrega capturas del 12/11/2026”. Malos: “cambios”, “asdf”.

## Para sesiones futuras con Claude

Tu repo incluye un `CLAUDE.md` que explica el proyecto al asistente. Al volver a trabajar, abre Claude Code **en la carpeta de tu portafolio** y dile: *“Lee CLAUDE.md y HISTORIAL.md y continúa donde me quedé”*. Con un historial bien llevado, retoma sin que expliques nada.

✅ **Listo cuando…** `README.md` y `HISTORIAL.md` están en la raíz de **tu** repo en GitHub, el README muestra tus URLs correctas y el historial tiene la entrada de hoy con pendientes.

➡️ **Siguiente:** [07 · Diseño](07-diseno.md)
