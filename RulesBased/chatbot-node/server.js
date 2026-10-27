const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
 
app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();

  const intent = test(message);

  res.json({ reply: intent });
});

function test(message) {
  if (message.includes("login")) {
    return "Você pode redefinir sua senha clicando em 'Esqueci minha senha'."
  }
  if (message.includes("plano")) {
    return "Temos planos Básico e Premium. Qual você gostaria de saber mais?"
  }
  if (message.includes("atendente")) {
    return "Ok! Encaminhando você para um atendente."
  }
  if (message.includes("horário")) {
    return "Nossos horários são das 12:00 às 20:00"
  }
  if (message.includes("localização")) {
    return "Nosso endereço fica em Rua Tal tal tal 500"
  }
  if (message.includes("promoção")) {
    return "Não temos nenhuma promoção hoje"
  }
  return "Desculpe, não entendi sua pergunta."
}

app.listen(3000, () => console.log("Chatbot rodando na porta 3000"));
