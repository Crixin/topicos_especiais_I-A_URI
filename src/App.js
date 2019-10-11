import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

function App() {
  
  const [posts, setPosts] = useState([])
  const [favoritos, setfavoritos] = useState([])

  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const curtidas = posts.filter(post => post.like).length;
    setLikes(curtidas);
  }, [posts])

  const buscaFilmes = () =>{
    let busca = document.getElementById("titulo").value;
    fetch(`http://www.omdbapi.com/?s=${busca}&apikey=54a10c8c`)
    .then(response => response.json())
    .then(json => setPosts(json.Search))
  };
  
  const handleClick = (id) => {
    const novosPosts = posts.map(post => {
      if(post.imdbID === id){

        if(!post.like) {
          favoritos.push(post) 
          console.log(favoritos)
        } else{
          var index = -1;
          favoritos.map(function(el, i){
            if(el.imdbID == post.imdbID) {
              index = i;
            }
          });
          favoritos.splice(index, 1);
        }
      }
      return post.imdbID === id ? {...post, like: !post.like} : post;
    });

    setPosts(novosPosts);
  }
  
  const addFav = (id) => {
    setfavoritos(id);
  }
  
  return (
    <>
      
      <Container maxWidth="sm">
        <Input id="titulo"></Input>
        <Button variant="contained" color="primary"  onClick={ () => buscaFilmes() }>
        Busca
        </Button>
      </Container>
        
      <div style={{float:"left"}}>
        <h2>Lista de filmes</h2>
        <ul>
          { posts && posts.map(post =>{
            return <li key={post.imdbID} >
            Title: {post.Title}<br/>
            Ano lançamento: {post.Year}<br/>
            <img src={post.Poster}></img><br></br>
            {post.like && 
              <span>Favoritado!</span>
            }
            <Button variant="contained" color="secondary" onClick={(e) => handleClick(post.imdbID)}> Favoritar </Button>
            </li>
            
          }) 
          }
          </ul>
        </div>

        <div style={{float:"right"}}>
        <h2>Lista de favoritos</h2>

        <ul>
          { favoritos && favoritos.map(post =>{
            return <li key={post.imdbID} >
            Title: {post.Title}<br/>
            Ano lançamento: {post.Year}<br/>
            <img src={post.Poster}></img><br></br>
            </li>
          }) 
          }
          </ul>
        </div>
    </> 
    );
  }
  
  export default App;
  
