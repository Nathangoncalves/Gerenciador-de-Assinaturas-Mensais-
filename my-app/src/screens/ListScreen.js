// src/screens/ListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import {
  onSubscriptionsSnapshot,
  deleteSubscription
} from '../services/subscriptionService';

export default function ListScreen({ navigation }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSubscriptionsSnapshot(setSubs);
    return () => unsubscribe();
  }, []);

  // função que mostra o diálogo de confirmação
  const handleDelete = (id) => {
    Alert.alert(
      'Excluir assinatura',
      'Tem certeza que deseja remover esta assinatura?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSubscription(id);
            } catch (err) {
              console.error('Erro ao excluir:', err);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Add', { subscription: item })}
            onLongPress={() => handleDelete(item.id)}
          >
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text>R$ {item.valor.toFixed(2)}</Text>
            <Text style={styles.cardDate}>
              {new Date(item.dataRenovacao.seconds * 1000).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhuma assinatura cadastrada.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    ...Platform.select({
      web: { boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
      },
    }),
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDate: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 20 },
});
