import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_table' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column() role: number;
}
