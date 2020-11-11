export interface HttpSuccess {
  headers: { [key: string]: string };
  statusCode: number;
  data: string;
}

export default function makeHttpSuccess(
  statusCode: number,
  data: any,
  filter: Array<string> = [],
  customHeaders: { [key: string]: string } = {}
) {
  let responseData =
    filter.length == 0
      ? JSON.stringify({
          success: true,
          data,
        })
      : JSON.stringify(
          {
            success: true,
            data,
          },
          ["success", "data"].concat(filter)
        );
  let headers: { [key: string]: string } = {};
  headers["Content-Type"] = "application/json";
  headers = { ...headers, ...customHeaders };
  return Object.seal<HttpSuccess>({
    headers,
    statusCode: statusCode,
    data: responseData,
  });
}
