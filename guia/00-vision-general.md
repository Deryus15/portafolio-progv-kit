# 00 · Visión general

Antes de tocar nada, entiende **qué se va a construir y dónde vive cada pieza**. Esto evita el 80 % de las confusiones.

## El resultado final

Una página web (tu portafolio) con una sección por laboratorio: descripción, **código fuente**, **demostración en vivo** y **documentos** del enunciado. Quien la abra —el profesor desde su computadora, tú desde el celular— puede **ejecutar los laboratorios** sin instalar nada.

## Flujo completo, de principio a fin

```
 TÚ                         CLAUDE (asistente)                    INTERNET
 ───                        ──────────────────                    ────────
 1. Instalas lo mínimo ───► 2. Verifica tu entorno
                            3. Te hace preguntas (nombre, cédula,
                               usuario GitHub, diseño…)
                            4. Verifica que TU cuenta de GitHub es
                               la correcta
                            5. Crea tu proyecto nuevo (portafolio +
                               material de los 8 labs) en tu PC
                            6. Crea tu repositorio PÚBLICO ──────► GitHub (código)
                            7. Activa GitHub Pages ──────────────► https://TU-USUARIO.github.io/…
 8. Inicias sesión en Render ► 9. Crea el servicio gratuito ─────► Render (servidor en vivo)
                           10. Conecta la web con el servidor
                           11. Genera capturas de las ejecuciones
                               reales y las sube
                           12. Aplica TU diseño
                           13. Escribe README + HISTORIAL
 14. Revisas y abres tu portafolio en el celular
```

## Tiempos aproximados

| Etapa | Tiempo |
|---|---|
| Instalar programas y crear cuentas | 20–40 min |
| Preguntas + crear proyecto + repositorio | 10–15 min |
| Publicar en GitHub Pages | 5 min (+ espera de HTTPS: minutos a horas, no bloquea) |
| Crear el servicio en Render y primer despliegue | 15–25 min (casi todo es esperar la construcción) |
| Generar capturas contra tu servidor | 10–20 min |
| Diseño propio | lo que tú quieras |

## ¿Qué corre dónde?

| Pieza | Dónde corre | Qué hace |
|---|---|---|
| **GitHub** (repositorio) | Servidores de GitHub | Guarda tu código y el material |
| **GitHub Pages** | Servidores de GitHub | Publica la web estática (la parte visual) |
| **Render** (servicio web gratuito) | Un contenedor Linux con **Java 21, Tomcat 10, MariaDB y Node** | Ejecuta de verdad los laboratorios 1, 2, 4, 5, 7 y 8 |
| **Tu computadora** | Local | Solo edición, Git y Claude; **no** ejecuta los labs |
| **El navegador del profe / tu celular** | Su dispositivo | Solo abre la web y pulsa “Ejecutar” |

Los laboratorios 3 y 6 son documentos (no se ejecutan); se muestran con su PDF.

## ¿Por qué NO necesitas instalar Java, Docker ni XAMPP?

Porque **el contenedor que ejecuta los laboratorios corre en Render**, no en tu máquina. Ese contenedor (definido en el `Dockerfile` de la plantilla) ya trae:

- **Java 21** (compila y ejecuta los labs 1, 2, 7, 8 y el Spring Boot del lab 4),
- **Tomcat 10.1** (lab 5, JSP),
- **MariaDB** con las bases `inventario_db` y `mvc_unachi` ya cargadas,
- **Node** (el servidor del portafolio que conecta todo).

Incluso las **capturas** de las ejecuciones reales se generan contra *tu* servidor de Render, no contra uno local. Solo necesitas Java/XAMPP/Docker si **quieres** correr todo en tu PC (opcional; está explicado en el README de tu repo y en cada laboratorio).

## Lo que debes saber desde ya (limitaciones reales del plan gratis)

- El servidor de Render **duerme tras 15 minutos** sin visitas y tarda **~50 segundos** en despertar. **Ábrelo unos minutos antes** de una presentación.
- Mientras duerme, la página muestra las **ejecuciones grabadas** y se conecta sola cuando el servidor despierta.
- Las bases de datos se **reinician** cada vez que el servidor arranca (es una demo).

## Qué decisiones tomarás tú

1. Tu **diseño** ([guía 07](07-diseno.md)).
2. Cómo mostrar tu **cédula** (completa, parcial u oculta).
3. Tu **URL pública**: GitHub Pages normal, o una alternativa si ya tienes un dominio en tu GitHub ([guía 04](04-publicar-en-github-pages.md)).

✅ **Listo cuando…** puedes explicar con tus palabras qué hace GitHub, qué hace Render y por qué tu computadora no ejecuta los laboratorios.

➡️ **Siguiente:** [01 · Programas y cuentas](01-programas-y-cuentas.md)
