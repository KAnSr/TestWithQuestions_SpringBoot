"use strict";


// var questionListOld = [
// 	{
// 	question: 'Сколько ножек у стула с четырьмя ножками?',
// 	questionId: 'gqw82cvb0',
// 	correctAnswer: 4,
// 	answer1: '1 ножка',
// 	answer2: '2 ножки',
// 	answer3: '3 ножки',
// 	answer4: '4 ножки',
// 	answer5: '5 ножек',
// 	answer6: '6 ножек'
// 	},
// 	{
// 	question: 'Какого цвета небо в пасмурный день?',
// 	questionId: '1genr9od8',
// 	correctAnswer: 3,
// 	answer1: 'Зеленое',
// 	answer2: 'Синее',
// 	answer3: 'Серое',
// 	answer4: 'Чёрное'
// 	},
// 	{
// 	question: 'Какой возраст планеты Земля?',
// 	questionId: 'dusv35hwh',
// 	correctAnswer: 4,
// 	answer1: '18 тысяч лет',
// 	answer2: '3 миллиона лет',
// 	answer3: '1 миллиард лет',
// 	answer4: '4,5 миллиарда лет',
// 	answer5: '9 миллиардов лет'
// 	},
// 	{
// 	question: 'Почему белые медведи не едят пингвинов?',
// 	questionId: 'wwwfw2fat',
// 	correctAnswer: 2,
// 	answer1: 'Пингвины летают по воздуху, а медведи не могут так высоко прыгать',
// 	answer2: 'Не могут добраться, поскольку находятся на другом конце Земли',
// 	answer3: 'Медведи едят пингвинов',
// 	answer4: 'Пингвины едят медведей'
// 	}
// ];
// //Новые questionId будем генерировать выражением: Math.random().toString(36).substr(2, 9)


var questionList;
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/getQuestionList', false);
// xhr.onload = function() {
// 	console.log('onload. readyState=' + xhr.readyState + '; status=' + xhr.status);
// 	console.log(xhr.responseText);
// 	questionListNew = JSON.parse(xhr.responseText)}
xhr.send();
questionList = JSON.parse(xhr.responseText);	


// //Посчитаем количество вариантов ответов в каждом вопросе, запишем в answersQuantity
// for (let qIndex = 0; qIndex < questionList.length; qIndex++) {
// 	questionList[qIndex].answersQuantity = 0;
// 	for (let i = 1; true; i++) {
// 		if (questionList[qIndex]['answer' + i]) {
// 			questionList[qIndex].answersQuantity = i;
// 		}
// 		else {
// 			break;
// 		}
// 	}
// }
questionList.qIndex = 0; //Индекс текущего вопроса


