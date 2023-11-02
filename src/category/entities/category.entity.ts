import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
    @Column()
    CategoryName!: string;

    // colorBadge?:ColorBadge;

    @ManyToOne(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}