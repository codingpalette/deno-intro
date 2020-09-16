import { Application, Router  } from "https://deno.land/x/oak/mod.ts";
import { insertProduct } from './routes.ts';

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.response.body = 'Welcome to notes API';
    })
    .post('/products', async (ctx) => {
        const { value } = ctx.request.body({ type: 'json' });
        const body = await value
        const res = await insertProduct(body);
        console.log(res)
        ctx.response.status = 201;
        ctx.response.body = res;
    })
;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
