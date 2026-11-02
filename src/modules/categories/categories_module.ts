import{Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesController } from "./categories_controller";
import { CategoriesService } from "./categories_service";
import { Category } from "./entities/categories_entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}