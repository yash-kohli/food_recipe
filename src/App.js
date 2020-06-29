import React,{useEffect,useState} from 'react';
import './App.css';
import Recipie from './Recipie_data';

const App = () => {

  const APP_ID = 'f8480c5d';
  const APP_KEY = 'b56e60269e9f1c33c9ce758a1dc4869d'; 

  const[recipies,setRecipies] = useState([]);
  const[search,setSearch] = useState("");
  const[query,setQuery] = useState('chicken');
  

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipies(data.hits);
    console.log(data.hits);
  }
  const updateSearch =e=>{
      setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  return (
    <div className = "App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar"type = "text"
         value={search}
         onChange={updateSearch}
         />
  <button className = "search-button" type="submit">search</button>
      </form>
      <div className="recipes">
        {recipies.map(recipe =>(
        <Recipie key = {recipe.recipe.label} 
        ingredients={recipe.recipe.ingredients}
        title ={recipe.recipe.label} 
        calories = {recipe.recipe.calories
        }
          image ={recipe.recipe.image}
        />
      ))}
      </div> 
    </div>
  )
}

export default App;
