import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({
  recipes,
  // handleRecipeAdd,
  // handleRecipeDelete,
}) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  //As we want to pass all of the values the Recipe Component So, instead of passing them individually just pass this syntax which {...recipe} what it will essentially do is that it makes key pair of everything we want to pass to the Component Recipe.

  //React uses Keys for if the recipe with id 1 changes, it re-renders this recipe only  and not the other re-render

  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button className="btn btn--primary" onClick={handleRecipeAdd}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
