
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { UsersService } from "./users_service";
import { ResponseUserDto } from "./dto/response_user.dto";


@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    async getAllUsers(){
        return await this.usersService.getAllUsers();
    }
    @Get()
    async getResponseUsers(): Promise<ResponseUserDto[]> {
        const users = await this.usersService.getAllUsers();
        return users.map(user => new ResponseUserDto(user));
    }
    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<ResponseUserDto> {
        return await this.usersService.getUserById(id);
    }

    @Get("active")
    async getActiveUsers(){
        return await this.usersService.getActiveUsers();
    }

    @Get("inactive")
    async getInactiveUsers(){
        return await this.usersService.getInactiveUsers();

    }
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return await this.usersService.createUser(createUserDto);
    }

    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string){
        return await this.usersService.deleteUser(id);
    }
}