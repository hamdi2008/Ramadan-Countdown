let ramadanStart1 = new Date('2025-02-28T00:00:00');
let ramadanStart2 = new Date('2025-03-01T00:00:00');
let selectedDate = ramadanStart1;
const oneYearBefore = new Date(ramadanStart1);
oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1);

function updateDates() {
    const newDate1 = document.getElementById('startDate1').value;
    const newDate2 = document.getElementById('startDate2').value;
    ramadanStart1 = new Date(`${newDate1}T00:00:00`);
    ramadanStart2 = new Date(`${newDate2}T00:00:00`);
    oneYearBefore.setFullYear(ramadanStart1.getFullYear() - 1);
    document.getElementById('date1Button').textContent = ramadanStart1.toLocaleDateString();
    document.getElementById('date2Button').textContent = ramadanStart2.toLocaleDateString();
    selectedDate = ramadanStart1;
    selectDate(1);
    updateCountdown();
}

function selectDate(dateNum) {
    selectedDate = dateNum === 1 ? ramadanStart1 : ramadanStart2;
    document.getElementById('date1Button').classList.toggle('selected', dateNum === 1);
    document.getElementById('date2Button').classList.toggle('selected', dateNum === 2);
    updateCountdown();
}

function updateCountdown() {
    const now = new Date();
    
    // Check if the selected date has passed, and if so, move to the next year
    while (selectedDate < now) {
        ramadanStart1.setFullYear(ramadanStart1.getFullYear() + 1);
        ramadanStart2.setFullYear(ramadanStart2.getFullYear() + 1);
        selectedDate.setFullYear(selectedDate.getFullYear() + 1);
        oneYearBefore.setFullYear(oneYearBefore.getFullYear() + 1);
        
        // Update the date buttons and input fields
        document.getElementById('date1Button').textContent = ramadanStart1.toLocaleDateString();
        document.getElementById('date2Button').textContent = ramadanStart2.toLocaleDateString();
        document.getElementById('startDate1').value = ramadanStart1.toISOString().split('T')[0];
        document.getElementById('startDate2').value = ramadanStart2.toISOString().split('T')[0];
    }

    const difference = selectedDate - now;
    const totalDifference = selectedDate - oneYearBefore;

    const progress = 100 - (difference / totalDifference * 100);

    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    document.getElementById('months').textContent = months.toString().padStart(2, '0');
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('percentage').textContent = `${progress.toFixed(2)}% of the way to Ramadan`;
    document.getElementById('message').textContent = `Countdown to Ramadan ${selectedDate.getFullYear()}`;
}

updateCountdown();
setInterval(updateCountdown, 60000); // Update every minute