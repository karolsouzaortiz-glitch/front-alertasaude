import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type HistoricoItem = {
  tipo: string;
  valor: string;
  data: string;
};

export default function Historico() {
  const [lista, setLista] = useState<HistoricoItem[]>([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    const dados = await AsyncStorage.getItem('@alerta_saude_historico');
    if (dados) setLista(JSON.parse(dados));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📊 Histórico de Medições</Text>

      {lista.length === 0 ? (
        <Text style={styles.vazio}>Nenhum registo armazenado ainda.</Text>
      ) : (
        lista.map((item, index) => (
          <View key={index} style={styles.cardItem}>
            <Text style={styles.icone}>{item.tipo === 'Glicose' ? '🩸' : '🩺'}</Text>
            <View style={styles.info}>
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text style={styles.valor}>{item.valor}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f9ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  vazio: { fontSize: 16, color: '#64748b', textAlign: 'center', marginTop: 30 },
  cardItem: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: '#bae6fd', flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 14 },
  icone: { fontSize: 28 },
  info: { flex: 1 },
  tipo: { fontSize: 14, color: '#64748b', fontWeight: 'bold' },
  valor: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  data: { fontSize: 12, color: '#94a3b8', marginTop: 2 }
});