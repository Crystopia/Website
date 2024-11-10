FROM node:21

WORKDIR /app

# Install app dependencies
COPY . /app
RUN cd /app && npm install -g npm@latest
RUN cd /app && npm install

ENV PORXY_URL=0

CMD [ "npm", "run", "proxy" ]