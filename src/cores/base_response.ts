export class BaseResponse<T> {
  status: boolean;
  sessionExpired: boolean;
  result: T;
  message: string | string[];
  totalPage: number = 0;

  // Success response without pagination
  static success<T>(result: T): BaseResponse<T> {
    const response = new BaseResponse<T>();
    response.result = result;
    response.status = true;
    response.sessionExpired = false;
    return response;
  }

  // Success response with pagination
  static successWithPagination<T>(
    result: T,
    count: number,
    perPage: number,
  ): BaseResponse<T> {
    const totalPage = Math.ceil(count / perPage);
    const response = new BaseResponse<T>();
    response.result = result;
    response.status = true;
    response.sessionExpired = false;
    response.totalPage = totalPage === 0 ? 1 : totalPage;
    return response;
  }
}
