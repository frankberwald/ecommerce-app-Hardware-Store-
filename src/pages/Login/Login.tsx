// App.tsx

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';


export default function App() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
    } catch (error) {
      Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image
        style={styles.logo}
        source={require('../../../assets/newlogo.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={username}
          placeholder='Insira seu nome de usuário'
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Insira sua senha"
            secureTextEntry={!showPassword} // Controla se a senha é mostrada ou não
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
              style={styles.eyeIcon} // Estilo para o ícone
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  logo: {
    width: '100%',
    height: '45%',
    position: 'relative',
    bottom: 90
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    bottom: 50
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10
  },
  passwordContainer: {
    position: 'relative', // Para posicionar o ícone de forma absoluta
  },
  eyeIcon: {
    position: 'relative',
    left: 315, // Coloca o ícone na extremidade direita
    bottom: 38, // Centraliza o ícone verticalmente
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#435064'
  }
});
