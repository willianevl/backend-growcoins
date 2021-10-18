import { Router } from "express";
import { MovementsController, MovementsMiddleware } from "..";
import { EMvc, middlewareAdapter, MvcController, routerMvcAdapter } from "../../../../core/presentation";
import { MovementsRepository } from "../../infra";

const makeController = (): MvcController => {
    const repository = new MovementsRepository();
    return new MovementsController(repository);
}

export class MovementsRoutes {
    public init(routes: Router): Router {

        routes.post("/movements", middlewareAdapter(new MovementsMiddleware()),
        routerMvcAdapter(makeController(), EMvc.STORE));

        routes.get('/movements/:userUid/:type', routerMvcAdapter(makeController(), EMvc.INDEX));

        routes.get('/movements/:uid', routerMvcAdapter(makeController(), EMvc.SHOW));

        routes.put('/movements/:uid', middlewareAdapter(new MovementsMiddleware()),
        routerMvcAdapter(makeController(), EMvc.UPDATE));
        
        routes.delete('/movements/:uid', routerMvcAdapter(makeController(), EMvc.DELETE));

        return routes;
    };
};