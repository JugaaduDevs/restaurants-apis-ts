export interface HttpError {
  headers: any;
  statusCode: number;
  data: string;
}

export default function makeHttpError(
  statusCode: number,
  errorMessage: string
) {
  return Object.seal<HttpError>({
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage,
    }),
  });
}
