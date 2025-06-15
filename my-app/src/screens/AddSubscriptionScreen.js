import React, { useState } from 'react';
import { View, TextInput, Button, Pressable } from 'react-native';
import { createSubscription, updateSubscription } from '../services/subscriptionService';

export default function AddSubscriptionScreen({ route, navigation }) {

    const handleSave = async () => {
        const payload = { nome, valor, dataRenovacao, categoria };
        if (existing) {
            await updateSubscription(existing.id, payload);
        } else {
            await createSubscription(payload);
        }
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, padding: 16}}>
            <TextInput
            placeholder='Nome da assinatura'
            value={nome}
            onChange={setNome}
            style={{ borderBottomWidth: 1, marginBottom: 12}}
            />
            
            <TextInput
            placeholder="Valor mensal"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, marginBottom: 12}}
            />

            <TextInput 
            placeholder="Categoria"
            value={categoria}
            onChangeText={setCategoria}
            style={{ borderBottomWidth: 1, marginBottom: 12}}
            />

            <Pressable onPress={() => setShowDatePicker(true)} style={{ marginBottom: 12}}>
                <Text>Data de Renovação: {dataRenovacao.toLocaleDataString()}</Text>
            </Pressable>

            {showDatePicker && (
                <DataTinePicker
                value={dataRenovacao}
                mode="date"
                display="default"
                onChange={onChangeDate}
                />
            )}
                <Button 
                tittle={existing ? 'Atualizar Assinatura' : 'Adicionar Assinatura'}
                onPress={handleSave}
                disabled={!nome || !valor || !categoria }
                />
        </View>
    );
}