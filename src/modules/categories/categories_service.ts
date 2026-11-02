import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CreateCategoriesDto, UpdateCategoriesDto} from "./dto/create_categories.dto";
import { Category } from "./entities/categories_entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}
    async getAllCategories() {
        try {
            const categories = await this.categoryRepository.find();
            return categories;
        } catch (error) {
            throw new NotFoundException("Categories not found");
        }
    }

    async createCategory(createCategoryDto: CreateCategoriesDto) {
        try {
            const category = this.categoryRepository.create(createCategoryDto);
            const savedCategory = await this.categoryRepository.save(category);
            return savedCategory;
        } catch (error) {
            console.error("Create category error:", error);
            throw new InternalServerErrorException("Error creating category");
        }
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoriesDto) {
        try {
     
            console.log("id", id);
            if (!id) {
                throw new NotFoundException("Category id is not provided");
            }
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new NotFoundException("Category not found");
            }
            Object.assign(category, updateCategoryDto);
            const { id: uid, ...rest } = category;
            return await this.categoryRepository.update(uid, rest);
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(id: string) {
        if (!id) {
            throw new NotFoundException("Category id is not provided");
        }

        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException("Category not found");
        }

        return await this.categoryRepository.delete(id);
    }
}