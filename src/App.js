import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Repository ${Date.now()}`,
      "url": `http://github.com/repository${Date.now}`,
      "techs": ["React", "ReactJS", "React Native"]
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`)
      if (response.status !== 204) {
        const errMsg = `Error trying to remove repository ${id}`
        console.error(errMsg)
        throw errMsg
      }
      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
