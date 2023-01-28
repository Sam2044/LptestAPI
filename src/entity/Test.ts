import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({ name: "test", synchronize: false })
export class Test {
    @PrimaryColumn()
    trace_id: number

    @Column()
    trace_data: Buffer

    @Column()
    trace_time: Date
}