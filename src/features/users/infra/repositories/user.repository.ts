import { UserEntity } from "../../../../core/infra";
import { CryptographyAdapter } from "../../../../core/infra";
import { User } from "../../domain";



export class UserRepository {
    readonly #cryptography: CryptographyAdapter;

    constructor(cryptography: CryptographyAdapter){
        this.#cryptography = cryptography;
    }

    async create(params: User): Promise<User> {
        const { name, email, password, confirmPassword, programName, edition, userImage, programUid } = params;
        
        const passwordHash = await this.#cryptography.hash(password);

        const user = await UserEntity.create({
            name,
            email,
            password: passwordHash,
            programName,
            edition,
            userImage,
            programUid
        }).save();

        return Object.assign({}, params, user);
    }

    async getUser(uid: string): Promise<User | undefined> {
        const user = await UserEntity.findOne(uid);

        if(!user) return undefined;

        return {
            uid: user.uid,
            name: user.name,
            email: user.email,
            programName: user.programName,
            pending: user.pending,
            admin: user.admin,
            edition: user.edition,
            createdAt: user.createdAt,
        } as User;
    }

    async getUsersByProgram(programUid: string): Promise<User[]> {
        const users = await UserEntity.find({ programUid: programUid });

        return users.map((user) => {
            return {
                uid: user.uid,
                name: user.name,
                email: user.email,
                programName: user.programName,
                pending: user.pending,
                admin: user.admin,
                edition: user.edition,
                userImage: user.userImage,
                createdAt: user.createdAt,
            } as User;
        })
    }

    async update(uid: string, params: User): Promise<User> {
        const { name, email, password, confirmPassword, programName, edition, userImage, programUid } = params;

        const passwordHash = await this.#cryptography.hash(password);

        const user = await UserEntity.update(uid, {
            name,
            email,
            password: passwordHash,
            programName,
            edition,
            userImage,
            programUid
        });

        return Object.assign({}, params, user);
    }

    async delete(uid: string) {
        return await UserEntity.delete(uid);
    }
}