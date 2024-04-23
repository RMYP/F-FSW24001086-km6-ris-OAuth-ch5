require("dotenv").config()
const app = require("./bin/app");
const port = process.env.PORT

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})