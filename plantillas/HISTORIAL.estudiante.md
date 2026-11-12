# Historial — Portafolio de {{MATERIA}} · {{NOMBRE}}

> Diario de lo hecho, decisiones y pendientes. **Una entrada por día de trabajo**, con fecha dd/MM/yyyy. Se actualiza después de cada cambio importante (ver la guía de README e historial del kit).
> Repositorio: `{{REPO}}` · Usuario: @{{USUARIO}} · Página: {{URL_PAGES}} · Servidor en vivo: {{URL_RENDER}}

## {{FECHA}} — Creado el portafolio a partir del kit

- Creado el portafolio de **{{MATERIA}}** de **{{NOMBRE}}** ({{UNIVERSIDAD}}, prof. {{PROFESOR}}, {{ANIO}}) a partir del kit de Dereck Martinez (@Deryus15).
- Verificada la cuenta de GitHub: el usuario del CLI, el del navegador y el que indiqué coinciden (**@{{USUARIO}}**).
- Creado el repositorio público `{{REPO}}` con la plantilla del portafolio y el material de los 8 laboratorios (`prog-v/`).
- Datos personales cargados en `portafolio/web/js/perfil.js`.
- **Pendiente:** activar GitHub Pages, desplegar en Render, conectar `config.js`, generar capturas, aplicar mi diseño, revisar en el celular.

## Lista de verificación de pendientes

Marca con `x` cuando esté hecho y anota la fecha en la entrada correspondiente.

- [ ] Repositorio público creado y `origin` apunta a **mi** usuario (`git remote -v`)
- [ ] GitHub Pages **activado** y el workflow en `success` (`gh run list`)
- [ ] {{URL_PAGES}} abre con HTTP 200
- [ ] Servicio de Render creado con plan **Free ($0)** y en estado **Live**
- [ ] `portafolio/web/js/config.js` apunta a {{URL_RENDER}} y está subido
- [ ] `perfil.js → origenes` incluye mi URL pública (y mi dominio, si uso uno)
- [ ] La página publicada muestra **“servidor en vivo”** y puedo ejecutar el lab 1 y el lab 8
- [ ] **Capturas generadas** (`capturar.js`) y subidas (`capturas.js` + `img/capturas/`)
- [ ] HTTPS activo (si uso dominio propio: `https_enforced=true`)
- [ ] Mi **diseño propio** aplicado y revisado (contraste, “reducir movimiento”)
- [ ] Revisado en un **celular real**
- [ ] `README.md` con mis URLs correctas y `HISTORIAL.md` al día
- [ ] Abrí el servidor ~5 minutos antes de la presentación (el plan gratis duerme a los 15 min)

## Plantilla para nuevas entradas

```markdown
## dd/MM/yyyy — Título corto de lo que se hizo
- Qué se hizo (hechos verificables: “Pages devolvió 200”, “el lab 4 tardó 90 s”).
- Decisiones tomadas y por qué.
- Problemas encontrados y cómo se resolvieron.
- **Pendiente:** lo que sigue.
```
