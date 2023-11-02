import { BaseRouter } from "../shared/router/router"
import { ProductController } from "./controllers/product.controller";


export class ProductRoute extends BaseRouter<ProductController>{
    constructor(){
        super(ProductController)
    }


    routes():void {
        this.router.get("/products", (req,res)=> this.controller.getProducts(req,res))
        this.router.get("/product/:id", (req,res)=> this.controller.getProductById(req,res))
        this.router.post("/createProduct", (req,res)=> this.controller.createProduct(req,res))
        this.router.put("/updateProduct/:id", (req,res)=> this.controller.updateProduct(req,res))
        this.router.delete("/deleteProduct/:id", (req,res)=> this.controller.deleteProduct(req,res))
    }
}