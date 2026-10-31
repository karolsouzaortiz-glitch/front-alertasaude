import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Usuario = {
  nome?: string;
  idade?: number | string;
  cpf?: string;
  email?: string;
  contatoEmergencia?: string;
};

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    const dados = await AsyncStorage.getItem('@alerta_saude_usuario');
    if (dados) setUsuario(JSON.parse(dados));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>👤 Meu Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.valor}>{usuario?.nome || 'Não informado'}</Text>

        <Text style={styles.label}>Idade:</Text>
        <Text style={styles.valor}>{usuario?.idade ? `${usuario.idade} anos` : 'Não informada'}</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.valor}>{usuario?.cpf || 'Não informado'}</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{usuario?.email || 'Não informado'}</Text>

        <Text style={styles.label}>Contacto de Emergência:</Text>
        <Text style={[styles.valor, { color: '#dc2626', fontWeight: 'bold' }]}>
          {usuario?.contatoEmergencia || 'Não informado'}
        </Text>
      </View>

      <TouchableOpacity style={styles.btnSair} onPress={() => router.replace('/login')}>
        <Text style={styles.btnTextoSair}>🚪 SAIR DA CONTA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f9ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 20, borderWidth: 1.5, borderColor: '#bae6fd', marginBottom: 20 },
  label: { fontSize: 14, color: '#64748b', fontWeight: 'bold', marginTop: 10 },
  valor: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginTop: 2 },
  btnSair: { backgroundColor: '#dc2626', padding: 18, borderRadius: 14, alignItems: 'center' },
  btnTextoSair: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});