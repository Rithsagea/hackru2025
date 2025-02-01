const file = Bun.file("./refrigerator.jpg");
const b64str = await file.arrayBuffer();
const b64 = `data:image/jpeg;base64,${Buffer.from(b64str).toString("base64")}`;

const res = await fetch("http://localhost:3000/api/ingredients", {
  method: "POST",
  body: JSON.stringify({
    image: b64,
  }),
  headers: { "Content-Type": "application/json" },
});

console.log(await res.text());

export {};
