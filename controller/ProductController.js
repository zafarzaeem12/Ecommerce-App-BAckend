const Product = require("../models/ProductsModel");

const AddProducts = async (req, res) => {
  try {
    const filename = req.file.path;
    const files = `${filename}`.replace("public", "");
    // const basepath = `${req.protocol}://${req.get('host')}`;
    // const final = `${basepath}/${filename}`

    const addpro = new Product({
      title: req.body.title,
      description: req.body.description,
      image: `${files}`.replace(/\\/g, "/"),
      categories: req.body.categories,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
    });
    console.log(addpro);
    const savedProducts = await addpro.save();
    res.send({
      message: "Products Added Successfully",
      status: 200,
      data: savedProducts,
    });
  } catch (err) {
    res.send({
      message: "Products Not Added",
      status: 404,
    });
  }
};

const GetAllProducts = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { categories: req.query.categories.split(",") };
  }
  try {
    const alldata = await Product.find(filter).populate("categories").sort({createdAt: -1 });
    res.send({
      total: alldata.length,
      message: "All Products Fetch Successfully",
      status: 200,
      data: alldata,
    });
  } catch (err) {
    res.send({
      message: "Products Not Fetch",
      status: 404,
    });
  }
};
const GetSingleProducts = async (req, res) => {
  const ids = req.params.id;
  try {
    const sp = await Product.findById(ids).populate(
      "categories",
      "_id  name image status"
    );
    res.send({
      message: "Product Data Fetch Successfully",
      status: 200,
      data: sp,
    });
  } catch (err) {
    res.send({
      message: "Product Not Found",
      status: 404,
    });
  }
};
const UpdateProducts = async (req, res) => {
  const filename = req?.file?.path;
  const files = `${filename}`.replace("public","");
  const paramsids = req.params.id;
  try {
    const updateProducts = await Product.findByIdAndUpdate(
      paramsids,
      { $set: 
            {
              title: req.body.title,
              description : req.body.description,
              categories : req.body.categories,
              size : req.body.size,
              color : req.body.color,
              price : req.body.price,
              image :`${files}`.replace(/\\/g, "/"),
             }
            },
      { new: true }
    );

    res.send({
      message: "Products Updated Successfully",
      status: 200,
      data: updateProducts,
    });
  } catch (err) {
    res.send({
      message: "Products Not Updated",
      status: 404,
    });
  }
};
const DeleteProducts = async (req, res) => {
  const ids = req.params.id;
  try {
    const DeleteProducts = await Product.findByIdAndDelete(ids);
    res.send({
      message: "Products Deleted Successfully",
      status: 200,
      data: DeleteProducts,
    });
  } catch (err) {
    res.send({
      message: "Products Not Deleted",
      status: 404,
    });
  }
};
const ProductsStatus = async (req, res) => {
  const ids = req.params.id;
  try {
    const prostatus = await Product.findByIdAndUpdate(
      {_id : ids},
      {"$set" :  {status: req.body.status}},
      { new: true }
    )
    res.send({
      message: "Status Changed Successfully",
      status: 201,
      data: prostatus,
    });
  } catch (err) {
    res.send({
      message: "Status Not Changed",
      status: 404,
    });
  }
};
const SearchProducts = async (req, res) => {
  try {
    const searcheddata = await Product.find({
      $or: [{ title: { $regex: req.params.keyword } }],
    });
    console.log(searcheddata);
    res.send({
      total: searcheddata.length,
      message: "Product Search Successfully",
      status: 200,
      data: searcheddata,
    });
  } catch (err) {
    res.send({
      message: "Product Not Search",
      status: 404,
    });
  }
};

const GetActiveProducts = async (req,res) => {
try{
    const activeProducts = await Product.find({ status : { $eq : true } })
  res.send({
    message:"Active Products",
    status:200,
    data: activeProducts
  })
}catch(err){
  res.send({
    message:"Not Active Products",
    status:404
  })
}
}

module.exports = {
  AddProducts,
  GetAllProducts,
  GetSingleProducts,
  UpdateProducts,
  DeleteProducts,
  ProductsStatus,
  SearchProducts,
  GetActiveProducts,
  // AddProductImage
};
