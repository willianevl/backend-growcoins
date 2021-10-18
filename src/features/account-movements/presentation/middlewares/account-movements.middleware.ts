import { badRequest, HttpMiddleware, HttpResponse, Middleware, ok, RequireFieldsValidator } from "../../../../core/presentation";
import { Movement } from "../../domain";



export class MovementsMiddleware implements Middleware {
    async handle(request: HttpMiddleware): Promise<HttpResponse> {
        const body: Movement = request.body;

        const requiredFields = [
            'value',
            'type',
            'description',
            'userUid'
        ];

        for(const field of requiredFields) {
            const error = new RequireFieldsValidator(field).validate(body);
            if(error) return badRequest(error);
        }

        return ok({});
    }
    
}