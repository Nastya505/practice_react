import React from 'react';

import './index.scss';

import Collection from './Collection';

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {

    const category = categoryId ? `category=${categoryId}` : '';

    setIsLoading(true);
    fetch(`https://6521493da4199548356d0150.mockapi.io/collection?page=${page}&limit=3&${category}`)
    .then(res => res.json())
    .then(json => {
      setCollections(json);
    })
    .catch(err => {
      console.warn(err);
      alert("ошибка при получении данных");
    }).finally(() => setIsLoading(false))
  },[categoryId, page]);
   
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) =>
           <li
            onClick={() => setCategoryId(index)} 
            className={categoryId == index ? "active" : ""}
            key={obj.name}>
              {obj.name}
            </li>
            )}
        </ul>
        <input
         value={searchValue} 
         onChange={e => setSearchValue(e.target.value)} 
         className="search-input" 
         placeholder="Поиск по названию" 
         />
      </div>
      <div className="content">
       { isLoading 
        ? <h2>Идет загрузка..</h2> 
        : collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos} />
        ))
       }
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, index) => (
            <li className={page == index + 1  ? "active" : ''}
            onClick={() => setPage(index+1)}>
              {index + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
