import { Input } from "@/components/ui/input";
import { ChangeEvent, useContext, useState } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { PageContext } from "./page";

export default function ImageCard() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { ingredients, setIngredients } = useContext(PageContext);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getIngredients = async () => {
    if (!imagePreview) return;

    const res = await fetch("/api/ingredients", {
      method: "POST",
      body: JSON.stringify({
        image: imagePreview,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const arr: string[] = [...ingredients, ...(await res.json())];

    setIngredients([...new Set(arr)].sort());
  };

  return <div className="p-6 bordered w-full">
    <h2 className="text-xl font-semibold text-gray-800">
      Ingredients Image
    </h2>
    <div className="mt-2 flex gap-4">
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      <Button onClick={getIngredients}>Get Ingredients</Button>
    </div>
    <div className="relative aspect-square max-h-60 w-full mt-4 border-2">
      {imagePreview &&
        <Image
          src={imagePreview || "/placeholder.svg"}
          alt="Uploaded image preview"
          fill
          style={{ objectFit: "contain" }}
        />
      }
    </div>
  </div>
}
