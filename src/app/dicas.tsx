import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dicas() {
  const router = useRouter();

  const listaDicas = [
    { icone: '💧', titulo: 'Beba Muita Água', desc: 'Mantenha a hidratação diária para auxiliar os rins e a circulação.' },
    { icone: '🧂', titulo: 'Reduza o Sal', desc: 'Evite alimentos ultrasprocessados para manter a pressão sob controle.' },
    { icone: '🍬', titulo: 'Atenção ao Açúcar', desc: 'Prefira opções naturais e evite picos de glicemia.' },
    { icone: '🚶‍♂️', titulo: 'Caminhe Diariamente', desc: 'Pratique exercícios leves de 20 a 30 minutos todos os dias.' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>💡 Boas Práticas e Hábitos</Text>
      <Text style={styles.subtitulo}>Recomendações diárias para o cuidado da saúde:</Text>

      {listaDicas.map((item, index) => (
        <View key={index} style={styles.cardDica}>
          <Text style={styles.icone}>{item.icone}</Text>
          <View style={styles.boxInfo}>
            <Text style={styles.tituloDica}>{item.titulo}</Text>
            <Text style={styles.descDica}>{item.desc}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={styles.btnTextoVoltar}>← VOLTAR AO INÍCIO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f0f9ff', paddingBottom: 20 },
  titulo: { fontSize: 24, fontWeight: '900', color: '#0f172a', marginBottom: 6 },
  subtitulo: { fontSize: 14, color: '#0369a1', marginBottom: 18 },
  cardDica: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: '#bae6fd', flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 14 },
  icone: { fontSize: 36 },
  boxInfo: { flex: 1 },
  tituloDica: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  descDica: { fontSize: 13, color: '#475569', marginTop: 4 },
  btnVoltar: { backgroundColor: '#0284c7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  btnTextoVoltar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});