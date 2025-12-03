import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column()
    age!: number;

    @Column()
    rol!: number;

    @Column()
    contraseña!: string;

}