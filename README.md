# api-dindin

##  Link da API: https://api-dindin-project.herokuapp.com

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201 
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400

  "Não foi possível cadastrar o usuário."
```

#### Email já cadastrado

```javascript
// HTTP Status 400

  "Email já existe."
```

#### Requisição faltando

```javascript
// HTTP Status 400

  "O campo nome é obrigatório."
```

### **Login do usuário**

#### `POST` `/login`

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

#### Email ou senha incorretos

```javascript
// HTTP Status 400

  "Email ou senha incorretos."
```

#### Requisição faltando

```javascript
// HTTP Status 400

  "O campo nome é obrigatório."
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token.

---

### **Detalhar usuário**

#### `GET` `/usuario`

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

#### Quando o token for inválido ou usuário não estiver logado

```javascript
// HTTP Status 401

    "Logue e forneça um token válido para ter acesso."
```

```javascript
// HTTP Status 401

    "O usuário precisa estar logado."
```

### **Atualizar usuário**

#### `PUT` `/usuario`

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400

  "Não foi possível atualizar o usuário"
```

#### Se não informar nenhum campo na requisição

```javascript
// HTTP Status 400

  "É obrigatório informar ao menos um campo para atualização."
```

#### E-mail já utilizado

```javascript
// HTTP Status 400

  "Email já existe."
```

### **Listar categorias**

#### `GET` `/categoria`

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
// HTTP Status 200
[]
```

### **Listar transações do usuário logado**

#### `GET` `/transacao`

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
// HTTP Status 200
[]
```
