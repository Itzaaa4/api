// Declaración mínima para evitar error TS2307 cuando no están disponibles
// los tipos de "cors". Esto permite compilar incluso si @types/cors no está
// instalado o no se resuelve correctamente bajo la configuración actual.
declare module 'cors' {
  const cors: any;
  export default cors;
}
