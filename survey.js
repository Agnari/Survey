function submitSurvey() {
  var requiredFields = [
    'gender', 'firstName', 'lastName', 'year', 'month', 'day',
    'personalCode', 'maritalStatus', 'phoneNumber', 'email',
    'addressLine1', 'addressLine2', 'city', 'zipCode', 'country', 'educationLevel',
    'lastInstitution', 'graduationYear', 'occupationalStatus', 'workExperience',
    'fieldOfWork'
  ];

  // Check if all required fields are filled
  var allFieldsFilled = true;
  var firstUnfilledInput;

  requiredFields.forEach(function (fieldName) {
    var field = document.getElementById(fieldName);
    var fieldValue = field.value.trim();

    if (!fieldValue) {
      // If the field is empty, mark it red and update the flag
      field.style.border = '1px solid red';
      allFieldsFilled = false;

      // Save the reference to the first unfilled input
      if (!firstUnfilledInput) {
        firstUnfilledInput = field;
      }
    } else {
      // If the field is filled, remove any previous red border
      field.style.border = '';
    }
  });

  // If all required fields are filled, proceed with form submission
  if (allFieldsFilled) {
    var surveyData = {
      gender: document.getElementById('gender').value,
      firstName: document.getElementById('firstName').value,
      middleName: document.getElementById('middleName').value,
      lastName: document.getElementById('lastName').value,
      year: document.getElementById('year').value,
      month: document.getElementById('month').value,
      day: document.getElementById('day').value,
      personalCode: document.getElementById('personalCode').value,
      maritalStatus: document.getElementById('maritalStatus').value,
      spouseFirstName: document.getElementById('spouseFirstName').value,
      spouseLastName: document.getElementById('spouseLastName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      email: document.getElementById('email').value,
      addressLine1: document.getElementById('addressLine1').value,
      addressLine2: document.getElementById('addressLine2').value,
      city: document.getElementById('city').value,
      zipCode: document.getElementById('zipCode').value,
      country: document.getElementById('country').value,
      educationLevel: document.getElementById('educationLevel').value,
      lastInstitution: document.getElementById('lastInstitution').value,
      graduationYear: document.getElementById('graduationYear').value,
      collegeQualification: document.getElementById('collegeQualification').value,
      collegeDegree: document.getElementById('collegeDegree').value,
      universityQualification: document.getElementById('universityQualification').value,
      universityDegree: document.getElementById('universityDegree').value,
      vocationalQualification: document.getElementById('vocationalQualification').value,
      occupationalStatus: document.getElementById('occupationalStatus').value,
      degreeLevel: document.getElementById('degreeLevel').value,
      studyCourse: document.getElementById('studyCourse').value,
      institution: document.getElementById('institution').value,
      expectedGraduationYear: document.getElementById('expectedGraduationYear').value,
      organisation: document.getElementById('organisation').value,
      duties: document.getElementById('duties').value,
      rou: document.getElementById('rou').value,
      endYear: document.getElementById('endYear').value,
      endMonth: document.getElementById('endMonth').value,
      endDay: document.getElementById('endDay').value,
      workExperience: document.getElementById('workExperience').value,
      fieldOfWork: document.getElementById('fieldOfWork').value
    };

    // Store survey data in local storage
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    // Redirect to the profile page
    window.location.href = 'profile.html';
  } else {
    // If any required field is empty, show the custom alert
    document.getElementById('customAlert').style.display = 'block';
    // Focus on the first unfilled input when the alert is shown
    firstUnfilledInput.focus();
  }
}

function closeCustomAlert() {
  // Hide the custom alert
  document.getElementById('customAlert').style.display = 'none';
}

function toggleSpouseDetails() {
  var dobNotEmpty = isDateOfBirthEntered();
  var maritalStatusSelect = document.getElementById('maritalStatus');
  var spouseDetails = document.getElementById('spouseDetails');

  // Enable or disable 'married' and 'divorced' options based on date of birth and age
  var age = calculateAge();
  var isUnder16 = age < 16;

  maritalStatusSelect.options[1].disabled = !dobNotEmpty || isUnder16; // 'married'
  maritalStatusSelect.options[2].disabled = !dobNotEmpty || isUnder16; // 'divorced'

  // Set marital status to 'single' if date of birth is not entered or if under 16
  maritalStatusSelect.value = (dobNotEmpty && !isUnder16) ? maritalStatusSelect.value : 'single';

  // Show spouse details if eligible and married, hide otherwise
  spouseDetails.style.display = (maritalStatusSelect.value === 'married') ? 'block' : 'none';
}

function isDateOfBirthEntered() {
  var year = document.getElementById('year').value;
  var month = document.getElementById('month').value;
  var day = document.getElementById('day').value;

  // Check if year, month, and day are not empty
  return year && month && day;
}

// Add this line to call the function when the page loads
window.onload = toggleSpouseDetails;

function calculateAge() {
  var currentYear = new Date().getFullYear();
  var birthYear = parseInt(document.getElementById('year').value, 10);
  var birthMonth = parseInt(document.getElementById('month').value, 10);
  var birthDay = parseInt(document.getElementById('day').value, 10);

  // Calculate age based on birthdate
  var age = currentYear - birthYear;

  // Adjust age based on birth month and day
  if (birthMonth > new Date().getMonth() + 1 || (birthMonth === new Date().getMonth() + 1 && birthDay > new Date().getDate())) {
    age--;
  }

  return age;
}

function toggleDegreeDetails() {
  var educationLevel = document.getElementById('educationLevel').value;
  var collegeDegreeDetails = document.getElementById('collegeDegreeDetails');
  var universityDegreeDetails = document.getElementById('universityDegreeDetails');
  var vocationalDegreeDetails = document.getElementById('vocationalDegreeDetails');

  // Show college or university degree details based on education level
  collegeDegreeDetails.style.display = (educationLevel === 'higher-college') ? 'block' : 'none';
  universityDegreeDetails.style.display = (educationLevel === 'higher-university') ? 'block' : 'none';
  vocationalDegreeDetails.style.display = (educationLevel === 'vocational') ? 'block' : 'none';
}

var personalCode = document.getElementById('personalCode');

personalCode.addEventListener('click', countPersonalCode);

function countPersonalCode() {
  var gender = document.getElementById('gender').value;
  var year = parseInt(document.getElementById('year').value, 10);
  var month = parseInt(document.getElementById('month').value, 10);
  var day = parseInt(document.getElementById('day').value, 10);

  var firstNum = getCentury(year, gender);
  var otherNum = getDateValues(year, month, day);

  var personalCode = firstNum.toString() + otherNum.toString() + '0000';

  document.getElementById('personalCode').value = personalCode;
}

function getCentury(year, gender) {
  var century;

  if (gender === 'male') {
    if (year >= 1800 && year <= 1899) {
      century = '1'; // 19th century
    } else if (year >= 1900 && year <= 1999) {
      century = '3'; // 20th century
    } else if (year >= 2000 && year <= 2099) {
      century = '5'; // 21st century
    }
  } else {
    if (year >= 1800 && year <= 1899) {
      century = '2'; // 19th century
    } else if (year >= 1900 && year <= 1999) {
      century = '4'; // 20th century
    } else if (year >= 2000 && year <= 2099) {
      century = '6'; // 21st century
    }
  }

  return century;
}

function getDateValues(year, month, day) {
  var pair1 = year % 100;
  var pair2 = ("0" + month).slice(-2); // Add leading zero and take the last two characters
  var pair3 = ("0" + day).slice(-2); // Add leading zero and take the last two characters

  // Add leading zero to pair1 if it's less than 10
  pair1 = pair1 < 10 ? "0" + pair1 : pair1;
  var allPairs = pair1.toString() + pair2.toString() + pair3.toString();
  return allPairs;
}

function toggleAdditionalFields() {
  var occupationalStatus = document.getElementById('occupationalStatus').value;

  // Hide all sections
  document.getElementById('studyDetails').style.display = 'none';
  document.getElementById('workDetails').style.display = 'none';
  document.getElementById('unemploymentDetails').style.display = 'none';
  document.getElementById('leaveDetails').style.display = 'none';

  // Show the relevant section based on the selected occupational status
  switch (occupationalStatus) {
    case 'studying':
      document.getElementById('studyDetails').style.display = 'block';
      break;
    case 'working':
      document.getElementById('workDetails').style.display = 'block';
      break;
    case 'not-working':
      document.getElementById('unemploymentDetails').style.display = 'block';
      break;
    case 'maternity-leave':
      document.getElementById('leaveDetails').style.display = 'block';
      break;
    default:
      // Handle blank option or other cases here
      break;
  }
}
