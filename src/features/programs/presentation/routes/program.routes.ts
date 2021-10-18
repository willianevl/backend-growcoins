import { Router } from "express";
import { EMvc, middlewareAdapter, MvcController, routerMvcAdapter } from "../../../../core/presentation";
import { ProgramRepository } from "../../infra";
import { ProgramController } from "../controllers";
import { ProgramMiddleware } from "../middlewares";



const makeController = (): MvcController => {
    const repository = new ProgramRepository();
    return new ProgramController(repository);
}

export class ProgramRoutes {
    public init(routes: Router): Router {

        routes.post("/programs", middlewareAdapter(new ProgramMiddleware()),
        routerMvcAdapter(makeController(), EMvc.STORE));

        routes.get('/programs', routerMvcAdapter(makeController(), EMvc.INDEX));

        routes.get('/programs/show', routerMvcAdapter(makeController(), EMvc.SHOW));

        routes.put('/programs/:uid', middlewareAdapter(new ProgramMiddleware()),
        routerMvcAdapter(makeController(), EMvc.UPDATE));
        
        routes.delete('/programs/:uid', routerMvcAdapter(makeController(), EMvc.DELETE));

        return routes;
    }
}