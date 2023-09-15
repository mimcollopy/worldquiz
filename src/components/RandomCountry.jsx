import React, { useState, useEffect } from "react";

export default function RandomCountry() {
  const [buttonClick, setButtonClick] = useState(false);
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");
  const [allCapitals, setAllCapitals] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCapitals, setFilteredCapitals] = useState("");
  const cities = ["melbourne", "sydney", "hobart"];

  const normalizedInput = inputValue
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const normalizedCapital =
    capital && capital[0]
      ? capital[0]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : "";

  // handle the user pressing the 'press for 🌍' button. Its main purpose is to handle the state of the button click.
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClick(true);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);

    const normalizedInput = inputText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Normalize the input

    const filteredItems = allCapitals.filter((city) => {
      if (typeof city === "string") {
        const normalizedCity = city
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); // Normalize the city name
        return normalizedCity.includes(normalizedInput);
      }
      return false; // Skip non-string values
    });

    setFilteredCapitals(filteredItems);
  };

  // handles user guessing the coutries capital. negative results are only shown in browser console for now.
  const handleGuess = (e) => {
    e.preventDefault();
    if (normalizedCapital === normalizedInput) {
      console.log("its a match");
      setInputValue("")
      //   alert("you win!");
    } else {
      console.log("incorrect guess");
    }
    //set input back to empty string
    // setInputValue("");
  };



  const handleClick = (city) => {
   
    console.log(city)
    setInputValue(city)
    return
  }


  //SAVE AN ARRAY OF ALL CAPITAL CITIES

  // this creates an array of all of the capital cities in the fetch request for all coutries. This is to create a drop down list of all capital cities that the user can guess from when guessing the capital city of the country shown. This feature is not yet in use.
  useEffect(() => {
    //fetch using the /all endpoint to get all countries
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((fetchedData) => {
        //map to put all capital cities into the allCapitals state
        const capitalCities = fetchedData
          .map((countryData) => countryData.capital)
          .flat()
          .sort();
        setAllCapitals(capitalCities);
        // const newCaps = capitalCities.flat()
        console.log(capitalCities);
        // console.log(newCaps);
        console.log(allCapitals);
      });
    //effect is used so this will only run once on initialization
  }, []);

  //GENERATE A RANDOM COUNTRY

  useEffect(() => {
    //'press for 🌍' button' will send the fetch request to /all endpoint
    if (buttonClick) {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((fetchedData) => {
          //generate a random number from 0 - 1 number below the response length (the response length is 250 so this will generate a number between 0 and 249)
          const num = Math.floor(Math.random() * (fetchedData.length - 1));
          console.log(`the random number is ${num}`);

          //will display all detail for the random country
          console.log(fetchedData[num]);
          //save the country name name only into a new variable
          const randomCountry = fetchedData[num].name.common;
          console.log(`the random country is ${randomCountry}`);
          //save the country to state
          setCountry(randomCountry);
          setCapital(fetchedData[num].capital);
          console.log(fetchedData[num].capital);

          //reset the button at the end so when it is clicked again, the code will re-run to generate a new country
          setButtonClick(false);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          setButtonClick(false);
        });
    }
    //will only re-run on button click
  }, [buttonClick]);

  return (
    <div>
      <h2>get a random country:</h2>
      <button className="country-button" onClick={handleSubmit} type="submit">
        {" "}
        press for 🌍
      </button>
      {/* display the ranom country */}
      <p className="display-country">{country}</p>
      {/* incase of a country not having a capital (Antarctica, Macau) the following line will run */}
      {capital === undefined && (
        <p>
          {" "}
          this country has no capital. Press the button to generate a new
          country!{" "}
        </p>
      )}

      {/* form to guess capital city */}

      <form className="capital-form">
        <div className="guess-field">
          Guess the capital of {country}:
          <input
            placeholder="guess..."
            value={inputValue}
            onChange={handleInputChange}
          />
          {filteredCapitals.length > 0 && (
            <div className="custom-dropdown">
              {filteredCapitals.map((city, idx) => (
                <div key={idx} onClick={() => handleClick(city)}>{city}</div>
              ))}
            </div>
          )}
          {/* <datalist id="cities">
              {allCapitals.map((city, idx) => <option key={idx}>{city}</option>)}
            </datalist> */}
          <h1>{inputValue}</h1>
        </div>

        <button className="guess-button" onClick={handleGuess}>
          guess
        </button>
      </form>
    </div>
  );
}
