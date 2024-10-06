import { getAllBooks, getSingleBook, deleteBook, createBook, updateBook } from "../controller/booksController.js"
import express from "express"

const router = express.Router()

//to get all the books
router.get("/", getAllBooks)

//to get a book by its id
router.get("/:id", getSingleBook)

//to post a new Book
router.post("/", createBook)

//to delete a particular book
router.delete("/:id", deleteBook)


//to update any book field
router.put("/:id", updateBook )

export default router