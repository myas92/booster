import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from 'dotenv';
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //TODO set false for production
    // synchronize: JSON.parse(process.env.POSTGRES_SYNCHRONIZE),
    synchronize: true,
    autoLoadEntities: false,
    //--------------------------------------
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: ["src/migrations/*.ts"],
    cli: {
        "migrationsDir": "src/migrations"
    }
}

