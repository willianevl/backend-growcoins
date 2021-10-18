import cors from "cors";
import express, { Request, Response, Router } from "express";
import { ProgramRoutes } from "../../features/programs/presentation";
import { UserRoutes } from "../../features/users/presentation";
import { MovementsRoutes } from "../../features/account-movements/presentation";


export default class App {
  readonly #express: express.Application;

  constructor() {
    this.#express = express();
  }

  public get server(): express.Application {
    return this.#express;
  }

  public init(): void {
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.#express.use(cors());
    // this.#express.use('/uploads', express.static('uploads'));
    this.#express.use(express.json());
    this.#express.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = Router();

    // this.#express.set('view engine', 'ejs');
    // this.#express.set('views', './src/views');
    

    this.#express.get("/", (_: Request, res: Response) => res.redirect("/api"));
    this.#express.use("/api", router);

    router.get("/", (_: Request, res: Response) => res.send("API RUNNING..."));


    const programRoutes = new ProgramRoutes().init(router);
    const userRoutes = new UserRoutes().init(router);
    const movementsRoutes = new MovementsRoutes().init(router);

    this.#express.use(programRoutes);
    this.#express.use(movementsRoutes);
    this.#express.use(userRoutes);
  }

  public start(port: number): void {
    this.#express.listen(port, () =>
      console.log(`Server is running on ${port}`)
    );
  }
}
