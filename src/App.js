import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
      const response = await api.post('/repositories', 
        {
        "title": "Desafio Node.js",
          "url": "https://github.com/marcelobruckner/",
          "techs": ["NodeJs", "React Native", "React Js"]
        }
      );

      const newRepository = response.data;
      setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    console.log(response);
    
    if(response.status===204){
      const element = document.getElementById(id);
      element.parentNode.removeChild(element);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
              <li key={repo.id} id={repo.id}>{repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
