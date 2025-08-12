import { useState } from "react";
import { db } from "./firebaseconection"; 
import {doc, setDoc} from 'firebase/firestore'

import './app.css'



function App() {
  
  const [titulo, seTitulo] = useState('');
  const [autor, setAutor] = useState('');




  
 async function handleAdd(){
    await setDoc(doc(db, "posts", "123"),{
      titulo: titulo,
      autor:autor
    }).then(()=>{

      console.log("DADOS REGISTRADOS NO BANCO!")

    }).catch((error)=>{
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
            onChange={(e)=> seTitulo(e.target.value)}

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
