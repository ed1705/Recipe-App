import "./css/App.css";
import "./myrecipes.css";
import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";
import { useGlobalContext } from "./context";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import { v4 as uuidv4 } from "uuid";
import Home from "./pages/Home";
import About from "./pages/Recipes";
import { Route, Routes } from "react-router-dom";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

export default function App() {
  const { showModal, favorites } = useGlobalContext();
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON == null) {
      return sampleRecipes;
    } else {
      return JSON.parse(recipeJSON);
    }
  });

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // useEffect(() => {
  //   const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  // }, [])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  return (
    <main>
      <Navbar />
      <RecipeContext.Provider value={recipeContextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recipelist"
            element={
              <div className="recipe--placement" id="resize-width">
                <RecipeList recipes={recipes} />
                {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
              </div>
            }
          />
          <Route
            path="/recipes"
            element={
              <>
                <About />
                <Search />
                {favorites.length > 0 && <Favorites />}
                <Meals />
                {showModal && <Modal />}
              </>
            }
          />
        </Routes>
      </RecipeContext.Provider>
    </main>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];
