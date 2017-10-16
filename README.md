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
- Create MongoDB database, go to data directory:
```sh
$ mongoimport -d Wears -c Wears items.json --jsonArray 
```
- Davai

**Run:**

```sh
$ npm start / yarn start
```