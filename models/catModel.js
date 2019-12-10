'use strict';
// catController

const catModel = require('../models/catModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');


const cat_list_get = async (req, res) => {
    const cats = await catModel.getAllCats();
    res.json(cats);
};

const cat_create_post = async (req, res) => {
    try{
        // make thumbnail
        await resize.makeThumbnail(
            req.file.path,
            `thumbnails/${req.file.filename}`,
            {width: 160, height: 160}
        );

        // get coordinates
        const coords = await imageMeta.getCoordinates(req.file.path);
        console.log('coords', coords);

        const params= [
            req.body.name,
            req.body.age,
            req.body.weight,
            req.body.owner,
            req.file.filename,
            coords,
        ];
        
        const response= await catModel.addCat(params);
        await res.json(response);
                
        // const cat = await catModel.getCat([response.insertId]);
        // console.log('dong 40');
        
        // await res.json(cat);

    }catch(e){
        console.log('exif error');
        res.status(400).json({message:'error'});
    }
    
};

const cat_get = async (req, res) => {
    const params= [req.params.id];
    const [cat]= await catModel.getCat(params);
    await res.json(cat);
};

const cat_update_put= async(req,res)=>{
    
    const params= [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.body.id
    ];

    const response= await catModel.updateCat(params);
    await res.json(response);
};

const cat_delete= async (req,res)=>{
    const params= [req.params.id];
    const cat= await catModel.deleteCat(params);
    await res.json(cat);
}

module.exports ={
    cat_list_get,
    cat_get,
    cat_create_post,
    cat_update_put,
    cat_delete
};
