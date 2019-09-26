import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [posts, setPosts] = useState([])
  
/*   useEffect(()=>{
    fetch(`http://www.omdbapi.com/?s=marvel&apikey=54a10c8c`)
    .then(response => response.json())
    .then(json => setPosts(json.Search))
  },[]);
   */
  const buscaFilmes = () =>{
    let busca = document.getElementById("titulo").value;
    console.log(busca)
     fetch(`http://www.omdbapi.com/?s=${busca}&apikey=54a10c8c`)
    .then(response => response.json())
    .then(json => setPosts(json.Search))
  };
  
  
  return (
    <>
    <input id="titulo"></input>
    <button onClick={ () => buscaFilmes() }>Busca</button>
    <ul>
      { posts && posts.map((post, idx )=>{
        return <li key={idx} >
          Title: {post.Title}<br/>
          Ano lançamento: {post.Year}<br/>
          <img src={post.Poster}></img><br></br>
          </li>

      }) }
    </ul>
    </> 
    );
  }
  
  export default App;
  