// Retrieve survey data from local storage
var surveyData = JSON.parse(localStorage.getItem('surveyData'));

// Function to pad a number with a leading zero if it's a single digit
function padWithZero(number) {
    return number < 10 ? '0' + number : number;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Replace placeholders with actual survey data and capitalize the first letter
document.getElementById('personal-info').innerHTML = document.getElementById('personal-info').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    if (p1 === 'day') {
        return padWithZero(surveyData[p1]);
    }
    return capitalizeFirstLetter(surveyData[p1]) || '';
});

document.getElementById('marital-status').innerHTML = document.getElementById('marital-status').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    return capitalizeFirstLetter(surveyData[p1]) || '';
});

document.getElementById('contact-info').innerHTML = document.getElementById('contact-info').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    return capitalizeFirstLetter(surveyData[p1]) || '';
});

document.getElementById('education-details').innerHTML = document.getElementById('education-details').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    return capitalizeFirstLetter(surveyData[p1]) || '';
});

document.getElementById('occupational-status').innerHTML = document.getElementById('occupational-status').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    if (p1 === 'endDay') {
        return padWithZero(surveyData[p1]);
    }
    return capitalizeFirstLetter(surveyData[p1]) || '';
});

document.getElementById('work-details').innerHTML = document.getElementById('work-details').innerHTML.replace(/{{(\w+)}}/g, function (match, p1) {
    return capitalizeFirstLetter(surveyData[p1]) || '';
});



// Functions to show hidden divs
function showMarriageDetails() {
    var maritalStatus = surveyData.maritalStatus;

    // Check if the user is married
    if (maritalStatus === 'married') {
        showElement('married');
    }
} showMarriageDetails()

function showStudyingDetails() {
    var educationLevel = surveyData.educationLevel;

    if (educationLevel === 'vocational') {
        showElement('studyingVocational');
    } else if (educationLevel === 'higher-college') {
        showElement('studyingCollege');
    } else if (educationLevel === 'higher-university') {
        showElement('studyingUniversity');
    }
} showStudyingDetails()

function showOccupationDetails() {
    var occupationalStatus = surveyData.occupationalStatus;

    if (occupationalStatus === 'studying') {
        showElement('studying');
    } else if (occupationalStatus === 'working') {
        showElement('working');
    } else if (occupationalStatus === 'not-working') {
        showElement('not-working');
    } else if (occupationalStatus === 'maternity-leave') {
        showElement('maternity-leave');
    }
} showOccupationDetails()

function showMiddleName() {
    var middleName = surveyData.middleName;

    if (middleName) {
        showElement('middleName');
    }
} showMiddleName()

function showElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
}