import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function respond(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return respond({ error: "Método no permitido." }, 405);
  }

  const authorization = request.headers.get("Authorization");
  const accessToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!accessToken) {
    return respond({ error: "Se requiere iniciar sesión como administrador." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const secretKeysValue = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (!supabaseUrl || !secretKeysValue) {
    console.error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEYS en el entorno de la función.");
    return respond({ error: "La función no está configurada correctamente." }, 500);
  }

  let secretKeys: Record<string, string>;
  try {
    secretKeys = JSON.parse(secretKeysValue);
  } catch {
    console.error("SUPABASE_SECRET_KEYS no contiene un objeto JSON válido.");
    return respond({ error: "La función no está configurada correctamente." }, 500);
  }
  const secretKey = secretKeys.default;
  if (!secretKey) {
    console.error("No se encontró la clave secreta predeterminada de Supabase.");
    return respond({ error: "La función no está configurada correctamente." }, 500);
  }

  const adminClient = createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data: userData, error: userError } = await adminClient.auth.getUser(accessToken);
  if (userError || !userData.user) {
    return respond({ error: "La sesión no es válida. Volvé a iniciar sesión." }, 401);
  }

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (profileError) {
    console.error("No se pudo verificar el rol del usuario:", profileError.message);
    return respond({ error: "No se pudo verificar el permiso de administrador." }, 500);
  }
  if (profile?.role !== "admin") {
    return respond({ error: "Solo una cuenta administradora puede invitar socios." }, 403);
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return respond({ error: "El correo electrónico enviado no es válido." }, 400);
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return respond({ error: "Ingresá un correo electrónico válido." }, 400);
  }

  const { error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email.trim());
  if (inviteError) {
    console.error("No se pudo invitar al socio:", inviteError.message);
    return respond({ error: inviteError.message }, 400);
  }

  return respond({ message: "Invitación enviada." }, 200);
});
