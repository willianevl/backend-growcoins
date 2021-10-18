import { ProgramEntity } from "../../../../core/infra";
import { Program } from "../../domain";


export class ProgramRepository {
    async create(params: Program): Promise<Program> {
        const { name, edition } = params;
        
        const program = await ProgramEntity.create({
            name,
            edition
        }).save();

        return Object.assign({}, params, program);
    }

    async getProgram(edition: string, name: string): Promise<Program | undefined> {
        const program = await ProgramEntity.findOne({ edition: edition } && { name: name });
        console.log(program)

        if(!program) return undefined;

        return {
            uid: program.uid,
            name: program.name,
            edition: program.edition,
            createdAt: program.createdAt,
        } as Program;
    }

    async getPrograms(): Promise<Program[]> {
        const programs = await ProgramEntity.find();

        return programs.map((program) => {
            return {
                uid: program.uid,
                name: program.name,
                edition: program.edition,
                createdAt: program.createdAt,
            } as Program;
        })
    }

    async update(uid: string, params: Program): Promise<Program> {
        const { name, edition } = params;

        const program = await ProgramEntity.update(uid, {
            name,
            edition
        });

        return Object.assign({}, params, program);
    }

    async delete(uid: string) {
        return await ProgramEntity.delete(uid);
    }
}