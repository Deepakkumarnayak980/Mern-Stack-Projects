import Note from "../models/Notes.js";

// GET ALL NOTES
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1}); //newst first data
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET NOTE BY ID
export async function getNoteById(req,res) {
  try {
    const note =await  Note.findById(req.params.id);
    if(!note) return res.status(404).json({message:"Note not found" })

      res.status(200).json(note)
    
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
}

// CREATE NOTE
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}




// UPDATE NOTE
export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error in updateNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE NOTE
export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
