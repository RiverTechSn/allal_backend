import { IsValidStringOptionalApi } from '../decorators/valid_string';
import { IsValidStringNumberApi } from '../decorators/valid_string_number';

export class PaginationQueryDto {
  @IsValidStringNumberApi({ apiPropertyOptions: { default: 1 } })
  page: number;
  @IsValidStringNumberApi({ apiPropertyOptions: { default: 20 } })
  perpage: number;

  getPaginationParams() {
    return {
      skip: (Number(this.page) - 1) * Number(this.perpage),
      take: Number(this.perpage),
    };
  }
}
export class SearchQueryDto extends PaginationQueryDto {
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  search: string;
}

export class UserQueryDto extends PaginationQueryDto {
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  displayname: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  phone: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  email: string;
}
export class CustomerQueryDto extends PaginationQueryDto {
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  displayname: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  phone: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  email: string;
}
