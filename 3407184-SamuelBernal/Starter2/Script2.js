// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// ============================================

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

const DOMAIN_NAME = "Plataforma de Streaming de Radio Rap Underground";

const itemName = "Barrio Beats Radio";

const itemCategory = "Rap Underground / Hip Hop";

const itemQuantity = 950; // número de oyentes actuales

const isItemAvailable = true; // la radio está transmitiendo

const currentDJ = null; // DJ invitado aún no asignado


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================

console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

console.log(`Nombre:        ${itemName}`);
console.log(`Categoría:     ${itemCategory}`);
console.log(`Oyentes:       ${itemQuantity}`);
console.log(`En vivo:       ${isItemAvailable}`);
console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================

console.log("--- Tipos de datos ---");

console.log("typeof itemName:        ", typeof itemName);
console.log("typeof itemQuantity:    ", typeof itemQuantity);
console.log("typeof isItemAvailable: ", typeof isItemAvailable);

console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================

console.log("--- Conversiones ---");

// convertir número a texto
const listenersText = String(itemQuantity);

console.log("Oyentes como texto:", listenersText);
console.log("typeof (convertido):", typeof listenersText);

console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================

console.log("--- Valor nulo ---");

console.log("DJ pendiente:", currentDJ);
console.log("typeof null:", typeof currentDJ);
console.log("¿Es null?:", currentDJ === null);

console.log("");


// ============================================
// CIERRE
// ============================================

console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");