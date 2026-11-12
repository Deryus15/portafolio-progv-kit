# 04 · Publicar en GitHub Pages

GitHub Pages publica **la parte visual** de tu portafolio (HTML, CSS, JavaScript, capturas y PDFs) en una URL pública y gratuita:

```
https://TU-USUARIO.github.io/portafolio-progv/
```

> La parte **en vivo** (ejecutar los labs) la pone Render ([guía 05](05-laboratorios-en-vivo-render.md)). Pages sola ya muestra tu portafolio con ejecuciones **grabadas**.

## 1. Cómo funciona (ya viene hecho)

La plantilla incluye el workflow `.github/workflows/pages.yml`. Cada vez que haces **push a `main`** y cambian archivos de `portafolio/web/**`, de los enunciados o del workflow, GitHub Actions:

1. copia `portafolio/web/` a un sitio temporal,
2. copia los PDF/PNG/MD de los enunciados a `repo/` (para que se vean dentro de la página),
3. **publica** el resultado.

## 2. Activarlo (una sola vez)

```powershell
gh api -X POST repos/TU-USUARIO/portafolio-progv/pages -f build_type=workflow
```

Si responde que ya existe, está bien. Luego lanza o espera el workflow:

```powershell
gh run list --limit 3                 # estado de las últimas ejecuciones
gh run watch                          # (opcional) seguirlo en vivo
```

Debe terminar en `completed  success` (tarda 30–60 s). Si falla, mira [guía 08](08-problemas-comunes.md).

## 3. Verificar la URL

```powershell
gh api repos/TU-USUARIO/portafolio-progv/pages --jq .html_url
curl -sI https://TU-USUARIO.github.io/portafolio-progv/
```

La página debe abrir con **HTTP 200**. Si responde **404** o te **redirige a otro dominio**, lee la sección siguiente.

---

## 4. ⚠️ “Ya tengo un dominio en mi GitHub y no quiero borrarlo”

### El problema real (lo vivimos al construir el primero)

Si tu cuenta tiene un repositorio llamado **`TU-USUARIO.github.io`** (tu “sitio de usuario”) con un **dominio personalizado** (archivo `CNAME`), GitHub **redirige TODAS las páginas de tus proyectos a ese dominio**:

```
https://TU-USUARIO.github.io/portafolio-progv/
        └──► http://TU-DOMINIO.com/portafolio-progv/   ← 404 si ese dominio no apunta a GitHub
```

En el caso de Dereck, el dominio apuntaba a su propio servidor (no a GitHub) y era una **app real y necesaria**: no se podía borrar. El portafolio quedó **publicado pero inaccesible**.

### Cómo detectarlo

```powershell
# ¿Tienes un sitio de usuario con dominio personalizado?
gh api repos/TU-USUARIO/TU-USUARIO.github.io/pages --jq .cname
```

- Imprime un dominio (p. ej. `midominio.com`) → **tienes el problema**.
- Error 404 / vacío → no lo tienes, sigue con tu URL normal.
- Alternativa sin `gh`: `curl -sI https://TU-USUARIO.github.io/portafolio-progv/` → si ves `301/302` con `Location:` hacia otro dominio, lo tienes.

> 🚫 **No borres** el `CNAME` ni toques ese repositorio si tu dominio sirve una app. Elige una alternativa:

### Alternativas

| | Idea | Esfuerzo | Costo | URL resultante |
|---|---|---|---|---|
| **A** | **Subdominio nuevo** de tu dominio (`progv.midominio.com`) con un registro CNAME hacia `TU-USUARIO.github.io` | Medio (DNS) | Gratis (si ya tienes el dominio) | `https://progv.midominio.com/` |
| **B** | **Organización gratuita de GitHub** y alojar el repo ahí | Bajo | Gratis | `https://TU-ORG.github.io/portafolio-progv/` |
| **C** | **No usar Pages**: usar la URL de **Render** como portafolio | Muy bajo | Gratis | `https://progv-TU-USUARIO.onrender.com/` |
| **D** | *(Opcional)* **Netlify** o **Cloudflare Pages** para la parte estática | Medio | Gratis | `https://algo.netlify.app/` |

### A) Subdominio propio (no afecta tu app principal)

Un registro `CNAME` para un **nombre nuevo** (`progv`) es independiente del registro de tu dominio principal y de `www`: **tu app no cambia**. La única condición: **el nombre no debe existir ya** en tu DNS.

1. **Elige el nombre** (corto): `progv`, `portafolio`, `labs`…
2. **Comprueba que no exista.** En el panel de tu hosting/registrador, en la zona DNS de tu dominio, busca/filtra por ese nombre. En cPanel: *Zone Editor → Administrar* → filtro por nombre → debe decir “No se encontraron registros”.
3. **Crea el registro CNAME:**

   | Campo | Valor |
   |---|---|
   | Tipo | `CNAME` |
   | Nombre | `progv.midominio.com.` (o solo `progv`, según el panel) |
   | Valor / Destino (*Registrar*) | `TU-USUARIO.github.io.` |
   | TTL | el que sugiera el panel (p. ej. 200–3600) |

   - **cPanel (Zone Editor):** *Zone Editor → Administrar* (junto a tu dominio) → menú **Añadir Registro** → **Añadir registro CNAME** → rellena nombre y destino → **Save Record**. En el menú de tipo verifica que diga **CNAME**.
   - **Otros registradores** (Namecheap, GoDaddy, Cloudflare, Hostinger…): busca “DNS”, “Zona DNS” o “DNS records” → “Add record” → tipo **CNAME**. Los nombres de los botones cambian; si dudas, pregúntale al asistente (con la extensión puede guiarte en pantalla). *Si usas Cloudflare, deja el registro en modo “solo DNS” (nube gris) para que GitHub pueda emitir el certificado.*
4. **Dile a GitHub que ese dominio es de ESTE repo** (solo del portafolio, no del sitio de usuario):
   ```powershell
   gh api -X PUT repos/TU-USUARIO/portafolio-progv/pages -f cname=progv.midominio.com -f build_type=workflow
   ```
5. **Verifica el DNS** (puede tardar minutos): `nslookup -type=CNAME progv.midominio.com` → debe mostrar `TU-USUARIO.github.io`.
6. **Autoriza el nuevo origen** para el servidor en vivo: en `portafolio/web/js/perfil.js`, en `origenes`, agrega `'https://progv.midominio.com'` (y `'http://progv.midominio.com'` mientras no haya HTTPS). Súbelo y haz **Manual Deploy** en Render (o define `PORTAFOLIO_ORIGINS` en Render; ver [guía 05](05-laboratorios-en-vivo-render.md)).
7. **Comprueba que tu app principal sigue igual** (misma IP y respuesta 200).

### B) Organización gratuita de GitHub

1. En GitHub: **+** (arriba a la derecha) → **New organization** → plan **Free**.
2. Crea el repositorio `portafolio-progv` **dentro de la organización** (o transfiérelo: *Settings → Transfer ownership*).
3. Activa Pages igual que arriba, con `repos/TU-ORG/portafolio-progv/pages`.
4. URL: `https://TU-ORG.github.io/portafolio-progv/`. Actualiza `repo` y `github` en `perfil.js` y los `origenes` (`https://TU-ORG.github.io`).

### C) Usar solo Render

El contenedor **ya sirve la web completa** (además de ejecutar los labs): abre `https://progv-TU-USUARIO.onrender.com/`. Pros: cero DNS y cero Pages. Contras: la URL es menos “bonita” y, si el servicio está dormido, tarda ~50 s en cargar la primera vez. En este caso **no necesitas** `config.js` ni CORS (todo es el mismo origen).

### D) Netlify / Cloudflare Pages (opcional)

Sirven la parte estática con su propia URL gratuita: conecta tu repo público y como carpeta a publicar indica `portafolio/web` (los PDF de `repo/` no se copian solos; la opción C o A/B es más simple). Verifica en sus sitios oficiales los pasos vigentes.

---

## 5. HTTPS

Con dominio propio (opción A), GitHub emite el certificado cuando detecta el DNS: tarda **de minutos a horas**. Mientras tanto la página funciona por `http://`. Cuando esté listo:

```powershell
gh api repos/TU-USUARIO/portafolio-progv/pages --jq '[.cname,(.https_certificate.state//"sin-cert"),(.https_enforced|tostring)]|join(" ")'
gh api -X PUT repos/TU-USUARIO/portafolio-progv/pages -F https_enforced=true
```

(Con `*.github.io` normal, HTTPS ya viene activo.) Si pasan varias horas sin certificado, revisa que no haya registros `CAA` en tu DNS que bloqueen a Let's Encrypt y la [guía 08](08-problemas-comunes.md).

✅ **Listo cuando…** tu URL pública abre con tu portafolio (HTTP 200) y el workflow dice `success`. Si usaste la opción A, `nslookup` resuelve y tu app principal sigue intacta.

➡️ **Siguiente:** [05 · Laboratorios en vivo (Render)](05-laboratorios-en-vivo-render.md)
