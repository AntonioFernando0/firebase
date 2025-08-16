import { useState } from "react";
import { db } from "./firebaseconection"; 
import {doc,collection, addDoc, setDoc, getDoc, getDocs} from 'firebase/firestore'

import './app.css'



function App() {
  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [post, setPosts] = useState([]);




// ESSA AQUI É UMA FORMA DE FAZER, PORÉM SEMPRE FICA SOBREESCREVENDO UM ARQUIVO OU DADOS.  
// async function handleAdd(){
//    await setDoc(doc(db, "posts", "123"),{
//      titulo: titulo,
//      autor:autor
//    }).then(()=>{

//      console.log("DADOS REGISTRADOS NO BANCO!")

 //   }).catch((error)=>{
 //     console.log("GEROU ERRO" + error)
 //   })
 // }


 async function handleAdd(){
  await addDoc(collection(db, "posts"), {
    titulo: titulo,
    autor:autor,
  }).then(( )=> {
    console.log("DADOS REGISTRADOS NO BANCO!")
    setAutor('')
    setTitulo('')  
    

  })
      .catch(( error)=> {
      console.log("GEROU ERRO" + error)
  })
  };

  // ESSA É UMA FORMA DE BUSCAR O ITEM NO BANCO DE DADOS
  /* async function buscarPost(){

    const posRef = doc(db, "posts", "123")

    await getDoc(posRef)
    .then((snapshot)=>{
      setAutor(snapshot.data().autor);
      setTitulo(snapshot.data().titulo);
    }).catch((error) => {
       console.log("GEROU ERRO" + error)
    })
  } */


    async function buscarPost(){;
      const posRef = collection(db, "posts")
      await getDocs(posRef)
      .then((snapshot)=>{

          let lista = [];
          
          snapshot.forEach((doc)=>{
            lista.push({
              id: doc.id,
              titulo: doc.data().titulo,
              autor: doc.data().autor,

            })
          })

          setPosts(lista);
      }).catch((error)=>
      alert("ERRO"))
    }
 return (
   <div>
      <h1>ReactJS + Firebase :) </h1>



      <div className="container">
        <label> Título </label>

          <textarea
            type="text"
            placeholder="Digite o titulo"
            value={titulo}
            onChange={(e)=> setTitulo(e.target.value)}

          />
        

        <label> Autor </label>

          <input
            type="text"
            placeholder="Autor do post"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        

        <button onClick={handleAdd} >Cadastrar</button>
         <button onClick={buscarPost}>
          Buscar post
         </button>
         <ul>
          {post.map((post)=> {
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span>  <br/> <br/>
              </li>
            )
          }
          
          )}
         </ul>
      </div>
   </div>
  );
}

export default App;
