import React, { useState, useEffect, useCallback } from 'react';
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
import { getTeachers, deletePerson } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function TeacherListScreen({ navigation, route }: any) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = route.params || {};

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de professores');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchTeachers();
  };

  const handleEdit = (teacher: any) => {
    navigation.navigate('EditTeacher', { user, teacher });
  };

  const handleDelete = (teacher: any) => {
    // Não permitir excluir a si mesmo
    if (teacher.id === user?.id) {
      Alert.alert('Atenção', 'Você não pode excluir sua própria conta');
      return;
    }

    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o professor "${teacher.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePerson(teacher.id);
              Alert.alert('Sucesso', 'Professor excluído com sucesso!');
              fetchTeachers();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o professor');
            }
          },
        },
      ]
    );
  };

  const renderTeacher = ({ item }: any) => (
    <View style={styles.teacherCard}>
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName}>{item.name}</Text>
        <Text style={styles.teacherEmail}>{item.email}</Text>
        {item.id === user?.id && (
          <View style={styles.youBadge}>
            <Text style={styles.youBadgeText}>Você</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.deleteButton,
            item.id === user?.id && styles.deleteButtonDisabled
          ]}
          onPress={() => handleDelete(item)}
          disabled={item.id === user?.id}
        >
          <Text style={[
            styles.deleteButtonText,
            item.id === user?.id && styles.deleteButtonTextDisabled
          ]}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.headerTitle}>Professores</Text>
          <Text style={styles.headerSubtitle}>
            {teachers.length} {teachers.length === 1 ? 'professor cadastrado' : 'professores cadastrados'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTeacher', { user })}
        >
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={teachers}
        renderItem={renderTeacher}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum professor cadastrado</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateTeacher', { user })}
            >
              <Text style={styles.emptyButtonText}>Cadastrar Professor</Text>
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
    backgroundColor: '#059669',
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
  teacherCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  teacherInfo: {
    marginBottom: 16,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  teacherEmail: {
    fontSize: 14,
    color: '#94A3B8',
  },
  youBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  youBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
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
  deleteButtonDisabled: {
    borderColor: '#475569',
    opacity: 0.5,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  deleteButtonTextDisabled: {
    color: '#475569',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 16,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#3B82F6',
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
