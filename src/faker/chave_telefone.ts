import { createConnection, Repository, Brackets } from 'typeorm'
import * as fs from 'fs'
import {ChaveFoneEntity} from 'src/chave/chavefone.entity'
import { faker } from '@faker-js/faker'
import {ChaveEntity} from 'src/chave/chave.entity'

const bootstrap = async () => {
  const connection = await createConnection({
    type: 'postgres',
    url: 'postgresql://doadmin:data%40DATA%402019@localhost:5432/central_atendimento',
    entities: [
      __dirname + '/../**/**.entity{.ts,.js}'
    ],
    synchronize: false,
    logging: ['error'],
  })

  const allChaves = await connection.manager.find(ChaveEntity, { relations: ['chaveFones'] })
  for (let i = 0; i < 1000; i++) {
    const fone = faker.phone.phoneNumber('#########')
    const chaveIndex = faker.datatype.number({ min: 0, max: allChaves.length })
    const cdchave = allChaves[chaveIndex]?.cd as number
    if (cdchave) {
      await connection.manager.insert(ChaveFoneEntity, {
        cdchave,
        fone
      })
      console.log(`ADDED "${fone}" "${cdchave}"`)
    }
  }

  process.exit(0)
}

bootstrap()
