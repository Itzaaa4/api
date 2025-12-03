import { AppDataSource } from '../../config/data-source.js';
import { Settings } from '../entities/Settings.js';
export class SettingsService {
    repo = AppDataSource.getRepository(Settings);
    static SINGLETON_ID = 1;
    async getSettings() {
        let settings = await this.repo.findOne({ where: { id: SettingsService.SINGLETON_ID } });
        if (!settings) {
            settings = this.repo.create({
                id: SettingsService.SINGLETON_ID,
                currency: 'MXN',
                taxRate: '0.00',
                units: 'metric',
                logoUrl: null,
                templates: null,
            });
            await this.repo.save(settings);
        }
        return settings;
    }
    async updateSettings(payload) {
        const current = await this.getSettings();
        // Validaciones simples
        if (payload.currency && payload.currency.length > 10) {
            throw new Error('La moneda no debe exceder 10 caracteres');
        }
        if (payload.units && payload.units.length > 50) {
            throw new Error('Las unidades no deben exceder 50 caracteres');
        }
        if (payload.taxRate) {
            const n = Number(payload.taxRate);
            if (Number.isNaN(n) || n < 0 || n > 100) {
                throw new Error('El impuesto (taxRate) debe ser un número entre 0 y 100');
            }
            // normalizar a string con 2 decimales
            payload.taxRate = n.toFixed(2);
        }
        Object.assign(current, payload, { id: SettingsService.SINGLETON_ID });
        return this.repo.save(current);
    }
    /**
     * Crea o restablece la configuración (upsert del registro único).
     * Si ya existe, sobreescribe con los valores proporcionados (o por defecto) y guarda.
     */
    async createSettings(payload = {}) {
        // Normaliza y valida parcialmente usando la misma lógica de update
        const base = this.repo.create({
            id: SettingsService.SINGLETON_ID,
            currency: 'MXN',
            taxRate: '0.00',
            units: 'metric',
            logoUrl: null,
            templates: null,
        });
        // Reutilizar validaciones de update aplicando sobre base
        return this.updateSettings(Object.assign(base, payload));
    }
    /**
     * Elimina el registro único. Una posterior lectura lo recreará con valores por defecto.
     */
    async deleteSettings() {
        const found = await this.repo.findOne({ where: { id: SettingsService.SINGLETON_ID } });
        if (found) {
            await this.repo.remove(found);
        }
    }
}
//# sourceMappingURL=SettingsService.js.map