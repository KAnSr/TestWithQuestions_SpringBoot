"use strict";

var questionList;
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/getQuestionList', false);  //Надо будет переделать на асинхронную прорисовку
// xhr.onload = function() {
// 	console.log('onload. readyState=' + xhr.readyState + '; status=' + xhr.status);
// 	console.log(xhr.responseText);
// 	questionListNew = JSON.parse(xhr.responseText)}
xhr.send();
questionList = JSON.parse(xhr.responseText);	
questionList.qIndex = 0; //Индекс текущего вопроса


//Выведем информацию о пользователе, если она записана в localStorage
var userAuthentificationData = localStorage.getItem('userAuthentificationData');
userAuthentificationData = userAuthentificationData ? JSON.parse(userAuthentificationData) : {eMail: ''};

if (userAuthentificationData.eMail !== '') {
	userAuthentificationData.startTime = new Date(userAuthentificationData.startTime);

	let userDetailsElem = document.createElement('p');
	userDetailsElem.innerHTML = 'Опрашиваемый: ' +
		userAuthentificationData.firstName + ' ' +
		userAuthentificationData.lastName;
	document.querySelector('body').insertBefore(userDetailsElem, document.querySelector('.flexContainer'));

	userDetailsElem = document.createElement('p');
	userDetailsElem.innerHTML = 'Начало тестирования: ' +
		('00' + userAuthentificationData.startTime.getDate()).slice(-2) + '.' +
		('00' + (userAuthentificationData.startTime.getMonth() + 1)).slice(-2) + '.' +
		('0000' + userAuthentificationData.startTime.getFullYear()).slice(-4) + ' ' +
		('00' + userAuthentificationData.startTime.getHours()).slice(-2) + ':' +
		('00' + userAuthentificationData.startTime.getMinutes()).slice(-2) + ':' +
		('00' + userAuthentificationData.startTime.getSeconds()).slice(-2);
	document.querySelector('body').insertBefore(userDetailsElem, document.querySelector('.flexContainer'));
}


//В answerValues будем хранить выбранные пользователем ответы
questionList.answerValues = localStorage.getItem('answerValues');
questionList.answerValues = questionList.answerValues ? JSON.parse(questionList.answerValues) : undefined;
questionList.answerValues = Array.isArray(questionList.answerValues) ? new Map(questionList.answerValues) : undefined;
questionList.answerValues = questionList.answerValues instanceof Map && questionList.answerValues.get('eMail') === userAuthentificationData.eMail
	? questionList.answerValues : new Map().set('eMail', userAuthentificationData.eMail);


questionList.storeAnswerValues = function() {
	localStorage.setItem('answerValues', JSON.stringify([...questionList.answerValues]));
}



//В drawQuestions у нас будет статусы и методы перерисовки списка вопросов
var drawQuestions = {};

drawQuestions.statusEnum = {static: 'Static', slideOld: 'Slide Old', slideNew: 'Slide New', shudder: 'Shudder'}; //Наши вопросы могут находиться в одном из 3-х состояний
drawQuestions.status = drawQuestions.statusEnum.static;
drawQuestions.directionsEnum = {initialize: 'Initialize', forward: 'Forward', backward: 'Backward', none: 'None'};
drawQuestions.direction = drawQuestions.directionsEnum.initialize;


drawQuestions.changeQuestion = function() {
	let prevQIndex = questionList.qIndex;

	switch (drawQuestions.direction) {
		case drawQuestions.directionsEnum.backward:
			questionList.qIndex--;
			break;
		case drawQuestions.directionsEnum.forward:
			questionList.qIndex++;
	}

	questionList.qIndex = Math.max(questionList.qIndex, 0);
	questionList.qIndex = Math.min(questionList.qIndex, questionList.length - 1);

	if (drawQuestions.direction === drawQuestions.directionsEnum.initialize)
		drawQuestions.slideNew();
	else if (prevQIndex === questionList.qIndex)
		drawQuestions.shudder();
	else
		drawQuestions.slideOld();
}


drawQuestions.redraw = function() {
	document.getElementById('question').children[0].textContent = 'Вопрос (' + (questionList.qIndex + 1) + ' из ' + questionList.length + '): ' + questionList[questionList.qIndex].question;

	 //Чистим содержимое таблицы от старого списка ответов
	while (questionTBody.firstChild) {
		questionTBody.removeChild(questionTBody.firstChild);
	}

	//Прочитаем ранее уже выбранный пользователем вариант ответа
	let lastAnswerId = questionList.answerValues.get(questionList[questionList.qIndex].id);

	 //Рисуем новый список ответов
	for (let i = 0; i <= questionList[questionList.qIndex].answers.length - 1; i++) {
		let currentAnswer = answerTemplate.cloneNode(true);

		if (questionList[questionList.qIndex].answers[i].id === lastAnswerId)
			currentAnswer.children[0].children[0].checked = true;

		currentAnswer.children[0].children[0].value = questionList[questionList.qIndex].answers[i].id;
		currentAnswer.children[0].children[0].id = 'radio' + (i + 1);
		currentAnswer.children[0].children[0].addEventListener('change', radioChange);
		currentAnswer.children[1].children[0].setAttribute('for', 'radio' + (i + 1));
		currentAnswer.children[1].children[0].textContent = questionList[questionList.qIndex].answers[i].answer;
		currentAnswer.id = 'answer' + (i + 1);
		currentAnswer.title = 'Вариант ответа №' + (i + 1);
		questionTBody.appendChild(currentAnswer);
	}
}


drawQuestions.slideOld = function(direction) {
	drawQuestions.status = drawQuestions.statusEnum.slideOld;
	
	let questionTable = document.getElementById('questionTable');
	void questionTable.offsetWidth;
	if (drawQuestions.direction === drawQuestions.directionsEnum.forward)
		questionTable.style.animationName = 'animationLeft';
	else if (drawQuestions.direction === drawQuestions.directionsEnum.backward)
		questionTable.style.animationName = 'animationRight';
	
	questionTable.style.animationDirection = 'reverse';
}


drawQuestions.slideNew = function() {
	drawQuestions.redraw();
	drawQuestions.status = drawQuestions.statusEnum.slideNew;

	let questionTable = document.getElementById('questionTable');
	void questionTable.offsetWidth;
	if (drawQuestions.direction === drawQuestions.directionsEnum.forward
		|| drawQuestions.direction === drawQuestions.directionsEnum.initialize)
		questionTable.style.animationName = 'animationRight';
	else if (drawQuestions.direction === drawQuestions.directionsEnum.backward)
		questionTable.style.animationName = 'animationLeft';
	
	questionTable.style.animationDirection = 'normal';
}


drawQuestions.shudder = function() {
	drawQuestions.status = drawQuestions.statusEnum.shudder;

	let questionTable = document.getElementById('questionTable');
	void questionTable.offsetWidth;
	if (drawQuestions.direction === drawQuestions.directionsEnum.forward)
		questionTable.style.animationName = 'shudderLeft';
	else if (drawQuestions.direction === drawQuestions.directionsEnum.backward)
		questionTable.style.animationName = 'shudderRight';
}





var answerTemplate = document.getElementById('answer');
var questionTBody = document.getElementById('questionTBody');


drawQuestions.changeQuestion();

document.getElementById('buttonBackward').addEventListener('click', buttonForwardBackward);
document.getElementById('buttonForward').addEventListener('click', buttonForwardBackward);
document.addEventListener('keyup', keyUpEvent);
document.getElementById('questionTable').addEventListener('animationend', animationEnd);


function animationEnd(event) {
	questionTable.style.animationName = '';
	if (drawQuestions.status === drawQuestions.statusEnum.slideOld) {
		drawQuestions.slideNew();
		return;
	}

	drawQuestions.status = drawQuestions.statusEnum.static;
	drawQuestions.direction = drawQuestions.directionsEnum.none;
}


function buttonForwardBackward(event) {
	event.preventDefault();
	if (drawQuestions.status !== drawQuestions.statusEnum.static) return;

	drawQuestions.direction = drawQuestions.directionsEnum[event.target.id.replace(new RegExp('button', 'i'), '').toLowerCase()];
	drawQuestions.changeQuestion();
}


function keyUpEvent(event) {
	if ((event.key.toLowerCase() === 'arrowleft' || event.key.toLowerCase() == 'arrowright')
		&& event.ctrlKey) {
		event.preventDefault();
		if (drawQuestions.status !== drawQuestions.statusEnum.static) return;
		
		switch (event.key.toLowerCase()) {
			case 'arrowleft':
				drawQuestions.direction = drawQuestions.directionsEnum.backward;
				break;
			case 'arrowright':
				drawQuestions.direction = drawQuestions.directionsEnum.forward;
				break;
			default:
				drawQuestions.direction = drawQuestions.directionsEnum.none;
		}

		drawQuestions.changeQuestion();
	}
	else if (Number(event.key) !== NaN
		&& Number(event.key) >= 1
		&& Number(event.key) <= questionList[questionList.qIndex].answers.length) {
		let radioBtn = document.getElementById('answer' + event.key).children[0].children[0];
		radioBtn.checked = true;
		//questionList.answerValues[questionList[questionList.qIndex].questionId] = event.key;
		questionList.answerValues.set(questionList[questionList.qIndex].id, Number(radioBtn.value))
		questionList.storeAnswerValues();
	}
}


function radioChange(event) {
	questionList.answerValues.set(questionList[questionList.qIndex].id, Number(event.target.value))
	questionList.storeAnswerValues();
}


function goToUserAuthenticanion(event) {
	open('user_authentication.html', '_self');
}


function finishTest(event) {
	userAuthentificationData.finishTime = new Date();
	//localStorage.setItem('userAuthentificationData', JSON.stringify(userAuthentificationData));

	var results = {};
	results.eMail = userAuthentificationData.eMail;
	results.startTime = userAuthentificationData.startTime;
	results.finishTime = userAuthentificationData.finishTime;
	results.timezoneOffset = userAuthentificationData.startTime.getTimezoneOffset() / -60;
	results.answers = [];
	for (let i = 0; i <= questionList.length - 1; i++)
		results.answers.push(
			{'questionId': questionList[i].id,
			'answerId': (questionList.answerValues.get(questionList[i].id) ? questionList.answerValues.get(questionList[i].id) : 0)
		});
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/finishTest', true);
	xhr.onerror = function() {
		alert('Ошибка соединения с сервером');
	};
	xhr.onload = function() {
		if (xhr.status === 200) {
			open('results.html', '_self');
		} else {
			alert('Ошибка отправки запроса: ' + xhr.status);
		}
	}
	xhr.send(JSON.stringify(results));
}