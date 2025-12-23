import React, { useState, useEffect } from 'react';
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

export default function HomeScreen({ navigation, route }: any) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = route.params?.user;
  const isTeacher = user?.isTeacher || false;

  console.log('HomeScreen - Dados do usuário:', user);
  console.log('HomeScreen - É professor?', isTeacher);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleDelete = (postId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              Alert.alert('Sucesso', 'Post excluído!');
              fetchPosts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o post');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (post: any) => {
    navigation.navigate('CreatePost', { user, post, isEditing: true });
  };

  const renderPost = ({ item }: any) => (
    <View style={styles.postCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail', { post: item, user })}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.postDate}>
          {item.published ? '✓ Publicado' : '○ Rascunho'}
        </Text>
      </TouchableOpacity>
      
      {isTeacher && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.actionText}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.actionText}>🗑️ Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Posts</Text>
          {isTeacher && <Text style={styles.roleTag}>👨‍🏫 Professor</Text>}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreatePost', { user })}
        >
          <Text style={styles.addButtonText}>+ Novo Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum post ainda</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  roleTag: {
    fontSize: 12,
    color: '#60A5FA',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  postContent: {
    fontSize: 15,
    color: '#94A3B8',
    marginBottom: 12,
    lineHeight: 22,
  },
  postDate: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 50,
    fontSize: 16,
  },
});
