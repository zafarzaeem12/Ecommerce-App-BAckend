const Category = require('../models/CategoryModel')

//Create Category Api start here
const AddCategory = async (req,res) => {
    try{
        const filename = req.file.path;
        const files = `${filename}`.replace("public","");

        // const basepath = `${req.protocol}://${req.get('host')}`;
        // const final = `${basepath}/${filename}`

        const addcat = new Category ({
            name: req.body.name,
            image:  `${files}`.replace(/\\/g, "/"),
        })

        const savedCategory = await addcat.save();
        res.send({
            message:"Category Added Successfully",
            status:200,
            data:savedCategory
        })
    }catch(err){
        res.send({
            message:"Category Not Added",
            status:404,
        })
    }
}
//Create Category Api end here

//Get All Category Api start here
const GetAllCategory = async (req,res) => {
try{
    const alldata = await Category.find().sort({"createdAt" : -1})
    res.send({
        total:alldata.length,
        message:"All Catgeories Fetch Successfully",
        status:200,
        data:alldata
    })

}catch(err){
    res.send({
        message:"Categories Not Found",
        status:404
    })
}
}
//Get All Category Api end here

//Get Single Category  Api start here
const SingleCategoryById = async (req,res) => {
    const query = req.params.id
    try{
        const singlerecord = await Category.findById(query)
        res.send({
            message:"Data Fetch Successfully",
            status:200,
            data:singlerecord
        })
    }catch(err){
        res.send({
            message:"Data Not Found",
            status:404
        })
    }
}
//Get Single Category  Api end here

//Update Category Api start here
const UpdateCategory = async (req,res) => {
    const filename = req?.file?.path;
    const files = `${filename}`.replace("public","");

    const query = req.params.id
try{
    const updateCat = await Category.findByIdAndUpdate(
        query ,
        {$set : {
            name: req.body.name,
            image:  `${files}`.replace(/\\/g, "/"),
        } } ,
        {new : true}
    )
    res.send({
        message:"Category Update Successfully",
        status:201,
        data:updateCat
    })
}catch(err){
    res.send({
        message:"Category Not Update",
        status:404
    })
}
}
//Update Category Api end here

// Delete Category Api start here
const DeleteCategory = async (req,res) => {
    const query = req.params.id;
    try{
        const DeleteCategory = await Category.findByIdAndDelete(query)
        res.send({
            message:"Category Delete Successfully",
            status:200,
            data:DeleteCategory
        })

    }catch(err){
        res.send({
            message:"Category Not Delete",
            status:404,
        })
    }
}
// Delete Category Api end here

// Status Changes Api start here
const StatusCategory = async (req,res) => {
    const query = req.params.id;
    try{
        const statuschanged = await Category.findByIdAndUpdate(
           { _id: query} ,
            {"$set" : {status : req.body.status}},
            {new : true}
        )
        res.send({
            message:"Status Changed Successfully",
            status:201,
            data:statuschanged
            
        })
        
    }catch(err){
        res.send({
            message:"Status Not Changed",
            status:404
        })
    }
}
// Status Changes Api end here

const GetActiveCategory = async (req,res) => {
    try
    {const activecategory = await Category.find({ status : { $eq : true }})

    res.send({
        total : activecategory.length,
        message: "Get Active Categories",
        status: 200,
        data: activecategory
    })
    } catch(err){
        res.send({
            message: "Not Active Categories",
            status: 404,
        })

    }
}
module.exports = { 
    AddCategory,
    GetAllCategory,
    SingleCategoryById,
    UpdateCategory,
    DeleteCategory,
    StatusCategory,
    GetActiveCategory
}