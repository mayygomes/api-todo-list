# Imagem oficial do Node.js
FROM node:18

# DEfinir o diretório de trabalho
WORKDIR /api-todo-list/src/app 

# Copiar package.json e package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação docker pull node
CMD ["npm", "start"]
