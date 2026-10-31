import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Pressao() {
  const router = useRouter();
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');

  const salvarPressao = async () => {
    if (!sys || !dia) {
      Alert.alert('Atenção', 'Preencha a pressão máxima e mínima.');
      return;
    }

    let s = Number(sys);
    let d = Number(dia);
    if (s < 30) s *= 10;
    if (d < 30) d *= 10;

    const novo = {
      tipo: 'Pressão',
      valor: `${s} / ${d} mmHg`,
      data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const historicoAnterior = await AsyncStorage.getItem('@alerta_saude_historico');
      const historico = historicoAnterior ? (JSON.parse(historicoAnterior) as Array<{ tipo: string; valor: string; data: string }>) : [];
      historico.unshift(novo);
      await AsyncStorage.setItem('@alerta_saude_historico', JSON.stringify(historico));

      Alert.alert('Sucesso 🎉', 'Medição de Pressão registrada!');
      setSys('');
      setDia('');
      router.push('/historico');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível registrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🩺 Registar Pressão Arterial</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Pressão Máxima (Sistólica)</Text>
        <TextInput style={styles.input} placeholder="Ex: 120 ou 12" keyboardType="numeric" value={sys} onChangeText={setSys} />

        <Text style={styles.label}>Pressão Mínima (Diastólica)</Text>
        <TextInput style={styles.input} placeholder="Ex: 80 ou 8" keyboardType="numeric" value={dia} onChangeText={setDia} />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvarPressao}>
          <Text style={styles.btnTexto}>REGISTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f9ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 20, borderWidth: 1.5, borderColor: '#fbcfe8' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 12, padding: 14, fontSize: 18, marginBottom: 16, backgroundColor: '#f8fafc' },
  btnSalvar: { backgroundColor: '#db2777', padding: 18, borderRadius: 14, alignItems: 'center' },
  btnTexto: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});