import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";

const ProductModel = mongoose.model("Product", productSchema);

class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(productData){
        try{
            // 1. Adding Product
            productData.categories=productData.category
            console.log(productData);
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();
            return savedProduct
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async getAll(){
        try{
            // const db = getDB();
            // const collection = db.collection(this.collection);

            const products = await ProductModel.find();
            console.log(products);
            return products;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

   

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    
//             


        

  


async delete(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (err) {
      throw err;
    }
  }
  
  async update(productId, updatedData) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  
  
}

  

}

export default ProductRepository;
