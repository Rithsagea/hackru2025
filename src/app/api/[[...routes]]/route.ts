import { OpenAIClient } from "@/lib/gpt";
import Elysia from "elysia";

interface RecipeInput {
  items: string[];
}

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "hello world!")
  .post("/recipe", async ({ body }) => {
    const { items } = body as RecipeInput;

    const prompt = `Create a simple and delicious recipe using the following ingredients:
${items.join(", ")}
Return the response in JSON format with the following structure:
{
  "recipe": "<recipe name>",
  "description": "<short description of the dish>",
  "steps": ["<step 1>", "<step 2>", "..."]
}
Only return valid JSON, without markdown or extra text.`;

    const response = await OpenAIClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
    return JSON.parse(response.choices[0].message.content ?? "{}");
  });

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;
