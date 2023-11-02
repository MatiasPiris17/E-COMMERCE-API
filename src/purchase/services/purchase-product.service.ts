import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductEntity } from "../entities/purchase-product.entity";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
    super(PurchaseProductEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity[] | undefined> {
    return (await this.execRepository).findBy({ id });
  }

  async createPurchaseProduct(
    body: PurchaseProductEntity
  ): Promise<PurchaseProductEntity> {
    return (await this.execRepository).save(body);
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
