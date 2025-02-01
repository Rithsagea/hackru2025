import { useContext } from "react";
import { PageContext } from "./page";
import { Recipe } from "@/lib/Types";

interface CardProps {
  recipe: Recipe;
}

function Card({ recipe }: CardProps) {
  return <div> {JSON.stringify(recipe)}</div>;
}

export default function RecipeCard() {
  const { recipeList } = useContext(PageContext);

  return (
    <div className="flex flex-col items-start gap-6 m-2">
      <div className="p-6 bordered">
        <h2 className="text-xl font-semibold text-gray-800">Recipe List</h2>
        <ul className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-800">
          {recipeList.length === 0 ? (
            <li>No recipes added yet</li>
          ) : (
            recipeList.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <Card recipe={item} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
