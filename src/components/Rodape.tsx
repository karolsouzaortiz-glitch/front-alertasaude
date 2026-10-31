import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const itens = [
  { rota: '/', icone: '🏠', titulo: 'Início' },
  { rota: '/historico', icone: '📊', titulo: 'Histórico' },
  { rota: '/alarme', icone: '⏰', titulo: 'Alarmes' },
  { rota: '/dicas', icone: '💡', titulo: 'Dicas' },
  { rota: '/perfil', icone: '👤', titulo: 'Perfil' },
] as const;

export default function Rodape() {
  const router = useRouter();

  return (
    <View style={styles.rodape}>
      {itens.map((item) => (
        <TouchableOpacity
          key={item.rota}
          style={styles.botao}
          onPress={() => router.push(item.rota)}
          accessibilityRole="button"
          accessibilityLabel={item.titulo}
        >
          <Text style={styles.icone}>{item.icone}</Text>
          <Text style={styles.titulo}>{item.titulo}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#bae6fd',
  },
  botao: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  icone: { fontSize: 20 },
  titulo: { fontSize: 11, color: '#0369a1', fontWeight: 'bold' },
});