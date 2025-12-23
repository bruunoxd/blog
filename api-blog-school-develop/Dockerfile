
FROM node:18

WORKDIR /api-blog-school

# Copia o restante do projeto, incluindo prisma/schema.prisma

COPY package*.json ./

RUN npm install

COPY . .

# Agora que o schema.prisma está disponível, podemos gerar o Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]