import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { getPosts, deletePost } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function AdminPostsScreen({ navigation, route }: any) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = route.params || {};

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de postagens');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    navigation.navigate('CreatePost', { user, post, isEditing: true });
  };

  const handleDelete = (post: any) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir a postagem "${post.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(post.id);
              Alert.alert('Sucesso', 'Postagem excluída com sucesso!');
              fetchPosts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a postagem');
            }
          },
        },
      ]
    );
  };

  const handleViewDetails = (post: any) => {
    navigation.navigate('PostDetail', { post, user });
  };

  const renderPost = ({ item, index }: any) => (
    <View style={styles.postCard}>
      <TouchableOpacity onPress={() => handleViewDetails(item)}>
        <View style={styles.postHeader}>
          <Text style={styles.postNumber}>#{index + 1}</Text>
          <View style={[
            styles.statusBadge,
            item.published ? styles.publishedBadge : styles.draftBadge
          ]}>
            <Text style={[
              styles.statusText,
              item.published ? styles.publishedText : styles.draftText
            ]}>
              {item.published ? '✓ Publicado' : '○ Rascunho'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content || 'Sem conteúdo'}
        </Text>
        
        {item.person && (
          <Text style={styles.postAuthor}>
            ✍️ Autor: {item.person.name || 'Desconhecido'}
          </Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleViewDetails(item)}
        >
          <Text style={styles.viewButtonText}>👁️ Ver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Gerenciar Posts</Text>
          <Text style={styles.headerSubtitle}>
            {posts.length} {posts.length === 1 ? 'postagem' : 'postagens'} no sistema
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreatePost', { user })}
        >
          <Text style={styles.addButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#F59E0B"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>Nenhuma postagem encontrada</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreatePost', { user })}
            >
              <Text style={styles.emptyButtonText}>Criar Primeira Postagem</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  list: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  publishedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  draftBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  publishedText: {
    color: '#10B981',
  },
  draftText: {
    color: '#F59E0B',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 12,
  },
  postAuthor: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#64748B',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60A5FA',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 16,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});
