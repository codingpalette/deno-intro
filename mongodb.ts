import { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb+srv://adffewr:zcvdsf1258!@boiler-plate-awr6o.mongodb.net/test?retryWrites=true&w=majority");


interface ProductSchema {
    _id: { $oid: string };
    title: string;
    price: number;
}

export const db = client.database("test");
export const products = db.collection<ProductSchema>("products");
