document.addEventListener('DOMContentLoaded', function() {
    // Function to pad single digit numbers with leading zero
    function pad(number) {
        return (number < 10 ? '0' : '') + number;
    }

    // Get the current date
    var currentDate = new Date();

    // Select the container where sections will be appended
    var container = document.getElementById('container');
    // If container is not found, append sections to the body
    if (!container) {
        container = document.body;
    }

    // Loop through each week
    for (var weekNumber = 1; weekNumber <= 4; weekNumber++) {
        // Create a new section for each week
        var weekSection = document.createElement('section');
        weekSection.id = 'w' + weekNumber;

        // Loop through each day of the week
        for (var i = 0; i < 7; i++) {
            // Create a new date object for each day of the week
            var day = new Date(currentDate);
            day.setDate(currentDate.getDate() + (i + (weekNumber - 1) * 7));

            // Skip Saturday (6) and Sunday (0)
            if (day.getDay() !== 6 && day.getDay() !== 0) {
                // Get the day, month, and year
                var dayNumber = pad(day.getDate());
                var monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
                var monthName = monthNames[day.getMonth()];
                var year = day.getFullYear();

                // Get the weekday name
                var weekdays = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];
                var weekdayName = weekdays[day.getDay()];

                // Create the card HTML structure
                var cardHTML = `
                    <div class="card">
                        <h2>DIA ${dayNumber} DE ${monthName} DE ${year}</h2>
                        <h3>${weekdayName}</h3>
                        <legend>U.E.:</legend>
                        <input type="text" name="ueNome" class="infos" value="" disabled>
                        <hr class="divisoria">
                        <legend>TURMA:</legend>
                        <input type="text" name="turma" class="infos" value="" disabled>
                        <hr class="divisoria">
                        <legend>TURNO:</legend>
                        <input type="text" name="turno" class="infos" value="" disabled>
                        <hr class="divisoria">
                        <legend>PROFESSOR:</legend>
                        <input type="text" name="prof" class="infos" value="" disabled>
                        <hr class="divisoria">
                        <div class="row">
                            <div class="col-1">
                                <legend>T. FALTA:</legend>
                                <input type="text" name="tFalta" class="infos" value="" disabled>
                            </div>
                            <div class="col-2">
                                <legend>QTD ALUNOS:</legend>
                                <input type="text" name="qtdA" class="qtdAlunos" value="" disabled>
                            </div>
                        </div>
                        <hr class="divisoria">
                    </div>
                `;

                // Append the card HTML to the week section
                weekSection.innerHTML += cardHTML;
            }
        }

        // Append the week section to the container
        container.appendChild(weekSection);
    }

    // Fetch JSON data from external file
    fetch('substituicao.json')
        .then(response => response.json())
        .then(data => {
            // Fill inputs with JSON information based on key "dia"
            data.escala.forEach(entry => {
                var dayKey = entry.dia;
                var cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    var h2 = card.querySelector('h2');
                    if (h2.textContent.includes(dayKey)) {
                        card.querySelector('input[name="ueNome"]').value = entry.ue;
                        card.querySelector('input[name="turma"]').value = entry.turma;
                        card.querySelector('input[name="turno"]').value = entry.turno;
                        card.querySelector('input[name="prof"]').value = entry.professor;
                        card.querySelector('input[name="tFalta"]').value = entry.falta;
                        card.querySelector('input[name="qtdA"]').value = entry.qtdAluno;

                        if (entry.ue === "FERIADO" || entry.ue === "CONSELHO DE CLASSE"
                            || entry.ue === "PONTO FACULTATIVO" || entry.ue === "NÃO LETIVO"
                            || entry.ue === "RECESSO" || entry.ue === "FÉRIAS" || entry.ue === "PROFESSOR ABONANDO" || entry.ue === "PLANEJAMENTO") {
                            card.style.backgroundColor = "#000000";
                            card.querySelector('input[name="ueNome"]').style.color = "#ffffff";
                            var legends = card.querySelectorAll('legend');
                            var divisoria = card.querySelectorAll('.divisoria');
                            legends.forEach(function(legend){
                                legend.style.color = "#000000";
                            });
                            divisoria.forEach(function(divisor){
                                divisor.style.border = "#000000";
                            });
                        }
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});