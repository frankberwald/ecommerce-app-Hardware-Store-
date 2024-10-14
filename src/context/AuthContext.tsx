/**
 * Exportar:
 * - user {email, nome, id, foto}
 * - login(username, password)
 * - logout()
 *
 * Regras:
 * 1 - Criar o contexto OK
 * 2 - Criar o provider OK
 * 2.1 - Exportar as variáveis e as funcoes
 * 3 - Construir o hook personalizado (opcional) OK
 */

import { createContext, useState, useContext } from "react";
import { User, AuthContextData, AuthProviderProps } from '../interfaces/InterfaceTypes';
import axios from 'axios';
import { Alert } from 'react-native';

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.get('http://10.0.0.113:3000/users', {
                params: {
                    username: username,
                    password: password
                }
            });
            const users: User[] = response.data;

            const validUser = users.find (
                (user) => user.username === username && user.password === password
            );

            if(validUser) {
                setUser(validUser);
            } else {
                Alert.alert('Usuario ou senha incorretos');
            }
        } catch (err) {
            Alert.alert('Erro ao conectar ao servidor');
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}