document.addEventListener('DOMContentLoaded', function() {
    // Fetching JSON data from external file
    fetch('substituicao.json')
        .then(response => response.json())
        .then(data => {
            // Selecting the inputs
            var ueNomeInput = document.querySelector('input[name="ueNome"]');
            var turmaInput = document.querySelector('input[name="turma"]');
            var turnoInput = document.querySelector('input[name="turno"]');
            var profInput = document.querySelector('input[name="prof"]');
            var tFaltaInput = document.querySelector('input[name="tFalta"]');
            var qtdAInput = document.querySelector('input[name="qtdA"]');

            // Filling the inputs with JSON data
            ueNomeInput.value = data.escala[0].ue;
            turmaInput.value = data.escala[0].turma;
            turnoInput.value = data.escala[0].turno;
            profInput.value = data.escala[0].professor;
            tFaltaInput.value = data.escala[0].falta;
            qtdAInput.value = data.escala[0].qtdAluno;
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

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
        for (var i = 0; i < 5; i++) {
            // Create a new date object for each day of the week
            var day = new Date(currentDate);
            day.setDate(currentDate.getDate() + (i + (weekNumber - 1) * 7));
            
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
                    <hr>
                    <legend>TURMA:</legend>
                    <input type="text" name="turma" class="infos" value="" disabled>
                    <hr>
                    <legend>TURNO:</legend>
                    <input type="text" name="turno" class="infos" value="" disabled>
                    <hr>
                    <legend>PROFESSOR:</legend>
                    <input type="text" name="prof" class="infos" value="" disabled>
                    <hr>
                    <div class="row">
                        <div class="col-1">
                            <legend>T. FALTA:</legend>
                            <input type="text" name="tFalta" class="infos" value="" disabled>
                        </div>
                        <div class="col-2">
                            <legend>QTD ALUNOS:</legend>
                            <input type="text" name="qtdA" id="qtdAlunos" value="" disabled>
                        </div>
                    </div>
                    <hr>
                </div>
            `;
            
            // Append the card HTML to the week section
            weekSection.innerHTML += cardHTML;
        }

        // Append the week section to the container
        container.appendChild(weekSection);
    }
});