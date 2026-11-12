#!/usr/bin/env node
/**
 * SOLO PARA MANTENEDORES DEL KIT (no para estudiantes).
 * Regenera  plantilla-portafolio/  y  material/  a partir del repositorio fuente del portafolio original.
 *
 *   node herramientas/dev/sincronizar.js "C:\ruta\al\repo-fuente"
 *
 * Reglas: solo se copia lo versionado en git; no se copian las capturas del autor (cada estudiante genera las suyas);
 * perfil.js y config.js se dejan NEUTROS; la carpeta proyecto-pagaya* nunca entra.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const KIT = path.resolve(__dirname, '..', '..');
const SRC = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(path.join(SRC, '.git'))) { console.error('Uso: node herramientas/dev/sincronizar.js <ruta-del-repo-fuente>'); process.exit(1); }

const tracked = execFileSync('git', ['-C', SRC, 'ls-files', '-z'], { encoding: 'utf8', maxBuffer: 1 << 26 }).split('\0').filter(Boolean);

function copiar(rel, destRel) {
  const d = path.join(KIT, destRel);
  fs.mkdirSync(path.dirname(d), { recursive: true });
  fs.copyFileSync(path.join(SRC, rel), d);
}
function limpiar(dir) { fs.rmSync(path.join(KIT, dir), { recursive: true, force: true }); }

limpiar('material'); limpiar('plantilla-portafolio');
let nm = 0, np = 0;
for (const f of tracked) {
  if (f.startsWith('prog-v/')) {
    if (/^prog-v\/proyecto-pagaya/.test(f)) continue;
    copiar(f, 'material/' + f.slice('prog-v/'.length)); nm++;
  } else if (f.startsWith('portafolio/')) {
    if (f === 'portafolio/web/js/capturas.js' || f.startsWith('portafolio/web/img/capturas/')) continue;
    copiar(f, 'plantilla-portafolio/' + f); np++;
  } else if (['Dockerfile', '.dockerignore', '.gitattributes', '.gitignore', 'docker/init-db.sh', '.github/workflows/pages.yml'].includes(f)) {
    copiar(f, 'plantilla-portafolio/' + f); np++;
  }
}

/* perfil.js y config.js neutros */
const w = (rel, txt) => { const d = path.join(KIT, 'plantilla-portafolio', rel); fs.mkdirSync(path.dirname(d), { recursive: true }); fs.writeFileSync(d, txt); };
w('portafolio/web/js/perfil.js', `/* ====================================================================
   PERFIL — lo único personal del portafolio. Edita SOLO este archivo
   (o deja que el asistente lo rellene con tus respuestas).
   ==================================================================== */
window.PERFIL = {
  nombre: 'Nombre Apellido',
  cedula: '',                         // texto tal como se mostrará ('' = no se muestra). Ej.: '8-123-4567' o '8-123-****'
  materia: 'Programación V',
  profesor: 'Alexis Flores',
  universidad: 'Universidad Autónoma de Chiriquí (UNACHI)',
  siglas: 'UNACHI',
  anio: 2026,
  github: 'tu-usuario',               // tu usuario de GitHub
  repo: 'tu-usuario/portafolio-progv',   // usuario/repositorio de ESTE portafolio
  carpetaMaterial: 'prog-v',          // carpeta del repo donde están los laboratorios
  // Orígenes (páginas) autorizados a usar el servidor en vivo. Agrega aquí tu dominio propio si usas uno.
  origenes: ['https://tu-usuario.github.io']
};
`);
w('portafolio/web/js/config.js', `/* URL del servidor EN VIVO (tu servicio en Render, p. ej. 'https://progv-tu-usuario.onrender.com').
   Vacío = en la página publicada solo se muestran las ejecuciones grabadas.
   En local no se usa: la página habla con su propio server.js. */
window.PORTAFOLIO_BACKEND = '';
`);
w('portafolio/web/js/capturas.js', `/* Se genera con: node portafolio/scripts/capturar.js (ejecuciones reales de los laboratorios). */
window.CAPTURAS = null;
`);

/* Limpieza de datos del autor: .gitignore y configuración de VS Code de su equipo */
{
  for (const n of ['.gitignore', '.dockerignore']) {
    const gi = path.join(KIT, 'plantilla-portafolio', n);
    fs.writeFileSync(gi, fs.readFileSync(gi, 'utf8').split(/\r?\n/).filter(l => !/pagaya|Deryus15/i.test(l)).join('\n').replace(/\n{3,}/g, '\n\n'));
  }
  const st = path.join(KIT, 'material', '.vscode', 'settings.json');
  if (fs.existsSync(st)) fs.writeFileSync(st, fs.readFileSync(st, 'utf8').split(/\r?\n/).filter(l => !/java\.jdt\.ls\.java\.home|jdk\.jdkhome/.test(l)).join('\n'));
}
console.log(`Sincronizado: ${nm} archivos de material y ${np} de plantilla (más perfil.js y config.js neutros).`);
