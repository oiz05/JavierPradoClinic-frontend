# Javier Prado Clinic Frontend

Frontend web para la gestion de pacientes de la Clinica Javier Prado. El proyecto incluye una landing publica, autenticacion de pacientes, registro, dashboard protegido y un flujo visual para agendar o reagendar citas.

## Estado actual

- Landing publica con branding de clinica
- Login de pacientes conectado a backend
- Registro de pacientes conectado a backend
- Dashboard protegido para rol `PATIENT`
- Flujo visual de agendamiento y reagendamiento
- Parte del modulo de citas sigue trabajando con datos mock y acciones locales

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Axios
- Zod
- Sonner
- Lucide React
- Motion

## Requisitos

- Node.js 20+
- pnpm

## Instalacion

```bash
pnpm install
```

## Scripts disponibles

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Variables de entorno

El proyecto usa estas variables para resolver la URL base del backend:

- `VITE_API_BASE_URL`
- `VITE_API_TARGET`

La instancia Axios de `src/shared/apiClient.ts` usa:

```ts
import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_TARGET || "/api"
```

En desarrollo, `vite.config.ts` configura un proxy para `/api`, apuntando a `VITE_API_TARGET` o `VITE_API_BASE_URL`.

Ejemplo:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TARGET=http://localhost:8080
```

## Como ejecutar

1. Instala dependencias con `pnpm install`.
2. Configura las variables de entorno necesarias.
3. Inicia el entorno local con `pnpm dev`.
4. Abre la URL que muestra Vite en consola.

## Rutas principales

- `/`: landing publica
- `/auth/login`: inicio de sesion
- `/auth/register`: registro de paciente
- `/patient/dashboard`: dashboard del paciente
- `/patient/appointment`: flujo de agendamiento de citas

## Flujo funcional actual

### Landing publica

La pagina principal muestra el branding de la clinica, secciones informativas y llamadas a la accion hacia autenticacion y agendamiento.

### Autenticacion

- El login consume `POST /auth/login`
- Luego consulta `GET /users/me`
- El frontend guarda `token` y `user` en `localStorage`
- Las rutas protegidas validan que exista sesion y que el rol del usuario sea `PATIENT`

### Registro

- El registro consume `POST /auth/register`
- El formulario valida campos con `zod`
- Se solicitan nombres, apellidos, DNI, telefono, correo y contrasena

### Dashboard de paciente

El dashboard muestra:

- saludo personalizado con el nombre del paciente
- bloque de siguiente cita
- tabla de citas proximas
- acciones visuales para confirmar, cancelar o reagendar

### Agendamiento de citas

La pantalla de agendamiento incluye:

- seleccion de especialidad
- seleccion de sede
- seleccion opcional de medico
- calendario visual
- horarios disponibles
- resumen de cita
- modal de confirmacion o error

## Integracion con backend

Endpoints usados actualmente por el frontend:

- `POST /auth/login`
- `POST /auth/register`
- `GET /users/me`

## Estructura del proyecto

```text
src/
  authContext/
    components/
    types/
  homeContext/
    components/
    pages/
  patientsContext/
    components/
    pages/
    types/
  shared/
    apiClient.ts
  ui/
  App.tsx
  main.tsx
```

## Consideraciones importantes

- El proyecto esta enfocado hoy en la experiencia de paciente.
- La proteccion de rutas se basa en `localStorage` y validacion de rol en frontend.
- El modulo de citas todavia no esta completamente integrado con backend.
- Varias acciones del dashboard y del flujo de cita siguen siendo demostrativas o locales.

## Limitaciones conocidas

- El listado de citas en dashboard usa datos mock.
- Confirmar, cancelar o reagendar citas no persiste cambios en backend.
- El flujo de confirmacion de cita actualmente es visual y no representa una reserva real.
- Existen CTAs y acciones UI que todavia no tienen comportamiento completo.

## Mejora recomendada

- Agregar un archivo `.env.example`
- Conectar el modulo de citas a endpoints reales
- Persistir confirmaciones, cancelaciones y reagendamientos
- Completar navegacion y acciones pendientes de la interfaz
- Incorporar pruebas para formularios, autenticacion y rutas protegidas
