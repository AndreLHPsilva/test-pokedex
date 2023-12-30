FROM node:20
WORKDIR /srv/app
COPY package.json ./
COPY tsconfig.json ./
COPY prisma/schema.prisma ./prisma/

RUN rm -rf node_modules package-lock.json

RUN npm install
COPY . .
EXPOSE 3000
CMD ["bash", "-c", "npx prisma migrate deploy && npx prisma generate && npm run dev"]
