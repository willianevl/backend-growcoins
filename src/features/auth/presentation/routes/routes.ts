import { Router } from "express";
import { CryptographyAdapter } from "../../../../core/infra";
import AuthController from "../controllers/auth.controller";

export default class AuthRoutes {
  public init(): Router {
    const routes = Router();
    const cryptography = new CryptographyAdapter(12);
    const controller = new AuthController(cryptography);

    routes.post("/login", controller.store);

    return routes;
  }
}