const fs = require('fs')

class ProductManager {
    constructor (path){
        this.products = []
        this.path = path
    }

    //ADDPRODUCT
    addProduct(title, description, price, thumbnail, code, stock){
        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: 0
        };

        // CONFIGURAR ID
        producto.id = this.products.length + 1;
        // ↑↑ preguntar porqué no me da el mismo resultado hacer this.products.lenght ++ , o que this.products.lenght += 1
        this.products.forEach(prod => {
            prod.id = prod.id++;
        });
        // ↑↑  preguntar porqué no me da el mismo resultado hacer this.products.lenght ++ , o que this.products.lenght + 1

        if (this.products.find(product => product.code == producto.code)){
            return console.log(`El producto con el código ${producto.code} ya existe`);
        }else{

            let string = JSON.stringify(this.products)

            return [
                this.products.push(producto),
                fs.promises.writeFile(this.path, string, "utf-8")       
            ];
        }
    
    }




    // GET ALL PRODUCTS
    getProducts(){
        return console.log(this.products);
    }


    // GET PRODUCTS BY ID
    getProductsById(id){
        let founded = this.products.find(product => product.id == id);

        if (founded == undefined){
            return console.log("No se encontraron resultados")
        } else{
            return console.log(founded)
        }
    }



    //DELETEPRODUCTS
    deleteProduct(id){
        id = id - 1

        return [
            this.products.splice(id, 1),
            console.log(`Se ha eliminado el producto con ID ${id + 1}`),
            fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8")
        ];
    }


    
    //UPDATEPRODUCT
    updateproduct(id, campo, nuevo){
        let filtro = this.products.find(prod => prod.id == id);

        if (filtro == undefined) {
            return console.log(`No se ha encontrado producto con ID ${id}`)
        } else {
            return [
                filtro[campo] = nuevo,
                console.log(`Se ha modificado el dato ${campo} correctamente`),
                fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8")
            ];
        }


    }
}

let Pm = new ProductManager("./files/newfile.json");

Pm.addProduct("tomate", "grande", 250, "c://documents", 10, 1);
Pm.addProduct("pizza", "mediana", 1500, "c://documents", 13, 5);
Pm.addProduct("autito", "plastico", 500, "https://www.youtube.com", 14, 10);



// Pm.getProducts();

// Pm.deleteProduct(2)

// Pm.getProductsById(6);

Pm.updateproduct(1, "title", "jamon")

Pm.getProducts();