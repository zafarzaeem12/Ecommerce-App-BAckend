const Slider = require('../models/SliderModel');

const CreateSlider = async (req,res) => {
try{
    const filename = req.file.path;
    const basepath = `${req.protocol}://${req.get('host')}`;
    const final = `${basepath}/${filename}`
    
    const createslider = new Slider({
        name: req.body.name,
        image: `${final}`.replace(/\\/g, "/"),
    });

    const slider = await createslider.save();
    res.send({
        message:"Slider Created Successfully",
        status:200,
        data:slider
    })
} catch(err){
    res.send({
        message:"Slider Not Created",
        status:404
    })
}
}

module.exports = {
    CreateSlider
}