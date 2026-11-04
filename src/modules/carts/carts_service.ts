import{ Injectable, NotFoundException } from "@nestjs/common";
import{ InjectRepository } from "@nestjs/typeorm";
import{ Repository } from "typeorm";
import{ Cart } from "./entities/carts_entity";
import{ User } from "../users/entities/users_entity";
 
@Injectable()
export class CartsService{
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}
    async createCart(userIdOrUser: string | User){
        const userId = typeof userIdOrUser === "string"
            ? userIdOrUser
            : userIdOrUser.id;
        if (!userId) {
            throw new NotFoundException("User not found");
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const existingCart = await this.cartRepository.findOne({ where: { user: { id: userId } } });
        if (existingCart) {
            return existingCart;
        }
        const cart = this.cartRepository.create({ user });
        return await this.cartRepository.save(cart);
    }
    async getCart(user: User){
        const cart = await this.cartRepository.findOne({where:{user}});
        if(!cart){
            return await this.createCart(user);
        }
        return cart;
    }
    async deleteCart(user: User){
        const cart = await this.cartRepository.findOne({where:{user}});
        if(cart){
            await this.cartRepository.remove(cart);
        }
    }
}