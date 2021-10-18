import { Router } from "express";
import { UserController, UserMiddleware } from "..";
import { CryptographyAdapter } from "../../../../core/infra";
import { EMvc, middlewareAdapter, MvcController, routerMvcAdapter } from "../../../../core/presentation";
import { UserRepository } from "../../infra";

const makeController = (): MvcController => {
    const cryptography = new CryptographyAdapter(12);
    const repository = new UserRepository(cryptography);
    return new UserController(repository);
}

export class UserRoutes {
    public init(routes: Router): Router {

        routes.post("/users", middlewareAdapter(new UserMiddleware()),
        routerMvcAdapter(makeController(), EMvc.STORE));

        routes.get('/users/program/:programUid', routerMvcAdapter(makeController(), EMvc.INDEX));

        routes.get('/users/:uid', routerMvcAdapter(makeController(), EMvc.SHOW));

        routes.put('/users/:uid', middlewareAdapter(new UserMiddleware()),
        routerMvcAdapter(makeController(), EMvc.UPDATE));
        
        routes.delete('/users/:uid', routerMvcAdapter(makeController(), EMvc.DELETE));

        return routes;
    }
}