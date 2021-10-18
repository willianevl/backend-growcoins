import { DataNotFoundError, HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { ProgramRepository } from "../../infra";


export class ProgramController implements MvcController {

    readonly #repository: ProgramRepository;

    constructor(repository: ProgramRepository) {
        this.#repository = repository;
    }

    async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const program = await this.#repository.create(request.body);

            return ok(program);
        } catch(error) {
            return serverError();
        }
    }

    async index(): Promise<HttpResponse> {
        try {
            const programs = await this.#repository.getPrograms();

            return ok(programs);
        } catch(error) {
            return serverError();
        }
    }

    async show(request: HttpRequest): Promise<HttpResponse> {
        const { name, edition } = request.body;
        console.log(request.body)

        try {
            const program = await this.#repository.getProgram(edition, name);
            if(!program) return notFound(new DataNotFoundError());

            return ok(program);
        } catch(error){
            return serverError()
        }
    }

    async delete(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;
        try {
            const program = await this.#repository.delete(uid);

            return ok(program);
        } catch(error) {
            return serverError();
        }
    }

    async update(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;
        try {
            const program = await this.#repository.update(uid, request.body);

            return ok(program);
        } catch(error) {
            return serverError();
        }
    }
    
}