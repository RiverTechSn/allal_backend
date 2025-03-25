export declare class BaseResponse<T> {
    status: boolean;
    sessionExpired: boolean;
    result: T;
    message: string | string[];
    totalPage: number;
    static success<T>(result: T): BaseResponse<T>;
    static successWithPagination<T>(result: T, count: number, perPage: number): BaseResponse<T>;
}
