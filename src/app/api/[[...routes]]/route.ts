import Elysia from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "test");

export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;
