import{ IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoriesDto {
 
  @IsNotEmpty()
  name: string="";

  @IsNotEmpty()
    description: string="";

    @IsNotEmpty()
    slug: string="";
}

export class UpdateCategoriesDto {
  @IsOptional()
  name?: string="";

    @IsOptional()
    description?: string="";

    @IsOptional()
    slug?: string="";
}
