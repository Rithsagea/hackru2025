"use client"; // Add this line to make the component a client component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RecipeCard from "./RecipeCard";

export default function Home() {
  const [material, setMaterial] = useState(""); // Store entered material
  const [materials, setMaterials] = useState<string[]>([]); // Store entered materials for the recipe input
  const [recipeList, setRecipeList] = useState<any[]>([
    { "recipe": "Honey Garlic Butter Toast", "description": "A delightful toast topped with a sweet and savory honey garlic butter spread.", "steps": ["In a small bowl, mix softened butter, minced garlic, and honey until well combined.", "Spread the honey garlic butter mixture generously on slices of bread.", "Heat a skillet over medium heat and place the buttered bread slices in the pan.", "Toast each side for about 2-3 minutes or until golden brown and crispy.", "Remove from the skillet and serve warm, optionally drizzling with extra honey."] }
  ]); // Store recipe list items

  // Handle material input change
  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial(e.target.value);
  };

  // Handle material submit on Enter (add a new material to the list)
  const handleMaterialSubmit = () => {
    if (material.trim() !== "") {
      // Add material to the materials list
      setMaterials([...materials, material]);

      // Clear the input after adding
      setMaterial("");
    }
  };

  // Handle item removal from the materials list
  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index)); // Remove the item at the specified index
  };

  const handleGenerate = async () => {
    // const recipe = await fetch("/api/recipe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ items: materials }),
    // });
    // setRecipeList([...recipeList, await recipe.json()]);
  };

  return (
    <div>
      <div className="m-6">
        <h1 className="text-5xl font-bold ">FoodSnap</h1>
        <p className="text-lg mt-4">
          A place to discover and share recipes that are easy to make and
          delicious to eat!
        </p>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="m-6 p-3 bordered">
            <h2 className="text-xl font-semibold text-gray-800">Recipe List</h2>
            <ul className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-800">
              {recipeList.length === 0 ? (
                <li>No recipes added yet</li>
              ) : (
                recipeList.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <RecipeCard recipe={item}></RecipeCard>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6">
          <div className="p-6 bordered w-full">
            <h2 className="text-xl font-semibold text-gray-800">Enter Recipe Materials</h2>
            <div className="grid grid-cols-[1fr,min-content] gap-4 mt-2">
              <Input
                type="text"
                placeholder="Add ingredient..."
                value={material}
                onChange={handleMaterialChange}
                onKeyDown={(e) => (e.key === "Enter") && handleMaterialSubmit()}
              />
              <Button onClick={handleMaterialSubmit}>Add</Button>
            </div>
            <div className="flex my-2">
              {materials.map(material =>
                <div className="m-0.5 px-2 py-1 bg-gray-800 text-primary-foreground rounded-full" key={material}>
                  {material}
                </div>)
              }
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mt-6 w-full">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
