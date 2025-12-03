API CRUD TS — Guía de Endpoints y Pruebas

Este proyecto expone una API REST sencilla para gestionar usuarios usando Express y TypeORM.

Requisitos previos

- Node.js 18+ instalado
- Base de datos MySQL accesible
- Archivo .env con las variables de conexión:
  - DB_HOST
  - DB_PORT (por defecto 3306)
  - DB_USERNAME
  - DB_PASSWORD
  - DB_DATABASE
  - PORT (opcional, por defecto 3000)

Ejemplo de .env:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=api_crud_ts
PORT=3000

Arranque del servidor

- Desarrollo (ts-node-dev):
  - npm start
- Producción (compilado):
  - npm run build
  - npm run prod

Nota sobre CORS en producción

- El servidor intenta cargar dinámicamente el paquete cors. Si no está instalado en tiempo de ejecución, aplica un middleware CORS mínimo de respaldo que permite solicitudes desde cualquier origen (o desde el origen definido en la variable de entorno CORS_ORIGIN).
- Para restringir el origen, exporta CORS_ORIGIN antes de arrancar:

  CORS_ORIGIN=http://localhost:4200 npm run prod

- Si prefieres usar el paquete completo, instala cors en el backend:

  npm i cors

Base URL por defecto: http://localhost:3000

Endpoints expuestos

Rutas montadas bajo /users:

- GET /users — Lista todos los usuarios
- GET /users/:id — Obtiene un usuario por id
- POST /users — Crea un usuario
- PUT /users/:id — Actualiza un usuario por id
- DELETE /users/:id — Elimina un usuario por id

Rutas montadas bajo /settings:

- GET /settings — Obtiene los parámetros del sistema
- PUT /settings — Actualiza los parámetros del sistema

Parámetros de sistema gestionados en /settings

- currency (string): Código de moneda a usar en el sistema (ej. "MXN", "USD", "EUR"). Por defecto: "MXN".
- taxRate (number|string): Porcentaje de impuesto aplicado a operaciones (0–100). Se guarda normalizado con 2 decimales. Por defecto: 0.00.
- units (string): Unidades del sistema, por ejemplo "metric" o "imperial". Por defecto: "metric".
- logoUrl (string|null): URL o Data URI del logo a mostrar. Opcional.
- templates (object|null): Objeto JSON con plantillas, por ejemplo títulos o textos de documentos (ej. { "invoiceHeader": "Factura", "quoteFooter": "Gracias" }). Opcional.

Ejemplos de uso de /settings

- Obtener configuración actual

  curl -X GET http://localhost:3000/settings

- Actualizar configuración (ej. establecer MXN, IVA 16%, unidades métricas y logo)

  curl -X PUT http://localhost:3000/settings \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "MXN",
    "taxRate": 16,
    "units": "metric",
    "logoUrl": "https://example.com/logo.png",
    "templates": {"invoiceHeader": "Factura", "quoteFooter": "Gracias por su preferencia"}
  }'

Cuerpo esperado (JSON) para crear/actualizar usuario:

{
  "firstname": "Juan",
  "lastname": "Pérez",
  "email": "juan.perez@example.com",
  "age": 30
}

Notas:

- En actualización (PUT) puedes enviar solo los campos a modificar.
- Las respuestas de error usan formato { message: string, error?: any }.

Probar con cURL

- Listar usuarios
curl -X GET http://localhost:3000/users

- Obtener por id (ej. id 1)
curl -X GET http://localhost:3000/users/1

- Crear usuario

  curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
  "firstname":"Juan",
  "lastname":"Pérez",
  "email":"juan.perez@example.com",
  "age":30
  }'
- Actualizar usuario (id 1)
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "age":31
  }'

- Eliminar usuario (id 1)
curl -X DELETE http://localhost:3000/users/1

Probar con Postman

Sí, puedes usar Postman. Pasos:

1. Abrir Postman y crear una nueva colección (opcional).
2. Crear una nueva solicitud (Request) por cada endpoint:
   - Método: GET/POST/PUT/DELETE según corresponda
   - URL base: http://localhost:3000
   - Ruta: /users, /users/:id
3. Para POST/PUT:
   - Ir a la pestaña Body
   - Seleccionar "raw"
   - Elegir tipo JSON
   - Pegar el JSON de ejemplo de la sección anterior
4. Enviar la solicitud y revisar la respuesta.

Sugerencia: Si lo prefieres, puedes duplicar la solicitud para cada variación (id distinto, payload distinto) y guardarlas en tu colección.

Problemas comunes

- SyntaxError: Invalid or unexpected token al iniciar: ya está resuelto importando las entidades como clases en src/config/data-source.ts.
- Error de conexión a MySQL: revisa las variables del .env y que el servidor MySQL esté activo y accesible desde el host/puerto configurado.
- 404 en /users/...: asegúrate de que el servidor esté corriendo en el puerto correcto (por defecto 3000) y que uses la base URL http://localhost:3000.

Estructura relevante

- src/server.ts: arranque de Express y montaje de rutas
- src/api/routes/UserRoutes.ts: define los endpoints /users
- src/api/controllers/UserController.ts: controladores HTTP
- src/api/services/UserService.ts: acceso a datos con TypeORM
- src/api/entities/User.ts: entidad User
- src/api/entities/Settings.ts: entidad Settings (parámetros del sistema)
- src/api/services/SettingsService.ts: lógica de negocio para configuración
- src/api/controllers/SettingsController.ts: controladores HTTP de configuración
- src/api/routes/SettingsRoutes.ts: define los endpoints /settings
- src/config/data-source.ts: configuración de TypeORM y conexión a BD

Interfaz Typewill (Tailwind) + Angular para Settings

Objetivo: crear una pequeña UI en Angular que consuma los endpoints /settings de esta API y usar Tailwind CSS (Typewill) para el estilo. La UI permitirá ver y editar los parámetros currency, taxRate, units, logoUrl y templates.

1) Prerrequisitos

- Node 18+
- Angular CLI (global): npm i -g @angular/cli

2) Crear proyecto Angular

- ng new settings-ui --routing --style=css
- cd settings-ui

3) Instalar Tailwind CSS (Typewill)

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- Edita tailwind.config.js y agrega:

  content: [
    "./src/**/*.{html,ts}",
  ]

- En src/styles.css agrega al inicio:

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

4) Configurar la URL base de la API

- Crea src/environments/environment.ts con:

  export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3000'
  };

- (Opcional prod) crea src/environments/environment.prod.ts con apiBaseUrl igual o al host de producción.

5) Generar un servicio SettingsService

- ng g s services/settings
- Reemplaza src/app/services/settings.service.ts con:

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../environments/environment';

  export interface Settings {
    id: number;
    currency: string;
    taxRate: string | number;
    units: string;
    logoUrl?: string | null;
    templates?: any;
  }

  @Injectable({ providedIn: 'root' })
  export class SettingsService {
    private base = `${environment.apiBaseUrl}/settings`;
    constructor(private http: HttpClient) {}
    get() { return this.http.get<Settings>(this.base); }
    update(payload: Partial<Settings>) { return this.http.put<Settings>(this.base, payload); }
  }

6) Habilitar HttpClientModule

- Edita src/app/app.module.ts e importa HttpClientModule de @angular/common/http y agrégalo en imports.

7) Generar componente Settings

- ng g c pages/settings
- Agrega una ruta en src/app/app-routing.module.ts:

  const routes: Routes = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' },
    { path: 'settings', component: SettingsComponent }
  ];

- Reemplaza src/app/pages/settings/settings.component.ts con:

  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { SettingsService, Settings } from '../../services/settings.service';

  @Component({ selector: 'app-settings', templateUrl: './settings.component.html' })
  export class SettingsComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    saving = false;
    error: string | null = null;

    constructor(private fb: FormBuilder, private api: SettingsService) {}

    ngOnInit() {
      this.form = this.fb.group({
        currency: ['MXN', [Validators.required, Validators.maxLength(10)]],
        taxRate: [0, [Validators.min(0), Validators.max(100)]],
        units: ['metric', [Validators.required]],
        logoUrl: [''],
        templates: ['']
      });
      this.load();
    }

    load() {
      this.loading = true;
      this.api.get().subscribe({
        next: (s: Settings) => {
          this.loading = false;
          const templatesStr = s.templates ? JSON.stringify(s.templates, null, 2) : '';
          this.form.patchValue({
            currency: s.currency,
            taxRate: typeof s.taxRate === 'string' ? parseFloat(s.taxRate) : s.taxRate,
            units: s.units,
            logoUrl: s.logoUrl || '',
            templates: templatesStr
          });
        },
        error: (e) => { this.loading = false; this.error = 'No se pudo cargar settings'; console.error(e); }
      });
    }

    save() {
      this.saving = true; this.error = null;
      let templatesObj: any = null;
      const templatesTxt = this.form.value.templates as string;
      if (templatesTxt && templatesTxt.trim()) {
        try { templatesObj = JSON.parse(templatesTxt); } catch { this.error = 'Templates no es JSON válido'; this.saving = false; return; }
      }
      const payload: any = {
        currency: this.form.value.currency,
        taxRate: Number(this.form.value.taxRate),
        units: this.form.value.units,
        logoUrl: this.form.value.logoUrl || null,
        templates: templatesObj
      };
      this.api.update(payload).subscribe({
        next: () => { this.saving = false; },
        error: (e) => { this.saving = false; this.error = 'No se pudo guardar'; console.error(e); }
      });
    }
  }

- Reemplaza src/app/pages/settings/settings.component.html con un formulario Tailwind:

  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Settings</h1>
    <div *ngIf="loading" class="text-gray-500">Cargando...</div>
    <div *ngIf="error" class="text-red-600 mb-3">{{ error }}</div>
    <form (ngSubmit)="save()" [formGroup]="form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Currency</label>
        <input class="border rounded px-3 py-2 w-full" formControlName="currency" placeholder="MXN">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Tax rate (%)</label>
        <input type="number" class="border rounded px-3 py-2 w-full" formControlName="taxRate" step="0.01" min="0" max="100">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Units</label>
        <select class="border rounded px-3 py-2 w-full" formControlName="units">
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Logo URL</label>
        <input class="border rounded px-3 py-2 w-full" formControlName="logoUrl" placeholder="https://...">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Templates (JSON)</label>
        <textarea class="border rounded px-3 py-2 w-full font-mono" rows="6" formControlName="templates" placeholder='{"invoiceHeader":"Factura"}'></textarea>
      </div>
      <div class="flex gap-3">
        <button class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" [disabled]="saving">Guardar</button>
        <button type="button" class="border px-4 py-2 rounded" (click)="load()" [disabled]="saving">Recargar</button>
      </div>
    </form>
  </div>

8) Ejecutar

- Backend: npm start (en este repo). Se habilitó CORS automáticamente.
- Frontend: en settings-ui, ejecuta ng serve -o

Notas y consideraciones

- CORS: este backend ya incluye cors() habilitado para permitir llamadas desde localhost:4200. Para restringir orígenes ajusta app.use(cors({ origin: 'http://localhost:4200' })).
- Validación: el backend normaliza taxRate como decimal con 2 decimales. Envía números entre 0 y 100.
- Templates: se guarda como JSON; asegúrate de enviar un objeto o null.
