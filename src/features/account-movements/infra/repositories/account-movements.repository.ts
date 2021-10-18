import { AccountMovementEntity } from "../../../../core/infra";
import { Movement } from "../../domain";


export class MovementsRepository {
    async create(params: Movement): Promise<Movement> {
        const { value, type, description, userUid } = params;
        
        const movement = await AccountMovementEntity.create({
            value,
            type,
            description,
            userUid
        }).save();

        return Object.assign({}, params, movement);
    }

    async getMovement(uid: string): Promise<Movement | undefined> {
        const movement = await AccountMovementEntity.findOne(uid);

        if(!movement) return undefined;

        return {
            uid: movement.uid,
            value: movement.value,
            type: movement.type,
            description: movement.description,
            userUid: movement.userUid,
            createdAt: movement.createdAt,
        } as Movement;
    }

    async getMovementsByType(userUid: string, type: string): Promise<Movement[]> {
        const movements = await AccountMovementEntity.find({ userUid: userUid } && { type: type });

        return movements.map((movement) => {
            return {
                uid: movement.uid,
                value: movement.value,
                type: movement.type,
                description: movement.description,
                userUid: movement.userUid,
                createdAt: movement.createdAt,
            } as Movement;
        })
    }

    async update(uid: string, params: Movement): Promise<Movement> {
        const { value, type, description, userUid } = params;

        const movement = await AccountMovementEntity.update(uid, {
            value,
            type,
            description,
            userUid
        });

        return Object.assign({}, params, movement);
    }

    async delete(uid: string) {
        return await AccountMovementEntity.delete(uid);
    }
}