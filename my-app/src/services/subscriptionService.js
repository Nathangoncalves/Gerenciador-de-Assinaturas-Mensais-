import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
  
  const colRef = collection(db, 'subscriptions');
  
  // Listener em tempo real
  export function onSubscriptionsSnapshot(callback) {
    const q = query(colRef, orderBy('dataRenovacao', 'asc'));
    return onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(list);
    });
  }
  
  // Criar nova assinatura
  export async function createSubscription(data) {
    return addDoc(colRef, data);
  }
  
  // Atualizar assinatura existente
  export async function updateSubscription(id, data) {
    const ref = doc(db, 'subscriptions', id);
    return updateDoc(ref, data);
  }
  
  // Excluir assinatura
  export async function deleteSubscription(id) {
    const ref = doc(db, 'subscriptions', id);
    return deleteDoc(ref);
  }