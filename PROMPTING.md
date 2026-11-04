# Instrucciones del Proyecto: San Juan Conecta

## Contexto
Estamos construyendo un agregador/directorio web hiperlocal para la provincia de San Juan, Argentina. El objetivo es dar visibilidad a locales comerciales, restaurantes, indumentaria, eventos y vida nocturna.

## Stack y Reglas de Código
- Arquitectura simple: HTML5, CSS3 puro y JavaScript ES6+ modular.
- MANTENER BUENAS PRÁCTICAS: Separar estrictamente `index.html`, `style.css` y `app.js`. No integrar JavaScript ni CSS dentro de tags de HTML.
- Supabase es el backend del directorio. Usar únicamente la clave publicable/anon en el navegador y proteger datos con RLS; nunca exponer `service_role`.
- Las métricas cuentan clics en enlaces externos, no personas únicas ni visualizaciones de página.
- El diseño debe ser Mobile-First, moderno, llamativo e intuitivo.
- Evitar tonos exclusivamente azules oscuros/monótonos; usar acentos vibrantes (neón, tonos cálidos, degradados modernos) para que resalte la propuesta visual.

## Reglas de Trabajo para la IA
1. Modificá directamente los archivos del proyecto (`index.html`, `style.css`, `app.js`) y sus archivos de configuración/esquema/documentación cuando el cambio lo requiera.
2. Al aplicar cambios en CSS, conservá las variables `:root` y mejorá la paleta hacia un contraste más vivo e interactivo.
3. No rompas la lógica existente del filtrado cruzado por categorías y buscador en tiempo real.