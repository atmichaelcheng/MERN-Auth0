// const express = require('express')

// const app = express()
// const port = 6060

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const nocache = require("nocache");
const { messagesRouter } = require("./messages/messages.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
const mongoose = require("mongoose");
const ActivityRouter = require("./routes/activity.route");

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
console.log("using port", PORT);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;


const app = express();
const apiRouter = express.Router();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";


app.use(express.json());
app.set("json spaces", 2);

// app.use(
//   helmet({
//     hsts: {
//       maxAge: 31536000,
//     },
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         "default-src": ["'none'"],
//         "frame-ancestors": ["'none'"],
//       },
//     },
//     frameguard: {
//       action: "deny",
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.contentType("application/json; charset=utf-8");
//   next();
// });
// app.use(nocache());

// app.use(
//   cors({
//     origin: CLIENT_ORIGIN_URL,
//     methods: ["GET"],
//     allowedHeaders: ["Authorization", "Content-Type"],
//     maxAge: 86400,
//   })
// );
app.use(cors());

app.use("/api", apiRouter);
// // update the following to be protected
apiRouter.use("/temp", ActivityRouter);
apiRouter.use("/messages", messagesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// app.listen(PORT, () => {
//   console.log(`Express is listening on port ${PORT}`);
// });

// /* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log(`Server stated on port ${PORT}`, MONGODB_URI));
  })
  .catch((err) => {
    console.log("this is an error from Mongoose", err);
  });

mongoose.connection.on('connected', () => console.log("connected"));