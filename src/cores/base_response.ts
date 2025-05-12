export class BaseResponse<T> {
  status: number;
  sessionExpired: boolean;
  result: T;
  message: string | string[];
  totalPage: number = 0;

  // Success response without pagination
  static success<T>(result: T): BaseResponse<T> {
    const response = new BaseResponse<T>();
    response.result = result;
    response.status = 200;
    response.sessionExpired = false;
    delete response.totalPage;
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
    response.status = 200;
    response.sessionExpired = false;
    response.totalPage = totalPage === 0 ? 1 : totalPage;
    return response;
  }
}
