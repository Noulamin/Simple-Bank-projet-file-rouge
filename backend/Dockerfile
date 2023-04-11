FROM node

WORKDIR /backend

COPY package.json /backend/

RUN npm install

ENV DATABASE = 'mongodb+srv://Noulamin:Noulamin@bank.oazghqf.mongodb.net/BankDatabase'
ENV PORT = 8080
ENV JWT_SECRET = lol
ENV PASSWORD_SALT = lola
ENV EMAIL = nouamanlamkadm@gmail.com
ENV PASSWORD_EMAIL = vessogzljitbovqp

COPY . .

EXPOSE 8080

CMD ["npx", "nodemon"]