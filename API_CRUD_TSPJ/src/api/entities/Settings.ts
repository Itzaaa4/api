import { Column, Entity, PrimaryColumn } from 'typeorm';

// Parámetros de sistema: moneda, impuestos, unidades, logo, plantillas
@Entity({ name: 'settings' })
export class Settings {
  // Registro único: forzamos id fijo = 1
  @PrimaryColumn({ type: 'int' })
  id!: number;

  // Moneda, por ejemplo: "MXN", "USD", "EUR"
  @Column({ type: 'varchar', length: 10, default: 'MXN' })
  currency!: string;

  // Impuesto como porcentaje (ej. 16 para 16%)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate!: string; // usar string para decimal en TypeORM + MySQL

  // Unidades, por ejemplo: "metric", "imperial" o un texto libre
  @Column({ type: 'varchar', length: 50, default: 'metric' })
  units!: string;

  // URL del logo (o data URI). Opcional
  @Column({ type: 'text', nullable: true })
  logoUrl?: string | null;

  // Plantillas en JSON (por ejemplo nombres o textos por documento)
  @Column({ type: 'simple-json', nullable: true })
  templates?: Record<string, unknown> | null;
}
