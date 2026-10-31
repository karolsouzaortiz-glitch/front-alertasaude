import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Rodape from './rodape';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.screenWrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.saudacao}>Olá! 👋</Text>
        <Text style={styles.subtitulo}>O que deseja registrar ou consultar agora?</Text>

        <Text style={styles.secaoTitulo}>Medições de Saúde</Text>
        
        <TouchableOpacity 
          style={[styles.btnAtalho, { backgroundColor: '#e0f2fe', borderColor: '#0284c7' }]} 
          onPress={() => router.push('/glicose')}
        >
          <Text style={styles.iconeAtalho}>🩸</Text>
          <View style={styles.infoBox}>
            <Text style={[styles.tituloAtalho, { color: '#0369a1' }]}>Glicose (Açúcar)</Text>
            <Text style={styles.subtituloAtalho}>Registrar medição diária</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnAtalho, { backgroundColor: '#ffe4e6', borderColor: '#e11d48' }]} 
          onPress={() => router.push('/pressao')}
        >
          <Text style={styles.iconeAtalho}>🫀</Text>
          <View style={styles.infoBox}>
            <Text style={[styles.tituloAtalho, { color: '#be123c' }]}>Pressão Arterial</Text>
            <Text style={styles.subtituloAtalho}>Registrar sistólica e diastólica</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.secaoTitulo}>Ferramentas & Cuidados</Text>

        <TouchableOpacity 
          style={[styles.btnAtalho, { backgroundColor: '#fef3c7', borderColor: '#d97706' }]} 
          onPress={() => router.push('/alarme')}
        >
          <Text style={styles.iconeAtalho}>⏰</Text>
          <View style={styles.infoBox}>
            <Text style={[styles.tituloAtalho, { color: '#b45309' }]}>Lembretes & Alarmes</Text>
            <Text style={styles.subtituloAtalho}>Remédios, meditação, caminhada...</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnAtalho, { backgroundColor: '#f3e8ff', borderColor: '#9333ea' }]} 
          onPress={() => router.push('/contatos')}
        >
          <Text style={styles.iconeAtalho}>📞</Text>
          <View style={styles.infoBox}>
            <Text style={[styles.tituloAtalho, { color: '#6b21a8' }]}>Contatos de Emergência</Text>
            <Text style={styles.subtituloAtalho}>Cadastrar e ligar para telefones úteis</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnAtalho, { backgroundColor: '#e0e7ff', borderColor: '#4338ca' }]} 
          onPress={() => router.push('/dicas')}
        >
          <Text style={styles.iconeAtalho}>💡</Text>
          <View style={styles.infoBox}>
            <Text style={[styles.tituloAtalho, { color: '#3730a3' }]}>Boas Práticas e Hábitos</Text>
            <Text style={styles.subtituloAtalho}>Dicas de hidratação, sal e rotina</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* RODAPÉ CARREGADO APENAS APÓS ESTAR LOGADO */}
      <Rodape />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: '#f0f9ff' },
  container: { flexGrow: 1, padding: 20 },
  saudacao: { fontSize: 26, fontWeight: '900', color: '#0f172a' },
  subtitulo: { fontSize: 15, color: '#0369a1', marginBottom: 20 },
  secaoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#334155', marginTop: 15, marginBottom: 10 },
  btnAtalho: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2
  },
  iconeAtalho: { fontSize: 32, marginRight: 14 },
  infoBox: { flex: 1 },
  tituloAtalho: { fontSize: 17, fontWeight: 'bold' },
  subtituloAtalho: { fontSize: 13, color: '#475569', marginTop: 2 }
});