export declare class PaginationDto {
    page: number;
    perpage: number;
    getPaginationParams(query: PaginationDto): {
        skip: number;
        take: any;
    };
}
export declare class SearchQueryDto extends PaginationDto {
    search: string;
}
export declare class UserQueryDto extends PaginationDto {
    displayname: string;
    phone: string;
    username: string;
}
export declare class CustomerQueryDto extends PaginationDto {
    displayname: string;
    phone: string;
    email: string;
}
export declare const getPaginationParams: (query: PaginationDto) => {
    skip: number;
    take: any;
};
