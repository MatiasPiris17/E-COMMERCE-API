import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "./purchase.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {
  @Column()
  cuantityProduct!: number;

  @Column()
  TotalPrice!: number;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({ name: "purchase_id" })
  purchase!: PurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;

}
