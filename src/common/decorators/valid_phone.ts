import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { CountryCode } from "libphonenumber-js/types.cjs";
type Option ={
apiPropertyOptions?:ApiPropertyOptions,
region?: CountryCode, 
validationOptions?: ValidationOptions
}
export const  IsValidPhoneApi=(option?:Option)=> {
    return applyDecorators(
      IsPhoneNumber(option?.region, option?.validationOptions),
     ApiProperty(option?.apiPropertyOptions),
    );
  }

  export const  IsValidPhoneOptionalApi=(option?:Option)=> {
    return applyDecorators(
        IsValidPhoneApi(option),
        IsOptional()
    );
  }