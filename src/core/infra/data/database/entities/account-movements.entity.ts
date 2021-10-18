import {BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import { UserEntity } from ".";
import { v4 as uuid } from "uuid";

@Entity({ name: "account_movements" })
export class AccountMovementEntity extends BaseEntity {
    
    @PrimaryColumn({name: "uid"})
    uid!: string;

    @Column({name: "value"})
    value: number;

    @Column({name: "description"})
    description: string;

    @Column({name: "type"})
    type: string;

    @Column({name: "user_uid"})
    userUid: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @ManyToOne(() => UserEntity, user => user.movements)
    @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    user?: UserEntity;

    constructor(value: number, description: string, type: string, userUid: string){
        super();
        this.value = value;
        this.description = description;
        this.type = type;
        this.userUid = userUid;
    }

    @BeforeInsert()
    private beforeInsert() {
      this.uid = uuid();
      this.createdAt = new Date(Date.now());
    }
}
