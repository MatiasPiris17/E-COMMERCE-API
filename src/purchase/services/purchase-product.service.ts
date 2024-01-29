import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductEntity } from "../entities/purchase-product.entity";
import { ProductService } from "../../product/services/product.service";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(PurchaseProductEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createPurchaseProduct(
    body: PurchaseProductEntity
  ): Promise<PurchaseProductEntity> {
    // quantityProduct
    const newPP = (await this.execRepository).create(body)
    const prod = await this.productService.findProductById(newPP.product.id)
    newPP.TotalPrice = prod!.price * newPP.quantityProduct;
    return (await this.execRepository).save(newPP);
  }

  async deletePuchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }

  async updatePurchaseProduct(
    id: string,
    infoUpdate: PurchaseProductEntity
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
