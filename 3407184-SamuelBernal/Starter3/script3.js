// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Dominio: Plataforma de Streaming de Radio Rap Underground
// Emisora: Barrio Beats Radio
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Constantes basadas en la ficha de la Semana 02
const TICKETS_EVENTO_RAP = 25000;    // Precio entrada a evento virtual
const CAPACIDAD_MAX_SERVER = 1500;   // Límite de oyentes del servidor
const PUBLICIDAD_POR_MINUTO = 1200;  // Pago por publicidad underground
const COSTO_MANTENIMIENTO = 50000;   // Gasto fijo operativo

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones de Barrio Beats ===");

const oyentesActuales = 950; // Dato de la semana 2
const minutosPublicidad = 15;

// Cálculo de ingresos publicitarios
const ingresosPublicidad = PUBLICIDAD_POR_MINUTO * minutosPublicidad;
console.log("Ingresos por publicidad hoy: $" + ingresosPublicidad);

// Cálculo de espacio en el servidor
const espaciosDisponibles = CAPACIDAD_MAX_SERVER - oyentesActuales;
console.log("Cupos disponibles en el streaming:", espaciosDisponibles);

// Cálculo de balance tras costos
const balanceNeto = ingresosPublicidad - COSTO_MANTENIMIENTO;
console.log("Balance tras gastos operativos: $" + balanceNeto);

console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Acumulado de Donaciones (Caja) ===");

let fondoRadio = 0;
console.log("Fondo inicial:", fondoRadio);

fondoRadio += 15000; // Donación de un oyente fiel
console.log("Tras primera donación:", fondoRadio);

fondoRadio += 35000; // Venta de una gorra oficial
console.log("Tras venta de merch:", fondoRadio);

fondoRadio *= 0.95; // Descuento del 5% por comisión de plataforma
console.log("Fondo neto (tras comisión 5%):", fondoRadio);

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones de Seguridad ===");

const esUnderground = true;
const estaActiva = true; // isItemAvailable de semana 2

// Validación de saturación
const estaSaturado = oyentesActuales === CAPACIDAD_MAX_SERVER;
console.log("¿Servidor lleno al 100%?", estaSaturado);

// Validación de audiencia mínima para sorteo
const alcanzaMinimoSorteo = oyentesActuales >= 500;
console.log("¿Supera los 500 oyentes para el sorteo?", alcanzaMinimoSorteo);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones de Transmisión ===");

const tieneDJ = false; // currentDJ de semana 2 era null
const tienePlaylist = true;

// Solo se puede transmitir si está activa Y (tiene DJ o tiene Playlist)
const puedeTransmitir = estaActiva && (tieneDJ || tienePlaylist);
console.log("¿Puede emitir señal?", puedeTransmitir);

// Alerta de "Prime Time" Underground
const esHoraPico = oyentesActuales > 900 && estaActiva;
console.log("¿Estamos en Prime Time de Barrio Beats?", esHoraPico);

// Estado de mantenimiento
const modoMantenimiento = false;
const señalAlAire = !modoMantenimiento && estaActiva;
console.log("¿La señal está limpia al aire?", señalAlAire);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen de Barrio Beats Radio ===");
console.log("Emisora:", "Barrio Beats Radio");
console.log("Audiencia actual:", oyentesActuales, "oyentes");
console.log("Carga del servidor:", ((oyentesActuales/CAPACIDAD_MAX_SERVER)*100).toFixed(2) + "%");
console.log("Fondo disponible en caja: $" + fondoRadio.toFixed(2));

console.log("");