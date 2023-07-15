import { db, getPosts } from '../firebaseConfig';
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

import Menu from './Menu';
import Titulo from '../Titulo';

function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function adicionarPost() {
    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;

    if (titulo != "" && descricao != "") {
      const novoPost = {
        titulo: titulo,
        descricao: descricao
      };

      addDoc(collection(db, 'posts'), novoPost)
        .then(() => {
          alert('Post adicionado com sucesso!');
          fetchPosts();
        })
        .catch((error) => {
          alert('Erro ao adicionar o novo post: ' + error);
        });
    } else {
      alert('Não é possível criar um post vazio!');
    }
  }

  async function excluirPost(postId) {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      alert('Post excluído com sucesso!');
      fetchPosts();
    } catch (error) {
      alert('Erro ao excluir o post: ' + error);
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <hr></hr>
      <h2>Posts</h2>
      <section class="posts">
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.titulo}</h3>
            <p>{post.descricao}</p>
            <button onClick={() => excluirPost(post.id)}>Excluir</button>
          </div>
        ))}
      </section>
      <hr />

      <h2>Novo Post</h2>
      <form>
        <p><input type="text" autoComplete='off' placeholder="Título" id="titulo" /></p>
        <p><input type="text" autoComplete='off' placeholder="Descrição" id="descricao" /></p>

        <p><button type="button" onClick={adicionarPost}>Enviar</button></p>
      </form>

      <hr />
      <Menu />
    </div>
  );
}

export default Home;
