const API_URL = 'http://localhost:5004/api';

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

export async function fileUpload(file, username) {

  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("school", username);

  const response = await fetch(`${API_URL}/upload_file`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });
  return response.json();
}

export async function send_message(message) {
  const address = "/send_chat"    
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({message}),
  });
  const data = await response.json();
  return data.reply;
}

export async function set_me_data(data) {
  const address = "/set_me_data"    
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  return resp;
}

export async function get_me_data() {
  const address = "/get_me_data"    
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET',
  });
  const resp = await response.json();
  return resp;
}


export async function start_chat() {
  const address = "/start_chat"    
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}` + address, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET',
  });
  const resp = await response.json();
  console.log(resp)
  return resp.reply;
}

export async function addCollege(schoolName) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const response = await fetch(`${API_URL}/add_college`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      college: schoolName,
    }),
  });

  const data = await response.json();
  return data;
}

