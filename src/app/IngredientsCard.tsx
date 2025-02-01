import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { PageContext } from "./page";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function IngredientsCard() {
  const { ingredients, setIngredients } = useContext(PageContext);

  const [inputText, setInputText] = useState("");

  const removeMaterial = (material: string) => {
    setIngredients(ingredients.filter((s) => s !== material));
  };

  const handleMaterialSubmit = () => {
    if (inputText.trim() !== "") {
      if (!ingredients.includes(inputText))
        setIngredients([...ingredients, inputText].sort());
      setInputText("");
    }
  };

  return (
    <div className="p-6 bordered w-full">
      <h2 className="text-xl font-semibold text-gray-800">
        Enter Recipe Materials
      </h2>
      <div className="grid grid-cols-[1fr,min-content] gap-4 mt-2">
        <Input
          type="text"
          placeholder="Add ingredient..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMaterialSubmit()}
        />
        <Button onClick={handleMaterialSubmit}>Add</Button>
      </div>
      <div className="flex flex-wrap mt-2">
        {ingredients.map((ingredient) => (
          <div
            className="items-center flex m-0.5 px-2 py-1 bg-gray-800 text-primary-foreground rounded-xl"
            key={ingredient}
          >
            {ingredient}
            <button onClick={() => removeMaterial(ingredient)}>
              <X className="ml-1" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
