## General Information

This is a Currency Converter frontend repository for an application where users can select a currency to convert from and another currency to convert to. They can enter the amount they wish to convert, and the result is automatically displayed.

Additionally, the application includes a feature that allows users to store their conversions. It has a login system and provides a list of all conversions made by the logged-in user. Each conversion entry includes the currencies, amounts, and the date and time it occurred.

IMPORTANT: To run this application locally, you need to first set up the database and backend, as demonstrated in the backend repository: https://github.com/thomasalbuquerque/currency-converter_backend

Link for the deployed app: https://coincalc-currency-converter.vercel.app/

![Image](https://github.com/thomasalbuquerque/currency-converter_frontend/assets/7840248/1f011922-ba90-4202-90bb-7a1aaa2bb059)

## Stack
This project was made with:
 - React with Next.js
 - Node.js
 - Typescript
 - Sass
 - [Reactstrap](https://www.npmjs.com/package/reactstrap)
 - [Axios](https://www.npmjs.com/package/axios)
 - [@everapi/currencyapi-js (API to get currencies ratios)](https://github.com/everapihq/currencyapi-js)

## Installation
To begin, make sure you have Node.js with npm installed on your system. If you don't have them, please refer to the [official documentation](https://nodejs.org/en/download) for instructions on how to install them.

Next, follow the steps below:

1. Clone the repository by running:
```bash
    git clone https://github.com/thomasalbuquerque/currency-converter_frontend
```
2. Open the newly created folder **currency-converter_frontend** using Visual Studio Code (or any preferred code editor).

3. Run the command below to install all the necessary dependencies.
```bash
    npm install
```

4. To set up the connection with the backend application, create a file named '.env' and include the following content inside it. This Environment Variable will be utilized for establishing the connection.
```bash
   NEXT_PUBLIC_BASEURL=http://localhost:3000
```

5. At this stage, it is crucial to ensure that the backend portion of the project is already running at http://localhost:3000/.

6. Finally, run the command below to start the application in development mode.
```bash
    npm run dev
```

7. Or if you want to run the application in production mode, run:
```bash
    npm run build
    npm run start
```
