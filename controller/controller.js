const Contact = require('../model/contact')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createContact = catchAsyncErrors(async (req, res, next) => {
   
    const contact = await Contact.create(
        {
            name: req.body.name,
           phoneNo: req.body.phoneNo,
            
            img:req.body.img
        }
    );
    res.status(201).json({
      success: true,
      contact,
    });
  });
  