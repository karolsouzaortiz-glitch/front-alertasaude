import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }
    // Entra direto na tela inicial logada
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo! 👋</Text>
      <Text style={styles.subtitulo}>Aceda à sua conta para monitorizar a sua saúde:</Text>

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btnEntrar} onPress={fazerLogin}>
        <Text style={styles.btnTextoEntrar}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCadastrar} onPress={() => router.push('/cadastro')}>
        <Text style={styles.btnTextoCadastrar}>Ainda não tem conta? <Text style={{ textDecorationLine: 'underline' }}>Cadastre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f0f9ff' },
  titulo: { fontSize: 28, fontWeight: '900', color: '#0284c7', marginBottom: 6 },
  subtitulo: { fontSize: 15, color: '#0369a1', marginBottom: 28 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#bae6fd', borderRadius: 14, padding: 14, fontSize: 16, marginBottom: 16 },
  btnEntrar: { backgroundColor: '#0284c7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  btnTextoEntrar: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  btnCadastrar: { alignItems: 'center', marginTop: 24 },
  btnTextoCadastrar: { color: '#0369a1', fontSize: 15, fontWeight: 'bold' }
});