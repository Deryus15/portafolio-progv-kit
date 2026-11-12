#!/usr/bin/env node
/**
 * Comprueba que el equipo tiene lo mínimo para crear y publicar el portafolio.
 *
 *   node herramientas/verificar-entorno.js                      # informe legible
 *   node herramientas/verificar-entorno.js --esperado usuario   # además exige que la sesión de GitHub sea de ESE usuario
 *   node herramientas/verificar-entorno.js --json               # salida para que la lea el asistente
 *
 * Obligatorio: Node.js 18+, Git, GitHub CLI (gh) con sesión iniciada, un navegador Chromium (Chrome, Edge o Brave).
 * Opcional (solo si quieres correr los labs en tu PC): JDK, Docker. Los labs se ejecutan en la nube, así que NO son necesarios.
 */
const fs = require('fs');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const flag = n => args.includes('--' + n);
const val = n => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : ''; };
const WIN = process.platform === 'win32';

function run(cmd, a = []) {
  try { const r = spawnSync(cmd, a, { encoding: 'utf8', shell: WIN, timeout: 20000, windowsHide: true }); return { ok: r.status === 0, out: ((r.stdout || '') + (r.stderr || '')).trim() }; }
  catch (e) { return { ok: false, out: String(e.message || e) }; }
}

const E = process.env;
const NAVEGADORES = WIN ? [
  `${E.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`, `${E['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`, `${E.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${E['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`, `${E.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${E.PROGRAMFILES}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`, `${E.LOCALAPPDATA}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
  `${E.PROGRAMFILES}\\Opera\\opera.exe`, `${E.LOCALAPPDATA}\\Programs\\Opera\\opera.exe`]
  : process.platform === 'darwin' ? ['/Applications/Google Chrome.app', '/Applications/Brave Browser.app', '/Applications/Microsoft Edge.app', '/Applications/Opera.app']
  : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/brave-browser', '/usr/bin/microsoft-edge', '/usr/bin/opera'];

const checks = [];
const add = (id, nombre, ok, detalle, arreglo, obligatorio = true) => checks.push({ id, nombre, ok: !!ok, detalle, arreglo, obligatorio });

/* Node */
const major = Number(process.versions.node.split('.')[0]);
add('node', 'Node.js 18 o superior', major >= 18, 'v' + process.versions.node, 'Instala la versión LTS desde https://nodejs.org (o: winget install OpenJS.NodeJS.LTS).');

/* Git */
const git = run('git', ['--version']);
add('git', 'Git', git.ok, git.ok ? git.out : 'no encontrado', 'Instala Git desde https://git-scm.com/downloads (o: winget install Git.Git) y abre una terminal NUEVA.');
if (git.ok) {
  const n = run('git', ['config', '--global', 'user.name']).out, m = run('git', ['config', '--global', 'user.email']).out;
  add('git-identidad', 'Git conoce tu nombre y correo', !!(n && m), n && m ? `${n} <${m}>` : 'sin configurar', 'Ejecuta: git config --global user.name "Tu Nombre"  y  git config --global user.email "tu@correo.com"');
}

/* GitHub CLI + sesión */
const gh = run('gh', ['--version']);
add('gh', 'GitHub CLI (gh)', gh.ok, gh.ok ? gh.out.split('\n')[0] : 'no encontrado', 'Instala desde https://cli.github.com (o: winget install GitHub.cli) y abre una terminal NUEVA.');
let login = '';
if (gh.ok) {
  const u = run('gh', ['api', 'user', '--jq', '.login']);
  login = u.ok ? u.out.split('\n')[0].trim() : '';
  add('gh-sesion', 'Sesión de GitHub iniciada', !!login, login ? 'sesión de @' + login : 'sin sesión', 'Ejecuta: gh auth login  (elige GitHub.com → HTTPS → "Login with a web browser") y sigue los pasos en el navegador.');
  const esperado = val('esperado');
  if (esperado) add('gh-usuario', `La sesión es la de @${esperado}`, login.toLowerCase() === esperado.toLowerCase(), login ? `la sesión es de @${login}` : 'sin sesión',
    'La cuenta con la que iniciaste sesión NO coincide con tu usuario. Cierra con "gh auth logout" e inicia sesión con TU cuenta. No sigas hasta que coincida.');
}

/* Navegador */
const nav = NAVEGADORES.find(p => p && fs.existsSync(p));
add('navegador', 'Navegador Chromium (Chrome, Edge, Brave u Opera)', !!nav, nav || 'no encontrado', 'Instala Google Chrome (https://www.google.com/chrome) o Brave (https://brave.com). Sirve para las capturas y para la extensión de Claude.');

/* Claude Code (informativo) */
const cl = run('claude', ['--version']);
add('claude', 'Claude Code (comando "claude")', cl.ok, cl.ok ? cl.out.split('\n')[0] : 'no detectado desde esta terminal', 'Si estás leyendo esto desde Claude Code, ignóralo. Si no, mira la guía guia/01-programas-y-cuentas.md.', false);

/* Opcionales */
const java = run('java', ['-version']); add('java', 'JDK (opcional: solo para correr labs en tu PC)', java.ok, java.ok ? java.out.split('\n')[0] : 'no instalado', 'No es necesario: los laboratorios se ejecutan en la nube (Render).', false);
const dk = run('docker', ['--version']); add('docker', 'Docker (opcional: solo para probar el contenedor en tu PC)', dk.ok, dk.ok ? dk.out : 'no instalado', 'No es necesario para publicar.', false);

const faltan = checks.filter(c => c.obligatorio && !c.ok);
if (flag('json')) {
  console.log(JSON.stringify({ ok: faltan.length === 0, usuarioGitHub: login || null, plataforma: process.platform, navegador: nav || null, checks }, null, 2));
} else {
  console.log('\nVerificación del entorno\n' + '─'.repeat(60));
  for (const c of checks) console.log(`${c.ok ? '✓' : c.obligatorio ? '✗' : '·'} ${c.nombre}\n    ${c.detalle}${c.ok ? '' : '\n    → ' + c.arreglo}`);
  console.log('─'.repeat(60));
  console.log(faltan.length ? `\nFaltan ${faltan.length} cosa(s) obligatoria(s). Arréglalas y vuelve a ejecutar este comando.\n` : '\n✓ Todo lo obligatorio está listo.\n');
}
process.exit(faltan.length ? 1 : 0);
