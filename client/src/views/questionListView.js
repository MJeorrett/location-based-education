var CountriesServer = require('../models/countriesServer');

var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
  this.archiveList = document.getElementById('archive-list');
};

QuestionListView.prototype = {
  addQuestion: function() {
    var quizQuestionInput = document.createElement('input');
    quizQuestionInput.type = 'text';
    quizQuestionInput.placeholder = "Please enter your question:"
    var qLi = document.createElement('li');
    qLi.setAttribute("archived", "false");
    qLi.appendChild(quizQuestionInput);

    var answerSelect = document.createElement('select');
    this.populateSelect(answerSelect);
    qLi.appendChild(answerSelect);

    var archiveButton = document.createElement('button');
    archiveButton.quizQuestionInput = quizQuestionInput;
    archiveButton.className = 'archive-button';
    archiveButton.onclick = function() {
      if (qLi.getAttribute("archived") === "false") {
        this.archiveList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "true");
      } else {
        this.questionList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "false");
      };
    }.bind(this);
    qLi.appendChild(archiveButton);

    this.questionList.appendChild(qLi);
  },
  populateSelect: function( elementId ) {
    var countriesServer = new CountriesServer( function() {
      this.addCountries( elementId, countriesServer.countries );
    }.bind(this) );
  },
  addCountries: function(elementId, countries) {
    countries.forEach( function( country ) {
      var option = document.createElement('option');
      option.value = country.code;
      option.innerText = country.name;
      elementId.appendChild(option);
    });
  }

};

module.exports = QuestionListView;
