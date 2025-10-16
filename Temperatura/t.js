
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        converterTemperatura();
    }
});


function resetCampos() {

    document.getElementById("celsius").value = '';
    document.getElementById("fahrenheit").value = '';
    document.getElementById("kelvin").value = '';
    document.getElementById("rankine").value = '';

  
    document.getElementById("result-celsius").textContent = "Celsius: ";
    document.getElementById("result-fahrenheit").textContent = "Fahrenheit: ";
    document.getElementById("result-kelvin").textContent = "Kelvin: ";
    document.getElementById("result-rankine").textContent = "Rankine: ";

    document.getElementById("error-celsius").style.display = "none";
    document.getElementById("error-fahrenheit").style.display = "none";
    document.getElementById("error-kelvin").style.display = "none";
    document.getElementById("error-rankine").style.display = "none";

   
    localStorage.setItem('conversionHistory', JSON.stringify([]));
}


function salvarHistorico(conversion) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}


function exibirHistorico() {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    console.log("Histórico de Conversões:", history);
}


function converterTemperatura() {
   
    document.getElementById("loading").style.display = "block";

    
    const celsius = document.getElementById("celsius").value;
    const fahrenheit = document.getElementById("fahrenheit").value;
    const kelvin = document.getElementById("kelvin").value;
    const rankine = document.getElementById("rankine").value;

   
    document.getElementById("error-celsius").style.display = "none";
    document.getElementById("error-fahrenheit").style.display = "none";
    document.getElementById("error-kelvin").style.display = "none";
    document.getElementById("error-rankine").style.display = "none";

   
    let celsiusValue, fahrenheitValue, kelvinValue, rankineValue;

    
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
       
        document.getElementById("loading").style.display = "none";
        return; 
    }

  
    document.getElementById("result-celsius").textContent = `Celsius: ${celsiusValue.toFixed(2)}`;
    document.getElementById("result-fahrenheit").textContent = `Fahrenheit: ${fahrenheitValue.toFixed(2)}`;
    document.getElementById("result-kelvin").textContent = `Kelvin: ${kelvinValue.toFixed(2)}`;
    document.getElementById("result-rankine").textContent = `Rankine: ${rankineValue.toFixed(2)}`;


    salvarHistorico({
        celsius: celsiusValue,
        fahrenheit: fahrenheitValue,
        kelvin: kelvinValue,
        rankine: rankineValue
    });

    
    document.getElementById("loading").style.display = "none";
}


document.getElementById("convert-button").addEventListener("click", converterTemperatura);


document.getElementById("reset-button").addEventListener("click", resetCampos);

