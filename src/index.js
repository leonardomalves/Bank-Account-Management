const express = require("express");
const {v4: uuid_v4} = require("uuid")
const {request, response} = require("express");
const app = express();


app.use(express.json());
const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {

    const {cpf} = request.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({message: `Não há conta para o cpf ${cpf}`})
    }

    request.customer = customer;
    return next();
}

function getBalance(statement) {
    return statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount
        }
    }, 0);
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body;
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

    if (customerAlreadyExists) {
        return response.status(400).send({
            error: `O CPF: ${cpf} já existe`
        })
    }
    customers.push({
        cpf,
        name,
        id: uuid_v4(),
        statement: []
    })


    return response.status(201).send({
        customers
    })
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const {description, amount} = request.body;
    const {customer} = request;
    const statementOperations = {
        description,
        amount,
        create_at: new Date(),
        type: "credit"
    }
    customer.statement.push(statementOperations)
    return response.status(201).send({message: `Depósito realizado com sucesso ${customer.cpf}`})
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {

    const {amount} = request.body;
    const {customer} = request;
    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).send({message: `Saldo insuficiente  ${customer.cpf}`})
    }

    const statementOperations = {
        amount,
        create_at: new Date(),
        type: "debit"
    }
    customer.statement.push(statementOperations);
    return response.status(201).send({message: `Saque realizado com sucesso ${customer.cpf}`})
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    const {date} = request.query;
    const dateFormat = new Date(date + " 00:00");
    const statement = customer.statement.filter((statement) => statement.create_at.toDateString() === new Date(dateFormat).toDateString())
    return response.json(statement);
});

app.put('/update', verifyIfExistsAccountCPF, (request, response) => {
    const {name} = request.body;
    const {customer} = request;
    customer.name = name;
    return response.status(201).send({message: `A conta ${customer.cpf} teve seu nome alterado para ${customer.name}`})
})

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    return response.json(customer)
})

app.delete('/delete', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;
    customers.splice(customer, 1);
    return response.status(200).json(customers)
});

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request
    return response.json(getBalance(customer.statement))
})

app.listen(3333)
