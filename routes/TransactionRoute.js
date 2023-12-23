import express from "express";
import {  createTransaction, getTransaction, getTransactionById, deleteTransaction  } from "../controllers/Transactions.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/transaction", getTransaction)
router.post("/transaction", createTransaction)
router.get("/transaction/:id", getTransactionById)
router.delete("/transaction/:id", deleteTransaction)



export default router