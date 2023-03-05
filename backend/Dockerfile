FROM node:16.17.1

WORKDIR /backend

COPY package.json /backend/

RUN npm install

ENV DATABASE mongodb+srv://Noulamin:Gmail.conm1@rent-app.rpquwmf.mongodb.net/Syndicat
ENV PORT 8080
ENV JWT_SECRET JWT_SECRET
ENV PASSWORD_SALT lol

COPY . .

EXPOSE 8080

CMD ["npm", "start"]