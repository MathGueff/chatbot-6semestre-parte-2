const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const test = {
  "saudacao": "Olá! Em que posso te ajudar hoje?",
  "pedido_status": "Para consultar seu pedido, informe o número ou e-mail da compra.",
  "agradecimento": "De nada! Estou sempre à disposição",
  "preço": "Os nossos valores são os mais diversos, consulte a tabela de preço em www.com",
  "ajuda": "Com o que posso te ajudar hoje?",
  "cancelamento": "Tem certeza que deseja cancelar? Nossos planos são ótimos"
}

// Classificador Bayesiano
const classifier = new natural.BayesClassifier();

// Treinamento básico
classifier.addDocument("oi", "saudacao");
classifier.addDocument("olá", "saudacao");
classifier.addDocument("bom dia", "saudacao");

classifier.addDocument("quero saber meu pedido", "pedido_status");
classifier.addDocument("meu pedido chegou", "pedido_status");
classifier.addDocument("acompanhar pedido", "pedido_status");

classifier.addDocument("obrigado", "agradecimento");
classifier.addDocument("valeu", "agradecimento");

classifier.addDocument("quanto é", "preço");
classifier.addDocument("qual o valor", "preço");

classifier.addDocument("estou em dúvida", "ajuda");
classifier.addDocument("socorro", "ajuda");

classifier.addDocument("eu gostaria de cancelar", "cancelamento");
classifier.addDocument("odiei", "cancelamento");

classifier.train();

app.post("/chat", (req, res) => {
  try {
    const { message } = req.body;
    const intent = classifier.classify(message.toLowerCase());
    let reply = "Desculpe, não entendi.";
  
    reply = test[intent]
    
    res.json({ reply, intent });
  } catch (error) {
    res.status(500).json({
      message: "Ops, parece que ocorreu um problema com o nosso chatbot"
    })
  }
});

app.listen(3000, () => console.log("Chatbot PLN rodando na porta 3000"));
