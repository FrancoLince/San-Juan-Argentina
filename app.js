const categorias = {
  gastronomia: "Gastronomía",
  indumentaria: "Indumentaria",
  nocturnidad: "Nocturnidad",
  deportes: "Deportes"
};

const localesDemo = [
  {
    id: "demo-1",
    name: "La Salmuera",
    category: "nocturnidad",
    department: "Rivadavia",
    description: "Eventos, espacio al aire libre, gastronomía y tragos.",
    instagram_url: "https://instagram.com",
    website_url: "",
    tags: ["fiesta", "tragos", "eventos"]
  },
  {
    id: "demo-2",
    name: "MSW Streetwear",
    category: "indumentaria",
    department: "Capital",
    description: "Ropa urbana, buzos raglan, hoodies y prendas de abrigo.",
    instagram_url: "https://instagram.com",
    website_url: "https://ejemplo.com",
    tags: ["ropa", "streetwear", "buzos"]
  },
  {
    id: "demo-3",
    name: "Play Cinema",
    category: "nocturnidad",
    department: "Rivadavia",
    description: "Salas de cine, cartelera semanal y promociones.",
    instagram_url: "https://instagram.com",
    website_url: "https://ejemplo.com",
    tags: ["cine", "salidas", "entretenimiento"]
  },
  {
    id: "demo-4",
    name: "Heed Physique",
    category: "deportes",
    department: "Capital",
    description: "Gimnasio equipamiento completo, musculación y cardio.",
    instagram_url: "https://instagram.com",
    website_url: "",
    tags: ["gimnasio", "fitness", "entrenamiento"]
  },
  {
    id: "demo-5",
    name: "Lomería El Paseo",
    category: "gastronomia",
    department: "Santa Lucía",
    description: "Lomos completos, hamburguesas artesanales y papas.",
    instagram_url: "https://instagram.com",
    website_url: "",
    tags: ["lomos", "comida rápida", "restaurante"]
  }
];

const placesGrid = document.getElementById("placesGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const noResults = document.getElementById("noResults");
const appStatus = document.getElementById("appStatus");
const adminToggle = document.getElementById("adminToggle");
const adminPanel = document.getElementById("adminPanel");
const closeAdminPanel = document.getElementById("closeAdminPanel");
const adminMessage = document.getElementById("adminMessage");
const loginForm = document.getElementById("loginForm");
const adminSession = document.getElementById("adminSession");
const sessionIdentity = document.getElementById("sessionIdentity");
const logoutButton = document.getElementById("logoutButton");
const passwordSetupForm = document.getElementById("passwordSetupForm");
const adminEditor = document.getElementById("adminEditor");
const placeForm = document.getElementById("placeForm");
const managedSites = document.getElementById("managedSites");
const managedSitesTitle = document.getElementById("managedSitesTitle");
const ownerSelectLabel = document.getElementById("ownerSelectLabel");
const cancelEditButton = document.getElementById("cancelEditButton");

let locales = localesDemo;
let categoriaActual = "todos";
let busquedaActual = "";
let supabaseClient = null;
let usuarioActual = null;
let rolActual = null;
let passwordSetupRequired = ["invite", "recovery"].includes(
  new URLSearchParams(window.location.hash.slice(1)).get("type")
);

document.addEventListener("DOMContentLoaded", inicializar);

async function inicializar() {
  configurarEventos();
  renderizarTarjetas(localesDemo);

  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  if (hashParams.get("error_code") === "otp_expired") {
    appStatus.textContent = "El enlace de invitación venció o ya fue usado. Pedí que reenvíen la invitación y abrí el enlace nuevo.";
  }

  const config = window.SUPABASE_CONFIG;
  if (!config?.url || !config?.anonKey) {
    appStatus.textContent = "Directorio de muestra. Configurá Supabase para habilitar datos compartidos y administración.";
    adminMessage.textContent = "El panel requiere configurar Supabase. Consultá SUPABASE_SETUP.md.";
    loginForm.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    supabaseClient = createClient(config.url, config.anonKey);

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        void actualizarSesion(session);
      }, 0);
    });

    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      throw error;
    }

    await actualizarSesion(data.session);
    await cargarSitios();
  } catch (error) {
    appStatus.textContent = `No se pudo iniciar la conexión con Supabase: ${error.message}`;
  }
}

function configurarEventos() {
  searchInput.addEventListener("input", (event) => {
    busquedaActual = event.target.value.toLowerCase().trim();
    aplicarFiltros();
  });

  categoryButtons.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-filter");
    if (!button) {
      return;
    }

    categoryButtons.querySelectorAll(".btn-filter").forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });
    categoriaActual = button.dataset.category;
    aplicarFiltros();
  });

  placesGrid.addEventListener("click", (event) => {
    const link = event.target.closest(".btn-link");
    if (link && supabaseClient && link.dataset.placeId) {
      void registrarClic(link.dataset.placeId, link.dataset.linkType);
    }
  });

  adminToggle.addEventListener("click", () => {
    const isOpen = !adminPanel.classList.contains("hidden");
    adminPanel.classList.toggle("hidden", isOpen);
    adminToggle.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  closeAdminPanel.addEventListener("click", () => {
    adminPanel.classList.add("hidden");
    adminToggle.setAttribute("aria-expanded", "false");
    adminToggle.focus();
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    adminMessage.textContent = "";
    const formData = new FormData(loginForm);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: formData.get("email").trim(),
        password: formData.get("password")
      });
      if (error) {
        throw error;
      }
      loginForm.reset();
    } catch (error) {
      adminMessage.textContent = `No se pudo iniciar sesión: ${error.message}`;
    }
  });

  logoutButton.addEventListener("click", async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      adminMessage.textContent = `No se pudo cerrar sesión: ${error.message}`;
    }
  });

  placeForm.addEventListener("submit", guardarSitio);
  cancelEditButton.addEventListener("click", limpiarFormulario);

  passwordSetupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    adminMessage.textContent = "";
    const formData = new FormData(passwordSetupForm);
    const password = formData.get("password");

    if (password !== formData.get("passwordConfirmation")) {
      adminMessage.textContent = "Las contraseñas no coinciden.";
      return;
    }

    try {
      const { error } = await supabaseClient.auth.updateUser({ password });
      if (error) {
        throw error;
      }

      passwordSetupRequired = false;
      passwordSetupForm.reset();
      passwordSetupForm.classList.add("hidden");
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      adminMessage.textContent = "Contraseña guardada. Ya podés usarla para ingresar.";
    } catch (error) {
      adminMessage.textContent = `No se pudo guardar la contraseña: ${error.message}`;
    }
  });

  managedSites.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const place = locales.find((local) => local.id === button.dataset.id);
    if (!place) {
      return;
    }

    if (button.dataset.action === "edit") {
      iniciarEdicion(place);
    } else if (button.dataset.action === "delete") {
      void eliminarSitio(place);
    }
  });
}

async function actualizarSesion(session) {
  usuarioActual = session?.user ?? null;
  rolActual = null;
  adminMessage.textContent = "";
  loginForm.classList.toggle("hidden", Boolean(usuarioActual));
  adminSession.classList.toggle("hidden", !usuarioActual);
  passwordSetupForm.classList.toggle("hidden", !usuarioActual || !passwordSetupRequired);

  if (!usuarioActual || !supabaseClient) {
    return;
  }

  try {
    const { data: profile, error } = await supabaseClient
      .from("profiles")
      .select("email, role")
      .eq("id", usuarioActual.id)
      .single();
    if (error) {
      throw error;
    }

    rolActual = profile.role;
    sessionIdentity.textContent = `${profile.email} · ${rolActual === "admin" ? "Administrador" : "Dueño"}`;
    adminEditor.classList.toggle("hidden", rolActual !== "admin");
    ownerSelectLabel.classList.toggle("hidden", rolActual !== "admin");
    managedSitesTitle.textContent = rolActual === "admin" ? "Sitios y clics" : "Mis estadísticas";

    if (rolActual !== "admin" && rolActual !== "owner") {
      throw new Error("La cuenta no tiene un rol habilitado para el panel.");
    }

    if (rolActual === "admin") {
      await cargarCuentasDueñas();
    }
    await cargarPanelSitios();
  } catch (error) {
    adminMessage.textContent = `No se pudo cargar el perfil o el panel: ${error.message}`;
  }
}

async function cargarSitios() {
  const { data, error } = await supabaseClient
    .from("places")
    .select("id, name, category, department, description, instagram_url, website_url, tags, owner_id")
    .order("name");

  if (error) {
    appStatus.textContent = `No se pudieron cargar los sitios: ${error.message}`;
    return false;
  }

  locales = data.map((place) => ({
    ...place,
    tags: Array.isArray(place.tags) ? place.tags : []
  }));
  appStatus.textContent = "";
  aplicarFiltros();
  return true;
}

function renderizarTarjetas(lista) {
  placesGrid.replaceChildren();
  noResults.classList.toggle("hidden", lista.length > 0);

  lista.forEach((local) => {
    const card = document.createElement("article");
    card.className = "card";

    const content = document.createElement("div");
    const heading = document.createElement("div");
    heading.className = "card-header";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = local.name;

    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = categorias[local.category] ?? local.category;
    heading.append(title, badge);

    const location = document.createElement("div");
    location.className = "card-location";
    location.textContent = `📍 ${local.department}`;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = local.description;

    const tags = document.createElement("div");
    tags.className = "card-tags";
    local.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "tag";
      tagElement.textContent = `#${tag}`;
      tags.append(tagElement);
    });

    content.append(heading, location, description, tags);

    const links = document.createElement("div");
    links.className = "card-links";
    agregarEnlace(links, local, "instagram_url", "Instagram", "instagram");
    agregarEnlace(links, local, "website_url", "Web / Menú", "web");
    card.append(content, links);
    placesGrid.append(card);
  });
}

function agregarEnlace(container, local, field, label, type) {
  const safeUrl = validarUrl(local[field]);
  if (!safeUrl) {
    return;
  }

  const link = document.createElement("a");
  link.href = safeUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = `btn-link btn-${type}`;
  link.dataset.placeId = local.id;
  link.dataset.linkType = type === "web" ? "website" : "instagram";
  link.textContent = label;
  container.append(link);
}

function validarUrl(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function aplicarFiltros() {
  const resultados = locales.filter((local) => {
    const coincideCategoria = categoriaActual === "todos" || local.category === categoriaActual;
    const textoBuscado = [
      local.name,
      local.department,
      local.description,
      ...local.tags
    ].join(" ").toLowerCase();
    return coincideCategoria && textoBuscado.includes(busquedaActual);
  });

  renderizarTarjetas(resultados);
}

async function registrarClic(placeId, linkType) {
  try {
    const { error } = await supabaseClient.rpc("track_link_click", {
      p_place_id: placeId,
      p_link_type: linkType
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    appStatus.textContent = `No se pudo registrar el clic: ${error.message}`;
  }
}

async function cargarCuentasDueñas() {
  const ownerSelect = placeForm.elements.owner_id;
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, email")
    .eq("role", "owner")
    .order("email");

  if (error) {
    throw error;
  }

  ownerSelect.replaceChildren(new Option("Sin asignar", ""));
  data.forEach((profile) => {
    ownerSelect.add(new Option(profile.email, profile.id));
  });
}

async function cargarPanelSitios() {
  adminMessage.textContent = "";
  let query = supabaseClient
    .from("places")
    .select("id, name, category, department, instagram_url, website_url, owner_id")
    .order("name");

  if (rolActual === "owner") {
    query = query.eq("owner_id", usuarioActual.id);
  }

  const [{ data: places, error: placesError }, { data: stats, error: statsError }] = await Promise.all([
    query,
    supabaseClient.rpc("get_link_click_stats")
  ]);

  if (placesError || statsError) {
    const error = placesError ?? statsError;
    adminMessage.textContent = `No se pudieron cargar las estadísticas: ${error.message}`;
    return false;
  }

  const statsByPlace = new Map(stats.map((item) => [item.place_id, item]));
  managedSites.replaceChildren();

  if (places.length === 0) {
    const empty = document.createElement("p");
    empty.className = "managed-sites-empty";
    empty.textContent = rolActual === "admin"
      ? "Todavía no hay sitios. Agregá la primera ficha con el formulario."
      : "Todavía no hay fichas asignadas a tu cuenta. Contactá al administrador.";
    managedSites.append(empty);
    return true;
  }

  places.forEach((place) => {
    const counts = statsByPlace.get(place.id) ?? { website_clicks: 0, instagram_clicks: 0 };
    const item = document.createElement("article");
    item.className = "managed-site";

    const heading = document.createElement("div");
    heading.className = "managed-site-heading";
    const title = document.createElement("h4");
    title.textContent = place.name;
    const category = document.createElement("span");
    category.textContent = categorias[place.category] ?? place.category;
    heading.append(title, category);

    const metrics = document.createElement("dl");
    metrics.className = "click-metrics";
    metrics.append(
      crearMetrica("Web / menú", counts.website_clicks),
      crearMetrica("Instagram", counts.instagram_clicks)
    );
    item.append(heading, metrics);

    if (rolActual === "admin") {
      const actions = document.createElement("div");
      actions.className = "managed-site-actions";
      actions.append(
        crearAccion("Editar", "edit", place.id, "admin-secondary-button"),
        crearAccion("Retirar", "delete", place.id, "admin-danger-button")
      );
      item.append(actions);
    }

    managedSites.append(item);
  });
  return true;
}

function crearMetrica(label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const count = document.createElement("dd");
  term.textContent = label;
  count.textContent = Number(value).toLocaleString("es-AR");
  wrapper.append(term, count);
  return wrapper;
}

function crearAccion(label, action, id, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = label;
  return button;
}

async function guardarSitio(event) {
  event.preventDefault();
  adminMessage.textContent = "";
  const formData = new FormData(placeForm);
  const instagramUrl = formData.get("instagram_url").trim();
  const websiteUrl = formData.get("website_url").trim();

  if (!instagramUrl && !websiteUrl) {
    adminMessage.textContent = "Agregá al menos un enlace de Instagram o del sitio web.";
    return;
  }

  const payload = {
    name: formData.get("name").trim(),
    category: formData.get("category"),
    department: formData.get("department").trim(),
    description: formData.get("description").trim(),
    instagram_url: instagramUrl || null,
    website_url: websiteUrl || null,
    tags: formData.get("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    owner_id: formData.get("owner_id") || null
  };
  const placeId = formData.get("id");

  try {
    const request = placeId
      ? supabaseClient.from("places").update(payload).eq("id", placeId)
      : supabaseClient.from("places").insert(payload);
    const { error } = await request;
    if (error) {
      throw error;
    }

    limpiarFormulario();
    const [sitesLoaded, panelLoaded] = await Promise.all([cargarSitios(), cargarPanelSitios()]);
    if (sitesLoaded && panelLoaded) {
      adminMessage.textContent = placeId ? "Sitio actualizado." : "Sitio agregado.";
    }
  } catch (error) {
    adminMessage.textContent = `No se pudo guardar el sitio: ${error.message}`;
  }
}

function iniciarEdicion(place) {
  placeForm.elements.id.value = place.id;
  placeForm.elements.name.value = place.name;
  placeForm.elements.category.value = place.category;
  placeForm.elements.department.value = place.department;
  placeForm.elements.description.value = place.description;
  placeForm.elements.instagram_url.value = place.instagram_url ?? "";
  placeForm.elements.website_url.value = place.website_url ?? "";
  placeForm.elements.tags.value = place.tags.join(", ");
  placeForm.elements.owner_id.value = place.owner_id ?? "";
  document.getElementById("editorTitle").textContent = "Editar sitio";
  placeForm.querySelector('button[type="submit"]').textContent = "Guardar cambios";
  cancelEditButton.classList.remove("hidden");
  adminEditor.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limpiarFormulario() {
  placeForm.reset();
  placeForm.elements.id.value = "";
  document.getElementById("editorTitle").textContent = "Agregar un sitio";
  placeForm.querySelector('button[type="submit"]').textContent = "Guardar sitio";
  cancelEditButton.classList.add("hidden");
}

async function eliminarSitio(place) {
  if (!window.confirm(`¿Querés retirar "${place.name}" del directorio? Esta acción también elimina sus estadísticas.`)) {
    return;
  }

  adminMessage.textContent = "";
  try {
    const { error } = await supabaseClient.from("places").delete().eq("id", place.id);
    if (error) {
      throw error;
    }

    if (placeForm.elements.id.value === place.id) {
      limpiarFormulario();
    }
    const [sitesLoaded, panelLoaded] = await Promise.all([cargarSitios(), cargarPanelSitios()]);
    if (sitesLoaded && panelLoaded) {
      adminMessage.textContent = "Sitio retirado.";
    }
  } catch (error) {
    adminMessage.textContent = `No se pudo retirar el sitio: ${error.message}`;
  }
}
