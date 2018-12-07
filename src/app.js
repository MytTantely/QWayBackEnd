const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const bodyParser = require('koa-body')();
const cors = require('@koa/cors');
const cacheControl = require('koa-cache-control');

const CB = require('./model/couchbaseUtil');


// const etag = require('etag');

// etag works together with conditional-get
// app.use(cors());

let options = {
    origin: '*',
    exposeHeaders: 'ETag'
};

app.use(cors(options));

app.use(cacheControl({
    noCache: true
}));

app.use(conditional());
app.use(etag());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');

// Create Routes for CRUD
router.get('/', (ctx, next) => {
    ctx.body = 'Hello Alyssa!';
});

router.get('/companies', async (ctx, next) => {

    let query = 'SELECT * FROM testBucket WHERE type = "company"';
    await CB.getAll(query)
        .then(rows => ctx.body = rows.map( val => val.testBucket) )
        .catch(err => console.log(err));
});

router.get('/company/:id', async (ctx, next) => {

    await CB.get(`COMPANY::${ctx.params.id}`)
        .then(result => {

            console.log(result);
            console.log('get a result');

            ctx.body = {
                status: 'success',
                data: result.value,
                cas: result.cas
            }

            ctx.status = 200;
        });
});



// ctx.set('ETag', etag('ctx.body'));
router.post('/companies', bodyParser, async (ctx) => {

    await CB.add(ctx.request.body.id, ctx.request.body)
        .then(result => ctx.status = 201)
        .catch(err => console.log(err));
});

router.put('/company/:id', bodyParser, async (ctx) => {

    await CB.update(`COMPANY::${ctx.params.id}`, ctx.request.body.data, ctx.request.body.cas)
        .then(result => ctx.status = 202)
        .catch(errCode => {
            ctx.status = errCode
            ctx.body = {
                message: "Failed to update!"
            }
        });
});

// Sample Data
let companies = [
    { id: 1, name: "MyT", employees: 2, startUp: true },
    { id: 2, name: "Apple", employees: 25000, startUp: true },
    { id: 3, name: "Google", employees: 35000, startUp: true }
];