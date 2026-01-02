import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreateTeacherScreen from '../screens/CreateTeacherScreen';
import EditTeacherScreen from '../screens/EditTeacherScreen';
import TeacherListScreen from '../screens/TeacherListScreen';
import CreateStudentScreen from '../screens/CreateStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import StudentListScreen from '../screens/StudentListScreen';
import AdminPostsScreen from '../screens/AdminPostsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E293B',
          },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Blog School' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: 'Criar Post' }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: 'Detalhes do Post' }}
        />
        <Stack.Screen
          name="CreateTeacher"
          component={CreateTeacherScreen}
          options={{ title: 'Cadastrar Professor' }}
        />
        <Stack.Screen
          name="EditTeacher"
          component={EditTeacherScreen}
          options={{ title: 'Editar Professor' }}
        />
        <Stack.Screen
          name="TeacherList"
          component={TeacherListScreen}
          options={{ title: 'Gerenciar Professores' }}
        />
        <Stack.Screen
          name="CreateStudent"
          component={CreateStudentScreen}
          options={{ title: 'Cadastrar Aluno' }}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
          options={{ title: 'Editar Aluno' }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{ title: 'Gerenciar Alunos' }}
        />
        <Stack.Screen
          name="AdminPosts"
          component={AdminPostsScreen}
          options={{ title: 'Gerenciar Posts' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
