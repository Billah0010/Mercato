import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartsController } from "./carts_controller";
import { CartsService } from "./carts_service";
import { Cart } from "./entities/carts_entity";
import { User } from "../users/entities/users_entity";

@Module({
    imports: [TypeOrmModule.forFeature([Cart, User])],
    controllers: [CartsController],
    providers: [CartsService]
})
export class CartsModule {}