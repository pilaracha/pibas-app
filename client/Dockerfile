# Usa una imagen base de Node.js
FROM node:14.17.4-alpine3.14

RUN mkdir -p /home/node/app/client/node_modules && chown -R node:node /home/node/app/client

# # Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/node/app/client

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node jsconfig.json ./

COPY --chown=node:node public ./public

COPY --chown=node:node src ./src

USER node

# Construye el cliente React (ajusta el comando según tu configuración)
RUN npm run build

# Expón el puerto en el que la aplicación escuchará (ajusta el puerto según tu configuración)
EXPOSE 3000