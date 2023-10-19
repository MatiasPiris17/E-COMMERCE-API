import { IsUUID, IsOptional, IsDate } from "class-validator";

export abstract class BaseDTO {
  @IsUUID()
  @IsOptional()
  id!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
