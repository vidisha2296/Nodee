const express = require('express')
const Json2csvParser = require("json2csv").Parser;
const fs = require('fs');
const excelJS = require('exceljs')
// const createCustomer = require('./../controllers/customerControl')
const Model = require('../model/customer');
const cloudinary = require('../helper/imageUpload')
const router = express.Router()
// require('../helper/imageUpload');
// router.route('/createcustomer').post(createCustomer);
router.post('/post', async (req, res) => {
    // const isNewUser = await Model.isThisPhoneNonUse(req.body.phoneNo);
    // if (!isNewUser)
    // return res.json({
    //   success: false,
    //   message: 'This Phone number is already in use, try sign-in',
    // });
    // const data = new Model({
    //     name: req.body.name,
    //     phoneNo: req.body.phoneNo,
    //     img:req.body.img
    // })

    // try {
    //     const dataToSave = await data.save();
    //     res.status(200).json(dataToSave)
    // }
    // catch (error) {
    //     res.status(400).json({ message: error.message })
    // }
    //  console.log(req.file)
    const {img,name,phoneNo}= req.body
    //  const {  img } = req.body;
    //    console.log(img,'fhtfhfh')
        console.log(name,'name')
    const result = await cloudinary.uploader.upload(img)
    console.log(result.url)
     const isNewUser = await Model.isThisPhoneNonUse(phoneNo);
     if (!isNewUser)
       return res.json({
         success: false,
         message: 'This Phone Number is already in use, try sign-in',
       });
     const user = await Model({
       name:name,
       phoneNo:phoneNo,
       img:result.url,
     });
     try {
     await user.save();
     res.status(200).json({ success: true, user });
     }
     catch (error){
        res.status(400).json({ message: error.message })
     }

})
router.get('/getAll', async (req, res) => {
    
    try {
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getOne/:id', async (req, res) => {
    
    try {
        const data = await Model.findById(req.params.id)
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/contact', async (req, res) => {
    
    try {
        const search = req.query.search || "";
        // const data = await Model.find({
        //     "$or":[
        //         {
        //             name :{$regex:req.params.key}
        //         },
        //         // {
        //         //     phoneNo :{$regex:req.params.key}
        //         // }
        //     ]
        // })
        const data = await Model.find({ name: { $regex: search, $options: "i" } } )

        
		

        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/export/csv', async (req, res) => {
    
    await Model.find({}).lean().exec((err, data) => {
        if (err) throw err;
        const csvFields = ['_id', 'name', 'phoneNo','img']
        console.log(csvFields);
        const json2csvParser = new Json2csvParser({
            csvFields
        });
        const csvData = json2csvParser.parse(data);
        fs.writeFile("bezkoder_mongodb_fs.csv", csvData, function(error) {
            if (error) throw error;
            console.log("Write to bezkoder_mongodb_fs.csv successfully!");
        });
        res.send('File downloaded Successfully')
    });
    // try {
    //   const  workbook = new excelJS.Workbook();
    //   const worksheet =  workbook.addWorksheet("Contacts")
    //   worksheet.columns = [
    //     { header:'S no',key:"s_no"},
    //     { header:'Name',key:"name"},
    //     { header:'Phone',key:"phoneNo"},
    //     {header:'Image',key:"img"}
    //   ];
    //   let counter =1;
    //   const contactData = await Model.find({});
    //    contactData.forEach((user)=>{
    //     user.s_no = counter;
        
    //     worksheet.addRow(user);

    //     counter ++
    //    });
    //    worksheet.getRow(1).eachCell((cell)=>{
    //        cell.font={bold:true};
    //    });
       
    //    res.setHeader(
    //     "Content-Type",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //    );
       
    //    res.setHeader("Content-Disposition",`attachment;filename=contacts.xlsx`)

    //    return workbook.xlsx.write(res).then(()=>{
    //     res.status(200);
    //    })



    // }catch(error){
    //     console.log(error.message)
    // }
})

module.exports = router