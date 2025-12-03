var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryColumn } from 'typeorm';
// Parámetros de sistema: moneda, impuestos, unidades, logo, plantillas
let Settings = class Settings {
    // Registro único: forzamos id fijo = 1
    id;
    // Moneda, por ejemplo: "MXN", "USD", "EUR"
    currency;
    // Impuesto como porcentaje (ej. 16 para 16%)
    taxRate; // usar string para decimal en TypeORM + MySQL
    // Unidades, por ejemplo: "metric", "imperial" o un texto libre
    units;
    // URL del logo (o data URI). Opcional
    logoUrl;
    // Plantillas en JSON (por ejemplo nombres o textos por documento)
    templates;
};
__decorate([
    PrimaryColumn({ type: 'int' }),
    __metadata("design:type", Number)
], Settings.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 10, default: 'MXN' }),
    __metadata("design:type", String)
], Settings.prototype, "currency", void 0);
__decorate([
    Column({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", String)
], Settings.prototype, "taxRate", void 0);
__decorate([
    Column({ type: 'varchar', length: 50, default: 'metric' }),
    __metadata("design:type", String)
], Settings.prototype, "units", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Settings.prototype, "logoUrl", void 0);
__decorate([
    Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Settings.prototype, "templates", void 0);
Settings = __decorate([
    Entity({ name: 'settings' })
], Settings);
export { Settings };
//# sourceMappingURL=Settings.js.map