const key = "d932aaaaa272973f8c7e51676aadbf85"

function colocarDadosNaTela(dadosDoServidor){
    if (dadosDoServidor && dadosDoServidor.name) {
    // innerHTML coleta o texto dentro da tag
        document.querySelector(".cidade").innerHTML = "Tempo em " + dadosDoServidor.name;
        document.querySelector(".temperatura").innerHTML = Math.floor(dadosDoServidor.main.temp) + "ºC";
        document.querySelector(".texto-previsao").innerHTML = dadosDoServidor.weather[0].description;
        document.querySelector(".texto-umidade").innerHTML = dadosDoServidor.main.humidity + "%";
        document.querySelector(".imagem-previsao").src = `https://openweathermap.org/img/wn/${dadosDoServidor.weather[0].icon}.png`;
} else {
        document.querySelector(".cidade").innerHTML = "Cidade não encontrada";
        document.querySelector(".temperatura").innerHTML = "";
        document.querySelector(".texto-previsao").innerHTML = "";
        document.querySelector(".texto-umidade").innerHTML = "";
        document.querySelector(".imagem-previsao").src = "";
}
}
// Async siginifica que vamos acessar um servidor
async function buscarCidade(cidade) {
    try {
        // Chamada à API
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        if (!resposta.ok) {
            // Caso a resposta não seja 200, lançamos um erro
            throw new Error("Cidade não encontrada");
        }
        const dadosDoServidor = await resposta.json();
        colocarDadosNaTela(dadosDoServidor);
    } catch (erro) {
        console.error("Erro ao buscar os dados:", erro);
        // Mensagem amigável ao usuário
        document.querySelector(".cidade").innerHTML = "Erro: Cidade não encontrada.";
        document.querySelector(".temperatura").innerHTML = "";
        document.querySelector(".texto-previsao").innerHTML = "";
        document.querySelector(".texto-umidade").innerHTML = "";
        document.querySelector(".imagem-previsao").src = "";
    }
}
function cliqueiNoBotao(){
// Document busca elementos dentro do HTML5
    const cidade = document.querySelector(".input-cidade").value
        buscarCidade(cidade)
}