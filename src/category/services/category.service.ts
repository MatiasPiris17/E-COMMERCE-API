import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }
  async getCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  }

  async updateCategory(id: string, body: CategoryDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}
