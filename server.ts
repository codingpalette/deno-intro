import { Application, Router  } from "https://deno.land/x/oak/mod.ts";
import { insertProduct, getProducts, getSingleProduct, updateProduct, delteProduct } from './routes.ts';

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.response.body = 'Welcome to notes API';
    })
    .post('/products', async (ctx) => {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = "데이터가 없습니다.";
        } else {
            const { value } = ctx.request.body({ type: 'json' });
            const body = await value;

            const res = await insertProduct(body);
            console.log(res)
            ctx.response.status = 201;
            ctx.response.body = res;
        }

    })
    .get('/products', async (ctx) => {
        const res = await getProducts();
        console.log(res)
        ctx.response.status = 201;
        ctx.response.body = res;
    })
    .get('/products/:id', async (ctx) => {
        const id =  ctx.params.id;
        console.log('id =',id)
        const res = await getSingleProduct(id);
        console.log('res=', res)
        if (res) {
            ctx.response.body = res;
            ctx.response.status = 200;
        } else {
            ctx.response.body = "책을 찾기 못했습니다.";
            ctx.response.status = 404;
        }
    })
    .patch('/products/:id', async (ctx) => {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = "데이터가 없습니다.";
        } else {
            const id =  ctx.params.id;
            const { value } = ctx.request.body({ type: 'json' });
            const body = await value;

            const res = await updateProduct(id , body);
            console.log(res)
            ctx.response.status = 201;
            ctx.response.body = res;
        }
    })
    .delete('/products/:id', async (ctx) => {
        const id =  ctx.params.id;
        await delteProduct(id)
        ctx.response.status = 200;
        ctx.response.body = 'ok';
    })
;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
