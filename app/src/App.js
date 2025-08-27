// Importa o useState do React para manipular estados (variáveis reativas dentro do componente)
import { useState } from "react";

// Importa a conexão do Firebase (sua configuração está em firebaseconection.js)
import { db } from "./firebaseconection"; 

// Importa funções da biblioteca Firestore que permitem criar, buscar e atualizar dados
import { doc, collection, addDoc, setDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

// Importa o CSS do componente
import './app.css'


function App() {
  // Estados do React para controlar os valores dos inputs e lista de posts
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [post, setPosts] = useState([]); // Guarda a lista de posts vindos do banco
  const [idpost, setIdpost] = useState(''); // Guarda o ID do post que será atualizado


  // ---------------------------------------------------------------------------
  // INSERIR UM NOVO POST NO BANCO DE DADOS
  // ---------------------------------------------------------------------------
  async function handleAdd(){
    // addDoc cria um documento automático dentro da coleção "posts"
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("DADOS REGISTRADOS NO BANCO!");
      // Limpa os inputs após salvar
      setAutor('');
      setTitulo('');  
    })
    .catch((error)=> {
      console.log("GEROU ERRO: " + error)
    })
  };

  
  // ---------------------------------------------------------------------------
  // BUSCAR POSTS NO BANCO DE DADOS
  // ---------------------------------------------------------------------------
  async function buscarPost(){
    // "collection" pega a referência da coleção "posts"
    const posRef = collection(db, "posts")

    await getDocs(posRef) // busca todos os documentos dentro da coleção
    .then((snapshot)=>{
        let lista = [];
        
        // percorre cada documento retornado do Firestore
        snapshot.forEach((doc)=>{
          lista.push({
            id: doc.id, // ID gerado automaticamente pelo Firebase
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(lista); // atualiza o estado "post" com a lista de dados
    })
    .catch((error)=> alert("ERRO AO BUSCAR POSTS"))
  }


  // ---------------------------------------------------------------------------
  // EDITAR UM POST EXISTENTE
  // ---------------------------------------------------------------------------
  async function editarPost(){
    // Pega a referência de um documento específico pelo ID digitado
    const docRef = doc(db, "posts", idpost)

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() =>{
      console.log("Atualização concluída!");
      setAutor('')
      setTitulo('')  
    })
    .catch((error)=>{
      alert("ERRO AO ATUALIZAR O POST!")
    });
  }


  // ---------------------------------------------------------------------------
  // PARTE VISUAL (JSX)
  // ---------------------------------------------------------------------------
  return (
   <div>
      <h1>ReactJS + Firebase :) </h1>

      <div className="container">

        {/* Input para digitar o ID de um post existente (usado para atualizar) */}
        <label> ID do post</label>
        <input
          placeholder="Digite o ID do post"
          value={idpost}
          onChange={(e)=> setIdpost(e.target.value)}
        />

        <br/> <br/>

        {/* Textarea para digitar o título do post */}
        <label> Título </label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e)=> setTitulo(e.target.value)}
        />

        {/* Input para digitar o autor do post */}
        <label> Autor </label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        {/* Botões para cadastrar, buscar e atualizar posts */}
        <button onClick={handleAdd}>Cadastrar</button>
        <br/>
        <button onClick={buscarPost}>Buscar post</button>
        <br/>
        <button onClick={editarPost}>Atualizar post</button>

        {/* Lista de posts retornados do Firestore */}
        <ul>
          {post.map((post)=> {
            return(
              <li key={post.id}>
                <span>Id: {post.id}</span> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/> <br/>
              </li>
            )
          })}
        </ul>
      </div>
   </div>
  );
}

export default App;
