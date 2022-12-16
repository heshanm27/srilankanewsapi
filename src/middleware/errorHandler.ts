import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import CustomError from "../util/error/customError";

type MyResponse = { err: string; succes: boolean };

const ErrorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response<MyResponse>, next: NextFunction) => {
  console.log("errror");
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      succes: false,
      err: err.message,
    });
  }

  return res.status(500).json({ succes: false, err: err.message });
};

export default ErrorHandlerMiddleware;
