import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @TreeParent()
  parent: Course;
  @TreeChildren()
  requiredCourse: Course;
}
