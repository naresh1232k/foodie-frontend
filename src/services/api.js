export const BASE_URL = "https://foodie-backend-2-yh3v.onrender.com";

const getHeaders = (isJson = true, includeAuth = true) => {
  const token = localStorage.getItem('fodie_token');
  return {
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    ...(includeAuth && token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handle = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", text);
    throw new Error(text || "Something went wrong");
  }
  return res.json();
};

// Auth
export const authAPI = {
  login: (data) => fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: getHeaders(true, false), body: JSON.stringify(data) }).then(handle),
  adminLogin: (data) => fetch(`${BASE_URL}/auth/admin/login`, { method: 'POST', headers: getHeaders(true, false), body: JSON.stringify(data) }).then(handle),
  register: (data) => fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: getHeaders(true, false), body: JSON.stringify(data) }).then(handle),
};

// Menu
export const menuAPI = {
  getAll: (category) =>
    fetch(`${BASE_URL}/menu${category ? `?category=${category}` : ''}`, {
      headers: getHeaders(true, false)
    }).then(handle),

  getById: (id) =>
    fetch(`${BASE_URL}/menu/${id}`, {
      headers: getHeaders(true, false)
    }).then(handle),

  create: (data) =>
    fetch(`${BASE_URL}/menu`, {
      method: 'POST',
      headers: getHeaders(false),
      body: data
    }).then(handle),

  update: (id, data) =>
    fetch(`${BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: getHeaders(false),
      body: data
    }).then(handle),

  delete: (id) =>
    fetch(`${BASE_URL}/menu/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handle),
};

// Orders
export const orderAPI = {
  create: (data) => fetch(`${BASE_URL}/orders`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handle),
  getMyOrders: () => fetch(`${BASE_URL}/orders/my`, { headers: getHeaders() }).then(handle),
  getAll: () => fetch(`${BASE_URL}/orders`, { headers: getHeaders() }).then(handle),
  updateStatus: (id, status) => fetch(`${BASE_URL}/orders/${id}/status`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ status }) }).then(handle),
};

// Payment
export const paymentAPI = {
  createOrder: (amount) =>
    fetch(`${BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: getHeaders(true, false),
      body: JSON.stringify({ amount })
    }).then(handle),

  verifyPayment: (data) =>
    fetch(`${BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: getHeaders(true, false),
      body: JSON.stringify(data)
    }).then(handle),
};

// Users (Admin)
export const userAPI = {
  getAll: () => fetch(`${BASE_URL}/admin/users`, { headers: getHeaders() }).then(handle),
  toggleStatus: (id) => fetch(`${BASE_URL}/admin/users/${id}/toggle`, { method: 'PUT', headers: getHeaders() }).then(handle),
};