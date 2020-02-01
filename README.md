[![CircleCI](https://circleci.com/gh/andreafspeziale/maze-retro-route-puzzle.svg?style=svg)](https://circleci.com/gh/andreafspeziale/maze-retro-route-puzzle)

# A-Maze-ingly retro route puzzle
It outputs a puzzle path in order to collect all the given items from a given puzzle and starting point.

## Quickstart
- `$ npm i`
- `$ node ./bin/retro-puzzle-cli.js`

It prompts the cli available commands.

## Example
- `$ node ./bin/retro-puzzle-cli.js puzzle resolve -p '[{"id":1,"name":"Hallway","north":2,"objects":[]},{"id":2,"name":"Dining Room","south":1,"west":3,"east":4,"objects":[]},{"id":3,"name":"Kitchen","east":2,"objects":[{"name":"Knife"}]},{"id":4,"name":"Sun Room","west":2,"objects":[{"name":"Potted Plant"}]}]' -i '["Potted Plant", "Knife"]' -s 2 | npx bunyan`

## Docker
You can use the cli even without having NodeJS installed.

- `$ docker build -t retro-puzzle-cli .`
- `$ docker run retro-puzzle-cli puzzle resolve -p '[{"id":1,"name":"Hallway","north":2,"objects":[]},{"id":2,"name":"Dining Room","south":1,"west":3,"east":4,"objects":[]},{"id":3,"name":"Kitchen","east":2,"objects":[{"name":"Knife"}]},{"id":4,"name":"Sun Room","west":2,"objects":[{"name":"Potted Plant"}]}]' -i '["Potted Plant", "Knife"]' -s 2`

## Test
You can run the test both:

- installing the dependencies and running it with `$ npm run test:unit`
- overriding the docker image entry point afte the build with `$ docker run --entrypoint npm retro-puzzle-cli run test:unit`