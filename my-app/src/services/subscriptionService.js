import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

const colRef = collection(db, 'subscriptions');

export function onSubscriptionsSnapshot(onNext) {
    const q = query(colRef, orderBy('dataRenovacao', 'asc'));
    return onSnapshot(q, snap => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        onNext(list);
    });
}

export async function createSubscription(data) {
    return addDoc(colRef, data);
}

export async function  updateSubscription(id, data) {
    const ref = doc(db, 'subscriptions', id);
    return updateDoc(ref, data);
}

export async function  deleteSubscription(id) {
    const ref = doc(db, 'subscriptions', id);
    return deleteDoc(ref);
}