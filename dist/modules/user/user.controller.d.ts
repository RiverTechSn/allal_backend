import { UserService } from './user.service';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import { UserCreateDto, UserShopCreateDto, UserUpdateDto } from 'src/common/types/user.dto';
export declare class UserController {
    private readonly userServide;
    constructor(userServide: UserService);
    getAll(query: UserQueryDto): any;
    getById(id: number): any;
    create(body: UserCreateDto): any;
    createWithShop(body: UserShopCreateDto): any;
    updateById(id: number, body: UserUpdateDto): any;
}
