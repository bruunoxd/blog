import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { login, createPerson } from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await login({ email, password });
      const userData = response.data.pessoa;
      
      console.log('Dados do usuário:', userData);
      
      Alert.alert('Sucesso', `Login realizado como ${userData.isTeacher ? 'Professor' : 'Aluno'}!`);
      navigation.navigate('Home', { user: userData });
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await createPerson({
        email,
        name,
        password,
        isStudent: !isTeacher,
        isTeacher: isTeacher,
      });
      Alert.alert('Sucesso', 'Conta criada! Faça login.');
      setIsRegister(false);
      setName('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog School</Text>

      {isRegister && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#64748B"
            value={name}
            onChangeText={setName}
          />
          
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, !isTeacher && styles.roleButtonActive]}
              onPress={() => setIsTeacher(false)}
            >
              <Text style={[styles.roleText, !isTeacher && styles.roleTextActive]}>
                Aluno
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, isTeacher && styles.roleButtonActive]}
              onPress={() => setIsTeacher(true)}
            >
              <Text style={[styles.roleText, isTeacher && styles.roleTextActive]}>
                Professor
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#64748B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={isRegister ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isRegister ? 'Cadastrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={styles.link}>
              {isRegister ? 'Já tem conta? Entrar' : 'Criar conta'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0F172A',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 48,
    color: '#F8FAFC',
    letterSpacing: -1,
  },
  input: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  roleButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  roleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
  },
  roleTextActive: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  link: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
    fontWeight: '600',
  },
});
