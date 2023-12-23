import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ItemRoute from "./routes/ItemRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import TransactionsRoute from "./routes/TransactionRoute.js";

dotenv.config();

const app = express();

const SequelizeStore = sequelizeStore(session.Store);

const store = new SequelizeStore({
    db: db
})


    await db.sync();


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto"
    }
}))



app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(UserRoute);
app.use(ItemRoute);
app.use(AuthRoute);
app.use(TransactionsRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log("server started");
});