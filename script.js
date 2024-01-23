document.addEventListener('DOMContentLoaded', function () {
    // Chama a função updateValues após a carga do documento
    updateValues();
});

function updateValues() {
    // Substitua isso pela lógica real para obter os valores do gtag.js
    var usdSpot = obterValorDoGtag(); 
    var taxa = obterTaxaDaURL();
    
    // Atualiza os valores na página
    document.getElementById('usdSpotValue').textContent = usdSpot.toFixed(4);
    document.getElementById('taxaValue').textContent = taxa.toString(); // Exibir o valor completo
    var resultado = calculateResult(usdSpot, taxa).toFixed(4);
    document.getElementById('calculationResult').textContent = resultado;

    // Atualiza o título da página com o resultado
    document.title = `USDT Preço: $${resultado}`;

    // Atualizar a cada 3 segundos
    setTimeout(updateValues, 3000);
}

function calculateResult(usdSpot, taxa) {
    return usdSpot * taxa;
}

function obterValorDoGtag() {
    // Lógica para obter o valor do gtag.js
    // Substitua por sua lógica real
    return 4.9812; // Exemplo, substitua pelo valor real
}

function obterTaxaDaURL() {
    // Extrai o parâmetro 'taxa' da URL
    var urlParams = new URLSearchParams(window.location.search);
    var taxa = urlParams.get('taxa');
    
    // Se 'taxa' não estiver presente na URL, use um valor padrão
    return taxa ? parseFloat(taxa.replace(",", ".")) : 1.0; // Valor padrão é 1.0
}
