// src/interfaces/AuthInterfaces.ts

import { ReactNode } from 'react';

// Interface para o usuário
export interface User {
  id: number;
  username: string;
  name: string;
  photo: string;
  email: string;
  password: string;
}

// Interface para o contexto de autenticação
export interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Interface para o provedor de autenticação
export interface AuthProviderProps {
  children: ReactNode;
}
//Interface para o contexto do carrinho
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface CartContextData {
  items: CartItem[];
  getTotalItems: () => number;
  addItem: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  updateItemQuantity: (item: CartItem, id: number) => void
  clearCart: () => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface ProductsList {
  id:number;
  name: string;
  brand: string;
  price: string;
  description: string;
  image: string;
}