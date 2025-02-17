import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/Types";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import ImageCard from "./ImageCard";
import IngredientsCard from "./IngredientsCard";
import RecipeCard from "./RecipeCard";

export const PageContext = createContext<{
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;

  recipeList: Recipe[];
  setRecipeList: Dispatch<SetStateAction<Recipe[]>>;
}>({
  ingredients: [],
  setIngredients: () => {},
  recipeList: [],
  setRecipeList: () => {},
});

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const handleGenerate = async () => {
    const recipe = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients, recipeList }),
    });
    setRecipeList([...recipeList, await recipe.json()]);
  };

  return (
    <PageContext.Provider
      value={{ ingredients, setIngredients, recipeList, setRecipeList }}
    >
      <div>
        <div className="m-6">
          <h1 className="text-5xl font-bold ">FoodSnap</h1>
          <p className="text-lg mt-4">
            A place to discover and share recipes that are easy to make and
            delicious to eat!
          </p>
        </div>

        <div className="grid grid-cols-2">
          <RecipeCard />

          <div className="flex flex-col items-start gap-3 m-2">
            <ImageCard />
            <IngredientsCard />
            <Button onClick={handleGenerate}>Generate Recipe</Button>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
}
