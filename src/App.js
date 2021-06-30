import React, { useEffect, useState } from "react";

import { api } from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((req, res) => {
      setRepositories(req.data);
    });
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "facebook-clone",
      url: "https://google.com",
      techs: ["Node", "ReactJS"],
      likes: 0,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex((item) => item.id === id);

    repositories.splice(repositoryIndex, 1);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            <span>
              <b>Nome: </b>
            </span>
            {item.title}
            <br />
            <span>
              <b>Link: </b>
            </span>
            <a src={item.url}>{item.url}</a>
            <br />
            <span>
              <b>Tecnologias: </b>
            </span>
            <ul>
              {item.techs.map((techs) => (
                <li key={techs}>{techs}</li>
              ))}
            </ul>
            <span>
              <b>Likes: </b>
            </span>
            {item.likes}
            <br />
            <button style={{ marginBottom: "10px" }} onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
