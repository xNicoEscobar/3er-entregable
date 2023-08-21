const express = require('express');
const ProductManager = require('./ProductManger.js');
const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
        return res.send(products.slice(0, limit));
    }

    res.send(products);
});

app.get('/products/:pId', async (req, res) => {
    const productId = parseInt(req.params.pId, 10);
    const products = await productManager.getProducts();

    const product = products.find(({ id }) => id === productId);

    res.send(product);
})

app.listen(8080, () => console.log('funcando'));