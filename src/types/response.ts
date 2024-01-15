export type CustomResponse<T = unknown> = {
  status: "Success" | "Failed";
  message: string;
  data?: T;
};
