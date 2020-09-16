import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { db, products } from "./mongodb.ts";


const insertProduct = async ( body : any ) => {
    const newProduct = await products.insertOne({
        title: body.title,
        price: body.price
    })
    return newProduct
}

export { insertProduct };
