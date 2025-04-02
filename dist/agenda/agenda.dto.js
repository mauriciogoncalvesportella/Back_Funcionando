"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoFixarDTO = exports.FixarRecorrencia = exports.EventoDuplicarDTO = exports.TipoAgendamentoUpdateDTO = exports.TipoAgendamentoAddDTO = exports.EventoUpdateDTO = exports.EventoAddDTO = void 0;
const class_validator_1 = require("class-validator");
const evento_entity_1 = require("./evento.entity");
class EventoAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventoAddDTO.prototype, "nmtitulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EventoAddDTO.prototype, "nmlocal", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventoAddDTO.prototype, "mmdesc", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventoAddDTO.prototype, "fgconfirmado", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventoAddDTO.prototype, "fgcobrarvisita", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventoAddDTO.prototype, "fgdiatodo", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventoAddDTO.prototype, "fgrecorrente", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], EventoAddDTO.prototype, "dtinicio", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], EventoAddDTO.prototype, "dtfim", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], EventoAddDTO.prototype, "dtrealizadoinicio", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], EventoAddDTO.prototype, "dtrealizadofim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EventoAddDTO.prototype, "nmcontato", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", evento_entity_1.Recorrencia)
], EventoAddDTO.prototype, "jsrecorrencia", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventoAddDTO.prototype, "cdtipoagendamento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EventoAddDTO.prototype, "cdchave", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EventoAddDTO.prototype, "idtelefone", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], EventoAddDTO.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EventoAddDTO.prototype, "fgcadeado", void 0);
exports.EventoAddDTO = EventoAddDTO;
class EventoUpdateDTO extends EventoAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventoUpdateDTO.prototype, "cd", void 0);
exports.EventoUpdateDTO = EventoUpdateDTO;
class TipoAgendamentoAddDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TipoAgendamentoAddDTO.prototype, "nmtipoagendamento", void 0);
exports.TipoAgendamentoAddDTO = TipoAgendamentoAddDTO;
class TipoAgendamentoUpdateDTO extends TipoAgendamentoAddDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TipoAgendamentoUpdateDTO.prototype, "cd", void 0);
exports.TipoAgendamentoUpdateDTO = TipoAgendamentoUpdateDTO;
class EventoDuplicarDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventoDuplicarDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { each: true }),
    __metadata("design:type", Array)
], EventoDuplicarDTO.prototype, "dates", void 0);
exports.EventoDuplicarDTO = EventoDuplicarDTO;
class FixarRecorrencia {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FixarRecorrencia.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FixarRecorrencia.prototype, "mmdesc", void 0);
exports.FixarRecorrencia = FixarRecorrencia;
class EventoFixarDTO {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventoFixarDTO.prototype, "cd", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", Date)
], EventoFixarDTO.prototype, "dtrecorrente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EventoFixarDTO.prototype, "mmdesc", void 0);
exports.EventoFixarDTO = EventoFixarDTO;
//# sourceMappingURL=agenda.dto.js.map