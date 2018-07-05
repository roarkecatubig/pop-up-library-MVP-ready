$(document).ready(function () {

    function createPolarChart(positive, negative, neutral) {
    
        var ctx = $("#polarChart");
        var myChart = new Chart(ctx, {
          type: 'polarArea',
          data: {
              labels: ["Positive", "Negative", "Neutral"],
              datasets: [{
                  label: '# of Votes',
                  data: [positive, negative, neutral],
                  backgroundColor: [
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)'
                  ],
                  borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            legend: {
              labels: {
                fontColor: "white",
                fontSize: 20
              }
            }
          }
      });
    };

    function createRadarChart(Anxious, Blissful, Confused, Erotic, Embarassed, Euphoria, Grief, Happy, Hilarious, Intense, Joy, Lonely, Lost, Recurring, Sad, Scared, Stressed, Violent, Wild, Worried) {
        var ctx = $("#radarChart");
        var myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Anxious', 'Blissful', 'Confused', 'Erotic', 'Embarassed', 'Euphoria', 'Grief', 'Happy', 'Hilarious', 'Intense', 'Joy', 'Lonely', 'Lost', 'Recurring', 'Sad', 'Scared', 'Stressed', 'Violent', 'Wild', 'Worried'],
                datasets: [{
                    data: [Anxious, Blissful, Confused, Erotic, Embarassed, Euphoria, Grief, Happy, Hilarious, Intense, Joy, Lonely, Lost, Recurring, Sad, Scared, Stressed, Violent, Wild, Worried],
                    backgroundColor: [
                        'rgba(230, 25, 75, 0.5)',
                        'rgba(60, 180, 75, 0.5)',
                        'rgba(255, 255, 25, 0.5)',
                        'rgba(0, 130, 200, 0.5)',
                        'rgba(245, 130, 48, 0.5)',
                        'rgba(145, 30, 180, 0.5)',
                        'rgba(70, 240, 240, 0.5)',
                        'rgba(240, 50, 230, 0.5)',
                        'rgba(210, 245, 60, 0.5)',
                        'rgba(250, 190, 190, 0.5)',
                        'rgba(0, 128, 128, 0.5)',
                        'rgba(230, 190, 255, 0.5)',
                        'rgba(170, 110, 40, 0.5)',
                        'rgba(255, 250, 200, 0.5)',
                        'rgba(128, 0, 0, 0.5)',
                        'rgba(170, 255, 195, 0.5)',
                        'rgba(128, 128, 0, 0.5)',
                        'rgba(255, 215, 180, 0.5)',
                        'rgba(0, 0, 128, 0.5)',
                        'rgba(255, 255, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(230, 25, 75, 0.5)',
                        'rgba(60, 180, 75, 0.5)',
                        'rgba(255, 255, 25, 0.5)',
                        'rgba(0, 130, 200, 0.5)',
                        'rgba(245, 130, 48, 0.5)',
                        'rgba(145, 30, 180, 0.5)',
                        'rgba(70, 240, 240, 0.5)',
                        'rgba(240, 50, 230, 0.5)',
                        'rgba(210, 245, 60, 0.5)',
                        'rgba(250, 190, 190, 0.5)',
                        'rgba(0, 128, 128, 0.5)',
                        'rgba(230, 190, 255, 0.5)',
                        'rgba(170, 110, 40, 0.5)',
                        'rgba(255, 250, 200, 0.5)',
                        'rgba(128, 0, 0, 0.5)',
                        'rgba(170, 255, 195, 0.5)',
                        'rgba(128, 128, 0, 0.5)',
                        'rgba(255, 215, 180, 0.5)',
                        'rgba(0, 0, 128, 0.5)',
                        'rgba(255, 255, 255, 0.5)'
                    ],
                    pointBackgroundColor: [
                        'rgba(230, 25, 75, 0.5)',
                        'rgba(60, 180, 75, 0.5)',
                        'rgba(255, 255, 25, 0.5)',
                        'rgba(0, 130, 200, 0.5)',
                        'rgba(245, 130, 48, 0.5)',
                        'rgba(145, 30, 180, 0.5)',
                        'rgba(70, 240, 240, 0.5)',
                        'rgba(240, 50, 230, 0.5)',
                        'rgba(210, 245, 60, 0.5)',
                        'rgba(250, 190, 190, 0.5)',
                        'rgba(0, 128, 128, 0.5)',
                        'rgba(230, 190, 255, 0.5)',
                        'rgba(170, 110, 40, 0.5)',
                        'rgba(255, 250, 200, 0.5)',
                        'rgba(128, 0, 0, 0.5)',
                        'rgba(170, 255, 195, 0.5)',
                        'rgba(128, 128, 0, 0.5)',
                        'rgba(255, 215, 180, 0.5)',
                        'rgba(0, 0, 128, 0.5)',
                        'rgba(255, 255, 255, 0.5)'
                    ],
                    pointBorderColor: [
                        'rgba(230, 25, 75, 0.5)',
                        'rgba(60, 180, 75, 0.5)',
                        'rgba(255, 255, 25, 0.5)',
                        'rgba(0, 130, 200, 0.5)',
                        'rgba(245, 130, 48, 0.5)',
                        'rgba(145, 30, 180, 0.5)',
                        'rgba(70, 240, 240, 0.5)',
                        'rgba(240, 50, 230, 0.5)',
                        'rgba(210, 245, 60, 0.5)',
                        'rgba(250, 190, 190, 0.5)',
                        'rgba(0, 128, 128, 0.5)',
                        'rgba(230, 190, 255, 0.5)',
                        'rgba(170, 110, 40, 0.5)',
                        'rgba(255, 250, 200, 0.5)',
                        'rgba(128, 0, 0, 0.5)',
                        'rgba(170, 255, 195, 0.5)',
                        'rgba(128, 128, 0, 0.5)',
                        'rgba(255, 215, 180, 0.5)',
                        'rgba(0, 0, 128, 0.5)',
                        'rgba(255, 255, 255, 0.5)'
                    ]
                }]
            },
            // options: {
            //     legend: {
            //       labels: {
            //         fontColor: "white",
            //         fontSize: 20
            //       }
            //     }
            //   }
        });
    };

    // function displayEmpty() {
    //     chartContainer.empty();
    //     dreamContainer.empty();
    //     var messageH2 = $("<h2>");
    //     messageH2.css({ "text-align": "center", "margin-top": "50px" });
    //     messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new dream.");
    //     dreamContainer.append(messageH2);
    // };

  // This function grabs dreams from the database and updates the view
  function getDreams(privacy_setting) {
    var privacyString = privacy_setting || "";
    if (privacyString) {
      privacyString = "/privacy/" + privacyString;
      console.log("Privacy String:" + privacyString)
    }
    $.get("/my-feed" + privacyString, function (data) {
      console.log("Dreams", data);
      dreams = data;
      if (!dreams || !dreams.length) {
        return;
      }
      else {
        initializeCharts();
      }
    });
  }


  // Getting the initial list of dreams
  // getDreams();
  getDreams();

  // InitializeRows handles appending all of our constructed post HTML inside
  function initializeCharts() {
    // $(".chart-container").empty();
    // Sentiment counters
    var positiveDreams = 0;
    var negativeDreams = 0;
    var neutralDreams = 0;
    // Mood counters
    var anxious = 0;
    var blissful = 0;
    var confused = 0;
    var erotic = 0;
    var embarassed = 0;
    var euphoria = 0;
    var grief = 0;
    var happy = 0;
    var hilarious = 0;
    var intense = 0;
    var joy = 0;
    var lonely = 0;
    var lost = 0;
    var recurring = 0;
    var sad = 0;
    var scared = 0;
    var stressed = 0;
    var violent = 0;
    var wild = 0;
    var worried = 0;
    for (var i = 0; i < dreams.length; i++) {
      console.log(dreams[i])
      if(dreams[i].polarity === "positive") {
        positiveDreams++;
        if (dreams[i].mood === "Anxious") {
            anxious++
        }

        else if (dreams[i].mood === "Blissful") {
            blissful++
        }

        else if (dreams[i].mood === "Confused") {
            confused++
        }

        else if (dreams[i].mood === "Erotic") {
            erotic++
        }

        else if (dreams[i].mood === "Embarassed") {
            embarassed++
        }

        else if (dreams[i].mood === "Euphoria") {
            euphoria++
        }

        else if (dreams[i].mood === "Grief") {
            grief++
        }

        else if (dreams[i].mood === "Happy") {
            happy++
        }

        else if (dreams[i].mood === "Hilarious") {
            hilarious++
        }

        else if (dreams[i].mood === "Intense") {
            intense++
        }

        else if (dreams[i].mood === "Joy") {
            joy++
        }

        else if (dreams[i].mood === "Lonely") {
            lonely++
        }

        else if (dreams[i].mood === "Recurring") {
            recurring++
        }

        else if (dreams[i].mood === "Sad") {
            sad++
        }

        else if (dreams[i].mood === "Scared") {
            scared++
        }

        else if (dreams[i].mood === "Stressed") {
            stressed++
        }

        else if (dreams[i].mood === "Violent") {
            violent++
        }

        else if (dreams[i].mood === "Wild") {
            wild++
        }

        else if (dreams[i].mood === "Worried") {
            worried++
        }
      }

      else if (dreams[i].polarity === "negative") {
        negativeDreams++;
        if (dreams[i].mood === "Anxious") {
            anxious++
        }

        else if (dreams[i].mood === "Blissful") {
            blissful++
        }

        else if (dreams[i].mood === "Confused") {
            confused++
        }

        else if (dreams[i].mood === "Erotic") {
            erotic++
        }

        else if (dreams[i].mood === "Embarassed") {
            embarassed++
        }

        else if (dreams[i].mood === "Euphoria") {
            euphoria++
        }

        else if (dreams[i].mood === "Grief") {
            grief++
        }

        else if (dreams[i].mood === "Happy") {
            happy++
        }

        else if (dreams[i].mood === "Hilarious") {
            hilarious++
        }

        else if (dreams[i].mood === "Intense") {
            intense++
        }

        else if (dreams[i].mood === "Joy") {
            joy++
        }

        else if (dreams[i].mood === "Lonely") {
            lonely++
        }

        else if (dreams[i].mood === "Recurring") {
            recurring++
        }

        else if (dreams[i].mood === "Sad") {
            sad++
        }

        else if (dreams[i].mood === "Scared") {
            scared++
        }

        else if (dreams[i].mood === "Stressed") {
            stressed++
        }

        else if (dreams[i].mood === "Violent") {
            violent++
        }

        else if (dreams[i].mood === "Wild") {
            wild++
        }

        else if (dreams[i].mood === "Worried") {
            worried++
        }
      }

      else if (dreams[i].polarity === "neutral") {
        neutralDreams++;
        if (dreams[i].mood === "Anxious") {
            anxious++
        }

        else if (dreams[i].mood === "Blissful") {
            blissful++
        }

        else if (dreams[i].mood === "Confused") {
            confused++
        }

        else if (dreams[i].mood === "Erotic") {
            erotic++
        }

        else if (dreams[i].mood === "Embarassed") {
            embarassed++
        }

        else if (dreams[i].mood === "Euphoria") {
            euphoria++
        }

        else if (dreams[i].mood === "Grief") {
            grief++
        }

        else if (dreams[i].mood === "Happy") {
            happy++
        }

        else if (dreams[i].mood === "Hilarious") {
            hilarious++
        }

        else if (dreams[i].mood === "Intense") {
            intense++
        }

        else if (dreams[i].mood === "Joy") {
            joy++
        }

        else if (dreams[i].mood === "Lonely") {
            lonely++
        }

        else if (dreams[i].mood === "Recurring") {
            recurring++
        }

        else if (dreams[i].mood === "Sad") {
            sad++
        }

        else if (dreams[i].mood === "Scared") {
            scared++
        }

        else if (dreams[i].mood === "Stressed") {
            stressed++
        }

        else if (dreams[i].mood === "Violent") {
            violent++
        }

        else if (dreams[i].mood === "Wild") {
            wild++
        }

        else if (dreams[i].mood === "Worried") {
            worried++
        }
      }

      else {
        continue
      }
    }
    createPolarChart(positiveDreams, negativeDreams, neutralDreams);
    createRadarChart(anxious, blissful, confused, erotic, embarassed, euphoria, grief, happy, hilarious, intense, joy, lonely, lost, recurring, sad, scared, stressed, violent, wild, worried);
  }
  
});