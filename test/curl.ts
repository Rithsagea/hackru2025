const res = await fetch("http://localhost:3000/api/recipe", {
  method: "POST",
  body: JSON.stringify({
    items: ["honey", "butter", "bread", "garlic"],
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.text());

export {};
