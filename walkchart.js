$(document).ready(function() {
    "use strict";
    // hold a radarChart reference for future updates
    var radarChart = new Chart(document.getElementById("walkdata"), {
      type: 'line',
      data: {
        labels: ["day1", "day2", "day3", "day4","day5","day6","day7"],
        datasets: [{
          label: "Ideal",
          fill: false,
          borderColor: "rgba(245,96,53)",
          pointBorderColor: "#ff0000",
          pointBackgroundColor: "#ff0000",
          data: [20, 80, 60, 4, 90, 80, 45]
        }, {
          label: "Steps",
          fill: false,
          borderColor: "rgba(245,96,53)",
          pointBorderColor: "#ff0000",
          pointBackgroundColor: "#ff0000",
          data: ['day1', 'day2', 'day3', 'day4','day5','day6','day7']
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
  
    });
    
//    // click handler of the update button
//    $('#update').on('input', function() {
//     getStepsData();
// });
    // click handler of the update button
    function getStepsData() {
      // get new user-selected values
      var day1 = document.getElementById('stday1').value;
      var day2 = document.getElementById('stday2').value;
      var day3 = document.getElementById('stday3').value;
      var day4 = document.getElementById('stday4').value;
      var day5 = document.getElementById('stday5').value;
      var day6 = document.getElementById('stday6').value;
      var day7 = document.getElementById('stday7').value;
      // update chart dataset with new values
      radarChart.data.datasets[1].data[0] = day1;
      radarChart.data.datasets[1].data[1] = day2;
      radarChart.data.datasets[1].data[2] = day3;
      radarChart.data.datasets[1].data[3] = day4;
      radarChart.data.datasets[1].data[4] = day5;
      radarChart.data.datasets[1].data[5] = day6;
      radarChart.data.datasets[1].data[6] = day7;
      // redraw chart
      radarChart.update();
    }
  });
