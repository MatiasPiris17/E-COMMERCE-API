import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { PurchaseDTO } from "../dto/purchase.dto";

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }

  async findAllPurchase(): Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }
  async findPurchaseById(id: string): Promise<PurchaseEntity[] | undefined> {
    return (await this.execRepository).findBy({ id });
  }
  async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
  async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
    return (await this.execRepository).save(body);
  }
  async deletePurchase(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }
}