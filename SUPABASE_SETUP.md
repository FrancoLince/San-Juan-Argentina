# Configuración de Supabase

La app sigue siendo HTML, CSS y JavaScript separados. Supabase guarda los sitios, las cuentas y los clics. La clave `anon`/publishable se usa en el navegador junto con RLS; **no** pegues la clave `service_role` en ningún archivo público.

## Puesta en marcha

1. Creá un proyecto Supabase y ejecutá `supabase-schema.sql` desde el SQL Editor.
2. Copiá la URL del proyecto y su clave publishable (o `anon`) en `supabase-config.js`.
3. En Authentication, invitá por correo a tu cuenta administradora. El registro público no está habilitado en la interfaz; cada usuario nuevo obtiene el rol `owner`. Una vez que tu cuenta sea admin y despliegues la función de invitación, podrás invitar a los demás socios desde el panel web.
4. Promové tu cuenta a administradora desde el SQL Editor, reemplazando el correo:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'tu-correo@ejemplo.com';
   ```

5. Desplegá el proyecto en uno o ambos hosts:
   - **Render:** conectá el repositorio GitHub en Render como **Blueprint**; `render.yaml` configura el sitio estático y publica la raíz del proyecto.
   - **Vercel:** importá el mismo repositorio GitHub en Vercel. Es un sitio HTML/CSS/JS estático; no necesita comando de build ni directorio de salida personalizado.
6. En Supabase → Authentication → URL Configuration, configurá `https://san-juan-argentina.onrender.com` como **Site URL** si Render será el dominio principal. En **Redirect URLs**, agregá `https://san-juan-argentina.onrender.com/**`. Si después publicás en Vercel, agregá también `https://TU-PROYECTO.vercel.app/**`; para desarrollo local, `http://localhost:8000/**`.
7. Invitá o reenviá las invitaciones después de guardar esas URLs. Un enlace anterior que expiró no se recupera: hay que generar uno nuevo. Abrí el enlace nuevo desde el dominio configurado; el panel permitirá definir la contraseña. La cuenta admin puede crear, editar y retirar sitios, y asignar cada ficha a un dueño. Los dueños ven únicamente las métricas de las fichas asignadas.

## Invitar socios desde la web

Después de la configuración inicial, las cuentas de los socios se pueden invitar desde **Panel de gestión → Invitar a un socio**. Solo una cuenta con rol `admin` puede hacerlo. La invitación crea una cuenta con rol `owner`, que luego aparece en la lista de asignación de fichas cuando acepte el correo.

La invitación la envía una Supabase Edge Function; la clave `service_role` queda guardada como secreto en Supabase y nunca se publica en el sitio.

1. Instalá o usá la Supabase CLI y vinculá este proyecto:

   ```sh
   npx supabase login
   npx supabase link --project-ref eqzovcctuhdjhfxsiqza
   ```

2. En Supabase → Project Settings → API, copiá la clave `service_role` (o `service_role` secret key). En Supabase → Edge Functions → Secrets, guardala con el nombre `SUPABASE_SERVICE_ROLE_KEY`. No la pongas en `supabase-config.js`, en ningún archivo del sitio ni en un repositorio:

   También se puede cargar con la CLI usando `npx supabase secrets set`, pero el panel evita dejar la clave en el historial de comandos.

3. Desde la raíz del proyecto, desplegá la función:

   ```sh
   npx supabase functions deploy invite-owner
   ```

4. Confirmá que la URL de tu sitio esté agregada en Supabase → Authentication → URL Configuration → Redirect URLs. La función usa el Site URL de Supabase para el enlace de invitación.

Render y Vercel necesitan acceder al proyecto desde un repositorio GitHub. Como este workspace aún no está conectado a un repositorio, primero subí los archivos del proyecto a uno y después importá ese repositorio en cada plataforma.

Los sitios existentes en el prototipo permanecen como datos de muestra mientras Supabase no esté configurado. La base conectada comienza vacía; cargá las fichas desde el panel admin.

## Qué mide

Se cuenta cada clic que abre Instagram o el sitio web de una ficha (total histórico). No son personas únicas ni visualizaciones de página: una misma persona puede generar varios clics. El sistema no guarda IP ni identidad de visitantes. La función RPC de registro comprueba que la ficha tenga ese enlace y RLS impide que una cuenta consulte los clics de otra.

Como el registro de clics es público para poder funcionar sin iniciar sesión, las cifras son orientativas y pueden incluir automatizaciones; no equivalen a visitas verificadas ni a usuarios únicos.
