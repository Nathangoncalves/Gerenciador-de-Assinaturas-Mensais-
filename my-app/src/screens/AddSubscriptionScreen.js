import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  createSubscription,
  updateSubscription
} from '../services/subscriptionService';

export default function AddSubscriptionScreen({ route, navigation }) {
  const existing = route.params?.subscription;
  const [nome, setNome] = useState(existing?.nome || '');
  const [valor, setValor] = useState(existing?.valor?.toString() || '');
  const [categoria, setCategoria] = useState(existing?.categoria || '');
  const [dataRenovacao, setDataRenovacao] = useState(
    existing?.dataRenovacao
      ? new Date(existing.dataRenovacao.seconds * 1000)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    const payload = { nome, valor: parseFloat(valor), categoria, dataRenovacao };
    if (existing) await updateSubscription(existing.id, payload);
    else await createSubscription(payload);
    navigation.goBack();
  };

  const onChangeDate = (_, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDataRenovacao(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da assinatura"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Valor mensal"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
        style={styles.input}
      />

      <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateTrigger}>
        <Text>Data de Renovação: {dataRenovacao.toLocaleDateString()}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={dataRenovacao}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.buttonWrapper}>
        <Button
          title={existing ? 'Atualizar' : 'Adicionar'}
          onPress={handleSave}
          disabled={!nome || !valor || !categoria}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
    ...Platform.select({
      web: { boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' },
      default: {},
    }),
  },
  dateTrigger: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    ...Platform.select({
      web: { boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' },
      default: {},
    }),
  },
  buttonWrapper: {
    marginTop: 24,
    ...Platform.select({
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' },
      default: {},
    }),
  },
});
