# SP-ICT02
Structure Programming programming assignments

Quick start
=============

**Requirements: NodeJS>=8.4.0, nodemon, MongoDB**

**Clone:**

```sh
$ git clone https://github.com/ph0ngt3p/SP-ICT02.git
```

**Install dependencies:**

```sh
$ npm i / yarn install
```

**Setup:**

- Create a `.env` file with the environment variables specified in `.env.template`
- Create MongoDB database (e.g Wears), run from terminal:
```sh
$ mongoimport -d Wears -c Wears data/items.json
```
- Davai

**Start developing (nodemon watching for code changes):**

```sh
$ npm run start:dev / yarn start:dev
```

**Run normally:**

```sh
$ npm run start / yarn start
```