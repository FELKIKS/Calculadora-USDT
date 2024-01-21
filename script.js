function updateValues() {
    var usdSpot = 4.9314;

    var multiplierInput = document.getElementById('multiplierInput').value;
    var multiplier = multiplierInput ? parseFloat(multiplierInput) : 1;

    var usdtPrice = usdSpot * multiplier;

    document.getElementById('calculationResult').textContent = usdtPrice.toFixed(4);
}

// Atualizar a cada 3 segundos
setInterval(updateValues, 3000);
