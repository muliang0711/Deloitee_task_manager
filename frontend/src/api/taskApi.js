const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message ?? 'The request failed.')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const taskApi = {
  listTasks() {
    return request('/tasks')
  },
  createTask(payload) {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  updateTask(id, payload) {
    return request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
  deleteTask(id) {
    return request(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
}
