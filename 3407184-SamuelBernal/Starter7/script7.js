// ============================================
// UTILIDADES
// ============================================

const generateId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

const hashPassword = password => {
  return btoa(password); // base64 simple (simulado)
};

// ============================================
// GESTIÓN DE USUARIOS
// ============================================

const registerUser = (name, email, password) => {
  if (registeredEmails.has(email)) return null;

  const user = {
    id: generateId(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  users.set(user.id, user);
  registeredEmails.add(email);

  privateData.set(user, {
    password: hashPassword(password),
  });

  userRoles.set(user.id, new Set());

  return user;
};

const getUserById = userId => {
  return users.get(userId);
};

const getAllUsers = () => {
  return Array.from(users.values());
};

const deleteUser = userId => {
  const user = users.get(userId);
  if (!user) return false;

  registeredEmails.delete(user.email);
  userRoles.delete(userId);

  logout(userId);

  users.delete(userId);

  return true;
};

// ============================================
// GESTIÓN DE ROLES
// ============================================

const assignRoles = (userId, roles) => {
  const user = users.get(userId);
  if (!user) return false;

  const validRoles = roles.filter(r => AVAILABLE_ROLES.has(r));
  if (validRoles.length === 0) return false;

  if (!userRoles.has(userId)) {
    userRoles.set(userId, new Set());
  }

  const roleSet = userRoles.get(userId);

  validRoles.forEach(r => roleSet.add(r));

  return true;
};

const getUserRoles = userId => {
  return userRoles.get(userId) || new Set();
};

const hasRole = (userId, role) => {
  return getUserRoles(userId).has(role);
};

// ============================================
// OPERACIONES DE CONJUNTOS
// ============================================

const getUsersByRole = role => {
  return getAllUsers().filter(user => hasRole(user.id, role));
};

const getUsersWithAllRoles = roles => {
  return getAllUsers().filter(user =>
    roles.every(r => hasRole(user.id, r))
  );
};

const getUsersWithAnyRole = roles => {
  return getAllUsers().filter(user =>
    roles.some(r => hasRole(user.id, r))
  );
};

const getUsersWithoutRoles = () => {
  return getAllUsers().filter(
    user => getUserRoles(user.id).size === 0
  );
};

// ============================================
// GESTIÓN DE SESIONES
// ============================================

const login = userId => {
  const user = users.get(userId);
  if (!user) return false;

  if (activeSessions.has(user)) return false;

  activeSessions.add(user);
  activeSessionIds.add(userId);

  return true;
};

const logout = userId => {
  const user = users.get(userId);
  if (!user) return false;

  if (!activeSessions.has(user)) return false;

  activeSessions.delete(user);
  activeSessionIds.delete(userId);

  return true;
};

const isLoggedIn = userId => {
  const user = users.get(userId);
  if (!user) return false;

  return activeSessions.has(user);
};

const getActiveSessionCount = () => {
  return activeSessionIds.size;
};