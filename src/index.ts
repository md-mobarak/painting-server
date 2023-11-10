import app from "./app";

const port = process.env.PORT || 5000;
async function main() {
  app?.get("/", async (req, res) => {
    res?.send("hello world");
  });
  app?.listen(port, () => {
    console.log(`assignment_9_with_prisma, running port ${port}`);
  });
}
main();
