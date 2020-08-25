# Égua do Artigo

O projeto nasceu devido a necessidade de ler artigos num ambiente coorporativo no qual eu não tinha acesso ao `site` por questões burocráticas. Com isso surgiu a ideia de fazer um parser da resposta do `site` e colocar num domínio meu. Como sou curioso, fui ver como funcionava a resposta da `API` do `site` e foi um trabalho investigativo pra saber o tipo do objeto e o seu correspondente em `HTML`, pra contornar os problemas de `CORS` eu fiz uma `API` onde consulto o `site` e retorno um post que é um array de objetos, onde tenho uma `TAG` e um `texto` e uso reduce e concatenção pra gerar uma string que vai ser gerada o `HTML` do artigo. 

Quem quiser saber mais sobre o fluxo, consulte o meu repositório da [api-postagens](https://github.com/iagocavalcante/api-postagens) e a branch site desse repositório.
