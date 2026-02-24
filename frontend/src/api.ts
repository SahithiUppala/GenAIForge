import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string) => {
    const response = await api.post('/register', { email, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/me');
    return response.data;
  },
};

// Workspace API
export const workspaceAPI = {
  create: async (name: string) => {
    const response = await api.post('/workspace/create', { name });
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/workspace/my');
    return response.data;
  },
};

// Papers API
export const papersAPI = {
  search: async (query: string) => {
    const response = await api.get(`/papers/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  import: async (paperData: any) => {
    const response = await api.post('/papers/import', paperData);
    return response.data;
  },
  
  getByWorkspace: async (workspaceId: number) => {
    const response = await api.get(`/papers/workspace/${workspaceId}`);
    return response.data;
  },
  
  getWorkspacePapers: async (workspaceId: number) => {
    const response = await api.get(`/papers/workspace/${workspaceId}`);
    return response.data;
  },
  
  delete: async (paperId: number) => {
    const response = await api.delete(`/papers/${paperId}`);
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  sendMessage: async (message: string, workspaceId?: number, conversationId?: number) => {
    const params = new URLSearchParams();
    if (workspaceId) params.append('workspace_id', workspaceId.toString());
    if (conversationId) params.append('conversation_id', conversationId.toString());
    
    const url = `/chat?${params.toString()}`;
    const response = await api.post(url, { content: message });
    return response.data;
  },
  
  getConversations: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },
  
  getMessages: async (conversationId: number) => {
    const response = await api.get(`/conversation/${conversationId}/messages`);
    return response.data;
  },
  
  deleteConversation: async (conversationId: number) => {
    const response = await api.delete(`/conversation/${conversationId}`);
    return response.data;
  },
};

export default api;

