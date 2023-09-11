
import React, { useState, useEffect } from "react";

export default function RandomCountry() {
  const [buttonClick, setButtonClick] = useState(false);
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");
  const [allCapitals, setAllCapitals] = useState([])
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClick(true);
  };

  const handleGuess = (e) => {
    e.preventDefault()
    if (capital[0].toLowerCase() === inputValue.toLowerCase()){
        console.log(capital[0].toLowerCase())
        console.log('its a match')
        alert('you win!')
    }else {
        console.log('incorrect guess');
    }
        setInputValue('');
    

  }


  useEffect(() => {
        fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((fetchedData) => {
            const capitalCities = fetchedData.map((countryData) => countryData.capital)
                setAllCapitals(capitalCities)
            })
     
  
  }, [])


  useEffect(() => {
    if (buttonClick) {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((fetchedData) => {
          const num = Math.floor(Math.random() * (fetchedData.length - 1));
          console.log(`the random number is ${num}`);

          console.log(fetchedData[num]);
          const randomCountry = fetchedData[num].name.common;
          console.log(`the random country is ${randomCountry}`);
          setCountry(randomCountry);
          setCapital(fetchedData[num].capital);
          console.log(fetchedData[num].capital);

          setButtonClick(false);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          setButtonClick(false);
        });
    }
  }, [buttonClick]);

  return (
    <div>
      <h2>get a random country:</h2>
      <button className="country-button" onClick={handleSubmit} type="submit">
        {" "}
        press for 🌍
      </button>
      <p className="display-country">{country}</p>
      {capital === undefined && <p> this country has no capital </p>}

      <form className="capital-form">
        <label>
            <input 
            className="capital-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
        </label>
        <button className="guess-button"
        onClick={handleGuess}>
            guess

        </button>

      </form>
    
    </div>
  );
}
