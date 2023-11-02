import { Request, Response } from "express";
import { HttpResponse } from "../../shared/router/response/http.response";
import { CategoryService } from "../services/category.service";
import { UpdateResult } from "typeorm";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.getAllCategories();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, "No existe dato");
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.getCategoryById(id);
      if (!data) return this.httpResponse.NotFound(res, "No existe dato");
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  createCategory(req: Request, res: Response) {
    try {
      const data = this.categoryService.createCategory(req.body);
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = this.categoryService.updateCategory(id, req.body);
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = this.categoryService.deleteCategory(id);
      return this.httpResponse.OK(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
