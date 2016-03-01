define(['require', type, 'jquery', 'jschannel'], function (require) {
    var $ = require('jquery');

    var Channel = require('jschannel');

    var problem = require(type);

    function addToFeedback(string){
      state["feedback"] += string;
    } 

    var ConsecutiveInput = (function() {

      var width = 400, height = 400;
      var channel, grade, answer;

      function init(){
        !getParameterByName('ShowLog')?null:console.log("Initializing"); 
        // Establish a channel only if this application is embedded in an iframe.
        // This will let the parent window communicate with this application using
        // RPC and bypass SOP restrictions.
        if (window.parent !== window) {
            channel = Channel.build({
                window: window.parent,
                origin: "*",
                scope: "JSInput"
            });

            channel.bind("getGrade", getGrade);
            channel.bind("getState", getState);
            channel.bind("setState", setState);

        }else{
          $('#check').show();
        }
        buildProblem();
      }

      function resetProblem(){
        !getParameterByName('ShowLog')?null:console.log("Resetting problem state.");
        state = problem.resetProblem(state,grade);
        !getParameterByName('ShowLog')?null:console.log(state);
        if (window.parent === window){
          $('#input').val("");
          $('#display').html("");
        }
        buildProblem();
      }

      function buildProblem(){
        if(state){
          !getParameterByName('ShowLog')?null:console.log("Building the problem.");
          state = problem.buildProblem(state);
        }else{
          !getParameterByName('ShowLog')?null:console.log("You tried to build the problem, but the state isn't set.");
          resetProblem();
        }
      }

      function setGrade() {
        !getParameterByName('ShowLog')?null:console.log("Grading problem.");
        state = problem.setGrade(state);
        
        if (state["answer"] == state["expect"]){
          state["correctness"] = "correct";
          addToFeedback("<span style='color:green'>Good Job.</span>");
        }else{
          state["correctness"] = "incorrect";
          addToFeedback("<span style='color:red'>Try Again.</span>");
        }
        
        grade = {
          "feedback": state["feedback"],
          "correctness": state["correctness"],
          "answer": state["answer"],
          "expect": state["expect"]
        }          
      }
      function getGrade() {
        setGrade();
        !getParameterByName('ShowLog')?null:console.log(grade);
        return JSON.stringify(grade);
      }

      function getState() {
        !getParameterByName('ShowLog')?null:console.log(state);
        // If you set ResetOnlyOnCorrect, then the problem will only reset on correct answers.
        if(!getParameterByName('ResetOnlyOnCorrect') || grade.correctness == "correct"){
          resetProblem();
        }
        return JSON.stringify(state);
      }

      // This function will be called with 1 argument when JSChannel is not used,
      // 2 otherwise. In the latter case, the first argument is a transaction
      // object that will not be used here
      // (see http://mozilla.github.io/jschannel/docs/)
      function setState() {
        stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
        !getParameterByName('ShowLog')?null:console.log(stateStr);
        setTimeout(function () { 
          state = JSON.parse(stateStr);
          init();
        },1);
      }

      return {
        init: init,
        buildProblem: buildProblem,
        getState: getState,
        setState: setState,
        getGrade: getGrade
      };
    }());
    function showFeedback(){
      $('#problem').hide();
      $('#feedbackArea').show();
    }
    function showProblem(){
      $('#feedbackArea').hide();
      $('#problem').show();
    }

    window.ConsecutiveInput = {
      getState: ConsecutiveInput.getState,
      setState: ConsecutiveInput.setState,
      getGrade: ConsecutiveInput.getGrade            
    } 

    setTimeout(function(){
      !state ? ConsecutiveInput.init() : null;
    }, 500);
    $('#input').keyup(function(){
      state["mathjax"] ? buildMathJax($('#display'),getMathJax($(this).val())) : null;
    });
    $('#check').click(function(){
      grade = JSON.parse(ConsecutiveInput.getGrade());
      ConsecutiveInput.getState();
      buildMathJax($('#feedback'),grade.feedback);
      showFeedback();   
    });
    $('#next').click(function(){
      showProblem();   
    });
});
