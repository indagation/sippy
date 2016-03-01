var SampleAdaptiveProblemGenerator = (function() {
  var problems = [
      {"problem": "1 + 1", "expect": 2, "difficulty": 0},
      {"problem": "2 + 2", "expect": 4, "difficulty": 0},
      {"problem": "8 - 2", "expect": 6, "difficulty": 1},
      {"problem": "20 - 10", "expect": 10, "difficulty": 1},
      {"problem": "15 - 6", "expect": 9, "difficulty": 1},            
      {"problem": "3 * 4", "expect": 12, "difficulty": 2},
      {"problem": "3 * 3", "expect": 9, "difficulty": 2},
      {"problem": "5 * 4", "expect": 20, "difficulty": 2},
      {"problem": "12 / 2", "expect": 6, "difficulty": 3},
      {"problem": "8 / 2", "expect": 4, "difficulty": 3},
      {"problem": "5 / 5", "expect": 1, "difficulty": 3},
      {"problem": "20 + (20 * 2)", "expect": 60, "difficulty": 4},
      {"problem": "(144 / 2) - 30", "expect": 42, "difficulty": 4},
    ];

  var max_difficulty = Math.max.apply(Math,problems.map(function(o){return o.difficulty;}))
  var min_difficulty = Math.min.apply(Math,problems.map(function(o){return o.difficulty;}))

  function findByDifficulty(difficulty){
    var result = $.grep(problems, function(e){ return e.difficulty == difficulty; });

    if (result.length == 0) {
      findByDifficulty(difficulty-1);
    } else if (result.length == 1) {
      return result[0];
    } else {
      return result[Math.floor(Math.random() * result.length)];
    }
  }

  function generateProblem(state, grade) {
    if(state){
      difficulty = state.difficulty;
    }else{
      difficulty = 0;
    }

    if(grade){
      if(grade.correctness == "correct"){
        if(difficulty<max_difficulty){
          difficulty ++;
        }
      }else{
        if(difficulty>min_difficulty){
          difficulty --;
        }
      }
    }

    problem = findByDifficulty(difficulty);    

    return problem;
  } 

  return {
    generateProblem: generateProblem
  };          
}());