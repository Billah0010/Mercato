import {
    Injectable,
    NotFoundException,
  
    InternalServerErrorException,
    
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {  CreateCartItemDto } from "./dto/create_cartItems.dto";
import { CartItem } from "./entities/cartItems_entity";

@Injectable()
export class CartItemsService {
    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>
    ) {}

    async getAllCartItems() {
        try {
            const cartItems = await this.cartItemRepository.find();
            return cartItems;
        } catch (error) {
            throw new NotFoundException("Cart items not found");
        }
    }
    async createCartItem(createCartItemDto: CreateCartItemDto) {
        try {
            const cartItem = this.cartItemRepository.create(createCartItemDto);
            const savedCartItem = await this.cartItemRepository.save(cartItem);
            return savedCartItem;
        }
        catch (error) {
            console.error("Create cart item error:", error);
            throw new InternalServerErrorException("Error creating cart item");
        }
    }
    async getCartItemById(id: string){
        try {
            const cartItem = await this.cartItemRepository.findOne({ where: { id } });
            if (!cartItem) {
                throw new NotFoundException("Cart item not found");
            }
            return cartItem;
        }
        catch (error) {
            throw new NotFoundException("Cart item not found");
        }
    }

    async updateCartItem(id: string, updateCartItemDto: Partial<CreateCartItemDto>) {
        try {
            const cartItem = await this.cartItemRepository.findOne({ where: { id } });
            if (!cartItem) {
                throw new NotFoundException("Cart item not found");
            }
            Object.assign(cartItem, updateCartItemDto);
            return await this.cartItemRepository.save(cartItem);
        }
        catch (error) {
            throw new NotFoundException("Error updating cart item");
        }
    }

    async deleteCartItem(id: string) {
        try {
            const cartItem = await this.cartItemRepository.findOne({ where: { id } });  
            if (!cartItem) {
                throw new NotFoundException("Cart item not found");
            }
            return await this.cartItemRepository.delete(id);
        }
        catch (error) {
            throw new NotFoundException("Error deleting cart item");
        }
    }
}