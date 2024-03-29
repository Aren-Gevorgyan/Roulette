$(document).ready(function () {
  let inner = $(".inner");
  let plate = $("#plate");
  let disabledMoney = true;
  let disabledChip = true;
  let red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

  $("#ok").click(function () {
    //create fullscreen
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    //rotate window
    screen.orientation.lock("landscape-primary");
    $(".container").css({ display: "block" });
    $(".fullscreenContainer").css({ display: "none" });
    $("#fullscreen").css({ display: "none" });
    createStopwatch();
  });

  //change to a arrow fun
  let exitHandler = () => {
    // exit fullscreen
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      $(".container").css({ display: "none" });
      $(".fullscreenContainer").css({ display: "block" });
      $("#fullscreen").css({ display: "block" });
      //refresh the page
      location.reload();
    }
  };

  document.addEventListener("fullscreenchange", exitHandler);
  document.addEventListener("webkitfullscreenchange", exitHandler);
  document.addEventListener("mozfullscreenchange", exitHandler);
  document.addEventListener("MSFullscreenChange", exitHandler);

  $("#rebet").click(() => {
    emptyTable();
  });
  $("#bet").click(() => {
    disabledMoney = false;
    disabledChip = false;
  });

  $("#quit").click(() => {
    //exit from fullscreen
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  });

  function createStopwatch() {
    const lastDataArray = [];
    let intervalTime = (60 * 1000) / 360;
    let start = Date.now();
    let radius = parseInt($("#clock").css("width")) / 2;
    let pointNum = "";
    let x, y, radian;
    let previousSeconds = 0;

    //change to a arrow fun
    const interval = () => {
      let oneSecond = 1 * 1000;
      let seconds = (Date.now() - start) / oneSecond;

      getSeconds(seconds);
      newStart(seconds);
      let angle = seconds * 6;
      radian = angle * (Math.PI / 180);
      x = (radius + Math.sin(radian) * radius + 5).toFixed(1);
      y = (radius - Math.cos(radian) * radius + 5).toFixed(1);
      pointNum += x + "," + y + " ";
      $("polyline").attr("points", pointNum);
    };

    setInterval(interval, intervalTime);

    function newStart(seconds) {
      if (seconds >= 60) {
        seconds = 60;
        pointNum = "";
        x, y, radian;
        start = Date.now();
      }
    }

    function getSeconds(seconds) {
      if (Math.floor(seconds) !== Math.floor(previousSeconds)) {
        previousSeconds = seconds;
        let roundsSeconds = Math.floor(seconds);
        let countDownSeconds = 60 - roundsSeconds;
        $("#countdown-number").text(
          countDownSeconds === 0 ? "" : countDownSeconds
        );
        processConditions(countDownSeconds);
      }
    }

    const stopwatchDiv = $(".stopwatch");
    let deleteBet = false;

    function processConditions(time) {
      if (time === 60) {
        isIfSixtySecond();
        deleteBet = true;
      } else if (time === 48) {
        if (deleteBet) {
          emptyTable();
        }
        disabledMoney = false;
      } else if (time === 9) {
        ifRemainedNineSecond();
      } else if (
        time === 10 ||
        time === 11 ||
        time === 12 ||
        time === 13 ||
        time === 14 ||
        time === 15
      ) {
        ifRemainedFifteenSecond();
      }
    }

    function isIfSixtySecond() {
      $("polyline").css({ stroke: "#007bff" });
      spinBall(lastDataArray);
      let musicBoll = document.getElementById("audio");
      musicBoll.play();
      musicBoll.crossOrigin = "anonymous";
    }

    function ifRemainedNineSecond() {
      stopwatchDiv.css({ "box-shadow": "1px 1px 15px 10px #140803" });
      deleteBall();
      disabledMoney = true;
      $("polyline").css({ stroke: "#CC2020" });
    }

    function ifRemainedFifteenSecond() {
      stopwatchDiv.css({ "box-shadow": "1px 1px 15px 7px #7E6B5F" });
      setTimeout(function () {
        stopwatchDiv.css({ "box-shadow": "1px 1px 15px 10px #140803" });
      }, 300);
    }
  }

  function spinBall(lastDataArray) {
    plate.css("animation-play-state", "running");
    let randomNumber = Math.floor(Math.random() * 36),
      color = null;
    inner
      .attr("data-spinto", randomNumber)
      .find("li:nth-child(" + randomNumber + ") input")
      .prop("checked", "checked");
    $(this).hide();

    getRouletteNumber(randomNumber, lastDataArray);
  }

  function getRouletteNumber(randomNumber, lastDataArray) {
    setTimeout(function () {
      plate.css("animation-play-state", "paused");

      if ($.inArray(randomNumber, red) !== -1) {
        color = "#D81F24";
      } else {
        color = "#101110";
      }
      if (randomNumber == 0) {
        color = "green";
      }

      inner.addClass("rest");

      createLastData(randomNumber, color, lastDataArray);
      showWinnerNumber(randomNumber);
    }, 9000);
  }

  function showWinnerNumber(number) {
    let count = 0;
    let borderPx = steBorderPx();
    let winnerNumber = $(`#tableNumber${number}`);

    winnerNumber.css({
      border: `${borderPx}px solid red`,
      "background-color": "",
      opacity: "1",
    });

    setBorderNumbers(count, borderPx, winnerNumber);
    getMoneysFromWinnerNumber(winnerNumber);
  }

  function setBorderNumbers(count, borderPx, winnerNumber) {
    let stopTime = setInterval(() => {
      count++;
      winnerNumber.css({ border: "none" });
      setTimeout(() => {
        winnerNumber.css({ border: `${borderPx}px solid red` });
        if (count === 6) {
          winnerNumber.css({ border: "none" });
          clearInterval(stopTime);
        }
      }, 600);
    }, 400);
  }

  function getMoneysFromWinnerNumber(winnerNumber) {
    let getChildren = winnerNumber.contents();
    let money = parseFloat($("#score").text());
    for (let i = 0; i < getChildren.length; i++) {
      money += parseInt($(getChildren[i]).attr("value"));
    }
    $("#score").text(money);
  }

  function steBorderPx() {
    if (window.innerWidth > 1400) {
      return 4;
    } else if (window.innerWidth > 800) {
      return 3;
    } else {
      return 2;
    }
  }

  function createLastData(number, color, lastDataArray) {
    $(".lastDataNumber").empty();
    lastDataArray.push({ number, color });
    if (lastDataArray.length > 10) {
      lastDataArray.shift();
    }

    lastDataArray.forEach((value) => {
      let createDiv = `<div class="numberData" style="background-color: ${value.color}">${value.number}</div>`;
      $(".lastDataNumber").append(createDiv);
    });
  }

  function deleteBall() {
    inner.attr("data-spinto", "").removeClass("rest");
    $(this).hide();
  }

  plate.css("animation-play-state", "paused");

  bindHoverMoneyTable();
  bindClickTableNumber();

  let getChips;
  let setChips = false;

  function bindHoverMoneyTable() {
    for (let i = 0; i <= 8; i++) {
      $(`#money${i}`).click(function () {
        deleteBorderFromMoney(disabledChip);
        getChips = $(this).attr("value");
        setChips = true;
        $(this).addClass("borderMoney");
        checkTheAvailabilityOfMoney(getChips);
      });
    }
  }

  function checkTheAvailabilityOfMoney(getChips) {
    if (getChips > parseFloat($("#score").text())) {
      disabledMoney = true;
      $("footer > h3").text("THE AMOUNT IS IESS THAN PLANNED");
      $("footer > h3").css({ color: "red" });
    } else {
      disabledMoney = false;
      $("footer > h3").css({ color: "white" });
      $("footer > h3").text("FOR AMUSEMENT ONLYI!");
    }
  }

  function deleteBorderFromMoney(disabledChip) {
    for (let j = 1; j <= 8; j++) {
      $(`#money${j}`).removeClass("borderMoney").click(disabledChip);
    }
  }

  let tableChip = 0;
  let opacity = 0.2;

  function bindClickTableNumber() {
    for (let i = 0; i <= 36; i++) {
      $(`#tableNumber${i}`).click(function () {
        tableChip += 0.5;
        if (setChips && !disabledMoney) {
          $(this).css({ "background-color": "", opacity: "1" });
          $(this).append(`<div class='setMoney${getChips} '
                        value='${getChips}'
                        style ='background-image: url("./images/chip${getChips}.png"); left: ${tableChip}px'></div>`);
        }
      });
    }
  }

  $("#firstLine").click(function () {
    setOpacityLine(1, this);
  });

  $("#secondLine").click(function () {
    setOpacityLine(2, this);
  });

  $("#thirdLine").click(function () {
    setOpacityLine(3, this);
  });

  let leftChipLine = 0;

  function setOpacityLine(numberChild, $this) {
    leftChipLine += 0.5;
    if (setChips && !disabledMoney) {
      deleteChipClick2to1(numberChild, 1);
      $(".tableNumberContainer > div")
        .children(`:nth-child(${numberChild})`)
        .css({ "background-color": "white", opacity: `${opacity}` });
      $("#tableNumber0 > div").css({ "background-color": "", opacity: "1" });
      $($this).css({ "background-color": "", opacity: "1" });
      $($this).append(`<div class='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("./images/chip${getChips}.png"); left: ${leftChipLine}px'></div>`);
    }
  }

  function deleteChipClick2to1(numberChild, deleteLast) {
    let arrayLine = $(".tableNumberContainer > div").children(
      `:nth-child(${numberChild})`
    );
    for (let i = 0; i < arrayLine.length - deleteLast; i++) {
      let element = arrayLine[i];
      $(element).empty();
    }
  }

  $("#_1st12").click(function () {
    clickFourOrEightLine(1, 12, this);
  });

  $("#_2en12").click(function () {
    clickFourOrEightLine(13, 24, this);
  });

  $("#_3rd12").click(function () {
    clickFourOrEightLine(25, 36, this);
  });

  $("#_1to18").click(function () {
    clickFourOrEightLine(1, 18, this);
  });

  $("#_19to36").click(function () {
    clickFourOrEightLine(19, 36, this);
  });

  let leftChipFourLine = 0;

  function clickFourOrEightLine(startNumber, sizeNumber, $this) {
    leftChipFourLine += 0.5;
    if (setChips && !disabledMoney) {
      for (let i = startNumber; i <= sizeNumber; i++) {
        $(`#tableNumber${i}`).css({
          "background-color": "white",
          opacity: `${opacity}`,
        });
        $(`#tableNumber${i}`).empty();
      }
      $($this).append(`<div class='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("./images/chip${getChips}.png"); left: ${leftChipFourLine}px'></div>`);
    }
  }

  $("#even").click(function () {
    clickEvenOrOdd(2, this);
  });

  $("#odd").click(function () {
    clickEvenOrOdd(1, this);
  });

  let leftChipEven = 0;

  function clickEvenOrOdd(startNumber, $this) {
    let pairNumber = startNumber;
    leftChipEven += 0.5;
    if (setChips && !disabledMoney) {
      for (let i = 0; i <= 18; i++) {
        $(`#tableNumber${pairNumber}`).css({
          "background-color": "white",
          opacity: `${opacity}`,
        });
        $(`#tableNumber${pairNumber}`).empty();
        pairNumber += 2;
      }
      $($this).append(`<div class='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("./images/chip${getChips}.png"); left: ${leftChipEven}px'></div>`);
    }
  }

  $("#highlightColorRed").click(function () {
    clickRedOrBlack("red", this);
  });

  $("#highlightColorBlack").click(function () {
    clickRedOrBlack("black", this);
  });

  let leftChipRed = 0;

  function clickRedOrBlack(color, $this) {
    leftChipRed += 0.5;
    if (setChips && !disabledMoney) {
      $(`.${color}`).empty();
      $(`.${color}`).css({
        "background-color": "white",
        opacity: `${opacity}`,
      });
      $($this).append(`<div class='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("./images/chip${getChips}.png"); left: ${leftChipRed}px'></div>`);
    }
  }

  function emptyTable() {
    deleteLineChips();
    $("#tableNumber0").empty();
    $("#_1st12").empty();
    $("#_2en12").empty();
    $("#_3rd12").empty();
    $("#_1to18").empty();
    $("#_19to36").empty();
    $("#even").empty();
    $("#odd").empty();
    $("#highlightColorRed").empty();
    $("#highlightColorBlack").empty();
    leftChipRed = 0;
    leftChipEven = 0;
    leftChipFourLine = 0;
    leftChipLine = 0;
    tableChip = 0;
  }

  function deleteLineChips() {
    for (let i = 1; i < 4; i++) {
      deleteChipClick2to1(i, 0);
      $(".tableNumberContainer > div")
        .children(`:nth-child(${i})`)
        .css({ "background-color": "", opacity: `1` });
    }
  }
});
