var CountriesServer = require('../models/countriesServer');

var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
  this.archiveList = document.getElementById('archive-list');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    question = question || null;
    console.log("question", question);
    var listItem = this.buildListItem();
    listItem.getAttribute("archived") === true ? this.archiveList.appendChild(listItem) : this.questionList.appendChild(listItem);
    


    // console.log("archiveList", this.archiveList);
    // console.log("questionList", this.questionList);
  },
  buildListItem: function() {
    var qLi = document.createElement('li');
    var quizQuestionInput = document.createElement('input');
    quizQuestionInput.type = 'text';
    quizQuestionInput.placeholder = "Please enter your question:"
    qLi.setAttribute("archived", "false");
    qLi.appendChild(quizQuestionInput);

    var answerSelect = document.createElement('select');
    this.populateSelect(answerSelect);
    qLi.appendChild(answerSelect);
    return this.buildArchiveButton(qLi);
  },
  buildArchiveButton: function(qLi) {
    var archiveButton = document.createElement('button');
    archiveButton.quizQuestionInput = qLi.quizQuestionInput;
    archiveButton.className = 'archive-button';
    archiveButton.innerText = "Archive this question";
    archiveButton.onclick = function() {
      if (qLi.getAttribute("archived") === "false") {
        this.archiveList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "true");
        archiveButton.innerText = "Unarchive this question";
      } else {
        this.questionList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "false");
        archiveButton.innerText = "Archive this question";
      };
    }.bind(this);
    qLi.appendChild(archiveButton);
    return qLi;
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









