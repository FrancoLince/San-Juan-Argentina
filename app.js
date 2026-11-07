const categorias = [
  { value: "gastronomia", label: "Gastronomía", icon: "🍽" },
  { value: "panaderias_pastelerias", label: "Panaderías y pastelerías", icon: "🥐" },
  { value: "carnicerias_fiambrerias", label: "Carnicerías y fiambrerías", icon: "▣" },
  { value: "vinotecas_bebidas", label: "Vinotecas y bebidas", icon: "♧" },
  { value: "indumentaria", label: "Indumentaria", icon: "✦" },
  { value: "calzado_accesorios", label: "Calzado y accesorios", icon: "✦" },
  { value: "hogar_muebles_decoracion", label: "Hogar, muebles y decoración", icon: "⌂" },
  { value: "electrodomesticos", label: "Electrodomésticos", icon: "▤" },
  { value: "librerias_regalerias", label: "Librerías y regalerías", icon: "✎" },
  { value: "jugueterias", label: "Jugueterías", icon: "✦" },
  { value: "nocturnidad", label: "Nocturnidad", icon: "♫" },
  { value: "deportes", label: "Deportes", icon: "⚽" },
  { value: "almacenes_supermercados", label: "Almacenes y supermercados", icon: "🛒" },
  { value: "mayoristas_distribuidores", label: "Mayoristas y distribuidores", icon: "▦" },
  { value: "salud", label: "Salud", icon: "✚" },
  { value: "farmacias_perfumerias", label: "Farmacias y perfumerías", icon: "✚" },
  { value: "belleza_estetica", label: "Belleza y estética", icon: "✿" },
  { value: "servicios_profesionales", label: "Servicios profesionales", icon: "▣" },
  { value: "construccion_ferreterias", label: "Construcción y ferreterías", icon: "⌂" },
  { value: "inmobiliarias", label: "Inmobiliarias", icon: "⌂" },
  { value: "automotor", label: "Automotor: venta y alquiler", icon: "🚗" },
  { value: "talleres_repuestos", label: "Talleres y repuestos", icon: "⚙" },
  { value: "transporte_logistica", label: "Transporte y logística", icon: "➜" },
  { value: "delivery_mensajeria", label: "Delivery y mensajería", icon: "➜" },
  { value: "tecnologia", label: "Tecnología", icon: "▤" },
  { value: "marketing_diseno", label: "Marketing, diseño y comunicación", icon: "✎" },
  { value: "imprenta_grafica", label: "Imprentas y gráfica", icon: "▤" },
  { value: "finanzas_seguros", label: "Finanzas y seguros", icon: "$" },
  { value: "legales_contables", label: "Servicios legales y contables", icon: "▣" },
  { value: "agricultura_ganaderia", label: "Agricultura y ganadería", icon: "♧" },
  { value: "agro_veterinaria", label: "Agro y veterinaria", icon: "♧" },
  { value: "industria_mineria", label: "Industria y minería", icon: "⚒" },
  { value: "energia", label: "Energía y energías renovables", icon: "✧" },
  { value: "bodegas_olivicolas", label: "Bodegas y olivícolas", icon: "♧" },
  { value: "turismo_alojamiento", label: "Turismo y alojamiento", icon: "⌖" },
  { value: "educacion", label: "Educación y capacitación", icon: "✎" },
  { value: "cultura_entretenimiento", label: "Cultura y entretenimiento", icon: "♫" },
  { value: "eventos", label: "Eventos y celebraciones", icon: "✦" },
  { value: "servicios_tecnicos", label: "Servicios técnicos y reparaciones", icon: "⚙" },
  { value: "limpieza_mantenimiento", label: "Limpieza y mantenimiento", icon: "✧" },
  { value: "lavanderias", label: "Lavanderías", icon: "✧" },
  { value: "cuidado_infantil_adultos", label: "Cuidado infantil y de adultos", icon: "✚" },
  { value: "mascotas", label: "Mascotas", icon: "🐾" },
  { value: "organizaciones_emprendimientos", label: "Emprendimientos y organizaciones", icon: "✧" },
  { value: "otros", label: "Otros", icon: "✦" }
];
const categoriaPorValor = new Map(categorias.map((category) => [category.value, category]));
const categoriasAnteriores = [
  { value: "belleza", label: "Belleza", icon: "✿" },
  { value: "hogar_construccion", label: "Hogar y construcción", icon: "⌂" }
];
categoriasAnteriores.forEach((category) => categoriaPorValor.set(category.value, category));
const categoriaPersonalizada = "__custom__";

const filtrosActividad = {
  comer: {
    categories: ["gastronomia", "panaderias_pastelerias", "carnicerias_fiambrerias", "vinotecas_bebidas"],
    keywords: ["restaurante", "restaurant", "gastronomia", "comida", "pizza", "hamburgues", "lomo", "sushi", "panader", "pasteler", "helader", "vinoteca"]
  },
  ropa: {
    categories: ["indumentaria", "calzado_accesorios"],
    keywords: ["ropa", "indumentaria", "calzado", "zapatilla", "accesorio", "streetwear"]
  },
  cafe: {
    categories: ["panaderias_pastelerias"],
    keywords: ["cafe", "cafeteria", "merienda", "desayuno", "pasteler", "torta", "helader"]
  },
  cine: {
    categories: [],
    keywords: ["cine", "cinema", "pelicula", "cartelera", "sala de cine"]
  },
  juegos: {
    categories: [],
    keywords: ["juego", "videojuego", "arcade", "bowling", "billar", "escape room", "paintball", "karting", "laser tag", "realidad virtual", "ludoteca", "trampolin"]
  },
  salidas: {
    categories: ["nocturnidad", "eventos", "cultura_entretenimiento"],
    keywords: ["salida", "evento", "fiesta", "boliche", "recital", "teatro", "musica", "tragos", "entretenimiento"]
  },
  "aire-libre": {
    categories: ["deportes", "turismo_alojamiento"],
    keywords: ["aire libre", "trekking", "senderismo", "ciclismo", "bicicleta", "camping", "aventura", "deporte", "gimnasio", "fitness", "pileta", "natacion"]
  },
  compras: {
    categories: [
      "indumentaria", "calzado_accesorios", "hogar_muebles_decoracion", "electrodomesticos",
      "librerias_regalerias", "jugueterias", "almacenes_supermercados", "mayoristas_distribuidores",
      "farmacias_perfumerias", "belleza_estetica", "automotor", "tecnologia"
    ],
    keywords: ["regaleria", "libreria", "jugueteria", "supermercado"]
  }
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
const activityFilters = document.getElementById("activityFilters");
const categoryFilter = document.getElementById("categoryFilter");
const placeCategorySelect = document.getElementById("placeCategorySelect");
const customCategoryLabel = document.getElementById("customCategoryLabel");
const customCategoryInput = document.getElementById("customCategoryInput");
const departmentFilter = document.getElementById("departmentFilter");
const tagFilter = document.getElementById("tagFilter");
const noResults = document.getElementById("noResults");
const appStatus = document.getElementById("appStatus");
const adminToggle = document.getElementById("adminToggle");
const adminPanel = document.getElementById("adminPanel");
const closeAdminPanel = document.getElementById("closeAdminPanel");
const adminMessage = document.getElementById("adminMessage");
const loginForm = document.getElementById("loginForm");
const loginSubmitButton = loginForm.querySelector('button[type="submit"]');
const adminSession = document.getElementById("adminSession");
const sessionIdentity = document.getElementById("sessionIdentity");
const logoutButton = document.getElementById("logoutButton");
const passwordSetupForm = document.getElementById("passwordSetupForm");
const ownerInviteForm = document.getElementById("ownerInviteForm");
const adminEditor = document.getElementById("adminEditor");
const placeForm = document.getElementById("placeForm");
const placeImageEditor = document.getElementById("placeImageEditor");
const placeImagePreview = document.getElementById("placeImagePreview");
const removePlaceImageLabel = document.getElementById("removePlaceImageLabel");
const managedSites = document.getElementById("managedSites");
const managedSitesTitle = document.getElementById("managedSitesTitle");
const ownerSelectLabel = document.getElementById("ownerSelectLabel");
const cancelEditButton = document.getElementById("cancelEditButton");

let locales = localesDemo;
let categoriaActual = "todos";
let actividadActual = "";
let busquedaActual = "";
let supabaseClient = null;
let supabaseReadyPromise = null;
let usuarioActual = null;
let rolActual = null;
let currentPlaceImageUrl = "";
let previewObjectUrl = "";
let sitiosGestionados = new Map();
const imageMimeExtensions = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"]
]);
const maxPlaceImageSize = 5 * 1024 * 1024;
let passwordSetupRequired = ["invite", "recovery"].includes(
  new URLSearchParams(window.location.hash.slice(1)).get("type")
);

document.addEventListener("DOMContentLoaded", inicializar);

async function inicializar() {
  configurarEventos();
  configurarCategorias();
  renderizarTarjetas(localesDemo);
  actualizarOpcionesFiltros(localesDemo);

  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const inviteLinkExpired = hashParams.get("error_code") === "otp_expired";
  loginSubmitButton.disabled = true;
  appStatus.textContent = "Conectando con el panel de gestión...";

  const config = window.SUPABASE_CONFIG;
  if (!config?.url || !config?.anonKey) {
    appStatus.textContent = "Directorio de muestra. Configurá Supabase para habilitar datos compartidos y administración.";
    adminMessage.textContent = "No se encontró la configuración de Supabase en esta publicación. Verificá que supabase-config.js esté en la raíz del sitio.";
    return;
  }

  try {
    supabaseReadyPromise = (async () => {
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
    })();
    await supabaseReadyPromise;
    loginSubmitButton.disabled = false;
    if (inviteLinkExpired && !usuarioActual) {
      adminMessage.textContent = "El enlace de invitación venció o ya fue usado. Podés ingresar con tu contraseña o pedir que reenvíen la invitación.";
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  } catch (error) {
    appStatus.textContent = `No se pudo iniciar la conexión con Supabase: ${error.message}`;
    adminMessage.textContent = `No se pudo preparar el inicio de sesión: ${error.message}`;
  }
}

function configurarCategorias() {
  placeCategorySelect.replaceChildren();

  categorias.forEach(({ value, label }) => {
    placeCategorySelect.add(new Option(label, value));
  });
  categoriasAnteriores.forEach(({ value, label }) => {
    placeCategorySelect.add(new Option(`${label} (ficha existente)`, value));
  });
  placeCategorySelect.add(new Option("Otro rubro (especificar)", categoriaPersonalizada));
  actualizarOpcionesCategorias();
}

function configurarEventos() {
  searchInput.addEventListener("input", (event) => {
    busquedaActual = event.target.value.toLowerCase().trim();
    aplicarFiltros();
  });

  activityFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity-filter]");
    if (!button) {
      return;
    }

    actividadActual = button.dataset.activityFilter;
    activityFilters.querySelectorAll("[data-activity-filter]").forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    aplicarFiltros();
  });

  categoryFilter.addEventListener("change", () => {
    categoriaActual = categoryFilter.value;
    aplicarFiltros();
  });

  placeCategorySelect.addEventListener("change", () => {
    const isCustom = placeCategorySelect.value === categoriaPersonalizada;
    customCategoryLabel.classList.toggle("hidden", !isCustom);
    customCategoryInput.required = isCustom;
    if (!isCustom) {
      customCategoryInput.value = "";
    }
  });

  departmentFilter.addEventListener("change", aplicarFiltros);
  tagFilter.addEventListener("change", aplicarFiltros);

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
    if (supabaseReadyPromise && !supabaseClient) {
      loginSubmitButton.disabled = true;
      adminMessage.textContent = "Conectando con Supabase; esperá un momento...";
      try {
        await supabaseReadyPromise;
      } catch (error) {
        adminMessage.textContent = `No se pudo conectar con Supabase: ${error.message}`;
        return;
      } finally {
        loginSubmitButton.disabled = false;
      }
    }
    if (!supabaseClient) {
      adminMessage.textContent = "El panel todavía no está conectado con Supabase. Recargá la página e intentá de nuevo.";
      return;
    }
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
  placeForm.elements.image.addEventListener("change", actualizarVistaPreviaImagen);
  placeForm.elements.remove_image.addEventListener("change", () => {
    placeImageEditor.classList.toggle("image-marked-for-removal", placeForm.elements.remove_image.checked);
  });
  cancelEditButton.addEventListener("click", limpiarFormulario);

  ownerInviteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    adminMessage.textContent = "";
    const submitButton = ownerInviteForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    const email = new FormData(ownerInviteForm).get("email").trim();

    try {
      const { error } = await supabaseClient.functions.invoke("invite-owner", {
        body: { email }
      });
      if (error) {
        let message = error.message;
        if (error.context instanceof Response) {
          const responseBody = await error.context.clone().json().catch(() => null);
          message = responseBody?.error ?? message;
        }
        throw new Error(message);
      }

      ownerInviteForm.reset();
      try {
        await cargarCuentasDueñas();
        adminMessage.textContent = `Invitación enviada a ${email}. Cuando acepte, podrás asignarle fichas.`;
      } catch (error) {
        adminMessage.textContent = `La invitación se envió, pero no se pudo actualizar la lista de socios: ${error.message}`;
      }
    } catch (error) {
      adminMessage.textContent = `No se pudo enviar la invitación: ${error.message}`;
    } finally {
      submitButton.disabled = false;
    }
  });

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

    const place = sitiosGestionados.get(button.dataset.id)
      ?? locales.find((local) => local.id === button.dataset.id);
    if (!place) {
      return;
    }

    if (button.dataset.action === "edit") {
      iniciarEdicion(place);
    } else if (button.dataset.action === "delete") {
      void eliminarSitio(place);
    } else if (button.dataset.action === "hide" || button.dataset.action === "show") {
      void cambiarVisibilidadSitio(place);
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
    ownerInviteForm.classList.toggle("hidden", rolActual !== "admin");
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
    .select("id, name, category, department, description, instagram_url, website_url, image_url, tags, owner_id")
    .order("name");

  if (error) {
    appStatus.textContent = `No se pudieron cargar los sitios: ${error.message}`;
    return false;
  }

  locales = data.map((place) => ({
    ...place,
    tags: Array.isArray(place.tags) ? place.tags : []
  }));
  actualizarOpcionesFiltros(locales);
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

    const image = document.createElement("div");
    image.className = "card-image";
    if (validarUrl(local.image_url)) {
      const photo = document.createElement("img");
      photo.src = local.image_url;
      photo.alt = `Foto de ${local.name}`;
      photo.loading = "lazy";
      photo.decoding = "async";
      photo.addEventListener("error", () => {
        image.classList.add("card-image-placeholder");
        photo.remove();
        const icon = document.createElement("span");
        icon.textContent = categoriaPorValor.get(local.category)?.icon ?? "✦";
        image.append(icon);
      }, { once: true });
      image.append(photo);
    } else {
      image.classList.add("card-image-placeholder");
      image.setAttribute("aria-hidden", "true");
      const icon = document.createElement("span");
      icon.textContent = categoriaPorValor.get(local.category)?.icon ?? "✦";
      image.append(icon);
    }

    const content = document.createElement("div");
    const heading = document.createElement("div");
    heading.className = "card-header";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = local.name;

    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = categoriaPorValor.get(local.category)?.label ?? local.category;
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
    card.append(image, content, links);
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
  const departamentoSeleccionado = departmentFilter.value;
  const etiquetaSeleccionada = tagFilter.value;
  const filtroActividad = filtrosActividad[actividadActual];
  const resultados = locales.filter((local) => {
    const coincideCategoria = !categoriaActual || local.category === categoriaActual;
    const coincideDepartamento = !departamentoSeleccionado || local.department === departamentoSeleccionado;
    const coincideEtiqueta = !etiquetaSeleccionada || local.tags.some(
      (tag) => tag.toLocaleLowerCase("es-AR") === etiquetaSeleccionada
    );
    const textoBuscado = [
      local.name,
      local.department,
      local.category,
      local.description,
      ...local.tags
    ].join(" ").toLowerCase();
    const textoNormalizado = normalizarTexto(textoBuscado);
    const coincideActividad = !filtroActividad
      || filtroActividad.categories.includes(local.category)
      || filtroActividad.keywords.some((keyword) => textoNormalizado.includes(normalizarTexto(keyword)));
    return coincideCategoria
      && coincideDepartamento
      && coincideEtiqueta
      && coincideActividad
      && textoBuscado.includes(busquedaActual);
  });

  renderizarTarjetas(resultados);
}

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function actualizarVistaPreviaImagen() {
  const file = placeForm.elements.image.files[0];
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = "";
  }

  if (file) {
    placeForm.elements.remove_image.checked = false;
    previewObjectUrl = URL.createObjectURL(file);
    mostrarVistaPreviaImagen(previewObjectUrl);
  } else if (currentPlaceImageUrl && !placeForm.elements.remove_image.checked) {
    mostrarVistaPreviaImagen(currentPlaceImageUrl);
  } else {
    placeImageEditor.classList.add("hidden");
  }
}

function mostrarVistaPreviaImagen(url) {
  placeImagePreview.src = url;
  placeImageEditor.classList.remove("hidden");
  placeImageEditor.classList.toggle("image-marked-for-removal", placeForm.elements.remove_image.checked);
}

function obtenerRutaImagen(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  try {
    const url = new URL(imageUrl);
    const bucketPath = "/storage/v1/object/public/place-images/";
    const pathStart = url.pathname.indexOf(bucketPath);
    return pathStart < 0 ? "" : decodeURIComponent(url.pathname.slice(pathStart + bucketPath.length));
  } catch {
    return "";
  }
}

function actualizarOpcionesCategorias(sites = locales) {
  const selectedCategory = categoryFilter.value;
  const availableCategories = new Map(categorias.map(({ value, label }) => [value, label]));
  sites.forEach((site) => {
    if (site.category && !availableCategories.has(site.category)) {
      availableCategories.set(site.category, categoriaPorValor.get(site.category)?.label ?? site.category);
    }
  });

  categoryFilter.replaceChildren(new Option("Todos los rubros", ""));
  [...availableCategories.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "es-AR"))
    .forEach(([value, label]) => categoryFilter.add(new Option(label, value)));
  if (availableCategories.has(selectedCategory)) {
    categoryFilter.value = selectedCategory;
  }
  categoriaActual = categoryFilter.value;
}

function actualizarOpcionesFiltros(sites) {
  actualizarOpcionesCategorias(sites);
  const departamentoActual = departmentFilter.value;
  const etiquetaActual = tagFilter.value;
  const departamentos = [...new Set(sites.map((site) => site.department).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es-AR"));
  const etiquetas = [...new Set(sites.flatMap((site) => site.tags)
    .map((tag) => tag.trim())
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es-AR"));

  departmentFilter.replaceChildren(new Option("Todos los departamentos y zonas", ""));
  departamentos.forEach((department) => {
    departmentFilter.add(new Option(department, department));
  });
  if (departamentos.includes(departamentoActual)) {
    departmentFilter.value = departamentoActual;
  }

  tagFilter.replaceChildren(new Option("Todas las etiquetas", ""));
  etiquetas.forEach((tag) => {
    tagFilter.add(new Option(tag, tag.toLocaleLowerCase("es-AR")));
  });
  if (etiquetas.some((tag) => tag.toLocaleLowerCase("es-AR") === etiquetaActual)) {
    tagFilter.value = etiquetaActual;
  }
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
    .select("id, name, category, department, instagram_url, website_url, image_url, owner_id, is_hidden")
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
  sitiosGestionados = new Map(places.map((place) => [place.id, place]));
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
    category.textContent = categoriaPorValor.get(place.category)?.label ?? place.category;
    heading.append(title, category);

    if (place.is_hidden) {
      const hiddenStatus = document.createElement("p");
      hiddenStatus.className = "managed-site-status";
      hiddenStatus.textContent = "Ficha oculta · no aparece en el directorio público";
      item.append(heading, hiddenStatus);
    } else {
      item.append(heading);
    }

    const metrics = document.createElement("dl");
    metrics.className = "click-metrics";
    metrics.append(
      crearMetrica("Web / menú", counts.website_clicks),
      crearMetrica("Instagram", counts.instagram_clicks)
    );
    item.append(metrics);

    if (rolActual === "admin") {
      const actions = document.createElement("div");
      actions.className = "managed-site-actions";
      actions.append(
        crearAccion("Editar", "edit", place.id, "admin-secondary-button"),
        crearAccion(
          place.is_hidden ? "Mostrar ficha" : "Ocultar ficha",
          place.is_hidden ? "show" : "hide",
          place.id,
          "admin-secondary-button"
        ),
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
  const imageFile = placeForm.elements.image.files[0];

  if (!instagramUrl && !websiteUrl) {
    adminMessage.textContent = "Agregá al menos un enlace de Instagram o del sitio web.";
    return;
  }

  if (imageFile && (!imageMimeExtensions.has(imageFile.type) || imageFile.size > maxPlaceImageSize)) {
    adminMessage.textContent = "La foto debe ser JPG, PNG, WebP o AVIF y pesar como máximo 5 MB.";
    return;
  }

  const existingPlaceId = formData.get("id");
  const placeId = existingPlaceId || crypto.randomUUID();
  const previousImageUrl = currentPlaceImageUrl;
  const removeImage = placeForm.elements.remove_image.checked;
  const payload = {
    id: placeId,
    name: formData.get("name").trim(),
    category: formData.get("category") === categoriaPersonalizada
      ? customCategoryInput.value.trim()
      : formData.get("category"),
    department: formData.get("department").trim(),
    description: formData.get("description").trim(),
    instagram_url: instagramUrl || null,
    website_url: websiteUrl || null,
    image_url: removeImage ? null : previousImageUrl || null,
    tags: formData.get("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    owner_id: formData.get("owner_id") || null
  };
  if (!payload.category || payload.category.length > 80) {
    adminMessage.textContent = "Elegí un rubro o escribí uno de hasta 80 caracteres.";
    return;
  }
  let uploadedImagePath = "";
  let databaseSaved = false;
  const submitButton = placeForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    if (imageFile) {
      const extension = imageMimeExtensions.get(imageFile.type);
      uploadedImagePath = `${placeId}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("place-images")
        .upload(uploadedImagePath, imageFile, {
          contentType: imageFile.type,
          cacheControl: "31536000",
          upsert: false
        });
      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrl } = supabaseClient.storage
        .from("place-images")
        .getPublicUrl(uploadedImagePath);
      payload.image_url = publicUrl.publicUrl;
    }

    const request = existingPlaceId
      ? supabaseClient.from("places").update(payload).eq("id", placeId)
      : supabaseClient.from("places").insert(payload);
    const { error } = await request;
    if (error) {
      throw error;
    }
    databaseSaved = true;

    limpiarFormulario();
    const [sitesLoaded, panelLoaded] = await Promise.all([cargarSitios(), cargarPanelSitios()]);
    if (sitesLoaded && panelLoaded) {
      adminMessage.textContent = existingPlaceId ? "Sitio actualizado." : "Sitio agregado.";
    }
    if ((removeImage || imageFile) && previousImageUrl) {
      const oldImagePath = obtenerRutaImagen(previousImageUrl);
      if (oldImagePath && oldImagePath !== uploadedImagePath) {
        try {
          const { error: removeError } = await supabaseClient.storage
            .from("place-images")
            .remove([oldImagePath]);
          if (removeError) {
            adminMessage.textContent = `La ficha se guardó, pero no se pudo borrar la foto anterior: ${removeError.message}`;
          }
        } catch (error) {
          adminMessage.textContent = `La ficha se guardó, pero no se pudo borrar la foto anterior: ${error.message}`;
        }
      }
    }
  } catch (error) {
    if (uploadedImagePath && !databaseSaved) {
      try {
        const { error: cleanupError } = await supabaseClient.storage
          .from("place-images")
          .remove([uploadedImagePath]);
        if (cleanupError) {
          console.error("No se pudo limpiar la foto tras un error al guardar:", cleanupError.message);
        }
      } catch (cleanupError) {
        console.error("No se pudo limpiar la foto tras un error al guardar:", cleanupError);
      }
    }
    adminMessage.textContent = databaseSaved
      ? `El sitio se guardó, pero hubo un error al actualizar la página: ${error.message}`
      : `No se pudo guardar el sitio: ${error.message}`;
  } finally {
    submitButton.disabled = false;
  }
}

function iniciarEdicion(place) {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = "";
  }
  placeForm.elements.id.value = place.id;
  placeForm.elements.name.value = place.name;
  if (categoriaPorValor.has(place.category)) {
    placeForm.elements.category.value = place.category;
    customCategoryInput.value = "";
  } else {
    placeForm.elements.category.value = categoriaPersonalizada;
    customCategoryInput.value = place.category;
  }
  const isCustomCategory = placeForm.elements.category.value === categoriaPersonalizada;
  customCategoryLabel.classList.toggle("hidden", !isCustomCategory);
  customCategoryInput.required = isCustomCategory;
  placeForm.elements.department.value = place.department;
  placeForm.elements.description.value = place.description;
  placeForm.elements.instagram_url.value = place.instagram_url ?? "";
  placeForm.elements.website_url.value = place.website_url ?? "";
  placeForm.elements.tags.value = place.tags.join(", ");
  placeForm.elements.owner_id.value = place.owner_id ?? "";
  currentPlaceImageUrl = place.image_url ?? "";
  placeForm.elements.image.value = "";
  placeForm.elements.remove_image.checked = false;
  removePlaceImageLabel.classList.toggle("hidden", !currentPlaceImageUrl);
  if (currentPlaceImageUrl) {
    mostrarVistaPreviaImagen(currentPlaceImageUrl);
  } else {
    placeImageEditor.classList.add("hidden");
  }
  document.getElementById("editorTitle").textContent = "Editar sitio";
  placeForm.querySelector('button[type="submit"]').textContent = "Guardar cambios";
  cancelEditButton.classList.remove("hidden");
  adminEditor.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limpiarFormulario() {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = "";
  }
  placeForm.reset();
  placeForm.elements.id.value = "";
  customCategoryLabel.classList.add("hidden");
  customCategoryInput.required = false;
  currentPlaceImageUrl = "";
  removePlaceImageLabel.classList.add("hidden");
  placeImageEditor.classList.add("hidden");
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

    let imageCleanupError = "";
    const imagePath = obtenerRutaImagen(place.image_url);
    if (imagePath) {
      try {
        const { error: storageError } = await supabaseClient.storage
          .from("place-images")
          .remove([imagePath]);
        if (storageError) {
          imageCleanupError = storageError.message;
        }
      } catch (error) {
        imageCleanupError = error.message;
      }
    }

    if (placeForm.elements.id.value === place.id) {
      limpiarFormulario();
    }
    const [sitesLoaded, panelLoaded] = await Promise.all([cargarSitios(), cargarPanelSitios()]);
    if (sitesLoaded && panelLoaded) {
      adminMessage.textContent = imageCleanupError
        ? `Sitio retirado, pero no se pudo borrar su foto: ${imageCleanupError}`
        : "Sitio retirado.";
    }
  } catch (error) {
    adminMessage.textContent = `No se pudo retirar el sitio: ${error.message}`;
  }
}

async function cambiarVisibilidadSitio(place) {
  const isHidden = !place.is_hidden;
  const confirmation = isHidden
    ? `¿Ocultar "${place.name}"? Dejará de aparecer en el directorio, pero conservará su ficha y estadísticas.`
    : `¿Volver a mostrar "${place.name}" en el directorio?`;
  if (!window.confirm(confirmation)) {
    return;
  }

  adminMessage.textContent = "";
  try {
    const { error } = await supabaseClient
      .from("places")
      .update({ is_hidden: isHidden })
      .eq("id", place.id)
      .select("id")
      .single();
    if (error) {
      throw error;
    }

    const [sitesLoaded, panelLoaded] = await Promise.all([cargarSitios(), cargarPanelSitios()]);
    if (sitesLoaded && panelLoaded) {
      adminMessage.textContent = isHidden
        ? "Ficha oculta. Se conservaron sus datos y estadísticas."
        : "Ficha publicada nuevamente.";
    }
  } catch (error) {
    adminMessage.textContent = `No se pudo ${isHidden ? "ocultar" : "mostrar"} la ficha: ${error.message}`;
  }
}
