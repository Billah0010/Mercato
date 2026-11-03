import{IsNotEmpty, IsOptional} from "class-validator";

export class CreateProductsDto {
    @IsNotEmpty()
    name: string="";

    @IsNotEmpty()
    slug:string="";

    @IsNotEmpty()
    description:string="";

    @IsNotEmpty()
    price:number=0;

    @IsNotEmpty()
    stock:number=0;

    @IsNotEmpty()
    sku:string="";

    @IsNotEmpty()
    images:string[]=[];

    @IsNotEmpty()
    isActive:boolean=true;

    @IsOptional()
    catagory_slug?:string="";

    @IsOptional()
    created_at?:Date;

    @IsOptional()
    updated_at?:Date;
}

export class UpdateProductsDto {
    @IsOptional()
    name?: string="";

    @IsOptional()
    slug?:string="";

    @IsOptional()
    description?:string="";

    @IsOptional()
    price?:number=0;

    @IsOptional()
    stock?:number=0;

    @IsOptional()
    sku?:string="";

    @IsOptional()
    images?:string[]=[];

    @IsOptional()
    isActive?:boolean=true;

    @IsOptional()
    catagory_slug?:string="";

    @IsOptional()
    created_at?:Date;

    @IsOptional()
    updated_at?:Date;
}

