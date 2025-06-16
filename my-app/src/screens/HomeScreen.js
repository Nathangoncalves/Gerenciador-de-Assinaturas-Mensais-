import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { onSubscriptionsSnapshot } from '../services/subscriptionService';

export default function HomeScreen({ navigation }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSubscriptionsSnapshot(setSubs);
    return () => unsubscribe();
  }, []);

  const total = subs.reduce((sum, s) => sum + s.valor, 0);
  const nextOnes = subs.slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gasto Total: R$ {total.toFixed(2)}</Text>
      <Text style={styles.subtitle}>Próximas renovações:</Text>

      <FlatList
        data={nextOnes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text>R$ {item.valor.toFixed(2)}</Text>
            <Text style={styles.cardDate}>
              {new Date(item.dataRenovacao.seconds * 1000).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhuma assinatura cadastrada.</Text>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('List')}
      >
        <Text>Ver todas assinaturas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginTop: 16, fontSize: 18 },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    ...Platform.select({
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
      },
    }),
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDate: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 20 },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 32,
    ...Platform.select({
      web: { boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 6,
      },
    }),
  },
  fabText: { color: '#fff', fontSize: 24, textAlign: 'center' },
  link: { marginTop: 16, alignSelf: 'flex-start' },
});
