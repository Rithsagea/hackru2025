import { generateRecipe, getIngredients } from "@/lib/Gpt";
import { Recipe } from "@/lib/Types";
import Elysia from "elysia";


interface RecipeInput {
  ingredients: string[];
  recipeList: Recipe[];
}

interface IngredientsInput {
  image: string;
}

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "hello world!")
  .post(
    "/recipe",
    async ({ body }: { body: RecipeInput }) =>
      await generateRecipe(body.ingredients, body.recipeList),
  )
  .post(
    "/ingredients",
    async ({ body }: { body: IngredientsInput }) =>
      await getIngredients(body.image),
  );

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;
