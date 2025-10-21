import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { IUserTypeEnum } from '../enum/user-type.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    default: null,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    unique: true,
  })
  username?: string;

  @Column({
    type: 'enum',
    enum: IUserTypeEnum,
    nullable: false,
    default: IUserTypeEnum.USER,
  })
  userType?: IUserTypeEnum;


  @IsOptional()
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
    unique: true,
  })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({ name: 'createdBy', default: null, select: false })
  createdBy: number;

  @Column({ name: 'updatedBy', default: null, select: false })
  updatedBy: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', default: null, select: false })
  deletedAt: Date;


}
