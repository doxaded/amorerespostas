# Amor e Respostas 💌

Uma aplicação web interativa de quiz para casais com estética editorial elegante e minimalista (inspirada em [segundo-turno.com](https://segundo-turno.com/)).

Feito para testar o quanto sua parceira te conhece, relembrando momentos marcantes, manias engraçadas e planos futuros do casal com muito carinho e bom humor.

## 🎨 Características do Projeto

- **Estética Editorial & Alto Contraste:** Cores acolhedoras (fundo creme `#FAF8F5`, tipografia profunda `#141413` e destaque terracota romântico `#D9383A`).
- **Tipografia Refinada:** Combinação das fontes *Fraunces* (serifa editorial expressiva) e *Plus Jakarta Sans* (geométrica e limpa).
- **Cards e Micro-interações:** Uma pergunta por tela, com feedback imediato ao responder, comentários personalizados e animação de progresso contínuo.
- **Celebração Final:** Pontuação com mensagens dinâmicas personalizadas por desempenho, confetes comemorativos e resumo expansível de todas as respostas.
- **Fácil Customização:** Todas as perguntas estão isoladas e documentadas em `questions.js`.

## 📁 Estrutura de Arquivos

```
├── index.html        # Estrutura semântica e telas do quiz (Hero, Pergunta, Resultado)
├── style.css         # Design system editorial, responsividade e animações
├── questions.js      # Banco de perguntas editável (id, pergunta, opções, resposta correta, comentário)
├── app.js            # Lógica interativa em Vanilla JS, cálculo de acertos e confetes
└── README.md         # Documentação do projeto
```

## ✍️ Como Personalizar as Perguntas

Abra o arquivo [`questions.js`](questions.js) e edite ou adicione novos itens no formato:

```javascript
{
  id: 1,
  question: "Qual é a pergunta?",
  options: [
    "Opção A",
    "Opção B",
    "Opção C",
    "Opção D"
  ],
  correctAnswer: 0, // Índice da opção correta (0 = A, 1 = B, 2 = C, 3 = D)
  comment: "Frase ou piada interna exibida logo após ela responder! ❤️"
}
```

## 🚀 Como Executar Localmente

Como o projeto é construído com tecnologias web padrão (HTML5, CSS3, JS Vanilla), basta abrir o arquivo `index.html` em qualquer navegador ou rodar um servidor estático local:

```bash
# Com Python 3
python3 -m http.server 8000

# Ou com npx serve
npx serve .
```

E acessar `http://localhost:8000`.
