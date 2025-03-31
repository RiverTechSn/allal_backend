import { IsValidStringOptionalApi } from '../decorators/valid_string';
import { IsValidStringNumberApi } from '../decorators/valid_string_number';

export class PaginationQueryDto {
  @IsValidStringNumberApi()
  page: number;
  @IsValidStringNumberApi()
  perpage: number;

  getPaginationParams(query: PaginationQueryDto) {
    return {
      skip: (Number(query.page) - 1) * Number(query.perpage),
      take: Number(query.perpage),
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
  username: string;
}
export class CustomerQueryDto extends PaginationQueryDto {
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  displayname: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  phone: string;
  @IsValidStringOptionalApi({ apiPropertyOptions: { required: false } })
  email: string;
}
