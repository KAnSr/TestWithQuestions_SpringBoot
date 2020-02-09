"use strict";

var userAuthentificationData = localStorage.getItem('userAuthentificationData');
userAuthentificationData = userAuthentificationData ? JSON.parse(userAuthentificationData) : {eMail: ''};

var result = null;
var xhrResult = new XMLHttpRequest();
xhrResult.open('GET', '/api/getResult?email=' + userAuthentificationData.eMail, true);
xhrResult.onload = function() {
	result = JSON.parse(xhrResult.responseText);
	redrawUserData();
	redrawResultAnswers();
	}
xhrResult.send();

var resultStatistic = null;
var xhrResultStatistic = new XMLHttpRequest();
xhrResultStatistic.open('GET', '/api/getResultStatistic', true);
xhrResultStatistic.onload = function() {
	resultStatistic = JSON.parse(xhrResultStatistic.responseText);
	redrawResultStatistic();
	}
xhrResultStatistic.send();


//Форматируем дату и время
function dateTimeToString(currentDate) {
	currentDate = new Date(currentDate - currentDate.getMilliseconds());
	return ('00' + currentDate.getDate()).slice(-2) + '.' +
		('00' + (currentDate.getMonth() + 1)).slice(-2) + '.' +
		('0000' + currentDate.getFullYear()).slice(-4) + ' ' +
		('00' + currentDate.getHours()).slice(-2) + ':' +
		('00' + currentDate.getMinutes()).slice(-2) + ':' +
		('00' + currentDate.getSeconds()).slice(-2);
}


//Выведем информацию о пользователе
function redrawUserData() {
	var userDataTemplate = document.getElementById('userDataTemplate');
	var userDataParentNode = userDataTemplate.parentNode;
	userDataParentNode.removeChild(userDataTemplate);
	userDataTemplate.removeAttribute('id');

	let newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'Опрашиваемый: ' +
		result.user.firstName + ' ' +
		result.user.lastName;
	userDataParentNode.appendChild(newElem);

	newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'E-mail: ' +
		result.user.eMail + '; тел.: ' + result.user.phone;
	userDataParentNode.appendChild(newElem);

	newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'Попытка №: ' + result.attempt;
	userDataParentNode.appendChild(newElem);

	newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'Начало тестирования: ' + dateTimeToString(new Date(result.startTime));
	userDataParentNode.appendChild(newElem);

	newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'Окончание тестирования: ' + dateTimeToString(new Date(result.finishTime));
	userDataParentNode.appendChild(newElem);

	newElem = userDataTemplate.cloneNode(true);
	newElem.innerHTML = 'Затраченное время: ';
	if (new Date(result.finishTime)) {
		let totalTime = new Date(new Date(result.finishTime) - new Date(result.startTime));
		newElem.innerHTML = newElem.innerHTML +
			('00' + totalTime.getUTCHours()).slice(-2) + ':' +
			('00' + totalTime.getUTCMinutes()).slice(-2) + ':' +
			('00' + totalTime.getUTCSeconds()).slice(-2);
	}
	else
		newElem.innerHTML = newElem.innerHTML + '———';
	userDataParentNode.appendChild(newElem);

}


//Выведем результаты ответов на вопросы
function redrawResultAnswers() {
	var questionTemplate = document.getElementById('questionTemplate');
	var anwserTemplate = document.getElementById('anwserTemplate');
	var questionParentNode = questionTemplate.parentNode;
	questionParentNode.removeChild(questionTemplate);
	questionParentNode.removeChild(anwserTemplate);
	questionTemplate.removeAttribute('id');
	anwserTemplate.removeAttribute('id');

	for (let i = 0; i < result.resultAnswers.length; i++) {
		let newElem = questionTemplate.cloneNode(true);
		newElem.innerHTML = '' + (i + 1) + '. ' + result.resultAnswers[i].question.question;
		questionParentNode.appendChild(newElem);

		newElem = anwserTemplate.cloneNode(true);
		newElem.innerHTML = 'Ответ пользователя: ' + (result.resultAnswers[i].answer ? '«' + result.resultAnswers[i].answer.answer + '»' : '———');
		newElem.classList.add(result.resultAnswers[i].answerIsCorrect ? 'correctAnswer' : 'wrongAnswer');
		questionParentNode.appendChild(newElem);

		newElem = anwserTemplate.cloneNode(true);
		newElem.innerHTML = 'Правильный ответ: «' + result.resultAnswers[i].correctAnswer.answer + '»';
		newElem.classList.add(result.resultAnswers[i].answerIsCorrect ? 'correctAnswer' : 'wrongAnswer');
		questionParentNode.appendChild(newElem);
	}
}



function redrawResultStatistic() {
	let resultStatisticTable_RowTemplate = document.getElementById('resultStatisticTable_RowTemplate');
	let parentNode = resultStatisticTable_RowTemplate.parentNode;
	parentNode.removeChild(resultStatisticTable_RowTemplate);
	resultStatisticTable_RowTemplate.removeAttribute('id');

	for (let i = 0; i < resultStatistic.length; i++) {
		let newElem = resultStatisticTable_RowTemplate.cloneNode(true);
		newElem.children[0].textContent = resultStatistic[i].firstName + ' ' + resultStatistic[i].lastName;
		newElem.children[1].textContent = resultStatistic[i].attempt;
		newElem.children[2].textContent = '' + Number(resultStatistic[i].averageCorrectAnswers).toFixed(2) + ' / ' + resultStatistic[i].questions;
		newElem.children[3].textContent = dateTimeToString(new Date(resultStatistic[i].lastFinishTime));
		newElem.children[4].textContent = '' + resultStatistic[i].lastCorrectAnswers + ' / ' + resultStatistic[i].questions;
		parentNode.appendChild(newElem);
	}
}


function goToUserAuthenticanion(event) {
	open('user_authentication.html', '_self');
}
