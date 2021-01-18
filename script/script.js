$(document).ready(function() {
    let inner = $(".inner");
    let plate = $("#plate");
    let opacityTableNumber = 0.2;
    let disabledMoney = false;
    const progressStopwatch = $('.progressStopwatch');
    let red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

    cretaeStopwatch();

    function cretaeStopwatch() {

        const lastDataArray = [];
        let intervalTime = 60 * 1000 / 360;
        let start = Date.now();
        let radius = parseInt($("#clock").css('width')) / 2;
        let pointnum = "";
        let x, y, radian;
        let previusSeconds = 0;

        setInterval(interval, intervalTime);

        function interval() {
            let oneSecond = 1 * 1000;
            let seconds = (Date.now() - start) / oneSecond;

            getSeconds(seconds);
            newStart(seconds);
            let angle = seconds * 6;
            radian = angle * (Math.PI / 180);
            x = (radius + Math.sin(radian) * radius + 5).toFixed(1);
            y = (radius - Math.cos(radian) * radius + 5).toFixed(1);
            pointnum += x + ',' + y + ' ';
            $("polyline").attr('points', pointnum);
        }

        function newStart(seconds) {
            if (seconds >= 60) {
                seconds = 60;
                pointnum = "";
                x, y, radian;
                start = Date.now();
            }
        }

        function getSeconds(seconds) {
            if (Math.floor(seconds) !== Math.floor(previusSeconds)) {
                previusSeconds = seconds;
                let roundsSeconds = Math.floor(seconds);
                let countDownSeconds = 60 - roundsSeconds;
                $('#countdown-number').text(countDownSeconds === 0 ? "" : countDownSeconds);
                processConditions(countDownSeconds);
            }
        }

        const stopwatchDiv = $('.stopwatch');

        function processConditions(time) {
            if (time === 60) {
                spinSharik(lastDataArray);
                opacityTableNumber = 0.2;
                disabledMoney = false;
                $("polyline").css({ 'stroke': '#007bff' });
                document.querySelector('audio').play();
            } else if (time === 9) {
                stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803' });
                deleteSharik();
                opacityTableNumber = 0;
                disabledMoney = true;
                $("polyline").css({ 'stroke': '#CC2020' });
            } else if (time === 10 || time === 11 || time === 12 || time === 13 || time === 14 || time === 15) {
                stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 7px #7E6B5F' })
                setTimeout(function() {
                    stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803' })
                }, 300)
            }
        }
    }

    function spinSharik(lastDataArray) {

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
        setTimeout(function() {
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
        }, 9000);
    }

    function createLastData(number, color, lastDataArray) {
        $('.lastDataNumber').empty();
        lastDataArray.push({ number, color });
        console.log(lastDataArray.length)
        if (lastDataArray.length > 10) {
            lastDataArray.shift();
        }

        lastDataArray.forEach(value => {
            let createDiv = `<div class="numberData" style="background-color: ${value.color}">${value.number}</div>`
            $('.lastDataNumber').append(createDiv);
        })

    }

    function deleteSharik() {
        inner.attr("data-spinto", "").removeClass("rest");
        $(this).hide();
    }

    plate.css("animation-play-state", "paused");

    bindHoverMoneyTable();
    bindHoverTableNumber();

    function bindHoverMoneyTable(opacity) {
        for (let i = 0; i <= 8; i++) {
            $(`#money${i}`).click(function() {
                deleteBorderFromMoney();
                $(this).addClass('borderMoney');
            })
        }
    }

    function deleteBorderFromMoney() {
        for (let j = 1; j <= 8; j++) {
            $(`#money${j}`).removeClass('borderMoney').click(disabledMoney);
        }
    }

    function bindHoverTableNumber() {
        for (let i = 0; i <= 36; i++) {
            $(`#tableNumber${i}`).mouseover(function() {
                $(this).css({ 'background-color': 'white', 'opacity': `${opacityTableNumber}` });
            })
            $(`#tableNumber${i}`).mouseout(function() {
                $(this).css({ 'background-color': 'white', 'opacity': `0` });
            })
        }
    }

    $('#firstLine').mouseover(function() {
        setOpacityLine(1, opacityTableNumber, this);
    })

    $('#firstLine').mouseout(function() {
        setOpacityLine(1, 0);
    })

    $('#secondLine').mouseover(function() {
        setOpacityLine(2, opacityTableNumber, this);
    })

    $('#secondLine').mouseout(function() {
        setOpacityLine(2, 0);
    })

    $('#thirdLine').mouseover(function() {
        setOpacityLine(3, opacityTableNumber, this);
    })

    $('#thirdLine').mouseout(function() {
        setOpacityLine(3, 0);
    })

    function setOpacityLine(numberChild, opacity, $this) {
        $('.tableNumberContainer > div').children(`:nth-child(${numberChild})`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
        $($this).css({ 'background-color': 'white', 'opacity': '0' })
    }

    $('#_1st12').mouseover(function() {
        opacityFourOrEighLine(1, 12, opacityTableNumber)
    })

    $('#_1st12').mouseout(function() {
        opacityFourOrEighLine(1, 12, 0)
    })

    $('#_2en12').mouseover(function() {
        opacityFourOrEighLine(13, 24, opacityTableNumber)
    })

    $('#_2en12').mouseout(function() {
        opacityFourOrEighLine(13, 24, 0)
    })

    $('#_3rd12').mouseover(function() {
        opacityFourOrEighLine(25, 36, opacityTableNumber)
    })

    $('#_3rd12').mouseout(function() {
        opacityFourOrEighLine(25, 36, 0)

    })

    $('#_1to18').mouseover(function() {
        opacityFourOrEighLine(1, 18, opacityTableNumber)

    })

    $('#_1to18').mouseout(function() {
        opacityFourOrEighLine(1, 18, 0)

    })

    $('#_19to36').mouseover(function() {
        opacityFourOrEighLine(19, 36, opacityTableNumber)
    })

    $('#_19to36').mouseout(function() {
        opacityFourOrEighLine(19, 36, 0)
    })

    function opacityFourOrEighLine(startNumber, sizeNumber, opacity) {
        for (let i = startNumber; i <= sizeNumber; i++) {
            $(`#tableNumber${i}`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
        }
    }

    $('#even').mouseover(function() {
        hoverEvenOrOdd(2, opacityTableNumber);
    })

    $('#even').mouseout(function() {
        hoverEvenOrOdd(2, 0);
    })

    $('#odd').mouseover(function() {
        hoverEvenOrOdd(1, opacityTableNumber);
    })

    $('#odd').mouseout(function() {
        hoverEvenOrOdd(1, 0);
    })

    function hoverEvenOrOdd(startNumber, opacity) {
        let pairNumber = startNumber;
        for (let i = 0; i <= 18; i++) {
            $(`#tableNumber${pairNumber}`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
            pairNumber += 2;
        }
    }

    $('#highlightColorRed').mouseover(function() {
        hoverRedOrBlack('red', opacityTableNumber)
    })

    $('#highlightColorRed').mouseout(function() {
        hoverRedOrBlack('red', 0)
    })

    $('#highlightColorBlack').mouseover(function() {
        hoverRedOrBlack('black', opacityTableNumber)
    })

    $('#highlightColorBlack').mouseout(function() {
        hoverRedOrBlack('black', 0)
    })

    function hoverRedOrBlack(color, opacity) {
        $(`.${color}`).css({ 'background-color': 'white', 'opacity': `${opacity}` })
    }

});