import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemsController } from "./cartItems_controller";
import { CartItemsService } from "./cartItems_service";
import { CartItem } from "./entities/cartItems_entity";

@Module({
    imports: [TypeOrmModule.forFeature([CartItem])],
    controllers: [CartItemsController],
    providers: [CartItemsService],
})
export class CartItemsModule {}