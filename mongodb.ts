import { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import "https://deno.land/x/dotenv/load.ts";


const mongoKey: any = Deno.env.get('MONGOOSE_KEY')
const client = new MongoClient();

client.connectWithUri(mongoKey);


interface ProductSchema {
    _id: { $oid: string };
    title: string;
    price: number;
}

export const db = client.database("test");
export const products = db.collection<ProductSchema>("products");
