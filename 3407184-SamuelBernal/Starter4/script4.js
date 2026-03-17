// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// ============================================
// Dominio: Plataforma de Streaming de Radio Rap Underground
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

const DOMAIN_NAME = "Barrio Beats Radio Network";

// Nombre con espacios para aplicar trim() luego
const rawEntityName = "   barrio beats radio   ";

const entityCategory = "Hip Hop / Boom Bap / Lo-fi";

// Código identificador con prefijo
const entityCode = "RAP-950-LIVE";

// Descripción con palabras clave para validaciones
const entityDescription = "La emisora definitiva del movimiento underground con los mejores beats del barrio.";

const mainValue = 950; // Oyentes actuales

const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// Limpieza de espacios
const entityName = rawEntityName.trim();

// Nombre en mayúsculas para impacto visual
const entityNameUpper = entityName.toUpperCase();

// Nombre en minúsculas para generar IDs o rutas
const entityNameLower = entityName.toLowerCase();

// Extrae "RAP" del código original usando slice
const codePrefix = entityCode.slice(0, 3);


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// Verifica si el código empieza con RAP
const hasValidPrefix = entityCode.startsWith("RAP");

// Verifica si la descripción menciona "underground"
const descriptionIsRelevant = entityDescription.includes("underground");

// Verifica si el código termina con el estado LIVE
const hasValidSuffix = entityCode.endsWith("LIVE");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(50);
const subSeparator = "-".repeat(50);

const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — CONTROL DE EMISIÓN
${separator}
Estación:    ${entityNameUpper}
Género:      ${entityCategory}
ID Sistema:  ${entityCode}
Tag Ref:     [${codePrefix}]
Audiencia:   ${mainValue} oyentes
Estado:      ${isActive ? "🔴 EN VIVO" : "⚪ FUERA DE AIRE"}

${subSeparator}
Slogan Oficial:
"${entityDescription}"
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Chequeo de Integridad de Datos ---");
console.log(`¿Prefijo de categoría '${codePrefix}' correcto?: ${hasValidPrefix}`);
console.log(`¿Contenido temático 'underground' detectado?: ${descriptionIsRelevant}`);
console.log(`¿Estado final del código es 'LIVE'?: ${hasValidSuffix}`);
console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación de Sistema ---");

// Notificación rápida usando el nombre limpio y el código
const notification = `🔥 Conexión establecida: ${entityName} está transmitiendo bajo el código ${entityCode}`;
console.log(notification);
console.log("");