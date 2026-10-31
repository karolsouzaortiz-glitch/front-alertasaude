import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const usuario = { nome, email, senha };

    try {
      await AsyncStorage.setItem('@alertasaude_usuario', JSON.stringify(usuario));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/') }
      ]);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o cadastro.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Criar Conta ➕</Text>
      <Text style={styles.subtitulo}>Preencha os dados abaixo para se cadastrar:</Text>

      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry value={senha} onChangeText={setSenha} />

      <TouchableOpacity style={styles.btnPrincipal} onPress={realizarCadastro}>
        <Text style={styles.btnTexto}>CONCLUIR CADASTRO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={styles.btnTextoVoltar}>← Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#f0f9ff', justifyContent: 'center' },
  titulo: { fontSize: 28, fontWeight: '900', color: '#0284c7', marginBottom: 6 },
  subtitulo: { fontSize: 15, color: '#0369a1', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#bae6fd', borderRadius: 14, padding: 14, fontSize: 16, marginBottom: 16 },
  btnPrincipal: { backgroundColor: '#0284c7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  btnTexto: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  btnVoltar: { alignItems: 'center', marginTop: 20 },
  btnTextoVoltar: { color: '#0369a1', fontSize: 15, fontWeight: 'bold' }
});