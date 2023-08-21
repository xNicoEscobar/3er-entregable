const fs = require("fs");

class ProductManager {
    static id = 0;
    async addProduct(title, sku, description, price, thumbnail, stock) {
        this.path = "/products.json";
        const product = {
            id: ProductManager.id++,
            title,
            sku,
            description,
            price,
            thumbnail,
            stock,
        };

        try {
            if (!fs.existsSync(this.path)) {
                const listaVacia = [];
                listaVacia.push(product);

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(listaVacia, null, "\t")
                );
            } else {
                try {
                    const objContent = await this.getProducts();
                    objContent.push(product);
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(objContent, null, "\t")
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsNoId = products.filter((product) => product.id != id);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(productsNoId, null, "\t")
        );
    }

    async getProducts() {
        const content = await fs.promises.readFile('./src/products.json', "utf-8");
        const objContent = JSON.parse(content);
        return objContent;
    }

    async getProductsById(id) {
        const content = await this.getProducts();
        let productById = content.find((e) => e.id == id);
        return productById === undefined
            ? console.log("Product not found")
            : productById;
    }

    async updateProducts(id, product) {
        let content = await this.getProducts();
        let i = content.findIndex((e) => e.id === id);
        product.id = id;
        content.splice(i, 1, product);
        await fs.promises.writeFile(this.path, JSON.stringify(content, null, "\t"));
    }
}

module.exports = ProductManager;
