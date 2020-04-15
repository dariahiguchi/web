const formElement = document.querySelector(`#score-form`);
const phrInputElements = Array.from(formElement.querySelectorAll(`[data-input=score]`));
const weightInputElement = formElement.querySelector(`#weight`);
const heightInputElement = formElement.querySelector(`#height`);
const sleepInputElements = Array.from(formElement.querySelectorAll(`[name=sleep]`));
const stepsInputElements = Array.from(formElement.querySelectorAll(`[name=steps]`));
const resultScoreElement = document.querySelector(`#score-result`);
const resultScoreDescriptionElement = document.querySelector(`#score-result-description`);
const resultScoreImgElement = document.querySelector(`#score-result-img`);
const DEFAULT_IMG = `img/default.png`; // Дефолтная картинка
const DEFAULT_TEXT_SCORE = `Your score:`; // Описание текста перед оценкой
const DEFAULT_ERROR_BMI = `Вы ввели не верные данные weight и height`; // Описание ошибки
const DESCRIPTION_SCORES = {
  A: `Описание оценки!`, // Описание оценки A
  B: `Описание оценки!`, // Описание оценки B
  C: `Описание оценки!`, // Описание оценки C
  D: `Описание оценки!`, // Описание оценки D
  E: `Описание оценки!`, // Описание оценки E
};
let totalScore = 0;
let lipidPoints = 0;
let sBPPoints = 0;
let dBPoints = 0;
let allInputElements = [];
const ScoresName = {
  BMI: `bmi`,
  SBP: `sbp`,
  DBP: `dbp`,
  HBA1C: `hba1c`,
  TG: `tg`,
  LDL: `ldl`,
  HDL: `hdl`,
  SLEEP: `sleep`,
  STEPS: `steps`,
};
const SCORES = {
  bmi: [
    {min: 10, max: 18, score: 1},
    {min: 18, max: 23, score: 0},
    {min: 23, max: 25, score: 0.5},
    {min: 25, max: 27, score: 1},
    {min: 27, max: 30, score: 1.5},
    {min: 30, max: 999, score: 2},
  ],
  sbp: [
    {min: 60, max: 130, score: 0},
    {min: 130, max: 140, score: 0.5},
    {min: 140, max: 150, score: 1},
    {min: 150, max: 160, score: 1.5},
    {min: 160, max: 999, score: 2},
  ],
  dbp: [
    {min: 30, max: 80, score: 0},
    {min: 80, max: 85, score: 0.5},
    {min: 85, max: 90, score: 1},
    {min: 90, max: 100, score: 1.5},
    {min: 100, max: 999, score: 2},
  ],
  hba1c: [
    {min: 3, max: 5.5, score: 0},
    {min: 5.5, max: 6.3, score: 0.5},
    {min: 6.3, max: 7, score: 1},
    {min: 7, max: 8, score: 1.5},
    {min: 8, max: 999, score: 2},
  ],
  tg: [
    {min: 5, max: 30, score: 1},
    {min: 30, max: 150, score: 0},
    {min: 150, max: 250, score: 0.5},
    {min: 250, max: 350, score: 1},
    {min: 350, max: 500, score: 1.5},
    {min: 500, max: 999, score: 2},
  ],
  ldl: [
    {min: 20, max: 60, score: 1},
    {min: 60, max: 120, score: 0},
    {min: 120, max: 140, score: 0.5},
    {min: 140, max: 160, score: 1},
    {min: 160, max: 180, score: 1.5},
    {min: 180, max: 999, score: 2},
  ],
  hdl: [
    {min: 10, max: 30, score: 2},
    {min: 30, max: 33, score: 1.5},
    {min: 33, max: 36, score: 1},
    {min: 36, max: 40, score: 0.5},
    {min: 40, max: 999, score: 0},
  ],
};
const sleepScores = [
  {min: 0, max: 4, score: 2},
  {min: 4, max: 5, score: 1.5},
  {min: 5, max: 6, score: 1},
  {min: 6, max: 7, score: 0.5},
  {min: 7, max: 8, score: -0.5},
  {min: 8, max: 999, score: -0.3},
];
const stepsScores = [
  {min: 0, max: 1000, score: 2},
  {min: 1000, max: 2000, score: 1.5},
  {min: 2000, max: 4000, score: 1},
  {min: 4000, max: 6000, score: 0},
  {min: 6000, max: 8000, score: -0.3},
  {min: 8000, max: 999999, score: -0.5},
];
const finalScore = [
  {min: -1, max: 0, score: `A`, src: `img/sun.png`, desc: DESCRIPTION_SCORES.A},
  {min: 0, max: 2.5, score: `B`, src: `img/sun-with-clouds.png`, desc: DESCRIPTION_SCORES.B},
  {min: 2.5, max: 6, score: `C`, src: `img/cloud.png`, desc: DESCRIPTION_SCORES.C},
  {min: 6, max: 8, score: `D`, src: `img/before-rain.png`, desc: DESCRIPTION_SCORES.D},
  {min: 8, max: 12.1, score: `E`, src: `img/raining.png`, desc: DESCRIPTION_SCORES.E},
]; // указал max: 12.1 что бы не дописывать логику на 12 включительно.

const generateFakeBmi = (arr) => {
  const weight = weightInputElement.value;
  const height = heightInputElement.value;
  const bmi = weight / (((height / 100) * height) / 100);

  if (bmi < 10) {
    alert(DEFAULT_ERROR_BMI);
  }

  arr.unshift({
    name: ScoresName.BMI,
    value: bmi,
  });
};
const getSSScore = (arr, scores) => {
  let result = 0;

  arr.forEach((inputElement) => {
    const value = parseInt(inputElement.value, 10);
    scores.forEach((score) => {
      if (score.min <= value && value < score.max) {
        result = result + score.score;
      }
    })
  });

  return result / arr.length;
};
const getBPPoints = () => ((sBPPoints * 2 + dBPoints) / 3);
const getScore = (scoreName, score) => {
  let result;

  SCORES[scoreName].forEach((elem) => {
    if (elem.min <= score && score < elem.max) {
      result = elem.score;
    }
  });

  return result;
};
const checkScore = (scoreName, value) => {
  switch (scoreName) {
    case ScoresName.BMI:
      totalScore = totalScore + getScore(ScoresName.BMI, value);
      break;
  
    case ScoresName.SBP:
      sBPPoints = getScore(ScoresName.SBP, value);
      break;

    case ScoresName.DBP:
      dBPoints = getScore(ScoresName.DBP, value);
      break;

    case ScoresName.HBA1C:
      totalScore = totalScore + getScore(ScoresName.HBA1C, value);;
      break;

    case ScoresName.TG:
      lipidPoints = lipidPoints + getScore(ScoresName.TG, value);;
      break;

    case ScoresName.LDL:
      lipidPoints = lipidPoints + getScore(ScoresName.LDL, value);;
      break;
    
    case ScoresName.HDL:
      lipidPoints = lipidPoints + getScore(ScoresName.HDL, value);;
      break;
  }
}

formElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  totalScore = 0;
  allInputElements = [...phrInputElements];
  
  generateFakeBmi(allInputElements);
  allInputElements.forEach((elem) => checkScore(elem.name, elem.value));
  
  totalScore = totalScore + getSSScore(sleepInputElements, sleepScores) + getSSScore(stepsInputElements, stepsScores) + (lipidPoints / 3) + getBPPoints();

  finalScore.forEach((elem) => {
    if (elem.min <= totalScore && totalScore < elem.max) {
      resultScoreElement.textContent = `${DEFAULT_TEXT_SCORE} ${elem.score}`
      resultScoreDescriptionElement.textContent = elem.desc;
      resultScoreImgElement.src = elem.src;
    }
  });
});

formElement.addEventListener(`reset`, () => {
  formElement.reset();
  resultScoreElement.textContent = ``;
  resultScoreDescriptionElement.textContent = ``;
  resultScoreImgElement.src = DEFAULT_IMG;
});

// chart.js
const sleepBlockElement = document.querySelector(`#sleep-block`);
const stepsBlockElement = document.querySelector(`#steps-block`);

const generateChart = (data) => (
  new Chart(document.querySelector(`#${data.ID}`), {
    type: `line`,
    data: {
      labels: [`day1`, `day2`, `day3`, `day4`, `day5`, `day6`, `day7`],
      datasets: [{
        label: data.TEXT,
        fill: false,
        borderColor: `rgba(245,96,53)`,
        pointBorderColor: `#ff0000`,
        pointBackgroundColor: `#ff0000`,
        data: data.DATA,
      }]
    },
    options: {
      title: {
        display: true,
      },
      legend: {
        display: true
      },
      tooltips: {
        enabled: true
      }
    }
  })
);
const generateDataChart = (arr) => (
  arr.map((elem) => (elem.value))
);
const updateChart = (chart, elements) => {
  chart.data.datasets[0].data = generateDataChart(elements);
  chart.update();
};

const SLEEP = {
  ID: `sleepdata`,
  TEXT: `Sleep`,
  DATA: generateDataChart(sleepInputElements),
};
const STEPS = {
  ID: `walkdata`,
  TEXT: `Steps`,
  DATA: generateDataChart(stepsInputElements),
};
const sleepChart = generateChart(SLEEP);
const stepsChart = generateChart(STEPS);

sleepBlockElement.addEventListener(`input`, () => {
  updateChart(sleepChart, sleepInputElements);
});

stepsBlockElement.addEventListener(`input`, () => {
  updateChart(stepsChart, stepsInputElements);
});
