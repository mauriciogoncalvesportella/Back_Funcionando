import { ConnectionOptions } from "typeorm"
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const env: any = dotenv.parse(fs.readFileSync(`.env`));

const config : ConnectionOptions = {
  type: 'postgres',
  url: env.DB_URL,
  entities: [
    __dirname + '/dist/../**/**.entity{.ts,.js}'
  ],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export = config
