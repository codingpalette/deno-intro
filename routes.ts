import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { db, products } from "./mongodb.ts";


const insertProduct = async ( body : any ) => {
    const newProduct = await products.insertOne({
        title: body.title,
        price: body.price
    });

    return newProduct;
}

const getProducts = async () => {
    const allProducts = await products.find({ title: { $ne: null } });
    return allProducts;
}

const getSingleProduct = async (id : any) => {
    const item = await products.findOne({_id :{ $oid: id } })
    return item;
}

const updateProduct = async (id: any, body: any) => {
    const {matchedCount} = await products.updateOne(
        {_id :{ $oid: id } },
        {
            $set: {
                title: body.title,
                price: body.price
            }
        }
    )
    return matchedCount;
}

const delteProduct = async (id: any) => {
    await products.deleteOne({ _id: { $oid: id } });
}

export { insertProduct, getProducts, getSingleProduct, updateProduct, delteProduct };
