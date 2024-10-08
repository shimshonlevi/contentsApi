const asyncHendler = require('express-async-handler')

const Contact = require('../models/contactModel')

const getContents = asyncHendler(async(req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  console.log(contacts);
    res.status(200).json({ contacts });
  });
  
  const createContent = asyncHendler(async(req, res) => {
    console.log("The request body is:", req.body);
    const{name,email,phone} = req.body;
    if(!name||!email ||!phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const content  = await Contact.create({
      name,
      email,
      phone,
      user_id:req.user.id
    })
    res.status(201).json({content});
  });
  
  const getContent = asyncHendler( async(req, res) => {
    const content = await Contact.findById(req.params.id);
    if(!content){
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json({content});
  });
  
  const updateContent = asyncHendler(async(req, res) => {

    const content = await Contact.findById(req.params.id);
    if(!content){
      res.status(404);
      throw new Error("Contact not found");
    }
    if(content.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User does not have permission to update this contact");
    }

    const updatedContent = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    })
    res.status(200).json({ updatedContent});
  });
  
  const deleteContent = asyncHendler(async(req, res) => {
    const content = await Contact.findById(req.params.id);
    console.log(content);
    
    if(!content){
      res.status(404);
      throw new Error("Contact not found");
    }

    if(content.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User does not have permission to delete this contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    
    res.status(200).json({ content});
  });
  
  module.exports = { getContents, createContent, getContent, updateContent, deleteContent };
  