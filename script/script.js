$(document).ready(function() {
    cretaeStopwatch();
    let inner = $(".inner");
    let plate = $("#plate");
    let opacityTableNumber = 0.2;
    let disabledMoney = false;
    let red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

    function cretaeStopwatch() {

        let stopWatch = 59;
        let stopWatchDiv = $('.stopWatch');
        let stopWatchProcessRight = $('.stopWatchProcessRight');
        let stopWatchProcessLeft = $('.stopWatchProcessLeft');
        let rotateSize = 0;
        let heightBorder = '84px';
        let colorArrow = '#1383BF';
        let cretaeDiv;
        let stopWatchNumber = $('#stopWatchNumber');
        let lastDataArray = [];
        let lastNumberColorArray = [];

        setInterval(function() {
            cretaeArrow();
        }, 500)

        function cretaeArrow() {

            processConditions();
            setInterval(function() {
                stopWatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803', })
            }, 900)

            appendArrow();
            createArrowStyle();
            stopWatchNumber.text(stopWatch--);
            rotateSize += 6;
        }

        function processConditions() {
            if (rotateSize === 354) {
                newStart();
                spinSharik(lastDataArray, lastNumberColorArray);
                opacityTableNumber = 0.2;
                disabledMoney = false;
            } else if (rotateSize === 300) {
                colorArrow = 'red';
                stopWatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803' });
                deleteSharik();
                opacityTableNumber = 0;
                disabledMoney = true;
            } else if (rotateSize === 264 || rotateSize === 270 || rotateSize === 276 || rotateSize === 282 || rotateSize === 288 || rotateSize === 294) {
                stopWatchDiv.css({ 'box-shadow': '1px 1px 15px 10px white', })
            } else if (rotateSize > 10) {
                heightBorder = '105px';
            }
        }

        function newStart() {
            stopWatchProcessRight.empty();
            stopWatchProcessLeft.empty();
            colorArrow = '#1383BF';
            heightBorder = '84px';
            rotateSize = 0;
            stopWatch = 59;
        }

        function createArrowStyle() {
            $(`#arrow${rotateSize}`).css({
                'position': 'absolute',
                'margin-top': `-5px`,
                'border': `4px solid ${colorArrow}`,
                'height': `${heightBorder}`,
                'background-color': `${colorArrow}`,
                'transform': `rotate(${rotateSize}deg)`,
            })
        }

        function appendArrow() {
            cretaeDiv = `<div id="arrow${rotateSize}"></div>`;
            if (rotateSize <= 180) {
                stopWatchProcessRight.append(cretaeDiv);
            } else {
                stopWatchProcessLeft.append(cretaeDiv);
                $(`#arrow${rotateSize}`).css({ 'left': '48px', })
            }
        }
    }

    function spinSharik(lastDataArray, lastNumberColorArray) {

        plate.css("animation-play-state", "running");
        let randomNumber = Math.floor(Math.random() * 36),
            color = null;
        inner
            .attr("data-spinto", randomNumber)
            .find("li:nth-child(" + randomNumber + ") input")
            .prop("checked", "checked");
        $(this).hide();

        getRouletteNumber(randomNumber, lastDataArray, lastNumberColorArray);
    }

    function getRouletteNumber(randomNumber, lastDataArray, lastNumberColorArray) {
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

            createLastData(randomNumber, color, lastDataArray, lastNumberColorArray);
        }, 9000);
    }

    function createLastData(number, color, lastDataArray, lastNumberColorArray) {
        $('.lastDataNumber').empty();
        lastNumberColorArray.push(color);
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