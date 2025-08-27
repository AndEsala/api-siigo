# ---- Fase 1: Builder ----
# En esta fase se instala todo (incluyendo devDependencies) y se compila el proyecto.
FROM node:22.12.0-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de paquetes y dependencias
COPY package*.json ./

# Instala TODAS las dependencias (incluidas las de desarrollo para compilar)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación de producción
RUN npm run build
# Esto generará la carpeta /app/dist con el JavaScript compilado.


# ---- Fase 2: Production ----
# Esta es la fase final. Se parte de una imagen limpia y solo se copia lo necesario.
FROM node:22.12.0-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los package.json para poder instalar solo las dependencias de producción
COPY package*.json ./

# Instala ÚNICAMENTE las dependencias de producción
RUN npm install --omit=dev

# Copia el código compilado desde la fase 'builder'
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY --from=builder /app/environments ./environments

# Expone el puerto que tu aplicación NestJS usará
EXPOSE 4090