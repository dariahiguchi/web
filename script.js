var sleepInputElements = Array.from(document.querySelectorAll("[name=sleep]"));
var stepsInputElements = Array.from(document.querySelectorAll("[name=steps]"));
var scoreElement = docuemnt.querySelector("[name=score]");
var imgElement = scoreElement.querySelector("img");
var sleepScores = [];
var stepsScores = [];
var sleepTotalScore = 0;
var stepsTotalScore = 0;

function convertStepsToScore(steps) {
  if(steps >= 0 && steps < 1000) {
    return 2;
  }

  if(steps >= 1000 && steps < 2000) {
    return 1.5;
  }

  if(steps >= 2000 && steps < 4000) {
    return 1;
  }
  
  if(steps >= 4000 && steps < 1000) {
    return 0;
  }

  if(steps >= 6000 && steps < 8000) {
    return -0.3;
  }

  if(steps >= 8000) {
    return -0.5;
  }
};

function convertSleepToScore(steps) {
  if(steps >= 0 && steps < 1000) {
    return 2;
  }

  if(steps >= 1000 && steps < 2000) {
    return 1.5;
  }

  if(steps >= 2000 && steps < 4000) {
    return 1;
  }
  
  if(steps >= 4000 && steps < 1000) {
    return 0;
  }

  if(steps >= 6000 && steps < 8000) {
    return -0.3;
  }

  if(steps >= 8000) {
    return -0.5;
  }
};

sleepInputElements.forEach(function(elem) {
  var resultScore = convertSleepToScore(elem.value);
  sleepScores.push(resultScore);
});

sleepScores.forEach(function(elem) {
  sleepTotalScore = sleepTotalScore + elem;
});

// var inputStepsScore = parseInt(document.patientdata.step.value, 10);
// var stepScore = convertStepsToScore();
// console.log(stepScore);

/*function findTotalSteps(){
  var arr = document.getElementsByName('steps');
  var totsteps=0;
  for(var i=0;i<arr.length;i++){
      if(parseInt(arr[i].value))
          totsteps += parseInt(arr[i].value);
  }
  document.getElementById('total').value = totsteps;
}*/

function calculatePhrScore() {
  var weight = parseInt(document.patientdata.weight.value, 10);
  var height = parseInt(document.patientdata.height.value, 10);
  var ai = parseInt(document.patientdata.ai.value, 10);
  var dd = parseInt(document.patientdata.dd.value, 10);
  var abl = parseInt(document.patientdata.abl.value, 10);
  var tog = parseInt(document.patientdata.tog.value, 10);
  var rbp = parseInt(document.patientdata.rbp.value, 10);
  var dus = parseInt(document.patientdata.dus.value, 10);
  var score = document.patientdata.score;
  var isError = false;
  var arrScores = [];

  if (isNaN(weight) || isNaN(height) || isNaN(steps) || isNaN(sleep) || isNaN(ai) || isNaN(dd) || isNaN(abl) || isNaN(tog)
  || isNaN(rbp)|| isNaN(dus)) {
    alert("Error");
    return;
  }

  //   уверены, что пользователь ввел корректные числа, которые можно расчитать

  if (weight > 0 && height > 0) {
    var finalBmi = weight / (((height / 100) * height) / 100);
    if (finalBmi < 10) {
      // val error
      // alert("Error");
      isError = true;
    }
    if (finalBmi >= 18 && finalBmi <= 23) {
      // val 0
      arrScores.push(0);
    }
    if (finalBmi >= 23 && finalBmi < 25) {
      // val 1
      arrScores.push(0.5);
    }
    if (
      (finalBmi >= 10 && finalBmi < 18) ||
      (finalBmi >= 25 && finalBmi < 27)
    ) {
      arrScores.push(2); // val 2
    }
    if (finalBmi >= 27 && finalBmi < 30) {
      // val 3
      arrScores.push(3);
    }
    if (finalBmi >= 30) {
      // val 4
      arrScores.push(4);
    }
  }
 //   -----------------
// var SCORES = {
//   ai: [{
//     min: 90, max: 180, result: 0
//   },{
//     min: 130, max: 140, result: 0.5
//   }],
//   dd: 
// };

// var ScoresName = {
//   AI: "ai",
//   DD: "dd",
// }

// var someFunc2 = (ai, score) => {
//   SCORES[ai].forEach((elem) => {
//     if (elem.min <= score && score >= elem.max) {
//       return elem.score;
//     }
//   });
// }

// var somefunc = (arr, score) => {
//   switch (arr) {
//     case ScoresName.AI:
//       someFunc2(ScoresName.AI, score);
//       break;
  
//     case ScoresName.DD:
      
//       break;
//     default:
//       break;
//   }
// }

  //  -----------------
if (ai >= 90 && ai < 180) {
  // val -2
  arrScores.push(0);
}
if (ai >= 130 && ai < 140) {
  // val 0
  arrScores.push(0.5);
}
if (ai >= 140 && ai < 150) {
  // val 1
  arrScores.push(1);
}
if (ai >= 150 && ai < 160) {
  // val 1.5
  arrScores.push(1.5);
}
if (ai >= 160) {
  // val 2
  arrScores.push(2);
}
if ( ai < 60) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
//   ----------------- 

if (dd >= 60 && dd < 80) {
  // val -2
  arrScores.push(0);
}
if (dd >= 80 && dd < 99) {
  // val 0
  arrScores.push(0.5);
}
if (dd >= 99 && dd < 190) {
  // val 1
  arrScores.push(1);
}
if (dd >= 190 && dd < 290) {
  // val 1.5
  arrScores.push(1.5);
}
if (dd >= 290) {
  // val 2
  arrScores.push(2);
}
if ( dd < 60) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
//   ----------------- 

if (abl >= 3 && abl < 5.5) {
  // val -2
  arrScores.push(0);
}
if (abl >= 5.5 && abl < 6.3) {
  // val 0
  arrScores.push(0.5);
}
if (abl >= 6.3 && abl < 7) {
  // val 1
  arrScores.push(1);
}
if (abl >= 7 && abl < 8) {
  // val 1.5
  arrScores.push(1.5);
}
if (abl >= 8) {
  // val 2
  arrScores.push(2);
}
if (abl < 3) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
 //   ----------------- 

 if (tog >= 30 && tog < 150) {
  // val -2
  arrScores.push(0);
}
if (tog >= 150 && tog < 250) {
  // val 0
  arrScores.push(0.5);
}
if (tog >= 5 && tog < 30 || tog >= 250 && tog < 350) {
  // val 1
  arrScores.push(1);
}
if (tog >= 350 && tog < 500) {
  // val 1.5
  arrScores.push(1.5);
}
if (tog >= 500) {
  // val 2
  arrScores.push(2);
}
if (tog < 5) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
//   ----------------- 

if (tog >= 30 && tog < 150) {
  // val -2
  arrScores.push(0);
}
if (tog >= 150 && tog < 250) {
  // val 0
  arrScores.push(0.5);
}
if (tog >= 5 && tog < 30 || tog >= 250 && tog < 350) {
  // val 1
  arrScores.push(1);
}
if (tog >= 350 && tog < 500) {
  // val 1.5
  arrScores.push(1.5);
}
if (tog >= 500) {
  // val 2
  arrScores.push(2);
}
if (tog < 5) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
//   ----------------- 

 if (rbp >= 160 && rbp < 220) {
  // val -2
  arrScores.push(0);
}
if (rbp >= 220 && rbp < 340) {
  // val 0
  arrScores.push(0.5);
}
if (rbp >= 340 && rbp < 360 || rbp >= 360 && rbp < 460) {
  // val 1
  arrScores.push(1);
}
if (rbp >= 460 && rbp < 580) {
  // val 1.5
  arrScores.push(1.5);
}
if (rbp >= 580) {
  // val 2
  arrScores.push(2);
}
if (rbp < 160) {
  // vall  "error"
  // alert("Error");
  isError = true;
}
//   ----------------- 

if (dus >= 140) {
  // val -2
  arrScores.push(0);
}
if (dus >= 100 && dus < 140) {
  // val 0
  arrScores.push(0.5);
}
if (dus >= 83 && dus <= 90) {
  // val 1
  arrScores.push(1);
}
if (dus >= 53 && dus < 80) {
  // val 1.5
  arrScores.push(1.5);
}
if (dus >= 45 && dus < 70) {
  // val 2
  arrScores.push(2);
}
if (dus < 10) {
  // vall  "error"
  // alert("Error");
  isError = true;
}

/*   --------------------

  if (steps >= 8000) {
    // val -2
    arrScores.push(0);
  }
  if (steps >= 6000 && steps < 8000) {
    // val 0
    arrScores.push(0);
  }
  if (steps >= 4000 && steps < 6000) {
    // val 1
    arrScores.push(1);
  }
  if (steps >= 2000 && steps < 4000) {
    // val 2
    arrScores.push(2);
  }
  if (steps >= 1000 && steps < 2000) {
    // val 3
    arrScores.push(3);
  }
  if (steps >= 0 && steps < 1000) {
    // val 4
    arrScores.push(4);
  }
  if (steps < 0) {
    // alert("Error");
    isError = true;
  }

  //   -----------------

  if (sleep >= 7 && sleep < 8) {
    // val -2
    arrScores.push(-2);
  }
  if (sleep >= 8) {
    // val 0
    arrScores.push(0);
  }
  if (sleep >= 6 && sleep < 7) {
    // val 1
    arrScores.push(1);
  }
  if (sleep >= 5 && sleep < 6) {
    // val 2
    arrScores.push(2);
  }
  if (sleep >= 4 && sleep < 5) {
    // val 3
    arrScores.push(3);
  }
  if (sleep <= 0 && sleep < 4) {
    // val 4
    arrScores.push(4);
  }
  if (sleep < 0) {
    // vall  "error"
    // alert("Error");
    isError = true;
  }
*/
  //   -------

  if (arrScores.length !== 8 || isError === true) {
    alert("Error");
  } else {
    //     считаем итоговую оценку
    // var totalScore = finalBmi + steps + sleep;
    
    var totalScore = 0;

    for (var i = 0; i < arrScores.length; i++) {
      totalScore = totalScore + arrScores[i];
    }

  /* if (totalScore < -2 || totalScore > 12) {
      alert("Error");
      return;
    }*/

    if (totalScore >= -2 && totalScore <= 0) {
      // val A
      scoreElement.value = "A xxxxxxxxxxxxxx! これはテストです"; // солнышко
      imgElement.src = "display_01.jpg";
    }
    if (totalScore >= 1 && totalScore <= 3) {
      // val B
      scoreElement.value = "B　xxxxxxxxxxxxxx! これはテストです"; // солнышко с облаками
      imgElement.src = "display_02.jpg";
    }
    if (totalScore >= 4 && totalScore <= 6) {
      // val C
      scoreElement.value = "C　xxxxxxxxxxxxxx! これはテストです"; // тучка
      imgElement.src = "display_03.jpg";
    }
    if (totalScore >= 7 && totalScore < 9) {
      // val D
      scoreElement.value = "D　xxxxxxxxxxxxxx! これはテストです"; // дождевая тучка с зонтиком
    }
    if (totalScore >= 10 && totalScore <= 12) {
      // val E
      scoreElement.value = "E　xxxxxxxxxxxxxx! これはテストです"; //дождик
      imgElement.src = "display_05.jpg";
    }
  }

  // ----------------------
};
