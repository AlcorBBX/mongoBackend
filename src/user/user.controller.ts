import { Body, Controller, Get, HttpCode, Param, Put, UsePipes, ValidationPipe } from "@nestjs/common"
import { Types } from "mongoose"
import { CurrentUser } from "./decorators/user.decorator"
import { userDto } from "./user.dto"
import { UserService } from "./user.service"
import { IdValidationPipe } from "src/pipes/id.validation.pipe"
import { Auth } from "src/auth/jwt/auth.decorator"

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @Auth()
    async getProfile(@CurrentUser('_id') _id: Types.ObjectId) {
        return this.userService.getUser(_id)
    }

    @Get('by-id/:id')
    async getUser(@Param('id', IdValidationPipe) id: string) {
        return this.userService.getUser(new Types.ObjectId(id))
    }


    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put('profile')
    @Auth()
    async updateProfile(@CurrentUser('_id') _id: Types.ObjectId, @Body() dto: userDto) {
        return this.userService.updateProfile(_id, dto)
    }

    // @Get()
    // async getUsers() {
    //     return this.userService.getAll()
    // }
}

// function Auth() {
//     throw new Error("Function not implemented.")
// }
