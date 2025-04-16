import { Customer } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimalApi, IsValidNumberOptionnalApi } from "../decorators/valid_number";
import { IsValidDateOptionalApi } from "../decorators/valid_date";
import { IsValidPhoneApi } from "../decorators/valid_phone";
import { IsValidStringNumberApi } from "../decorators/valid_string_number";
import { IsValidStringApi, IsValidStringOptionalApi } from "../decorators/valid_string";
import { OmitType } from "@nestjs/swagger/dist/type-helpers/omit-type.helper";
import { IsAllowOptionalApi } from "../decorators/allow";
import { ApiProperty } from "@nestjs/swagger";
import { LoginUpdateDto } from "./login.dto";

export class CsutomerBaseDto implements Customer{
    @IsValidNumberOptionnalApi()
    id: number;
    @IsValidNumberOptionnalApi()
    loginId: number;
    @IsValidStringApi()
    displayname: string;
    @IsValidStringOptionalApi()
    address: string;
    @IsValidPhoneApi()
    phone: string;
    @IsDecimalApi()
    laltitude: Decimal;
    @IsDecimalApi()
    longitude: Decimal;
    @IsValidDateOptionalApi()
    dateOfBirth: Date;
    @IsValidNumberOptionnalApi()
    walletBaseId: number;
    
}    


export class CustomerCreateDto extends OmitType(CsutomerBaseDto, ['id','walletBaseId', 'loginId']){
@IsValidStringApi()
password: string;
}
export class CustomerUpdateDto extends OmitType(CsutomerBaseDto, ['id','walletBaseId','phone','loginId']){
    @IsValidStringApi()
    password: string;
    @IsAllowOptionalApi()
    @ApiProperty({ type: LoginUpdateDto, required: false })
    login: LoginUpdateDto;
    }