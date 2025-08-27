import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("siigo_access_tokens")
export class SiigoAccessToken {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: true, nullable: false })
    access_token: string;

    @Column({ type: "int" })
    expires_in: number;

    @Column({ type: "timestamp with time zone" })
    expires_at: Date;

    @Column({ type: "varchar", length: 25 })
    token_type: string;

    @Column({ type: "varchar", length: 25 })
    scope: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}