FROM node:21

WORKDIR /app

# Install app dependencies
COPY . /app
RUN cd /app && npm install -g npm@latest --force
RUN cd /app && npm install --force

ENV PORXY_URL=0

CMD [ "npm", "run", "proxy" ]