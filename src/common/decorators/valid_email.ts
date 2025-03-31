import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { CountryCode } from "libphonenumber-js/types.cjs";
import { getOptionalOption } from "./getOption";
type Option ={
apiPropertyOptions?:ApiPropertyOptions,
emailOptions?: validator.IsEmailOptions, 
validationOptions?: ValidationOptions
}
export const  IsValidEmailApi=(option?:Option)=> {
    return applyDecorators(
      IsEmail(option?.emailOptions, option?.validationOptions),
     ApiProperty(option?.apiPropertyOptions),
    );
  }

  export const  IsValidEmailOptionalApi=(option?:Option)=> {
    return applyDecorators(
        IsValidEmailApi(getOptionalOption(option)),
        IsOptional()
    );
  }