import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { createPost, updatePost } from '../services/api';

export default function CreatePostScreen({ navigation, route }: any) {
  const { user, post, isEditing } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [isEditing, post]);

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && post) {
        await updatePost(post.id, { title, content });
        Alert.alert('Sucesso', 'Post atualizado!');
      } else {
        await createPost({
          title,
          content,
          personid: user?.id || 1,
        });
        Alert.alert('Sucesso', 'Post criado!');
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do post"
        placeholderTextColor="#64748B"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite o conteúdo do post"
        placeholderTextColor="#64748B"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {isEditing ? 'Atualizar Post' : 'Criar Post'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0F172A',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    fontSize: 16,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  textArea: {
    minHeight: 200,
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
});
