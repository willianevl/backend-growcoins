import { DataNotFoundError, HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { MovementsRepository } from "../../infra";


export class MovementsController implements MvcController {

    readonly #repository: MovementsRepository;

    constructor(repository: MovementsRepository) {
        this.#repository = repository;
    }

    async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const movement = await this.#repository.create(request.body);

            return ok(movement);
        } catch(error) {
            return serverError();
        }
    }

    async index(request: HttpRequest): Promise<HttpResponse> {
        const { userUid, type } = request.params;

        try {
            const movements = await this.#repository.getMovementsByType(userUid, type);

            return ok(movements);
        } catch(error) {
            return serverError();
        }
    }

    async show(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;

        try {
            const movement = await this.#repository.getMovement(uid);
            if(!movement) return notFound(new DataNotFoundError());

            return ok(movement);
        } catch(error){
            return serverError()
        }
    }

    async delete(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;

        try {
            const movement = await this.#repository.delete(uid);

            return ok(movement);
        } catch(error) {
            return serverError();
        }
    }

    async update(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;

        try {
            const movement = await this.#repository.update(uid, request.body);

            return ok(movement);
        } catch(error) {
            return serverError();
        }
    }
    
}