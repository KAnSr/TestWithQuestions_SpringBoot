"use strict";

var userAuthentificationData = localStorage.getItem('userAuthentificationData');
userAuthentificationData = userAuthentificationData ? JSON.parse(userAuthentificationData) : {};

var inputElements = document.querySelectorAll('.container form input[type="text"]');
for (let i = 0; i < inputElements.length; i++) {
	if (inputElements[i].id in userAuthentificationData)
		inputElements[i].value = userAuthentificationData[inputElements[i].id];
}


function submitForm(event) {
	event.preventDefault();
	
	var regExpName = new RegExp('[A-Za-zА-Яа-я]{2,}');
	var regExpPhone = new RegExp('[0-9]{5,}');
	var regExpEMail = new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$');
	var validationErrorMessege = '';

	var inputElements = document.querySelectorAll('.container form input[type="text"]');
	for (let i = 0; i < inputElements.length; i++) {

		switch (inputElements[i].id) {
			case 'phone':
				var currentRegExp = regExpPhone;
				break;
			case 'eMail':
				var currentRegExp = regExpEMail;
				break;
			default:
				var currentRegExp = regExpName;
		}
		if (!currentRegExp.test(inputElements[i].value)) {
			validationErrorMessege = validationErrorMessege + '\n' +
				'«' + inputElements[i].placeholder + '»';
			continue;
		}
		userAuthentificationData[inputElements[i].id] = inputElements[i].value;
	}

	if (validationErrorMessege !== '') {
		validationErrorMessege = 'Имеются не заполненные или не корректно заполненные поля:' + validationErrorMessege;
		alert(validationErrorMessege);
		return;
	}

	userAuthentificationData.startTime = new Date();
	userAuthentificationData.finishTime = undefined;
	userAuthentificationData.timezoneOffset = userAuthentificationData.startTime.getTimezoneOffset() / -60;
	localStorage.setItem('userAuthentificationData', JSON.stringify(userAuthentificationData));
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/userAuthentificationData', true);
	xhr.onerror = function() {
		alert('Ошибка соединения с сервером');
	};
	xhr.onload = function() {
		if (xhr.status === 200) {
			open('test.html', '_self');
		} else {
			alert('Ошибка отправки запроса: ' + xhr.status);
		}
	}
	xhr.send(JSON.stringify(userAuthentificationData));

}

function resetForm(event) {
	localStorage.removeItem('userAuthentificationData')
}