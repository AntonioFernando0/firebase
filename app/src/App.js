import { useState } from "react";
import { db } from "./firebaseconection"; 
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'

import './app.css'



function App() {
  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');




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
      </div>
   </div>
  );
}

export default App;
