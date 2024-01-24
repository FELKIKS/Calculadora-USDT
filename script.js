var cache = {
    data: null,
    hash: null,
    taxaOriginal: null
};

document.addEventListener('DOMContentLoaded', function () {
    fetchAPI();

    // Atualizar a cada 3 segundos
    setInterval(fetchAPI, 3000);
});

function fetchAPI() {
    obterTaxaDaURL()
        .then(function (taxa) {
            // Armazenar a taxa original na primeira chamada
            if (cache.taxaOriginal === null) {
                cache.taxaOriginal = taxa;
            }

            return fetch("https://cors-everywhere.onrender.com/https://api.hgbrasil.com/finance?key=04fbbd74");
        })
        .then((response) => response.json())
        .then((data) => {
            var dataHash = JSON.stringify(data.results.currencies.USD.sell);

            // Se os valores da API mudaram, atualize a página
            if (dataHash !== cache.hash) {
                cache.data = data;
                cache.hash = dataHash;
                atualizarValores();
            }
        })
        .catch((error) => {
            console.error("Erro ao obter dados da API:", error);
        });
}

async function obterTaxaDaURL() {
    try {
        var urlParams = new URLSearchParams(window.location.search);
        var taxa = urlParams.get('taxa');

        return taxa ? parseFloat(taxa.replace(",", ".")) : 1.0;
    } catch (error) {
        console.error("Erro ao obter taxa da URL:", error);
        return 1.0; // Valor padrão
    }
}

async function atualizarValores() {
    try {
        var taxa = await obterTaxaDaURL(); // Aguarda a resolução da promessa da taxa

        // Calcular os valores multiplicando pela taxa original
        var usdSpotValue = cache.data.results.currencies.USD.sell.toFixed(4);
        var usdtPrice = (cache.data.results.currencies.USD.sell * taxa).toFixed(4);

        // Atualizar os elementos na página
        document.getElementById('usdSpotValue').textContent = usdSpotValue;
        document.getElementById('usdtPrice').textContent = usdtPrice;
        document.getElementById('taxaValue').textContent = taxa.toFixed(2);

        // Atualiza o título da página com o resultado
        document.title = `USDT Preço: $${usdtPrice} | USD Spot: $${usdSpotValue}`;
    } catch (error) {
        console.error("Erro ao atualizar valores:", error);
    }
}
