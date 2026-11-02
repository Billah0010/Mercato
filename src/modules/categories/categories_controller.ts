import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";

import {
    CreateCategoriesDto,
    UpdateCategoriesDto,
} from "./dto/create_categories.dto";

import { CategoriesService } from "./categories_service";

@Controller("categories")
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoriesDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Patch(":id")
    async updateCategory(
        @Param("id") id: string,
        @Body() updateCategoryDto: UpdateCategoriesDto
    ) {
        return await this.categoriesService.updateCategory(id, updateCategoryDto);
    }

    @Delete(":id")
    async deleteCategory(@Param("id") id: string) {
        return await this.categoriesService.deleteCategory(id);
    }
}