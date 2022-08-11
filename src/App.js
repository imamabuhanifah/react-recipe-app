import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./components/Recipe";

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSeacrh] = useState("");
  const [query, setQuery] = useState('chicken');
  
  const API_GET =
    `https://api.edamam.com/api/recipes/v2?q=${query}&app_key=7325bf2f34fad1eb7ca9fef3eb208e66&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAQAR2FDBWIQZlR2AgEBUXlSB2IQZAQiVwYPRjFGBDFGMlFwVlFTF2RHBzEbMFAhDVcVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=5b8fd94b`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(API_GET);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e =>{
    setSeacrh(e.target.value)
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSeacrh('');
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Input Recipe"/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))}
        </div>
    </div>
  );
};

export default App;
