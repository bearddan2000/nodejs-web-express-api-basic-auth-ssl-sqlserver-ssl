# nodejs-web-express-api-basic-auth-ssl-sqlserver-ssl

## Description
Expressjs api that uses basic authentication
and self signed ssl. The api then connects to a sqlserver database.

| username | password |
| -------- | -------- |
| *maria* | *pass* |

Sql server uses self-signed ssl.

## Tech stack
- expressjs
- sqlserver

## Docker stack
- alpine:edge
- alpine:edge
- mcr.microsoft.com/mssql/server:2017-CU17-ubuntu
- node:latest

## To run
`sudo ./install.sh -u`
- [Availble here](https://localhost/)

## To stop
`sudo ./install.sh -d`

## For help
`sudo ./install.sh -h`

## Credit
[Express ssl code](https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87)