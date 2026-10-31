import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Rodape() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.rodape, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <TouchableOpacity style={styles.btnRodape} onPress={() => router.push('/')}>
        <Text style={styles.iconeRodape}>🏠</Text>
        <Text style={styles.textoRodape}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRodape} onPress={() => router.push('/historico')}>
        <Text style={styles.iconeRodape}>📊</Text>
        <Text style={styles.textoRodape}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRodape} onPress={() => router.push('/alarme')}>
        <Text style={styles.iconeRodape}>⏰</Text>
        <Text style={styles.textoRodape}>Alarmes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRodape} onPress={() => router.push('/dicas')}>
        <Text style={styles.iconeRodape}>💡</Text>
        <Text style={styles.textoRodape}>Dicas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRodape} onPress={() => router.push('/perfil')}>
        <Text style={styles.iconeRodape}>👤</Text>
        <Text style={styles.textoRodape}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#bae6fd',
    paddingTop: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnRodape: { alignItems: 'center', justifyContent: 'center' },
  iconeRodape: { fontSize: 20 },
  textoRodape: { fontSize: 11, color: '#0369a1', fontWeight: 'bold', marginTop: 2 }
});