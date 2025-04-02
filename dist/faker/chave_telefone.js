"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const chavefone_entity_1 = require("../chave/chavefone.entity");
const faker_1 = require("@faker-js/faker");
const chave_entity_1 = require("../chave/chave.entity");
const bootstrap = async () => {
    var _a;
    const connection = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        url: 'postgresql://doadmin:data%40DATA%402019@localhost:5432/central_atendimento',
        entities: [
            __dirname + '/../**/**.entity{.ts,.js}'
        ],
        synchronize: false,
        logging: ['error'],
    });
    const allChaves = await connection.manager.find(chave_entity_1.ChaveEntity, { relations: ['chaveFones'] });
    for (let i = 0; i < 1000; i++) {
        const fone = faker_1.faker.phone.phoneNumber('#########');
        const chaveIndex = faker_1.faker.datatype.number({ min: 0, max: allChaves.length });
        const cdchave = (_a = allChaves[chaveIndex]) === null || _a === void 0 ? void 0 : _a.cd;
        if (cdchave) {
            await connection.manager.insert(chavefone_entity_1.ChaveFoneEntity, {
                cdchave,
                fone
            });
            console.log(`ADDED "${fone}" "${cdchave}"`);
        }
    }
    process.exit(0);
};
bootstrap();
//# sourceMappingURL=chave_telefone.js.map