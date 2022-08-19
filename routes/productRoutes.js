const router = require('express').Router();
const {
    AddProducts,
    GetAllProducts,
    GetSingleProducts,
    UpdateProducts,
    DeleteProducts
} = require('../controller/ProductController')

router.post('/addproducts' , AddProducts);
router.get('/getallproducts' , GetAllProducts);
router.get('/getproductid/:id', GetSingleProducts);
router.put('/update/:id' , UpdateProducts);
router.delete('/:id' , DeleteProducts);
module.exports = router;