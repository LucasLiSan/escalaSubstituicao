function goToWeek() {
    const x = document.getElementById('semana').value;
    var semana = x.split('-');
    var week = semana.slice(1);
    console.log(week[0]);
};