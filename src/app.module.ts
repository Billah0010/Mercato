import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostgresDatabaseProviderModule } from "@/providers/database/postgres/provider.module";
import { AppController } from "@/src/app.controller";
import { AppService } from "@/src/app.service";
import global_config from "@/config/global_config";
import { BullModule } from "@nestjs/bull";
import { UsersModule } from "@/src/modules/users/users_module";
import { CategoriesModule } from "@/src/modules/categories/categories_module";
import { ProductsModule } from "@/src/modules/products/poducts_module";

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    BullModule.forRoot({
      url: process.env.REDIS_URL,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [global_config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
