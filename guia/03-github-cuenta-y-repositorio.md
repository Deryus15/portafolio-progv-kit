# 03 · GitHub: tu cuenta y tu repositorio

Aquí haces dos cosas: **(1)** iniciar sesión y **comprobar que es realmente tu cuenta**, y **(2)** crear **tu** repositorio público. Esta guía existe para evitar el error más peligroso: **subir tu trabajo (o el de otro) al repositorio equivocado**.

## 1. Crear la cuenta (si aún no tienes)

1. <https://github.com/signup> → correo, contraseña, nombre de usuario → verifica tu correo.
2. Activa la verificación en dos pasos: *Settings → Password and authentication*.
3. Apunta tu **nombre de usuario exacto** (se ve en la URL de tu perfil: `github.com/ESTE-NOMBRE`).

## 2. Iniciar sesión con GitHub CLI

En PowerShell:

```powershell
gh auth login
```

Responde así:

| Pregunta | Respuesta |
|---|---|
| *Where do you use GitHub?* | **GitHub.com** |
| *Preferred protocol for Git operations?* | **HTTPS** |
| *Authenticate Git with your GitHub credentials?* | **Yes** |
| *How would you like to authenticate?* | **Login with a web browser** |

`gh` muestra un **código de un solo uso** (por ejemplo `ABCD-1234`). Pulsa Enter, se abre el navegador, **inicia sesión en TU cuenta**, escribe el código y autoriza. **Eres tú quien hace esto**; Claude no escribe contraseñas.

Comprueba:

```powershell
gh auth status
gh api user --jq .login
```

El segundo comando imprime **tu nombre de usuario**.

## 3. ✅ Verificar que es REALMENTE tu cuenta (3 comprobaciones)

Las tres deben dar **el mismo usuario**:

| # | Comprobación | Cómo |
|---|---|---|
| 1 | **Lo que tú dices** | El usuario que le dijiste al asistente (`TU-USUARIO`) |
| 2 | **Lo que ve el CLI** | `gh api user --jq .login` |
| 3 | **Lo que ve el navegador** | Con la sesión de tu navegador abre <https://github.com/settings/profile>: el usuario aparece arriba (“Public profile” / “Your personal account”). Si usas la extensión, Claude puede abrir esa página y leerla. |

Si **no coinciden**, **detente**:

- ¿El navegador está en otra cuenta? Cierra sesión y entra con la tuya.
- ¿`gh` quedó con otra cuenta? `gh auth logout` y repite `gh auth login`.
- ¿Escribiste mal tu usuario? Corrígelo con el asistente.

Extras de seguridad:

- Comprueba también que el **correo** de `git config --global user.email` es **el tuyo**.
- **Nunca** uses la sesión, el token ni la contraseña de otra persona, ni el `gh auth` de la computadora de un amigo sin cerrar su sesión.
- **Nunca** hagas `git push` desde la carpeta del **kit** ni hacia repositorios que no sean tuyos. Tu trabajo va en **tu** carpeta nueva y en **tu** repositorio.

## 4. Crear tu repositorio (público)

> Normalmente lo hace el asistente cuando crea tu proyecto. Esto es lo que ocurre por debajo, para que lo entiendas y puedas hacerlo a mano.

Nombre sugerido: **`portafolio-progv`** (puedes cambiarlo; sin espacios ni tildes).

```powershell
cd RUTA\DE\TU\PORTAFOLIO          # la carpeta nueva, NO la del kit
git init -b main
git add -A
git commit -m "Portafolio de Programación V: primera versión"
gh repo create portafolio-progv --public --source . --remote origin --push
```

### ¿Por qué debe ser **público**?

- **GitHub Pages gratis** solo publica repositorios públicos (en cuentas gratuitas).
- En **Render**, la opción **Public Git Repository** (que no requiere enlazar permisos de tu cuenta) solo funciona con repositorios públicos.
- Por eso **no subas contraseñas ni datos privados**. (El portafolio ya está preparado para no incluirlos; tu cédula la decides tú.)

## 5. Comprobar que el `origin` es tuyo

```powershell
git remote -v
```

Debe mostrar `https://github.com/TU-USUARIO/portafolio-progv.git`. **Si aparece otro usuario** (por ejemplo el del autor del kit, `Deryus15`), **no hagas push**: corrígelo:

```powershell
git remote set-url origin https://github.com/TU-USUARIO/portafolio-progv.git
```

Y confirma en el navegador: `https://github.com/TU-USUARIO/portafolio-progv` debe abrir **tu** repo, con **tu** nombre arriba.

✅ **Listo cuando…** las 3 comprobaciones coinciden, `git remote -v` apunta a tu usuario y tu repositorio aparece **Public** en `https://github.com/TU-USUARIO/portafolio-progv`.

➡️ **Siguiente:** [04 · Publicar en GitHub Pages](04-publicar-en-github-pages.md)
