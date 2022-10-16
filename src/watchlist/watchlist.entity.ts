import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  min_price: number;

  @Column({ unique: true })
  max_price: number;
}
