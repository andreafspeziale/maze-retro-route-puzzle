FROM node:12-alpine

WORKDIR /retro-puzzle-cli

COPY . .

RUN apk update \
    && apk --no-cache --virtual build-dependencies add \
    python \
    make \
    && npm install --loglevel=error \
    && apk del build-dependencies

ENTRYPOINT ["node", "bin/retro-puzzle-cli.js"]