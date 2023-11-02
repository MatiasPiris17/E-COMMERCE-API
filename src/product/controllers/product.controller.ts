import { Request, Response } from "express";
import { HttpResponse } from "../../shared/router/response/http.response";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProduct();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, "No existe dato");
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);

      if (!data) return this.httpResponse.NotFound(res, "No existe dato");

      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.updateProduct(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(
          res,
          "Hay un error al eliminar el product"
        );
      }
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.deleteProduct(
        req.params.id
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(
          res,
          "Hay un error al eliminar el product"
        );
      }

      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
