import type { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService.js';
import { settingsNotifier } from '../events/SettingsNotifier.js';

const service = new SettingsService();

export class SettingsController {
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const settings = await service.getSettings();
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener la configuración', error: String(error) });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updated = await service.updateSettings(req.body);
      // Notificar a clientes SSE
      settingsNotifier.notify('updated', updated);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ message: 'Error al actualizar la configuración', error: String(error) });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const created = await service.createSettings(req.body);
      settingsNotifier.notify('created', created);
      return res.status(201).json(created);
    } catch (error) {
      return res.status(400).json({ message: 'Error al crear la configuración', error: String(error) });
    }
  }

  async remove(_req: Request, res: Response): Promise<Response> {
    try {
      await service.deleteSettings();
      settingsNotifier.notify('deleted', { ok: true });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la configuración', error: String(error) });
    }
  }

  /**
   * Endpoint SSE para transmitir cambios de Settings en tiempo real.
   */
  async stream(_req: Request, res: Response): Promise<void> {
    // Encabezados SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    // Enviar un evento inicial con el estado actual
    try {
      const s = await service.getSettings();
      res.write(`event: init\n`);
      res.write(`data: ${JSON.stringify(s)}\n\n`);
    } catch {
      // ignorar si falla el init
    }

    // Suscribirse a notificaciones
    const unsubscribe = settingsNotifier.subscribe(res);
    res.on('close', unsubscribe);
    res.on('error', unsubscribe);
  }
}
