import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getComments, createComment, deleteComment, updateComment } from '../services/api';

export default function PostDetailScreen({ route }: any) {
  const { post, user } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const isTeacher = user?.isTeacher || false;

  const fetchComments = async () => {
    try {
      const response = await getComments(post.id);
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Erro', 'Digite um comentário');
      return;
    }

    setSubmitting(true);
    try {
      await createComment({
        content: newComment,
        postid: post.id,
        personid: user?.id || 1,
      });
      setNewComment('');
      fetchComments();
      Alert.alert('Sucesso', 'Comentário adicionado!');
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao adicionar comentário');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteComment(commentId);
              Alert.alert('Sucesso', 'Comentário excluído!');
              fetchComments();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o comentário');
            }
          },
        },
      ]
    );
  };

  const handleEditComment = (comment: any) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      Alert.alert('Erro', 'Digite um comentário');
      return;
    }

    try {
      await updateComment(editingId!, { content: editContent });
      setEditingId(null);
      setEditContent('');
      Alert.alert('Sucesso', 'Comentário atualizado!');
      fetchComments();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o comentário');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postSection}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentários ({comments.length})</Text>

          {comments.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum comentário ainda</Text>
          ) : (
            comments.map((comment: any) => (
              <View key={comment.id} style={styles.commentCard}>
                {editingId === comment.id ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={editContent}
                      onChangeText={setEditContent}
                      multiline
                    />
                    <View style={styles.editActions}>
                      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                        <Text style={styles.saveText}>✓ Salvar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                        <Text style={styles.cancelText}>✗ Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                    <Text style={styles.commentDate}>
                      {new Date().toLocaleDateString()}
                    </Text>
                    {isTeacher && (
                      <View style={styles.commentActions}>
                        <TouchableOpacity
                          style={styles.editCommentButton}
                          onPress={() => handleEditComment(comment)}
                        >
                          <Text style={styles.actionText}>✏️ Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteCommentButton}
                          onPress={() => handleDeleteComment(comment.id)}
                        >
                          <Text style={styles.actionText}>🗑️ Excluir</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            ))
          )}

          <View style={styles.addCommentSection}>
            <TextInput
              style={styles.input}
              placeholder="Adicione um comentário..."
              placeholderTextColor="#64748B"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            {submitting ? (
              <ActivityIndicator size="small" color="#3B82F6" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Comentar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  centered: {
    padding: 40,
    alignItems: 'center',
  },
  postSection: {
    backgroundColor: '#1E293B',
    padding: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#CBD5E1',
  },
  commentsSection: {
    backgroundColor: '#1E293B',
    padding: 24,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#F8FAFC',
  },
  commentCard: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  commentContent: {
    fontSize: 15,
    marginBottom: 10,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  commentDate: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 12,
  },
  editCommentButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  deleteCommentButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  editInput: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    color: '#F8FAFC',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#60A5FA',
    marginBottom: 8,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginVertical: 24,
    fontSize: 15,
  },
  addCommentSection: {
    marginTop: 24,
  },
  input: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
