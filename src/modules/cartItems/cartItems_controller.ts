import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
} from "@nestjs/common";

import { CartItemsService } from "./cartItems_service";
import { CreateCartItemDto } from "./dto/create_cartItems.dto";

@Controller("cart-items")
export class CartItemsController {
    constructor(
        private readonly cartItemsService: CartItemsService,
    ) {}

    @Post()
    async createCartItem(@Body() createCartItemDto: CreateCartItemDto) {
        return await this.cartItemsService.createCartItem(createCartItemDto);
    }

    @Get()
    async getAllCartItems() {
        return await this.cartItemsService.getAllCartItems();
    }

    @Get(":id")
    async getCartItemById(@Param("id") id: string) {
        return await this.cartItemsService.getCartItemById(id);
    }

    @Patch(":id")
    async updateCartItem(
        @Param("id") id: string,
        @Body() updateCartItemDto: Partial<CreateCartItemDto>,
    ) {
        return await this.cartItemsService.updateCartItem(id, updateCartItemDto);
    }

    @Delete(":id")
    async deleteCartItem(@Param("id") id: string) {
        return await this.cartItemsService.deleteCartItem(id);
    }
}