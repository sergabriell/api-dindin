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
