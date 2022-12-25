import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);
  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
    //{...recipe, ...changes} is actually taking all the keys of recipe and updating overwriting them with the given changes.
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((r) => r.id === id);
    newIngredients[index] = ingredient;

    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>

      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onInput={(e) => handleChange({ name: e.target.value })}
          id="name"
          className="recipe-edit__input"
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          className="recipe-edit__input"
          id="cookTime"
          value={recipe.cookTime}
          onInput={(e) => handleChange({ cookTime: e.target.value })}
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          className="recipe-edit__input"
          id="servings"
          value={recipe.servings}
          onInput={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions"
          onInput={(e) => handleChange({ instructions: e.target.value })}
          value={recipe.instructions}
        ></textarea>
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {/* Ingredient Component */}
        {/* <RecipeIngredientEdit />
        <RecipeIngredientEdit /> */}
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientDelete={handleIngredientDelete}
            handleIngredientChange={handleIngredientChange}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
