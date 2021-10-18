import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { AccountMovementEntity } from "./account-movements.entity";
import { ProgramEntity } from "./program.entity";

@Entity({ name: "users" }) 
export class UserEntity extends BaseEntity {
  @PrimaryColumn({name: "uid"})
  uid!: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "program_name" })
  programName: string;

  @Column({ name: "edition" })
  edition: string;

  @Column({ name: "user_image" })
  userImage: string;

  @Column({ name: "program_uid" })
  programUid: string;

  @Column({ name: "admin" })
  admin: boolean;

  @Column({ name: "pending" })
  pending: boolean;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne(() => ProgramEntity, program => program.users)
  @JoinColumn({name: 'program_uid', referencedColumnName: 'uid'})
  program?: ProgramEntity;

  @OneToMany(() => AccountMovementEntity, movements => movements.user)
  movements?: AccountMovementEntity[];


  constructor(
    name: string,
    password: string,
    email: string,
    programName: string,
    edition: string,
    userImage: string,
    programUid: string,
    admin: boolean,
    pending: boolean
  ) {
    super();
    this.name = name;
    this.password = password;
    this.email = email;
    this.programName = programName;
    this.edition = edition;
    this.userImage = userImage;
    this.programUid = programUid;
    this.admin = admin;
    this.pending = pending;
  }

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuid();
    this.createdAt = new Date(Date.now());
  }

}
