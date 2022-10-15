import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', default: '' })
  image: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '', unique: true })
  code: string;

  @Column({ type: 'varchar', default: '' })
  price: string;

  @Column({ type: 'varchar', default: '' })
  market_cap: string;

  @Column({ type: 'varchar', default: '' })
  _24h: string;
}
