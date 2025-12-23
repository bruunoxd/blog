import axios from 'axios';

const API_URL = 'http://192.168.0.11:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Posts
export const getPosts = () => api.get('/post/all');
export const getPost = (id: number) => api.get(`/post/${id}`);
export const createPost = (data: { title: string; content: string; personid: number }) => 
  api.post('/post', data);
export const updatePost = (id: number, data: any) => api.patch(`/post/${id}`, data);
export const deletePost = (id: number) => api.delete(`/post/${id}`);

// Comments
export const getComments = (postId: number) => api.get(`/comment/all/${postId}`);
export const createComment = (data: { content: string; postid: number; personid: number }) => 
  api.post('/comment', data);

// Person
export const login = (data: { email: string; password: string }) => 
  api.post('/person/login', data);
export const createPerson = (data: { 
  email: string; 
  name: string; 
  password: string; 
  isTeacher: boolean; 
  isStudent: boolean 
}) => api.post('/person', data);
export const updateComment = (id: number, data: any) => api.patch(`/comment/${id}`, data);
export const deleteComment = (id: number) => api.delete(`/comment/${id}`);
