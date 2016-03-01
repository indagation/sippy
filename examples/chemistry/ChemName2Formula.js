define(['Compound'],function () {
    return {
        resetProblem: function (state, grade) {
            state = Compound.generateCompound();
            return state;
        },
        buildProblem: function (state) {
          state["mathjax"] = true;
          $('#prompt').html('What is the formula of the compound ' + state["name"]);
          return state;
        },
        setGrade: function (state) {
          state["answer"] = $('#input').val();
          state["expect"] = state["formula"];
          state["feedback"] = "<ul><li>You were given the compound " + state["name"] + ".</li>" +
                     "<li>It's formula should be " + getMathJax(state["expect"]) + ".</li>" +
                     "<li>You said it was " + getMathJax(state["answer"]) + ".</li><ul>";
          return state;    
        }   
    };
});