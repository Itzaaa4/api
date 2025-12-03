import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController.js';

const router = Router();
const controller = new SettingsController();

router.get('/', controller.get.bind(controller));
router.put('/', controller.update.bind(controller));
router.post('/', controller.create.bind(controller));
router.delete('/', controller.remove.bind(controller));
// Stream de eventos (SSE) para cambios en settings
router.get('/stream', controller.stream.bind(controller));

export default router;
