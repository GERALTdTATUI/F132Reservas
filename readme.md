# 📅 Reserva de Horários para Laboratórios Multidisciplinares

Este projeto é uma aplicação web simples para **reserva de horários em laboratórios multidisciplinares**, desenvolvida com HTML, CSS e JavaScript puro.

O sistema simula um formulário estruturado em etapas (multi-step form), permitindo que docentes solicitem o uso de laboratórios de forma organizada.

---

## 🚀 Funcionalidades

- 📌 Formulário dividido em **3 etapas**
- ✅ Validação de campos obrigatórios
- 📊 Barra de progresso visual
- 🔁 Navegação entre etapas (Avançar/Voltar)
- 🧹 Botão para limpar formulário
- 📅 Seleção de data e horário
- ⏱️ Validação de horário (início < término)
- 📚 Registro de:
  - Dados do professor
  - Informações da disciplina
  - Detalhes da reserva
- 🔒 Termo de ciência obrigatório antes de prosseguir

---

## 🧩 Estrutura do Projeto

📁 projeto/  
├── index.html     # Estrutura principal do formulário  
├── style.css      # Estilização da interface  
└── script.js      # Lógica de navegação e validação  

---

## 🖥️ Como usar

1. Clone este repositório:  
git clone https://github.com/seu-usuario/Reservas132.git  

2. Acesse a pasta:  
cd Reservas132

3. Substitua o valor de `api_url` pela [sua api](./example_api.md) pra reserva de horários

4. Abra o arquivo `index.html` no navegador.

---

## 📝 Sobre o funcionamento

O formulário é dividido em três etapas:

### 1️⃣ Termo de ciência
O usuário precisa concordar com as condições para continuar.

### 2️⃣ Dados da disciplina
Coleta informações como:
- Nome do professor
- E-mail
- Disciplina
- Turma
- Conteúdo a ser ministrado

### 3️⃣ Dados da reserva
Inclui:
- Escolha do laboratório
- Data da aula
- Horário de início e término
- Número de ocorrências (repetições)

---

## ⚠️ Observações

- O envio do formulário **não garante a reserva automática**.
- A confirmação deve ser feita posteriormente (ex: por e-mail ou backend).
- Este projeto é apenas um **modelo frontend (estático)**.

---

## 💡 Possíveis melhorias

- Integração com backend (Node.js, Firebase, etc.)
- Envio automático de e-mails
- Sistema de autenticação de usuários
- Calendário com horários disponíveis
- Persistência de dados

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e adaptação.