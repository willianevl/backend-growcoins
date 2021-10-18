import { UserEntity } from "../../../../core/infra";
import { badRequest, CompareFieldsValidator, HttpMiddleware, HttpResponse, Middleware, ok, RequireFieldsValidator } from "../../../../core/presentation";
import { Program } from "../../domain";



export class ProgramMiddleware implements Middleware {
    async handle(request: HttpMiddleware): Promise<HttpResponse> {
        const body: Program = request.body;

        const requiredFields = [
            'name',
            'edition'
        ];

        for(const field of requiredFields) {
            const error = new RequireFieldsValidator(field).validate(body);
            if(error) return badRequest(error);
        }

        return ok({});
    }
    
}