import {
    Body,
    Controller,
    Get,
    Post,
    
} from "@nestjs/common";

import { CartsService } from "./carts_service";
import { CreateCartsDto } from "./dto/create_carts.dto";

@Controller("carts")
export class CartsController {
    constructor(
        private readonly cartsService: CartsService,
    ) {}

    @Post()
    async createCart(@Body() createCartsDto: CreateCartsDto) {
        return await this.cartsService.createCart(createCartsDto.user_id);
    }

    @Get()
    async getAllCarts() {
        return await (this.cartsService as any).getAllCarts();
    }
}