import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "@/src/common/enums/role.enum";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User } from "./entities/users_entity";
import { ResponseUserDto } from "./dto/response_user.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


    async getAllUsers(){
        try {
            const users = await this.userRepository.find();
            return users;}
        catch (error) {
            throw new NotFoundException("Users not found");
        }

    }

    async createUser(createUserDto: CreateUserDto) {
    try {
        const user = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(user);

        return new ResponseUserDto(savedUser);
    } catch (error) {
        console.error("Create user error:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            throw new ConflictException("Email already exists");
        }

        throw new InternalServerErrorException("Failed to create user");
    }
}
    
    async updateUser(id: string, updateUserDto: UpdateUserDto){
        try {
            console.log("id", id);
            if(!id){
                throw new NotFoundException("User id is required");
            }
            const user = await this.userRepository.findOne({where:{id}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            Object.assign(user, updateUserDto);
            const {id:uid, ...updateData} = user;
            return await this.userRepository.update({id:uid}, updateData);
        }
        catch (error) {
            throw new NotFoundException("Error updating user");
        }
    }

    async deleteUser(id: string){
        try {
            const user = await this.userRepository.findOne({where:{id}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            return await this.userRepository.delete({id});
        }
        catch (error) {
            throw new NotFoundException("Error deleting user");
        }
    }

    async getUserById(id: string){
        try {
            const user = await this.userRepository.findOne({where:{id}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            return new ResponseUserDto(user);
        }
        catch (error) {
            throw new NotFoundException("Error fetching user");
        }
    }
    async getUserByEmail(email: string){
        try {
            const user = await this.userRepository.findOne({where:{email}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            return new ResponseUserDto(user);
        }
        catch (error) {
            throw new NotFoundException("Error fetching user");
        }
    }
    async resetPassword(email: string, newPassword: string){
        try {
            const user = await this.userRepository.findOne({where:{email}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            user.password = newPassword;
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new NotFoundException("Error resetting password");
        }
    }

    async updateUserStatus(id: string, isActive: boolean){
        try {
            const user = await this.userRepository.findOne({where:{id}});
            if(!user){
                throw new NotFoundException("User not found");
            }
            user.isActive = isActive;
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new NotFoundException("Error updating user status");
        }
    }

    async getUsersByRole(role: Role){
        try {
            const users = await this.userRepository.find({where:{role}});
            if(!users || users.length === 0){
                throw new NotFoundException("Users not found");
            }
            return users.map(user => new ResponseUserDto(user));
        }
        catch (error) {
            throw new NotFoundException("Error fetching users by role");
        }
    }

    async getActiveUsers(){
        try {
            const users = await this.userRepository.find({where:{isActive:true}});
            if(!users || users.length === 0){
                throw new NotFoundException("Active users not found");
            }
            return users.map(user => new ResponseUserDto(user));
        }
        catch (error) {
            throw new NotFoundException("Error fetching active users");
        }
    }

    async getInactiveUsers(){
        try {
            const users = await this.userRepository.find({where:{isActive:false}});
            if(!users || users.length === 0){
                throw new NotFoundException("Inactive users not found");
            }
            return users.map(user => new ResponseUserDto(user));
        }
        catch (error) {
            throw new NotFoundException("Error fetching inactive users");
        }
    }

    
}        