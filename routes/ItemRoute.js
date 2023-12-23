import express from "express";
import { getItem, getItemById, createItem, updateItem, deleteItem, getItemByInput  } from "../controllers/Items.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/items/:input", verifyUser, getItemByInput)
router.get("/items", verifyUser, getItem)
router.get("/items/:id", verifyUser, getItemById)
router.post("/items", createItem)
router.patch("/items/:id", verifyUser, updateItem)
router.delete("/items/:id", verifyUser, deleteItem)





export default router