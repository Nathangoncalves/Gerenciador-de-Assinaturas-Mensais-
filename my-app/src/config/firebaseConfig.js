import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            'AbcdEfGhIjKlmNoPqRsTuVwXyZ1234567890',           
  authDomain:        'meu-projeto-12345.firebaseapp.com',           
  projectId:         'meu-projeto-12345',                            
  storageBucket:     'meu-projeto-12345.appspot.com',
  messagingSenderId: '012345678901',
  appId:             '1:012345678901:web:abcdef1234567890',
};

console.log('🔥 firebaseConfig:', firebaseConfig);  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
