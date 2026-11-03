import{
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";

import{ProductsService} from "./products_service";
import { CreateProductsDto, UpdateProductsDto } from "./dto/create_products.dto";

@Controller("products")
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}
    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts();
    }
    @Get(":id")
    async getProductById(@Param("id") id: string) {
        return await this.productsService.getProductById(id);
    }
    @Post()
    async createProduct(@Body() createProductsDto: CreateProductsDto) {
        return await this.productsService.createProduct(createProductsDto);
    }
    @Patch(":id")
    async updateProduct(
        @Param("id") id: string,
        @Body() updateProductsDto: UpdateProductsDto
    ) {
        return await this.productsService.updateProduct(id, updateProductsDto);
    }
    @Delete(":id")

    async deleteProduct(@Param("id") id: string) {
        return await this.productsService.deleteProduct(id);
    }
    

}
