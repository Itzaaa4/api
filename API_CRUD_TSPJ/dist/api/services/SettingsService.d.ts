import { Settings } from '../entities/Settings.js';
export declare class SettingsService {
    private repo;
    private static readonly SINGLETON_ID;
    getSettings(): Promise<Settings>;
    updateSettings(payload: Partial<Settings>): Promise<Settings>;
    /**
     * Crea o restablece la configuración (upsert del registro único).
     * Si ya existe, sobreescribe con los valores proporcionados (o por defecto) y guarda.
     */
    createSettings(payload?: Partial<Settings>): Promise<Settings>;
    /**
     * Elimina el registro único. Una posterior lectura lo recreará con valores por defecto.
     */
    deleteSettings(): Promise<void>;
}
//# sourceMappingURL=SettingsService.d.ts.map