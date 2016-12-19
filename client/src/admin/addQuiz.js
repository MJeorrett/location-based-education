var quizServer = require('../models/quizServer.js');
var QuestionListView = require('../views/questionListView.js');

window.onload = function() {
  console.log("Ready to add quizzes");

  var quizTitleInput = document.getElementById( 'quiz-title-input' );
  var newQuestionButton = document.getElementById( 'new-question-button' );
  var countriesSelect = document.getElementById('countries-select');
  var saveQuizButton = document.getElementById( 'save-quiz-button' );
  var questionListView = new QuestionListView();
  var ulWarning = document.getElementById('ul-warning');
  var unArchivedQuestionsTag = document.getElementById('questions-list');
  var archivedQuestionsTag = document.getElementById('archive-list');
  var published;

  // checks that all the inputs are vlaid before saving quiz
  saveQuizButton.onclick = function() {
    var warningFlag = false;

    published = document.getElementById("check-publish").checked;

    // WORK IN PROGRESS - error messages for creating quiz
    if (quizTitleInput.innerText === undefined) {
      var titleWarning = document.getElementById('title-warning');
      titleWarning.style.display = "inline-block";
      warningFlag === true;
    };
    if (unArchivedQuestionsTag.children.length === 0) {
      ulWarning.style.display = "inline-block";
      warningFlag === true;
    };
    if ( unArchivedQuestionsTag.firstChild === null || unArchivedQuestionsTag.firstChild.firstChild.value === "" ) {
      var questionWarning = document.getElementById('question-warning');
      questionWarning.style.display = "inline-block";
      warningFlag === true;
    };
    if (warningFlag === false){
      console.log("saving the quiz");
      saveQuiz()
    };
  };

  newQuestionButton.onclick = function() {
    ulWarning.style.display = "none";
    questionListView.addQuestion();
  };



  // contacts quiz server to post the quiz to the db
  var saveQuiz = function() {
    var quizTitle = quizTitleInput.value;

    arrayOfQuestions = unArchivedQuestionsTag.children;
    archivedQuestions = archivedQuestionsTag.children;
    var questions = [];

    for (var i = 0; i < arrayOfQuestions.length; i++) {
      var text = arrayOfQuestions[i].firstChild.value;
      var answerIndex = arrayOfQuestions[i].children[1].selectedIndex;
      var answerCode = arrayOfQuestions[i].children[1][answerIndex].value;
      var answerFullName = arrayOfQuestions[i].children[1][answerIndex].innerText;
      var archived = arrayOfQuestions[i].getAttribute("archived");
      console.log("archived:", archived);

      var question = {
        text: text,
        countryCode: answerCode,
        countryName: answerFullName,
        archived: archived
      };
      questions.push(question);
    };
    for (var i = 0; i < archivedQuestions.length; i++) {
      var text = archivedQuestions[i].firstChild.value;
      var answerIndex = archivedQuestions[i].children[1].selectedIndex;
      var answerCode = archivedQuestions[i].children[1][answerIndex].value;
      var answerFullName = archivedQuestions[i].children[1][answerIndex].innerText;
      var archived = archivedQuestions[i].getAttribute("archived");
      console.log("archived:", archived);

      var question = {
        text: text,
        countryCode: answerCode,
        countryName: answerFullName,
        archived: archived
      };
      questions.push(question);
    };

    var quiz = {
      title: quizTitle,
      questions: questions,
      published: published
    };
    console.log("whole quiz", quiz);
    quizServer.createQuiz( quiz );
    window.location.href = "http://localhost:3000/admin/quizzes";
  };

};
