# Usa una imagen base de Node.js
FROM node:14.17.4-alpine3.14 AS base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/node/app

# Copia los archivos necesarios para la aplicación
COPY package*.json ./

USER node

RUN npm install 

COPY --chown=node:node index.js ./
COPY --chown=node:node app ./app
COPY --chown=node:node config ./config

# Expón el puerto en el que la aplicación escuchará (ajusta el puerto según tu configuración)
EXPOSE 5500

# # Comando para iniciar la aplicación
# CMD ["npm start", "index.js"]