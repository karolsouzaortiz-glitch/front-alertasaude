import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Alarme() {
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');
  const [alarmes, setAlarmes] = useState<{ id: string; titulo: string; horario: string }[]>([]);

  useEffect(() => {
    carregarAlarmes();
  }, []);

  const carregarAlarmes = async () => {
    try {
      const dados = await AsyncStorage.getItem('@alertasaude_alarmes');
      if (dados) setAlarmes(JSON.parse(dados));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os alarmes.');
    }
  };

  const salvarAlarme = async () => {
    if (!titulo || !horario) {
      Alert.alert('Atenção', 'Preencha o título e o horário do lembrete!');
      return;
    }

    const novoAlarme = { id: Date.now().toString(), titulo, horario };
    const listaAtualizada = [...alarmes, novoAlarme];

    try {
      await AsyncStorage.setItem('@alertasaude_alarmes', JSON.stringify(listaAtualizada));
      setAlarmes(listaAtualizada);
      setTitulo('');
      setHorario('');
      Alert.alert('Sucesso', 'Lembrete salvo com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar o alarme.');
    }
  };

  const removerAlarme = async (id: string) => {
    const listaFiltrada = alarmes.filter(item => item.id !== id);
    try {
      await AsyncStorage.setItem('@alertasaude_alarmes', JSON.stringify(listaFiltrada));
      setAlarmes(listaFiltrada);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível remover o lembrete.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>⏰ Lembretes & Alarmes</Text>
      <Text style={styles.subtitulo}>Agende avisos para remedios, meditação ou atividades:</Text>

      <View style={styles.cardForm}>
        <Text style={styles.label}>O que deseja lembrar?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Tomar remédio da pressão, Meditar..."
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Horário (HH:MM):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 08:00 ou 20:30"
          value={horario}
          onChangeText={setHorario}
          keyboardType="numbers-and-punctuation"
        />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvarAlarme}>
          <Text style={styles.btnTexto}>SALVAR LEMBRETE</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoLista}>Seus Lembretes Ativos</Text>
      {alarmes.length === 0 ? (
        <Text style={styles.textoVazio}>Nenhum lembrete cadastrado.</Text>
      ) : (
        alarmes.map(item => (
          <View key={item.id} style={styles.cardAlarme}>
            <View>
              <Text style={styles.alarmeHora}>🕒 {item.horario}</Text>
              <Text style={styles.alarmeTitulo}>{item.titulo}</Text>
            </View>
            <TouchableOpacity onPress={() => removerAlarme(item.id)}>
              <Text style={styles.btnExcluir}>🗑️ Excluir</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f0f9ff', paddingBottom: 20 },
  titulo: { fontSize: 24, fontWeight: '900', color: '#0f172a' },
  subtitulo: { fontSize: 14, color: '#0369a1', marginBottom: 18 },
  cardForm: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: '#bae6fd', marginBottom: 20 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 14 },
  btnSalvar: { backgroundColor: '#0284c7', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnTexto: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  secaoLista: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 10 },
  textoVazio: { color: '#64748b', fontStyle: 'italic' },
  cardAlarme: { backgroundColor: '#ffffff', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#cbd5e1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  alarmeHora: { fontSize: 18, fontWeight: '900', color: '#0284c7' },
  alarmeTitulo: { fontSize: 15, color: '#334155', marginTop: 2 },
  btnExcluir: { color: '#e11d48', fontWeight: 'bold' }
});