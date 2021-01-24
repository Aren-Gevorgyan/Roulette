$(document).ready(function() {
    let inner = $(".inner");
    let plate = $("#plate");
    let opacityTableNumber = 0.2;
    let disabledMoney = false;
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

        async function processConditions(time) {
            if (time === 60) {
                spinSharik(lastDataArray);
                opacityTableNumber = 0.2;
                disabledMoney = false;
                $("polyline").css({ 'stroke': '#007bff' });
                await document.getElementById('audio').play();
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
    bindClickTableNumber();

    let getChips;
    let setChips = false;
    let leftChipNumber0 = 1;

    $('#tableNumber0').click(function() {
        if (setChips) {
            $(this).append(`<div id='setMoney${getChips} '
                value='${getChips}'
                style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChipNumber0++}px></div>`);
        }
    })

    function bindHoverMoneyTable() {
        for (let i = 0; i <= 8; i++) {
            $(`#money${i}`).click(function() {
                deleteBorderFromMoney();
                getChips = $(this).attr('value')
                setChips = true;
                $(this).addClass('borderMoney');
            })
        }
    }

    function deleteBorderFromMoney() {
        for (let j = 1; j <= 8; j++) {
            $(`#money${j}`).removeClass('borderMoney').click(disabledMoney);
        }
    }

    function bindClickTableNumber() {
        let leftChip = 1;
        for (let i = 0; i <= 36; i++) {

            $(`#tableNumber${i}`).click(function() {
                if (setChips) {
                    $(this).css({ 'background-color': '', 'opacity': '1' });
                    $(this).append(`<div id='setMoney${getChips} '
                        value='${getChips}'
                        style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChip++}px'></div>`);
                }
            })
        }
    }

    $('#firstLine').click(function() {
        setOpacityLine(1, opacityTableNumber, this);
    })

    $('#secondLine').click(function() {
        setOpacityLine(2, opacityTableNumber, this);
    })

    $('#thirdLine').click(function() {
        setOpacityLine(3, opacityTableNumber, this);
    })

    let leftChipLine = 1;

    function setOpacityLine(numberChild, opacity, $this) {

        $('.tableNumberContainer > div').children(`:nth-child(${numberChild})`).empty();
        $('.tableNumberContainer > div').children(`:nth-child(${numberChild})`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
        $($this).css({ 'background-color': '', 'opacity': '1' });
        if (setChips) {
            $($this).append(`<div id='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChipLine++}px'></div>`);
        }
    }

    $('#_1st12').click(function() {
        clickFourOrEighLine(1, 12, opacityTableNumber, this)
    })

    $('#_2en12').click(function() {
        clickFourOrEighLine(13, 24, opacityTableNumber, this)
    })

    $('#_3rd12').click(function() {
        clickFourOrEighLine(25, 36, opacityTableNumber, this)
    })

    $('#_1to18').click(function() {
        clickFourOrEighLine(1, 18, opacityTableNumber, this)

    })

    $('#_19to36').click(function() {
        clickFourOrEighLine(19, 36, opacityTableNumber, this)
    })

    let leftChipFourLine = 1;

    function clickFourOrEighLine(startNumber, sizeNumber, opacity, $this) {
        let leftChip = 1;
        for (let i = startNumber; i <= sizeNumber; i++) {
            $(`#tableNumber${i}`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
            $(`#tableNumber${i}`).empty();
        }
        if (setChips) {
            $($this).append(`<div id='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChipFourLine++}px'></div>`);
        }

    }

    $('#even').click(function() {
        clickEvenOrOdd(2, opacityTableNumber, this);
    })

    $('#odd').click(function() {
        clickEvenOrOdd(1, opacityTableNumber, this);
    })

    let leftChipEven = 1;

    function clickEvenOrOdd(startNumber, opacity, $this) {
        let pairNumber = startNumber;
        for (let i = 0; i <= 18; i++) {
            $(`#tableNumber${pairNumber}`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
            $(`#tableNumber${pairNumber}`).empty();
            pairNumber += 2;
        }

        if (setChips) {
            $($this).append(`<div id='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChipEven++}px'></div>`);
        }
    }

    $('#highlightColorRed').click(function() {
        clickRedOrBlack('red', opacityTableNumber, this)
    })

    $('#highlightColorBlack').click(function() {
        clickRedOrBlack('black', opacityTableNumber, this)
    })

    let leftChipRed = 1;

    function clickRedOrBlack(color, opacity, $this) {
        $(`.${color}`).empty();
        $(`.${color}`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
        if (setChips) {
            $($this).append(`<div id='setMoney${getChips} '
                    value='${getChips}'
                    style ='background-image: url("../images/chip${getChips}.png"); left: ${leftChipRed++}px'></div>`);
        }
    }

});