const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;


// const cloudinary = require('cloudinary')
// cloudinary.config({
//    cloud_name: "dfvnhgt7e",
//   api_key: "493532854372862",
//   api_secret: "iTArihDQ5YlpZHMviLppwm0xSbk"
// })