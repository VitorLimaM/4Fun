// Função para acionar a conversão ao pressionar Enter
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        converterTemperatura();
    }
});

// Função para limpar os campos e resultados
function resetCampos() {
    // Limpar campos de entrada
    document.getElementById("celsius").value = '';
    document.getElementById("fahrenheit").value = '';
    document.getElementById("kelvin").value = '';
    document.getElementById("rankine").value = '';

    // Limpar resultados
    document.getElementById("result-celsius").textContent = "Celsius: ";
    document.getElementById("result-fahrenheit").textContent = "Fahrenheit: ";
    document.getElementById("result-kelvin").textContent = "Kelvin: ";
    document.getElementById("result-rankine").textContent = "Rankine: ";

    // Limpar mensagens de erro
    document.getElementById("error-celsius").style.display = "none";
    document.getElementById("error-fahrenheit").style.display = "none";
    document.getElementById("error-kelvin").style.display = "none";
    document.getElementById("error-rankine").style.display = "none";

    // Reset histórico
    localStorage.setItem('conversionHistory', JSON.stringify([]));
}

// Função para armazenar histórico de conversões
function salvarHistorico(conversion) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}

// Função para exibir histórico
function exibirHistorico() {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    console.log("Histórico de Conversões:", history);
}

// Função para realizar a conversão das temperaturas
function converterTemperatura() {
    // Mostrar o ícone de carregamento
    document.getElementById("loading").style.display = "block";

    // Obter os valores inseridos
    const celsius = document.getElementById("celsius").value;
    const fahrenheit = document.getElementById("fahrenheit").value;
    const kelvin = document.getElementById("kelvin").value;
    const rankine = document.getElementById("rankine").value;

    // Limpar mensagens de erro
    document.getElementById("error-celsius").style.display = "none";
    document.getElementById("error-fahrenheit").style.display = "none";
    document.getElementById("error-kelvin").style.display = "none";
    document.getElementById("error-rankine").style.display = "none";

    // Validação e conversões
    let celsiusValue, fahrenheitValue, kelvinValue, rankineValue;

    // Validação e conversão com base nos valores inseridos
    if (celsius !== "" && !isNaN(celsius)) {
        celsiusValue = parseFloat(celsius);
        fahrenheitValue = (celsiusValue * 9/5) + 32;
        kelvinValue = celsiusValue + 273.15;
        rankineValue = (celsiusValue + 273.15) * 9/5;
    } else if (fahrenheit !== "" && !isNaN(fahrenheit)) {
        fahrenheitValue = parseFloat(fahrenheit);
        celsiusValue = (fahrenheitValue - 32) * 5/9;
        kelvinValue = (fahrenheitValue + 459.67) * 5/9;
        rankineValue = fahrenheitValue + 459.67;
    } else if (kelvin !== "" && !isNaN(kelvin)) {
        kelvinValue = parseFloat(kelvin);
        celsiusValue = kelvinValue - 273.15;
        fahrenheitValue = (kelvinValue - 273.15) * 9/5 + 32;
        rankineValue = kelvinValue * 9/5;
    } else if (rankine !== "" && !isNaN(rankine)) {
        rankineValue = parseFloat(rankine);
        celsiusValue = (rankineValue - 491.67) * 5/9;
        fahrenheitValue = rankineValue - 459.67;
        kelvinValue = rankineValue * 5/9;
    } else {
        // Exibir mensagens de erro
        if (celsius === "" || isNaN(celsius)) {
            document.getElementById("error-celsius").style.display = "block";
        }
        if (fahrenheit === "" || isNaN(fahrenheit)) {
            document.getElementById("error-fahrenheit").style.display = "block";
        }
        if (kelvin === "" || isNaN(kelvin)) {
            document.getElementById("error-kelvin").style.display = "block";
        }
        if (rankine === "" || isNaN(rankine)) {
            document.getElementById("error-rankine").style.display = "block";
        }
        // Esconder o ícone de carregamento
        document.getElementById("loading").style.display = "none";
        return; // Não continuar com a conversão se houver erro
    }

    // Exibir os resultados
    document.getElementById("result-celsius").textContent = `Celsius: ${celsiusValue.toFixed(2)}`;
    document.getElementById("result-fahrenheit").textContent = `Fahrenheit: ${fahrenheitValue.toFixed(2)}`;
    document.getElementById("result-kelvin").textContent = `Kelvin: ${kelvinValue.toFixed(2)}`;
    document.getElementById("result-rankine").textContent = `Rankine: ${rankineValue.toFixed(2)}`;

    // Salvar histórico
    salvarHistorico({
        celsius: celsiusValue,
        fahrenheit: fahrenheitValue,
        kelvin: kelvinValue,
        rankine: rankineValue
    });

    // Esconder o ícone de carregamento após a conversão
    document.getElementById("loading").style.display = "none";
}

// Associar a função de conversão ao botão
document.getElementById("convert-button").addEventListener("click", converterTemperatura);

// Associar a função de reset ao botão Limpar
document.getElementById("reset-button").addEventListener("click", resetCampos);
