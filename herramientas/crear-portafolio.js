#!/usr/bin/env node
/**
 * Crea el portafolio de UN estudiante a partir del kit.
 *
 *   node herramientas/crear-portafolio.js --destino ../portafolio-progv --nombre "Nombre Apellido" \
 *        --usuario su-usuario-github [--repo portafolio-progv] [--cedula "8-123-4567"] [--dominio https://progv.midominio.com] [--sin-git]
 *
 * Qué hace:
 *   1. Copia  plantilla-portafolio/  (web, servidor, Dockerfile, workflow) y  material/  (laboratorios 1-8) a la carpeta destino.
 *   2. Escribe  portafolio/web/js/perfil.js  con los datos del estudiante (lo único personal del portafolio).
 *   3. Genera README.md, HISTORIAL.md y CLAUDE.md del nuevo repositorio a partir de  plantillas/ .
 *   4. (opcional) git init + primer commit. NO configura ningún "remote": eso se hace después, con la cuenta VERIFICADA del estudiante.
 *
 * Salvaguardas: la carpeta destino debe estar FUERA del kit y vacía/inexistente; el kit no se modifica;
 * no acepta el usuario del autor del kit (Deryus15) salvo que se use --autor, para evitar subir cosas a un repo ajeno.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const KIT = path.resolve(__dirname, '..');

/* ---------- argumentos ---------- */
function leerArgs(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (!t.startsWith('--')) { a._.push(t); continue; }
    const k = t.slice(2), eq = k.indexOf('=');
    if (eq >= 0) { a[k.slice(0, eq)] = k.slice(eq + 1); continue; }
    const sig = argv[i + 1];
    if (sig === undefined || sig.startsWith('--')) a[k] = true; else { a[k] = sig; i++; }
  }
  return a;
}
const A = leerArgs(process.argv.slice(2));
const fail = m => { console.error('\n✗ ' + m + '\n'); process.exit(1); };
const str = v => (typeof v === 'string' ? v.trim() : '');

if (A.ayuda || A.help) {
  console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^\/\*\*?|\n \* ?/g, '\n').trim());
  process.exit(0);
}

const nombre = str(A.nombre), usuario = str(A.usuario), repo = str(A.repo) || 'portafolio-progv';
const cedula = str(A.cedula), dominio = str(A.dominio).replace(/\/+$/, ''), anio = Number(A.anio) || 2026;
const materia = str(A.materia) || 'Programación V', profesor = str(A.profesor) || 'Alexis Flores';
const universidad = str(A.universidad) || 'Universidad Autónoma de Chiriquí (UNACHI)', siglas = str(A.siglas) || 'UNACHI';
const destino = path.resolve(str(A.destino) || '');

if (!str(A.destino)) fail('Falta --destino (carpeta nueva FUERA del kit, p. ej. ../portafolio-progv).');
if (nombre.length < 3 || !/\s/.test(nombre)) fail('Falta --nombre con nombre y apellido (entre comillas).');
if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(usuario)) fail('--usuario no parece un usuario válido de GitHub (letras, números y guiones).');
if (!/^[A-Za-z0-9._-]{1,100}$/.test(repo)) fail('--repo no es un nombre válido de repositorio.');
if (dominio && !/^https?:\/\/[^\s/]+$/.test(dominio)) fail('--dominio debe ser un origen completo, p. ej. https://progv.midominio.com (sin ruta final).');
if (usuario.toLowerCase() === 'deryus15' && !A.autor) fail('Ese usuario es el del autor del kit. Si NO eres Deryus15, usa TU usuario de GitHub (si no, subirías cosas a un repo ajeno).');
const rel = path.relative(KIT, destino);
if (!rel.startsWith('..') && !path.isAbsolute(rel)) fail('La carpeta destino no puede estar dentro del kit. Usa una carpeta hermana, p. ej. ../portafolio-progv.');
if (fs.existsSync(destino) && fs.readdirSync(destino).length && !A.forzar) fail(`La carpeta destino ya existe y no está vacía: ${destino}\n  (usa otra, o --forzar si sabes lo que haces).`);
if (!fs.existsSync(path.join(KIT, 'plantilla-portafolio')) || !fs.existsSync(path.join(KIT, 'material'))) fail('No encuentro plantilla-portafolio/ o material/: ejecuta el script desde una copia completa del kit.');

/* ---------- utilidades ---------- */
function copiarDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copiarDir(s, d); else fs.copyFileSync(s, d);
  }
}
const hoy = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`; };
const urlPages = dominio || `https://${usuario}.github.io/${repo}/`;
const urlRender = `https://progv-${usuario.toLowerCase()}.onrender.com`;
const tokens = {
  NOMBRE: nombre, USUARIO: usuario, REPO: repo, URL_PAGES: urlPages, URL_RENDER: urlRender, FECHA: hoy(),
  MATERIA: materia, PROFESOR: profesor, UNIVERSIDAD: universidad, SIGLAS: siglas, ANIO: String(anio),
};
function rellenar(txt) { return txt.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in tokens ? tokens[k] : m)); }
function desdePlantilla(nombreArchivo, salida) {
  const p = path.join(KIT, 'plantillas', nombreArchivo);
  if (!fs.existsSync(p)) { console.warn(`  (aviso) falta plantillas/${nombreArchivo}; se omite ${salida}`); return false; }
  fs.writeFileSync(path.join(destino, salida), rellenar(fs.readFileSync(p, 'utf8')));
  return true;
}

/* ---------- 1) copiar plantilla y material ---------- */
console.log(`\nCreando el portafolio de ${nombre} (@${usuario}) en:\n  ${destino}\n`);
fs.mkdirSync(destino, { recursive: true });
copiarDir(path.join(KIT, 'plantilla-portafolio'), destino);
copiarDir(path.join(KIT, 'material'), path.join(destino, 'prog-v'));
console.log('  ✓ plantilla y material copiados (laboratorios en prog-v/)');

/* ---------- 2) perfil.js ---------- */
const origenes = [`https://${usuario.toLowerCase()}.github.io`];
if (dominio) { origenes.push(dominio); if (dominio.startsWith('https://')) origenes.push('http://' + dominio.slice(8)); }
const perfil = `/* ====================================================================
   PERFIL — lo único personal del portafolio. Edita SOLO este archivo
   (o pídele al asistente que lo cambie).
   ==================================================================== */
window.PERFIL = {
  nombre: ${JSON.stringify(nombre)},
  cedula: ${JSON.stringify(cedula)},                         // texto tal como se mostrará ('' = no se muestra). Ej.: '8-123-4567' o '8-123-****'
  materia: ${JSON.stringify(materia)},
  profesor: ${JSON.stringify(profesor)},
  universidad: ${JSON.stringify(universidad)},
  siglas: ${JSON.stringify(siglas)},
  anio: ${anio},
  github: ${JSON.stringify(usuario)},                 // tu usuario de GitHub
  repo: ${JSON.stringify(usuario + '/' + repo)},   // usuario/repositorio de ESTE portafolio
  carpetaMaterial: 'prog-v',          // carpeta del repo donde están los laboratorios
  // Orígenes (páginas) autorizados a usar el servidor en vivo. Agrega aquí tu dominio propio si usas uno.
  origenes: ${JSON.stringify(origenes)}
};
`;
fs.writeFileSync(path.join(destino, 'portafolio', 'web', 'js', 'perfil.js'), perfil);
const idx = path.join(destino, 'portafolio', 'web', 'index.html');
fs.writeFileSync(idx, fs.readFileSync(idx, 'utf8').replace(/<title>.*?<\/title>/, `<title>Portafolio · ${materia} · ${nombre.replace(/[<>&]/g, '')}</title>`));
console.log('  ✓ perfil.js escrito' + (cedula ? ' (la cédula SE MOSTRARÁ tal como la diste)' : ' (sin cédula visible)'));

/* ---------- 3) README, HISTORIAL y CLAUDE.md del nuevo repo ---------- */
const okR = desdePlantilla('README.estudiante.md', 'README.md');
const okH = desdePlantilla('HISTORIAL.estudiante.md', 'HISTORIAL.md');
const okC = desdePlantilla('CLAUDE.estudiante.md', 'CLAUDE.md');
console.log(`  ✓ README.md ${okR ? '' : '(omitido) '}· HISTORIAL.md ${okH ? '' : '(omitido) '}· CLAUDE.md ${okC ? '' : '(omitido)'}`);

/* ---------- 4) git (sin remote) ---------- */
let git = 'omitido (--sin-git)';
if (!A['sin-git']) {
  const g = (...args) => spawnSync('git', args, { cwd: destino, encoding: 'utf8' });
  if (g('--version').status !== 0) git = 'git no está instalado: instálalo y ejecuta "git init" a mano';
  else {
    g('init', '-q', '-b', 'main'); g('add', '-A');
    const c = g('commit', '-q', '-m', 'Portafolio inicial creado a partir del kit');
    git = c.status === 0 ? 'repositorio git creado con el primer commit (sin remote)'
      : 'git init hecho, pero falta configurar tu identidad: git config --global user.name "Tu Nombre" y user.email "tu@correo"; luego haz el primer commit';
  }
}
console.log(`  ✓ git: ${git}`);

console.log(`
Listo. Datos del portafolio:
  Carpeta ........ ${destino}
  Repo GitHub .... ${usuario}/${repo}   (se crea en el siguiente paso, con tu cuenta verificada)
  URL pública .... ${urlPages}
  Servidor vivo .. ${urlRender}   (nombre sugerido para Render: progv-${usuario.toLowerCase()})

Siguiente: crear el repositorio PÚBLICO en tu cuenta y subirlo:
  cd "${destino}"
  gh repo create ${usuario}/${repo} --public --source . --remote origin --push
`);
