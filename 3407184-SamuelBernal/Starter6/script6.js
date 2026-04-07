/**
 * ============================================
 * VALIDADOR DE FORMULARIOS
 * Semana 06: Strings y RegExp Modernos
 * ============================================
 */

// ============================================
// PATRONES REGEXP
// ============================================

const patterns = {
  name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/u,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  phone: /^\+?\d{7,15}$/,

  password: {
    minLength: /^.{8,}$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    special: /[^A-Za-z0-9]/,
  },

  date:
    /^(?<day>0[1-9]|[12]\d|3[01])\/(?<month>0[1-9]|1[0-2])\/(?<year>\d{4})$/,

  postal: /^\d{5}$/,

  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
};

// ============================================
// VALIDADORES
// ============================================

const validators = {
  validateName(value) {
    const val = value.trim();

    if (!val) return { isValid: false, message: 'El nombre es obligatorio' };

    if (!patterns.name.test(val)) {
      return {
        isValid: false,
        message: 'Nombre inválido (solo letras y espacios)',
      };
    }

    return { isValid: true, message: '' };
  },

  validateEmail(value) {
    const val = value.trim();

    if (!val) return { isValid: false, message: 'El email es obligatorio' };

    if (!patterns.email.test(val)) {
      return { isValid: false, message: 'Email inválido' };
    }

    return { isValid: true, message: '' };
  },

  validatePhone(value) {
    let clean = value.replace(/[^\d+]/g, '');

    if (!clean) {
      return {
        isValid: false,
        message: 'Teléfono obligatorio',
        formatted: value,
      };
    }

    if (!patterns.phone.test(clean)) {
      return {
        isValid: false,
        message: 'Teléfono inválido',
        formatted: clean,
      };
    }

    return {
      isValid: true,
      message: '',
      formatted: formatPhoneNumber(clean),
    };
  },

  validatePassword(value) {
    let strength = 0;
    const errors = [];

    if (patterns.password.minLength.test(value)) strength++;
    else errors.push('mínimo 8 caracteres');

    if (patterns.password.uppercase.test(value)) strength++;
    else errors.push('una mayúscula');

    if (patterns.password.lowercase.test(value)) strength++;
    else errors.push('una minúscula');

    if (patterns.password.number.test(value)) strength++;
    else errors.push('un número');

    if (patterns.password.special.test(value)) strength++;
    else errors.push('un carácter especial');

    return {
      isValid: strength === 5,
      message:
        strength === 5
          ? 'Contraseña segura'
          : `Falta: ${errors.join(', ')}`,
      strength,
    };
  },

  validateConfirmPassword(password, confirm) {
    if (!confirm) {
      return {
        isValid: false,
        message: 'Confirma la contraseña',
      };
    }

    if (password !== confirm) {
      return {
        isValid: false,
        message: 'Las contraseñas no coinciden',
      };
    }

    return { isValid: true, message: '' };
  },

  validateBirthdate(value) {
    const match = value.match(patterns.date);

    if (!match) {
      return {
        isValid: false,
        message: 'Formato inválido (DD/MM/YYYY)',
        age: 0,
      };
    }

    const { day, month, year } = match.groups;

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - year;

    if (
      today.getMonth() < month - 1 ||
      (today.getMonth() === month - 1 && today.getDate() < day)
    ) {
      age--;
    }

    if (age < 18) {
      return {
        isValid: false,
        message: 'Debes ser mayor de 18',
        age,
      };
    }

    if (age > 120) {
      return {
        isValid: false,
        message: 'Edad inválida',
        age,
      };
    }

    return { isValid: true, message: '', age };
  },

  validatePostal(value) {
    if (!patterns.postal.test(value)) {
      return { isValid: false, message: 'Código postal inválido' };
    }

    return { isValid: true, message: '' };
  },

  validateUrl(value) {
    if (!value.trim()) return { isValid: true, message: '' };

    if (!patterns.url.test(value)) {
      return { isValid: false, message: 'URL inválida' };
    }

    return { isValid: true, message: '' };
  },
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

const sanitizeInput = input => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const getStrengthLevel = strength => {
  if (strength <= 1) return { class: 'weak', text: 'Débil' };
  if (strength === 2) return { class: 'fair', text: 'Regular' };
  if (strength <= 4) return { class: 'good', text: 'Buena' };
  return { class: 'strong', text: 'Fuerte' };
};

const formatPhoneNumber = phone => {
  let clean = phone.replace('+', '');

  if (clean.length >= 10) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(
      5,
      8
    )} ${clean.slice(8, 11)}`;
  }

  return phone;
};