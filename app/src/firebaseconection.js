// Importa a função para inicializar o aplicativo Firebase
import { initializeApp } from 'firebase/app';

// Importa a função para acessar o Firestore, o banco de dados em tempo real do Firebase
import { getFirestore } from 'firebase/firestore';

// Configurações do Firebase, que incluem informações do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyB0zlm0dUGfVpV1NYYA8cRjeKS0qR4qonQ", // Chave da API para autenticação
  authDomain: "curso-d28bd.firebaseapp.com", // Domínio de autenticação
  projectId: "curso-d28bd", // ID do projeto
  storageBucket: "curso-d28bd.firebasestorage.app", // Bucket de armazenamento
  messagingSenderId: "940598830316", // ID do remetente de mensagens
  appId: "1:940598830316:web:a49350395b0bb0952231c9", // ID do aplicativo
  measurementId: "G-DD6FW52SW1" // ID de medição para análises
};

// Inicializa o aplicativo Firebase com a configuração fornecida
const firebaseApp = initializeApp(firebaseConfig);

// Cria uma instância do Firestore utilizando o aplicativo Firebase inicializado
const db = getFirestore(firebaseApp);

// Exporta a instância do Firestore para ser utilizada em outras partes da aplicação
export { db };