import app from "./src/config/server.config.js";
import "./src/config/database.config.js"

app.set(`port`, 4001);
app.listen(app.get(`port`));
console.log(`Server is running on port ${app.get(`port`)}`);