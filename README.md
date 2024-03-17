# Hack Your Future study application
A sample application created to practice materials in HYF weekly sessions.

## Setup
Install Knex query builder:
```bash
npm install -g knex`
```
Open mysql console and create `hyf` database:
```bash
mysql -u root
> CREATE DATABASE hyf;
> EXIT;
```
Copy `.env.example` file to `.env` file and change values in `.env` file accordingly:
```bash
cp .env.example .env
```
Migrate database:
```
knex migrate:latest
```
Seed database:
```bash
knex seed:run
```
## Starting app server
Server starts accepting request by running:
```bash
node index.js
```
