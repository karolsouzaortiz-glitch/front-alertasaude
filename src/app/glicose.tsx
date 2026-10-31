import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Glicose() {
  const router = useRouter();
  const [valorGlicose, setValorGlicose] = useState('');

  const salvarGlicose = async () => {
    if (!valorGlicose) {
      Alert.alert('Atenção', 'Digite o valor da sua glicose.');
      return;
    }

    const novo = {
      tipo: 'Glicose',
      valor: `${valorGlicose} mg/dL`,
      data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const historicoAnterior = await AsyncStorage.getItem('@alerta_saude_historico');
      const historico = historicoAnterior ? (JSON.parse(historicoAnterior) as Array<{ tipo: string; valor: string; data: string }>) : [];
      historico.unshift(novo);
      await AsyncStorage.setItem('@alerta_saude_historico', JSON.stringify(historico));

      Alert.alert('Sucesso 🎉', 'Medição de Glicose registrada!');
      setValorGlicose('');
      router.push('/historico');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível registrar a medição.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🩸 Registar Glicose</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Valor da Glicose (mg/dL)</Text>
        <TextInput style={styles.input} placeholder="Ex: 105" keyboardType="numeric" value={valorGlicose} onChangeText={setValorGlicose} />
        <TouchableOpacity style={styles.btnSalvar} onPress={salvarGlicose}>
          <Text style={styles.btnTexto}>REGISTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f9ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 20, borderWidth: 1.5, borderColor: '#bae6fd' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 12, padding: 14, fontSize: 18, marginBottom: 16, backgroundColor: '#f8fafc' },
  btnSalvar: { backgroundColor: '#0284c7', padding: 18, borderRadius: 14, alignItems: 'center' },
  btnTexto: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});