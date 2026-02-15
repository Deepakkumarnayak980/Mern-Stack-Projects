import {v2 as cloudinry} from "cloudinary"

import {config} from "dotenv"

config();

cloudinry.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export default cloudinry