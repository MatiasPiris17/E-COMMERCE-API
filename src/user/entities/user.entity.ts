import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column()
  city?: string;

  @Column()
  province?: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity
}
