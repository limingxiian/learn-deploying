// src/hooks/useAuth.ts
import { useState, useContext, createContext } from 'react';

export interface User {
  id: string;
  name: string;
  roles: string[];
  avatar?: string;
}

export interface AuthContextType {
  isLogin: boolean;
  isLoading: boolean;
  userInfo?: User;
  login: (credentials: { 
    username: string; 
    password: string 
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);