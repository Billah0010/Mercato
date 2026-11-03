import{Injectable, NotFoundException, InternalServerErrorException} from "@nestjs/common";
import{InjectRepository} from "@nestjs/typeorm";
import{Repository} from "typeorm";
import{Product} from "./entities/products_entity";
import{CreateProductsDto, UpdateProductsDto} from "./dto/create_products.dto";

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}
    async getAllProducts(){
        try{
            const products = await this.productRepository.find();
            return products;
        }catch(error){
            throw new NotFoundException("Products not found");
        }
    }
    async createProduct(createProductsDto: CreateProductsDto){
        try{
            const product = this.productRepository.create({
                ...createProductsDto,
                isActive: createProductsDto.isActive,
            });
            return await this.productRepository.save(product);

        }
        catch(error){
            console.error("Create product error:", error);
            throw new InternalServerErrorException("Error creating product");
        }
    }
    async getProductById(id:string){
        try{
            const product = await this.productRepository.findOne({where:{id}});
            if(!product){
                throw new NotFoundException("Product not found");
            }
            return product;
        }
        catch(error){
            throw new NotFoundException("Product not found");
        }
    }
    async updateProduct(id:string, updateProductsDto:UpdateProductsDto){
        try{
            const product = await this.productRepository.findOne({where:{id}});
            if(!product){
                throw new NotFoundException("Product not found");
            }
            Object.assign(product, updateProductsDto);
            return await this.productRepository.save(product);
        }
        catch(error){
            throw new NotFoundException("Error updating product");
        }
    }
    async deleteProduct(id:string){
        try{
            const product = await this.productRepository.findOne({where:{id}});
            if(!product){
                throw new NotFoundException("Product not found");
            }
            return await this.productRepository.remove(product);
        }
        catch(error){
            throw new NotFoundException("Error deleting product");
        }
    }
}