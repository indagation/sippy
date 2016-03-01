define(['SampleAdaptiveProblemGenerator'],function () {
    return {
        resetProblem: function (state, grade) {
            state = SampleAdaptiveProblemGenerator.generateProblem(state, grade);
            return state;
        },
        buildProblem: function (state) {
          $('#prompt').html(state["problem"]);
          return state;
        },
        setGrade: function (state) {
          state["answer"] = $('#input').val();
          state["feedback"] = "<ul><li>You were given the problem " + state["problem"] + ".</li>" +
                     "<li>The answer should have been " + state["expect"] + ".</li>" +
                     "<li>You said it was " + state["answer"] + ".</li><ul>";
          return state;    
        }   
    };
});