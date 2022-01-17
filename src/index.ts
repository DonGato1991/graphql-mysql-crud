import app from "./app";
import { connectionDB } from "./db";
import "./config";
import { PORT } from "./config";

async function main() {
  try {
    await connectionDB();
    app.listen(PORT || 3000);
    console.log("listen port ", PORT);
  } catch (error) {
    console.log(error);
  }
}

main();
