import type { Response } from 'express';
/**
 * Notificador sencillo basado en Server-Sent Events (SSE) para cambios en Settings.
 * Mantiene una lista de clientes conectados vía /settings/stream y emite eventos
 * cuando se crean/actualizan/eliminan configuraciones.
 */
declare class SettingsNotifier {
    private clients;
    private nextId;
    subscribe(res: Response): () => void;
    notify(event: 'updated' | 'created' | 'deleted', payload: unknown): void;
}
export declare const settingsNotifier: SettingsNotifier;
export {};
//# sourceMappingURL=SettingsNotifier.d.ts.map