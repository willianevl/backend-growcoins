import { badRequest, CompareFieldsValidator, HttpMiddleware, HttpResponse, Middleware, ok, RequireFieldsValidator } from "../../../../core/presentation";
import { User } from "../../domain";



export class UserMiddleware implements Middleware {
    async handle(request: HttpMiddleware): Promise<HttpResponse> {
        const body: User = request.body;

        const requiredFields = [
            'name',
            'email',
            'password',
            'confirmPassword',
            'programName',
            'edition',
            'userImage',
            'programUid'
        ];

        for(const field of requiredFields) {
            const error = new RequireFieldsValidator(field).validate(body);
            if(error) return badRequest(error);
        }

        const passwordError = new CompareFieldsValidator('password', 'confirmPassword').validate(body);
        if(passwordError) return badRequest(passwordError);

        return ok({});
    }
    
}