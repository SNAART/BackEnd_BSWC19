'use strict';
const catModel = require('../models/catModel');

// const cats = catModel.cats;

const cat_list_get = async (req, res) => {
    const cats = await catModel.getAllCats();
    await res.json(cats);
};


const cat_get = async (req, res) => {
    const params = [req.params.id];
    const cat = await catModel.getCat(params);
    await res.json(cat[0]);
};


const cat_create_post = async (req, res) => {
    const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
    ];
    const response = await catModel.addCat(params);
    const cat = await catModel.getCat([response.insertId]);
    await res.json(cat);
    res.send('With this endpoint you can add cats.');
};
const cat_update = async (req, res) => {
    console.log(req.body);
    const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.body.id,
    ];
    const response = await catModel.updateCat(params);
    await res.json(response);
};

const cat_delete = async (req, res) => {
    const params = [req.params.id];
    const cat = await catModel.deleteCat(params);
    await res.json(cat);
};
module.exports = {
    cat_list_get,
    cat_create_post,
    cat_get,
    cat_update,
    cat_delete,
};