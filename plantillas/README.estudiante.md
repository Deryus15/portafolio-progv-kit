# Portafolio de {{MATERIA}} — {{NOMBRE}}

**Estudiante:** {{NOMBRE}} · **Profesor:** {{PROFESOR}} · **{{UNIVERSIDAD}}** · {{ANIO}}

Portafolio web que reúne los **8 laboratorios** de {{MATERIA}}: descripción, **código fuente**, **demostración en vivo** (los laboratorios se ejecutan de verdad) y los **documentos** originales de cada enunciado.

## Ver el portafolio

| | |
|---|---|
| 🌐 **Portafolio publicado** | {{URL_PAGES}} |
| ⚙️ **Servidor en vivo** (ejecuta los laboratorios) | {{URL_RENDER}} |

> ⏱️ El servidor en vivo corre en un plan gratuito: si estuvo sin visitas, **tarda ~50 segundos en despertar**. Mientras tanto la página muestra las ejecuciones grabadas y se conecta sola. Funciona desde computadora y celular.

## Los 8 laboratorios

| Lab | Tema | ¿Se ejecuta? |
|---|---|---|
| 1 | Preparación del entorno de desarrollo (JDK, Maven, MVC base) | ✅ Consola |
| 2 | Patrones Maestro-Esclavo y Pipe-Filter + taller de POO | ✅ Consola |
| 3 | Patrones de comunicación (bus de eventos, Kafka) | 📄 Documento |
| 4 | Proyecto MVC con Spring Boot, Thymeleaf y MariaDB | ✅ Servidor (web) |
| 5 | Gestión de inventario con JSP en 3 capas (Tomcat 10) | ✅ Servidor (web) |
| 6 | Especificación de requisitos (SRS) | 📄 Documento |
| 7 | Escenario cliente-servidor: ReservaFE (puerto 3000) | ✅ Servidor (API) |
| 8 | ReservasLabAPI: API REST con autenticación (puerto 8080) | ✅ Servidor (API) |

Los laboratorios 4, 5 y 8 comparten el puerto 8080: se ejecuta **uno a la vez**.

## Estructura del repositorio

```
.
├─ portafolio/
│  ├─ web/                 página (HTML/CSS/JS): index.html, css/, js/ (perfil.js, config.js, main.js, ojo.js…)
│  ├─ server.js            servidor que ejecuta los labs en vivo (Node, sin dependencias)
│  └─ scripts/             capturar.js (ejecuciones reales) y build-codigo.js (visor de código)
├─ prog-v/                 código, SQL y enunciados de los 8 laboratorios (laboratorio1 … laboratorio8)
├─ Dockerfile              contenedor: Node + JDK 21 + Tomcat 10.1 + MariaDB (se despliega en Render)
├─ docker/init-db.sh       carga las bases de datos al construir la imagen
├─ .github/workflows/      pages.yml: publica la página en GitHub Pages
├─ README.md               este archivo
└─ HISTORIAL.md            diario de lo hecho y pendientes
```

## Ejecutarlo en tu computadora (opcional)

**Opción A — Windows con JDK y XAMPP** (requiere JDK 17 y 21, XAMPP/MySQL y Tomcat 10):

```powershell
node portafolio/server.js        # abre http://localhost:5173
```

Desde la página puedes iniciar/detener cada servidor y ejecutar los labs 1 y 2. El `README.md` de cada `prog-v/laboratorioN/` explica sus requisitos.

**Opción B — Docker** (todo en un contenedor, igual que en producción):

```powershell
docker build -t progv .
docker run --rm -p 7860:7860 progv       # http://localhost:7860
```

**Solo ver la página** (sin ejecutar labs): abre `portafolio/web/index.html`.

## Mantenimiento

| Tarea | Comando |
|---|---|
| Regenerar el visor de código tras cambiar un lab | `node portafolio/scripts/build-codigo.js` |
| Regenerar las **capturas** de ejecuciones reales (con el servidor despierto) | PowerShell: `$env:PORTAFOLIO_URL="{{URL_RENDER}}"; node portafolio/scripts/capturar.js` · Bash: `PORTAFOLIO_URL={{URL_RENDER}} node portafolio/scripts/capturar.js` |
| Publicar cambios visuales | `git add -A && git commit -m "…" && git push` (GitHub Pages se actualiza solo) |
| Redesplegar el servidor tras cambiar `server.js`/`Dockerfile` | Render → *Manual Deploy* → *Deploy latest commit* |

Mis datos (nombre, usuario, URLs) están en `portafolio/web/js/perfil.js`; la URL del servidor en vivo, en `portafolio/web/js/config.js`.

## Créditos

- Portafolio de **{{NOMBRE}}** (@{{USUARIO}}) — repositorio: `{{REPO}}`.
- Enunciados y código base: material de {{MATERIA}} entregado por el profesor {{PROFESOR}} ({{UNIVERSIDAD}}).
- **Basado en el kit de Dereck Martinez, [@Deryus15](https://github.com/Deryus15).**

*Última actualización: {{FECHA}}.*
