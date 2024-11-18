import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "./firebase.js";

export async function getOperacoes() {
  const col = collection(db, "operacoes");
  const snapshot = await getDocs(col);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function postOperacao(operacao) {
  try {
    await addDoc(collection(db, "operacoes"), operacao);
    return true;
  } catch (error) {
    return false;
  }
}
