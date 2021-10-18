import {BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { UserEntity } from ".";
import { v4 as uuid } from "uuid";

@Entity({ name: "programs" })
export class ProgramEntity extends BaseEntity {

    @PrimaryColumn({name: "uid"})
    uid!: string;

    @Column({name: "name"})
    name: string;

    @Column({name: "edition"})
    edition: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @OneToMany(() => UserEntity, user => user.program)
    users?: UserEntity[];

    constructor(name: string, edition: string){
        super();
        this.name = name;
        this.edition = edition;
    }

    @BeforeInsert()
    private beforeInsert() {
      this.uid = uuid();
      this.createdAt = new Date(Date.now());
    }
}

