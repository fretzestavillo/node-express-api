import express from "express";
import cors from "cors";
import pg from "pg";
import 'dotenv/config'

const { Client } = pg;

const app = express();
app.use(cors());
// serving data from database  and endpoints   /////////////////////////////////////////////////
const port = 3005;

export type CustomerRow = {
    id: number;
    name: string;
    contactName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

type QueryLimit = string | undefined;

async function listCustomers(limit: QueryLimit): Promise<CustomerRow[]> {
    const DEFAULT_LIMIT = 20;
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432"),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,


    });
    await client.connect();
    const res = await client.query(
        `SELECT * FROM customers LIMIT ${limit || DEFAULT_LIMIT}`
    );
    await client.end();
    return res.rows.map(
        ({
            customer_id,
            customer_name,
            contact_name,
            address,
            city,
            postal_code,
            country,
        }) => ({
            id: customer_id,
            name: customer_name,
            contactName: contact_name,
            address: address,
            city: city,
            postalCode: postal_code,
            country: country,
        })
    );
}

// type OrderRow = {
//     id: number;
//     customerId: number;
//     orderDate: Date;
// };

// async function listOrders(limit: QueryLimit): Promise<OrderRow[]> {
//     const DEFAULT_LIMIT = 20;
//     const client = new Client({
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT || "5432"),
//         database: process.env.DB_DATABASE,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,

//     });
//     await client.connect();
//     const res = await client.query(
//         `SELECT * FROM orders LIMIT ${limit || DEFAULT_LIMIT}`
//     );
//     await client.end();
//     return res.rows.map(({ order_id, customer_id, order_date }) => ({
//         id: order_id,
//         customerId: customer_id,
//         orderDate: order_date,
//     }));
// }

// type ProductRow = {
//     id: number;
//     name: string;
//     categoryId: number;
//     unit: string;
//     price: string;
// };

// async function listProducts(limit: QueryLimit): Promise<ProductRow[]> {
//     const DEFAULT_LIMIT = 20;
//     const client = new Client({
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT || "5432"),
//         database: process.env.DB_DATABASE,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//     });
//     await client.connect();
//     const res = await client.query(
//         `SELECT * FROM products LIMIT ${limit || DEFAULT_LIMIT}`
//     );
//     await client.end();
//     return res.rows.map(
//         ({ product_id, product_name, category_id, unit, price }) => ({
//             id: product_id,
//             name: product_name,
//             categoryId: category_id,
//             unit: unit,
//             price: price,
//         })
//     );
// }

app.get("/", (req, res) => {
    console.log(["API called 3005 only waiting to connect database server 5432"]);
    res.send("Hello World!");
});

app.get("/customers", async (req, res) => {
    console.log(["API called 3005 and db server 5432!"]);
    console.log(req.query.limit);
    const { limit } = <{ limit: string | undefined }>req.query;
    const result = await listCustomers(limit);
    res.send(JSON.parse(JSON.stringify(result)));
});

// app.get("/orders", async (req, res) => {
//     console.log(["API called!"]);
//     const { limit } = <{ limit: string | undefined }>req.query;
//     const result = await listOrders(limit);
//     res.send(JSON.parse(JSON.stringify(result)));
// });

// app.get("/products", async (req, res) => {
//     console.log(["API called!"]);
//     const { limit } = <{ limit: string | undefined }>req.query;
//     const result = await listProducts(limit);
//     res.send(JSON.parse(JSON.stringify(result)));
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
