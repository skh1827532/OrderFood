import React, { useState, useEffect } from "react";
import "../css/app.css";

import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import { v4 as uuidv4 } from "uuid";
export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [recipes, setRecipes] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY) != null
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : sampleRecipes
  );
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }
  // useEffect(() => {
  //   const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   console.log(recipeJSON);
  //   if (recipeJSON != null) {
  //     setRecipes(JSON.parse(recipeJSON));
  //   }
  // }, []);

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
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
  // function handleRecipetEdit(id) {
  //   const elementFound = recipes.find((recipe) => recipe.id === id);
  //   console.log(elementFound);
  // }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    //We use return as clean up before the useEffect is called.
    return () => console.log("Recipes set");
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  //If we want to hook this useEffect only to run when the application loads put the empty dependency

  // useEffect(() => {
  //   console.log("Rendered");
  // }, []);

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
        recipes={recipes}
        // handleRecipeAdd={handleRecipeAdd}
        // handleRecipeDelete={handleRecipeDelete}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1.Put Salt on Chicken \n2.Put Chicken in Oven\n3.Eat Chicken",
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
    name: "Plain Fish",
    servings: 5,
    cookTime: "0:45",
    instructions: "1.Put Masala on Fish\n2.Put Fish in Oven\n3.Eat Fish",
    ingredients: [
      {
        id: 1,
        name: "Fish",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Masala",
        amount: "2 Tbs",
      },
    ],
  },
];

export default App;
