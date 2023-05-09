import { useEffect, useState } from 'react';
import './App.scss';

interface Repo {
  name: string;
  description: string;
}


export default function App() {

  const [repo, setRepo] = useState<Repo[]>([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/matheusmarquex/repos')
      .then(response => response.json())
      .then(data => setRepo(data))
  }, [])

  const filteredRepos = search.length > 0
    ? repo.filter(repo => repo.name.includes(search))
    : [];

  return (
    <div className="container">
      <h1>Buscar Repositório</h1>
      <div>
        <input type="text" name="search" placeholder='Digite o nome do repositório' onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="list-repo">
        <ul>
          {
            search.length > 0 ? (
              filteredRepos.map((item, index) => {
                return (
                  <li key={index}>{item.name}</li>
                )
              })
            ) : (
              repo.map((item, index) => <li key={index}>{item.name}</li>)
            )
          }
        </ul>
      </div>
    </div>
  );
}