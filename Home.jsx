import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://recipe-app-kh93.onrender.com/recipes");
      setRecipes(response.data);
    } catch (err) {
      console.log("Error fetching recipes:", err);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `https://recipe-app-kh93.onrender.com/recipes/savedRecipes/ids/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes || []);
    } catch (err) {
      console.log("Error fetching saved recipes:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();

    if (userID) {
      fetchSavedRecipes();
    }
  }, [userID]); // triggers every time userID changes

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `https://recipe-app-kh93.onrender.com/recipes/savedRecipes/ids/${userID}`,
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-page">
      <h1>All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found. Create one!</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <h2>{recipe.name}</h2>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
              )}
              <div className="recipe-footer">
                <p>⏱️ Cooking Time: {recipe.cookingTime} minutes</p>
                <button
                  className="save-btn"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
