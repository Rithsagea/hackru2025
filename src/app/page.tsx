"use client"; // Add this line to make the component a client component

import { useState } from "react";

export default function Home() {
  const [material, setMaterial] = useState(""); // Store entered material
  const [materials, setMaterials] = useState<string[]>([]); // Store entered materials for the recipe input
  const [recipeList, setRecipeList] = useState<string[]>([]); // Store recipe list items

  // Handle material input change
  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial(e.target.value);
  };

  // Handle material submit on Enter (add a new material to the list)
  const handleMaterialSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && material.trim() !== "") {
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

  // Handle adding the materials to the recipe list
  const handleAddToRecipeList = () => {
    if (materials.length > 0) {
      // Add all the materials to the recipe list
      setRecipeList([...recipeList, ...materials]);

      // Clear materials after adding to recipe list
      setMaterials([]);
    }
  };

  // Placeholder for the "Generate" button click
  const handleGenerate = async () => {
    // Backend functionality will go here
    const recipe = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: materials })
    });
    setRecipeList([...recipeList, await recipe.json()])
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-h-screen p-8 sm:p-20 gap-16">
      {/* Full-width Title Section */}
      <div className="col-span-2 text-center sm:text-left mb-8">
        <h1 className="text-5xl font-bold text-white">hackru 2025</h1>
        <p className="text-lg text-white mt-4">
          A place to discover and share recipes that are easy to make and delicious to eat!
        </p>
      </div>

      {/* Left Section: Recipe Listing with a white box around it */}
      <div className="flex flex-col items-start gap-6">
        {/* Recipe List with a scrollable box */}
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md w-full max-h-60 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800">Recipe List</h2>
          <ul className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-800">
            {recipeList.length === 0 ? (
              <li>No recipes added yet</li>
            ) : (
              recipeList.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  {JSON.stringify(item)}
                  <button
                    // Optionally, add a remove button here for the recipe list
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    {/* Delete Button (optional) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Right Section: Material Input and Display with defined box */}
      <div className="flex flex-col items-start gap-6">
        {/* Input Box for Recipe Materials with a white box */}
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold text-gray-800">Enter Recipe Materials</h2>
          <input
            type="text"
            placeholder="Add ingredient..."
            value={material}
            onChange={handleMaterialChange}
            onKeyDown={(e) => handleMaterialSubmit(e)}  // Call handleMaterialSubmit only when Enter is pressed
            className="border border-solid border-gray-300 rounded-full p-3 mt-4 text-sm w-full text-gray-800"
          />
        </div>

        {/* Displaying Material Items */}
        <div className="flex flex-col items-start gap-4 w-full">
          {/* Display each entered material */}
          {materials.length === 0 ? (
            <p className="text-gray-800">No materials added yet</p>
          ) : (
            materials.map((item, index) => (
              <div key={index} className="flex gap-4 items-center w-full">
                <div className="w-16 h-16 bg-gray-300 rounded-full">
                  {/* Placeholder for item image */}
                </div>
                <p className="flex-grow text-gray-800">{item}</p>
                <button
                  onClick={() => handleRemoveMaterial(index)} // Call remove function on click
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  {/* Delete Button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
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
  );
}
