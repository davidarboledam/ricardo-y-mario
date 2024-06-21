import './App.css'
import React, { useEffect, useRef, useState } from "react"
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import useFetch from './hooks/useFetch'

function App() {

  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();


  useEffect(() => {
    
    const url = `https://rickandmortyapi.com/api/location/${randomId}`; 
    getLocation(url); /*getLocation hace la petición asíncrona */
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = "";
}
  return (
    <div className='app'>
      {
        isLoading ? 
          <h2>Loading...</h2> 
        :
        <>
          <h1>Rick and Morty</h1>
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__form-input' ref={textInput} type='number'/>
            <button className='app__form-btn'>Search</button>
          </form>
          {
            hasError ?
            <h2>💢Hey! you must provide an id from 1 to 126😫</h2>
            :
            <>
              <LocationCard 
                info = {location} /*info es la prop */
                />
                <div className='app__container'>
                  {
                    location?.residents.map((character) => (
                      <ResidentCard 
                      key={character}
                      info={character} 
                      />
                    )) /*Función callback */
                  }
                </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default App;
