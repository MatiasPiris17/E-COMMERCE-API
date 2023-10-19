import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";


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
