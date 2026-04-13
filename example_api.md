# 📅 API de Reserva de Horários (Exemplo com Google Apps Script)

Este documento descreve **de forma simples** como criar uma API básica para reserva de horários utilizando o **Google Apps Script**.

> ⚠️ **Importante:**
> Isso **não é o foco principal do projeto**.
> Esta API é apenas um **exemplo funcional** para demonstrar como integrar um formulário/sistema com um backend simples.

---

## 🧠 Visão geral

A ideia é usar o **Google Sheets como banco de dados** e o **Google Apps Script como backend**, permitindo:

* Registrar reservas
* Consultar horários disponíveis
* Evitar conflitos de agendamento

---

## 🧱 Estrutura básica

### 1. Criar uma planilha

No Google Sheets, crie uma planilha com colunas como:

| Nome | Email | Data | Hora |
| ---- | ----- | ---- | ---- |

---

### 2. Criar o script

No menu:
**Extensões → Apps Script**

Apague o código padrão e adicione algo como:

```javascript
function doGet(e) {
  return ContentService.createTextOutput("API funcionando!");
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.nome,
    data.email,
    data.data,
    data.hora
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

### 3. Publicar como API

* Clique em **"Implantar"**
* Selecione **"Aplicativo da Web"**
* Configure:

  * Executar como: você
  * Quem pode acessar: **Qualquer pessoa**

Após publicar, você receberá uma URL — essa será sua API.

---

## 🔄 Exemplo de uso

### Enviando dados (POST)

```javascript
fetch("SUA_URL_AQUI", {
  method: "POST",
  body: JSON.stringify({
    nome: "João",
    email: "joao@email.com",
    data: "2026-04-13",
    hora: "14:00"
  })
});
```

---

## 🚫 Limitações

Essa abordagem tem várias limitações:

* Não é ideal para alta escala
* Não possui autenticação robusta
* Controle de concorrência é limitado
* Pode ter latência maior

---

## ✅ Quando usar

* Protótipos
* Projetos simples
* Testes rápidos
* MVPs

---

## ❌ Quando NÃO usar

* Sistemas com muitos usuários simultâneos
* Aplicações críticas
* APIs públicas robustas

---

## 📌 Conclusão

O uso de Google Apps Script como API é uma solução **rápida e prática**, mas deve ser visto apenas como um **exemplo educacional ou protótipo**.

> 💡 Neste projeto, ele serve apenas como demonstração —
> o foco principal está em outras partes do sistema.

---
