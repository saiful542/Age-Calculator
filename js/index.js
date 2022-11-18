// parent element
const calculationSection = document.querySelector('.age-calculator .calculation-section')

// birth information
const dateOfBirth = calculationSection.querySelector('.inputs .date-of-birth')
const birthDatePicker = dateOfBirth.querySelector('.birth-date-picker')
const birthDate = dateOfBirth.querySelector('.birth-date')
const birthMonth = dateOfBirth.querySelector('.birth-month')
const birthYear = dateOfBirth.querySelector('.birth-year')

// selected information
const atTheDtaeOf = calculationSection.querySelector('.inputs .age-at-the-date-of')
const selectedDatePicker = atTheDtaeOf.querySelector('.selected-date-picker')
const selectedDate = atTheDtaeOf.querySelector('.selected-date')
const selectedMonth = atTheDtaeOf.querySelector('.selected-month')
const selectedYear = atTheDtaeOf.querySelector('.selected-year')

birthDatePicker.addEventListener('change', (e) => {
    birthYear.value = parseInt((birthDatePicker.value).split('-')[0])
    birthMonth.value = parseInt((birthDatePicker.value).split('-')[1])
    birthDate.value = parseInt((birthDatePicker.value).split('-')[2])
})

selectedDatePicker.addEventListener('change', (e) => {
    selectedYear.value = parseInt((selectedDatePicker.value).split('-')[0])
    selectedMonth.value = parseInt((selectedDatePicker.value).split('-')[1])
    selectedDate.value = parseInt((selectedDatePicker.value).split('-')[2])
})

// datePicker
const currentDatePicker = atTheDtaeOf.querySelector('.date-picker-with-image')

// checkbox
let recentDate = false;
const checkbox = calculationSection.querySelector('.checkbox-wrapper input[type=checkbox]')
checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        currentDatePicker.classList.add('opacity-light')
        selectedYear.classList.add('opacity-light')
        selectedDate.setAttribute('disabled', '')
        selectedMonth.setAttribute('disabled', '')
        selectedYear.setAttribute('disabled', '')
        selectedDatePicker.setAttribute('disabled', '')
        recentDate = true
    }
    else {
        recentDate = false
        currentDatePicker.classList.remove('opacity-light')
        selectedYear.classList.remove('opacity-light')
        selectedDate.removeAttribute('disabled', '')
        selectedMonth.removeAttribute('disabled', '')
        selectedYear.removeAttribute('disabled', '')
        selectedDatePicker.removeAttribute('disabled', '')
    }
})

// display
const display = (perfectYear, perfectMonth, perfectDay, inMonths, inWeeks, days, inDays, inHours, inMinutes, inSeconds) => {
    const outputs = calculationSection.querySelector('.outputs')
    outputs.classList.remove('display-none')
    const outputWrapper = calculationSection.querySelector('.outputs .output-wrapper')
    while (outputWrapper.lastElementChild) {
        outputWrapper.removeChild(outputWrapper.lastElementChild);
    }

    let p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${perfectYear} years ${perfectMonth} months ${perfectDay} days`
    outputWrapper.appendChild(p)

    // in months
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inMonths} months ${perfectDay} days`
    outputWrapper.appendChild(p)

    // in weeks
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inWeeks} weeks ${days} days`
    outputWrapper.appendChild(p)

    // in days
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inDays} days`
    outputWrapper.appendChild(p)

    // in hours
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inHours} hours`
    outputWrapper.appendChild(p)

    // in minutes
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inMinutes} minutes`
    outputWrapper.appendChild(p)

    // in seconds
    p = document.createElement('p')
    p.classList.add('text-size-medium')
    p.classList.add('text-black')
    p.innerText = `${inSeconds} seconds`
    outputWrapper.appendChild(p)
}

// calculation
const calculation = () => {
    let birth_year = parseInt(birthYear.value)
    let birth_month = parseInt(birthMonth.value)
    let birth_date = parseInt(birthDate.value)
    let selected_year;
    let selected_month;
    let selected_date;
    let years, months, days;
    let inMonths, inWeeks, inDays, inHours, inMinutes, inSeconds

    if (recentDate) {
        const date = new Date();
        selected_date = date.getDate();
        selected_month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
        selected_year = date.getFullYear();
    }
    else {
        selected_year = parseInt(selectedYear.value)
        selected_month = parseInt(selectedMonth.value)
        selected_date = parseInt(selectedDate.value)
    }

    if (selected_year && selected_month && selected_date) {

        if (selected_date < birth_date) {
            days = (selected_date + 31) - birth_date;
            selected_month--;
        }
        else {
            days = selected_date - birth_date;
        }

        if (selected_month < birth_month) {
            months = (selected_month + 12) - birth_month;
            selected_year--;
        }
        else {
            months = selected_month - birth_month;
        }
        years = selected_year - birth_year

        const perfectYear = years
        const perfectMonth = months
        const perfectDay = days

        // optional conversions
        inMonths = (years * 12) + months;
        inWeeks = parseFloat(inMonths * 4.34524)
        if (inWeeks % 10) {
            days = days + parseInt(('' + inWeeks % 1)[2])
            if (days >= 7) {
                inWeeks = parseInt(inWeeks) + Math.floor(days / 7);
                days = days - (Math.floor(days / 7) * 7)
            }
            else {
                inWeeks = Math.ceil(inWeeks)
            }
        }

        inDays = (inWeeks * 7) + days
        inHours = inDays * 24;
        inMinutes = inHours * 60;
        inSeconds = inMinutes * 60;
        display(perfectYear, perfectMonth, perfectDay, inMonths, inWeeks, days, inDays, inHours, inMinutes, inSeconds);
    }
    else {
        console('please, insert all data')
    }

}




