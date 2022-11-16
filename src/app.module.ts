import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { PreauthMiddleware } from './auth/preauth.middleware';
import { UsersModule } from './users/users.module';
import { Course } from './courses/entities/course.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pgConnection = {
          type: config.get('TYPEORM_CONNECTION'),
          host: config.get('TYPEORM_HOST'),
          port: parseInt(config.get('TYPEORM_PORT')),
          username: config.get('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          entities: [Course, User],
          autoLoadEntities: true,
          synchronize:
            config.get('TYPEORM_SYNCHRONIZE') == 'true' ? true : false,
          logging: config.get('TYPEORM_LOGGING'),
          migrations: [config.get('TYPEORM_MIGRATIONS')],
          migrationsDir: config.get('TYPEORM_MIGRATIONS_DIR'),
          migrationsRun: true,
        };
        console.log(pgConnection);
        return pgConnection;
      },
    }),
    CoursesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
