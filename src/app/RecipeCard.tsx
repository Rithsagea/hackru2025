import { useContext } from "react";
import { Recipe } from "@/lib/Types";
import { PageContext } from "./Home";

interface CardProps {
  recipe: Recipe;
}

function Card({ recipe }: CardProps) {
  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">{recipe.name}</h1>
      <p className="text-gray-700">{recipe.description}</p>
      <h2 className="text-xl font-semibold text-gray-800">Steps:</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default function RecipeCard() {
  const { recipeList } = useContext(PageContext);

  return (
    <div className="flex flex-col items-start gap-6 m-2">
      <div className="p-6 bordered w-full">
        <h2 className="text-xl font-semibold text-gray-800">Recipe List</h2>
        {recipeList.length === 0 ? (
          <span>No recipes added yet</span>
        ) : (
          <ul className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-800">
            {recipeList.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <Card recipe={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
