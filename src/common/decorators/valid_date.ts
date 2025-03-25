import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsOptional, IsPhoneNumber, ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { CountryCode } from "libphonenumber-js/types.cjs";
type Option ={
apiPropertyOptions?:ApiPropertyOptions,
dateOptions?: validator.IsISO8601Options, 
validationOptions?: ValidationOptions
}
export const  IsValidDateApi=(option?:Option)=> {
    return applyDecorators(
      IsDateString(option?.dateOptions, option?.validationOptions),
     ApiProperty(option?.apiPropertyOptions),
    );
  }

  export const  IsValidDateOptionalApi=(option?:Option)=> {
    return applyDecorators(
      IsValidDateApi(option),
        IsOptional()
    );
  }