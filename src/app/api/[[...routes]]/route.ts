import { generateRecipe, getIngredients } from "@/lib/gpt";
import Elysia from "elysia";

interface RecipeInput {
  items: string[];
}

interface IngredientsInput {
  image: string;
}

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "hello world!")
  .post(
    "/recipe",
    async ({ body }: { body: RecipeInput }) => await generateRecipe(body.items),
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
