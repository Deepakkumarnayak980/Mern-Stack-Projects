import mongoose from "mongoose";

// 1- create a schema

    const notesSchema =new mongoose.Schema(
        {
            title:{
                type:String,
                required: true

            },
            content:{
                type:String,
                required: true

            }

        },{timestamps:true}
    )


// 2- model based off of that schema

const Note =mongoose.model("Note",notesSchema)

export default Note