import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Contatos() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [contatos, setContatos] = useState<{ id: string; nome: string; telefone: string; parentesco: string }[]>([]);

  useEffect(() => {
    carregarContatos();
  }, []);

  const carregarContatos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@alertasaude_contatos');
      if (dados) setContatos(JSON.parse(dados));
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar contatos.');
    }
  };

  const salvarContato = async () => {
    if (!nome || !telefone) {
      Alert.alert('Atenção', 'Informe pelo menos o nome e o telefone.');
      return;
    }

    const novoContato = { id: Date.now().toString(), nome, telefone, parentesco: parentesco || 'Contato' };
    const listaAtualizada = [...contatos, novoContato];

    try {
      await AsyncStorage.setItem('@alertasaude_contatos', JSON.stringify(listaAtualizada));
      setContatos(listaAtualizada);
      setNome('');
      setTelefone('');
      setParentesco('');
      Alert.alert('Sucesso', 'Contato adicionado!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o contato.');
    }
  };

  const removerContato = async (id: string) => {
    const listaFiltrada = contatos.filter(item => item.id !== id);
    try {
      await AsyncStorage.setItem('@alertasaude_contatos', JSON.stringify(listaFiltrada));
      setContatos(listaFiltrada);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível remover o contato.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📞 Contatos de Emergência</Text>
      <Text style={styles.subtitulo}>Cadastre telefones de familiares, médicos ou vizinhos:</Text>

      <View style={styles.cardForm}>
        <Text style={styles.label}>Nome do Contato:</Text>
        <TextInput style={styles.input} placeholder="Ex: Dra. Ana (Cardiologista)" value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Telefone / Celular:</Text>
        <TextInput style={styles.input} placeholder="Ex: (11) 99999-8888" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

        <Text style={styles.label}>Vínculo (Opcional):</Text>
        <TextInput style={styles.input} placeholder="Ex: Filho, Médico, Vizinho" value={parentesco} onChangeText={setParentesco} />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvarContato}>
          <Text style={styles.btnTexto}>ADICIONAR CONTATO</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoLista}>Lista de Contatos</Text>
      {contatos.length === 0 ? (
        <Text style={styles.textoVazio}>Nenhum contato cadastrado.</Text>
      ) : (
        contatos.map(item => (
          <View key={item.id} style={styles.cardContato}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nomeContato}>{item.nome}</Text>
              <Text style={styles.subContato}>{item.parentesco} • {item.telefone}</Text>
            </View>
            <View style={styles.acoesContato}>
              <TouchableOpacity style={styles.btnLigar} onPress={() => Linking.openURL(`tel:${item.telefone}`)}>
                <Text style={styles.txtLigar}>📞 Ligar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerContato(item.id)}>
                <Text style={styles.btnExcluir}>🗑️</Text>
              </TouchableOpacity>
            </View>
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
  cardContato: { backgroundColor: '#ffffff', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#cbd5e1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nomeContato: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  subContato: { fontSize: 13, color: '#64748b', marginTop: 2 },
  acoesContato: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btnLigar: { backgroundColor: '#22c55e', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  txtLigar: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  btnExcluir: { fontSize: 18 }
});