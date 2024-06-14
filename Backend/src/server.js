const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  try {
    console.log(`Server started on PORT: ${PORT}`);
  } catch (error) {
    console.log(`Could not start the server. ${error}`);
  }
});
