// src/api/events/SettingsNotifier.ts
import type { Response } from 'express';

type Client = {
  id: number;
  res: Response;
};

/**
 * Notificador sencillo basado en Server-Sent Events (SSE) para cambios en Settings.
 * Mantiene una lista de clientes conectados vía /settings/stream y emite eventos
 * cuando se crean/actualizan/eliminan configuraciones.
 */
class SettingsNotifier {
  private clients: Client[] = [];
  private nextId = 1;

  subscribe(res: Response): () => void {
    const id = this.nextId++;
    const client = { id, res };
    this.clients.push(client);

    // Heartbeat para mantener viva la conexión con algunos proxies
    const interval = setInterval(() => {
      try {
        res.write(`: ping\n\n`);
      } catch {
        // Ignorar
      }
    }, 25_000);

    const unsubscribe = () => {
      clearInterval(interval);
      this.clients = this.clients.filter(c => c.id !== id);
      try {
        res.end();
      } catch {}
    };

    // Cerrar si el cliente corta
    res.on('close', unsubscribe);
    res.on('error', unsubscribe);

    return unsubscribe;
  }

  notify(event: 'updated' | 'created' | 'deleted', payload: unknown) {
    const data = JSON.stringify(payload ?? {});
    const msg = `event: ${event}\n` + `data: ${data}\n\n`;
    for (const { res } of this.clients) {
      try {
        res.write(msg);
      } catch {
        // Ignorar errores de escritura; serán limpiados por close/error
      }
    }
  }
}

export const settingsNotifier = new SettingsNotifier();
