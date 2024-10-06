import {Book} from "../model/bookModel.js"
import mongoose from "mongoose"

//to get all the books
export const getAllBooks = async (req,res)=>{
  try{
    const allBooks = await Book.find({})
      return res.status(200).send({success : true, message: "Got all the Books", count : allBooks.length, data : allBooks})
  }catch(error){  
    console.log("Error in getting all the books")
    return res.status(500).send({success : false, message : "couldn't get all the books", error : error.message})
  }
}

//to get Single Book
export const getSingleBook = async (req,res)=>{
  try{
    const {id} = req.params
    const book = await Book.findById(id)
    console.log("Book Found")
    return res.status(200).send({success : true, message : "Book found", data : book})
  }catch(error){
    console.log("Error in fetching the book")
    return res.status(500).send({success : false, message : " couldn't get the book", error: error.message})
  }
}

//to create a new book
export const createBook = async (req,res)=>{
  try{
    const {title,author,publishedYear} = req.body
    if(!title || !author || !publishedYear){
      return res.status(400).send({success : false , message: "Fill all the required fields : title, author, publishedYear"})
    }

    const newBook = {
      title : title,
      author : author,
      publishedYear : publishedYear
    }

    const createdBook = await Book.create(newBook)

    return res.status(200).send({
      success: true,
      message: "Book created successfully",
      data: createdBook, 
    });

  }catch(error){
    console.log(error.message)
    return res.status(500).send({success : false, message : "Failed to send a request"})
  }
}


//to update a book
export const updateBook = async(req,res)=>{
  try{
    const bookId = req.params["id"]
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ success: false, message: "Invalid book ID" });
    }
    //getting the book by it's id
    const book = await Book.findById(bookId);
    console.log("Fetched book",book)


    const {title,author,publishedYear} = req.body

    if(!title && !author && !publishedYear){
      console.log("Incomplete details")
      return res.status(400).send({success :false, message : "Fill any one field to update book"})
    }

    const updatedBook = {
      title : title ? title : book.title,
      author : author ? author : book.title, 
      publishedYear : publishedYear ? publishedYear : book.publishedYear} 


      const result = await Book.findByIdAndUpdate(bookId, updatedBook, {new : true})//this method returns the before updated book details and to get the new details we use new:true
      // if(!result){
      //   console.log("Cant find the book")
      //   return res.status(404).send({success : true, message : "Can't find the book"})
      // }

      return res.status(200).send({success : true, message : "Book updated", data : result})

  }catch(error){
    console.log("Failed to update book")
    return res.status(500).send({success : false, message : error.message})
  }
}


//to delete a book
export const deleteBook = async (req,res)=>{
  try{
    const bookId = req.params["id"]
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({ success: false, message: "Invalid book ID" });
    }
    const deletedBook = await Book.findByIdAndDelete(bookId)
    console.log(deletedBook)
    return res.status(200).send({success : true, message : "Book deleted successfully", data : deletedBook})
  }catch(error){
    console.log("Error in deleting the books")
    return res.status(500).send({success : false, message : error.message})
  }
}

