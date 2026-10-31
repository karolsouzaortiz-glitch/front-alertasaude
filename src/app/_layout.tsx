import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function Layout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* CABEÇALHO SUPERIOR FIXO */}
        <View style={styles.header}>
          <Text style={styles.logoText}>
            Alerta<Text style={styles.logoDestaque}>Saúde ➕</Text>
          </Text>
        </View>

        {/* NAVEGAÇÃO DE TELAS (SEM RODAPÉ AQUI) */}
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#f0f9ff' }
            }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="index" />
            <Stack.Screen name="glicose" />
            <Stack.Screen name="pressao" />
            <Stack.Screen name="dicas" />
            <Stack.Screen name="historico" />
            <Stack.Screen name="alarme" />
            <Stack.Screen name="contatos" />
            <Stack.Screen name="perfil" />
          </Stack>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  content: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#bae6fd',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0284c7' },
  logoDestaque: { color: '#e11d48' }
});