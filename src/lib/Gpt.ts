import OpenAI from "openai";
import { Recipe } from "./Types";
import { List } from "lucide-react";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipe(ingredients: string[], recipeList: Recipe[]) {
  const recipeNames = recipeList.map(recipe => recipe.name)
  const prompt = `Create a simple and delicious recipe using the following ingredients:
${ingredients.join(", ")} 
that does not exist in the recipe list: ${recipeNames.join(", ")}
Return the response in JSON format with the following structure:
{
  "name": "<recipe name>",
  "description": "<short description of the dish>",
  "steps": ["<step 1>", "<step 2>", "..."]
}
Only return valid JSON, without markdown or extra text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content ?? "{}");
}

async function getIngredients(imageb64: string) {
  const prompt = `What are the cooking ingredients in this image?
Return a response as a json list of strings without additional markdown or formatting.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageb64,
            },
          },
        ],
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content ?? "[]");
}

export { generateRecipe, getIngredients };
