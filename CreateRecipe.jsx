import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie"; // ✅ Import for cookies
import "./CreateRecipe.css";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]); // ✅ Get token from cookies

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const [ingredientInput, setIngredientInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setRecipe((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput],
      }));
      setIngredientInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://recipe-app-kh93.onrender.com/recipes",
        recipe,
        {
          headers: {
            authorization: cookies.access_token, // ✅ Attach token
          },
        }
      );

      navigate("/"); // ✅ Redirect on success
    } catch (err) {
      console.error("❌ Error creating recipe:", err.response?.data || err.message);
      alert("❌ Failed to create recipe.");
    }
  };

  return (
    <div className="create-recipe">
      <form onSubmit={handleSubmit}>
        <h2>Create Recipe</h2>

        <label>Name</label>
        <input name="name" value={recipe.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
        />

        <label>Ingredients</label>
        <input
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>

        <label>Instructions</label>
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          required
        />

        <label>Cooking Time (minutes)</label>
        <input
          type="number"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};
