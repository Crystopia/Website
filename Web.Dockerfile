FROM node:21

WORKDIR /app

# Install app dependencies
COPY . /app
RUN cd /app && npm install -g npm@latest
RUN cd /app && npm install
RUN cd /app && npm run build

ENV PORXY_URL=0

CMD [ "npm", "run", "start" ]