import { Course } from '../../courses/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Course, (course) => course.id, { nullable: true })
  presentCourse: Course;
  // @Column({ array: true })
  // coursesDone: Course[];
}
