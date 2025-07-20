export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
    email?: string;
  };
}

export interface PageMetadata {
  total_elements: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  metadata: PageMetadata;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface PostsResponse {
  success: boolean;
  count: number;
  data: Post[];
}

export interface PostResponse {
  success: boolean;
  data: Post;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}
