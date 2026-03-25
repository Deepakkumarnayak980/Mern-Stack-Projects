import express from "express";

 export const router =express.Router();

 router.get("/",getAllNotes)
 router.post('/',createNote)
 router.put("/:id",updateNote)
 router.delete("/:id",deleteNote``)

