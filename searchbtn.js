function goToWeek() {
    // Get the date input value
    var selectedDate = document.getElementById('semana').value;

    // Get all h2 elements
    var h2Elements = document.querySelectorAll('.card h2');

    // Loop through each h2 element
    for (var i = 0; i < h2Elements.length; i++) {
        var h2Date = h2Elements[i].textContent.split(" ")[1]; // Extract the date from the h2 text
        // Compare the selected date with the h2 date
        if (selectedDate === h2Date) {
            // Scroll to the matched h2 element
            h2Elements[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break; // Exit the loop after finding the first match
        }
    }
}