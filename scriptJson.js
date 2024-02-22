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
