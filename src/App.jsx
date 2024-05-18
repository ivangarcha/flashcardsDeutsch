import React, { useState, useEffect, useContext } from "react";
import Filters from "./components/filters.jsx";
import AddFormulario from "./components/AddFormulario.jsx";
import Card from "./components/Card.jsx";
import CardInverse from "./components/CardInverse.jsx";
import { AppContext } from "./context/AppContext.jsx";
import useWords from "./hooks/useWords.jsx";

const App = () => {
  const [open, setOpen] = useState(false);
  const { words, setWords } = useWords();
  const [activeFilters, setActiveFilters] = useState([]);
  const { filters } = useContext(AppContext);
  const [inverse, setInverse] = useState(false);
  const refresh = () => {
    fetch('https://raspberry.freedynamicdns.net:4443/palabras')
      .then(response => response.json())
      .then(response => {
        setWords(shuffle(response));
        const filtrosActivos = Object.keys(filters).filter(key => filters[key]);
        setActiveFilters(filtrosActivos);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    refresh();
  }, [filters]); // Agrega 'filters' como dependencia para volver a cargar las palabras cuando cambien los filtros

  const handleClose = () => {
    setOpen(false);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array]; // Crea una copia del array original
    return shuffledArray.sort(() => Math.random() - 0.8); // Baraja la copia y la devuelve
  };

  return (
    <div className="container">
      <header>
        <div className="buttons">
          <button className="add" onClick={() => setOpen(true)}>Agregar</button>
          <button className="random" onClick={() => setWords(shuffle(words))}>Barajar</button>
        </div>
        <button onClick={() => setInverse((prev) => !prev)}><i className="fa fa-rotate"></i></button>
        <Filters />
      </header>
      <div style={{ height: '100px' }}>
      </div>
      <AddFormulario open={open} handleClose={handleClose} refresh={refresh} />
      {inverse === false && words.length > 0 && !open && (
        <div className="cards">
          {words.filter(word => activeFilters.includes(word.categoria)).map(word => (
            <div key={word.palabra}>
              <Card word={word} />
            </div>
          ))}
        </div>
      )}
      {inverse === true && (
        <div className="cards">
          {words.filter(word => activeFilters.includes(word.categoria)).map(word => (
            <div key={word.palabra}>
              <CardInverse word={word} />
            </div>
          ))}
        </div>
      )}
      <footer className="footer">
        {words.length}
      </footer>
    </div>
  );
};

export default App;
