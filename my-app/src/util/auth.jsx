const API_URL = 'http://localhost:5000/api';

export async function signup(username, password) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.success && data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getProtectedResource() {
  const address = "/protected"    

  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getColleges() {
  const address = "/get_colleges"    

  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}