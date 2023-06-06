# Establecer la imagen base
FROM node:lts-alpine3.18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY . /app

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
