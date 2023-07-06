document.addEventListener('DOMContentLoaded', function () {
    
    var feedbackForm = document.getElementById('feedback-form');
    var contextElement = document.getElementById('context');
    var questionElement = document.getElementById('question');
    var systemElement = document.getElementById('system');
    var raterIdElement = document.getElementById('rater_id');
    var rankElement = document.getElementById('rank');
  
    
    feedbackForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
    
      var context = contextElement.value;
      var question = questionElement.value;
      var system = systemElement.value;
      var raterId = raterIdElement.value;
      var rank = rankElement.value;
  
      
      submitFeedback(context, question, system, raterId, rank);
    });
  
   
    function submitFeedback(context, question, system, raterId, rank) {
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/submit_feedback', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      
      xhr.onload = function () {
        if (xhr.status === 200) {
          alert('Feedback submitted successfully!');
        
          feedbackForm.reset();
        } else {
          alert('Error submitting feedback. Please try again.');
        }
      };
  
      
      var requestBody = JSON.stringify({
        context: context,
        question: question,
        system: system,
        rater_id: raterId,
        rank: rank,
      });
  
      
      xhr.send(requestBody);
    }
  });
  