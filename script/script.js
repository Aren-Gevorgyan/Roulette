$(document).ready(function() {
    cretaeStopwatch();
    let inner = $(".inner");
    let plate = $("#plate");
    let red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

    function cretaeStopwatch() {

        let stopwatch = 59;
        let stopwatchDiv = $('.stopwatch');
        let stopwatchProcessRight = $('.stopwatchProcessRight');
        let stopwatchProcessLeft = $('.stopwatchProcessLeft');
        let rotateSize = 0;
        let heightBorder = '90px';
        let colorArrow = '#1383BF';
        let cretaeDiv;
        let stopwatchNumber = $('#stopwatchNumber');
        let lastDataArray = [];
        let lastNumberColorArray = [];

        setInterval(function() {
            cretaeArrow();
        }, 1000)

        function cretaeArrow() {

            processConditions();
            setInterval(function() {
                stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803', })
            }, 900)

            appendArrow();
            createArrowStyle();
            stopwatchNumber.text(stopwatch--);
            rotateSize += 6;
        }

        function processConditions() {
            if (rotateSize === 354) {
                newStart();
                spinSharik(lastDataArray, lastNumberColorArray);
            } else if (rotateSize === 294) {
                colorArrow = 'red';
                stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 10px #140803', })
                deleteSharik();
            } else if (rotateSize === 264 || rotateSize === 270 || rotateSize === 276 || rotateSize === 282 || rotateSize === 288 || rotateSize === 2) {
                stopwatchDiv.css({ 'box-shadow': '1px 1px 15px 10px white', })
            } else if (rotateSize > 10) {
                heightBorder = '105px';
            }
        }

        function newStart() {
            stopwatchProcessRight.empty();
            stopwatchProcessLeft.empty();
            colorArrow = '#1383BF';
            heightBorder = '90px';
            rotateSize = 0;
            stopwatch = 59;
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
                stopwatchProcessRight.append(cretaeDiv);
            } else {
                stopwatchProcessLeft.append(cretaeDiv);
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
                color = "red";
            } else {
                color = "black";
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
            let createDiv = `<div class="numberData col-12" style="background-color: ${value.color}">${value.number}</div>`
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
            $(`#money${i}`).mouseover(function() {
                $(this).css({ 'border': '4px solid #41EE05' });
            })
            $(`#money${i}`).mouseout(function() {
                $(this).css({ 'border': 'none' });
            })
        }
    }

    function bindHoverTableNumber(opacity) {
        for (let i = 0; i <= 36; i++) {
            $(`#tableNumber${i}`).mouseover(function() {
                $(this).css({ 'background-color': 'white', 'opacity': `0.2` });
            })
            $(`#tableNumber${i}`).mouseout(function() {
                $(this).css({ 'background-color': 'white', 'opacity': `0` });
            })
        }
    }

    $('#firstLine').mouseover(function() {
        setOpacityLine(1, 0.2, this);
    })

    $('#firstLine').mouseout(function() {
        setOpacityLine(1, 0);
    })

    $('#secondLine').mouseover(function() {
        setOpacityLine(2, 0.2, this);
    })

    $('#secondLine').mouseout(function() {
        setOpacityLine(2, 0);
    })

    $('#thirdLine').mouseover(function() {
        setOpacityLine(3, 0.2, this);
    })

    $('#thirdLine').mouseout(function() {
        setOpacityLine(3, 0);
    })

    function setOpacityLine(numberChild, opacity, $this) {
        $('.tableNumberContainer > div').children(`:nth-child(${numberChild})`).css({ 'background-color': 'white', 'opacity': `${opacity}` });
        $($this).css({ 'background-color': 'white', 'opacity': '0' })
    }

    $('#_1st12').mouseover(function() {
        opacityFourOrEighLine(1, 12, 0.2)
    })

    $('#_1st12').mouseout(function() {
        opacityFourOrEighLine(1, 12, 0)
    })

    $('#_2en12').mouseover(function() {
        opacityFourOrEighLine(13, 24, 0.2)
    })

    $('#_2en12').mouseout(function() {
        opacityFourOrEighLine(13, 24, 0)
    })

    $('#_3rd12').mouseover(function() {
        opacityFourOrEighLine(25, 36, 0.2)
    })

    $('#_3rd12').mouseout(function() {
        opacityFourOrEighLine(25, 36, 0)

    })

    $('#_1to18').mouseover(function() {
        opacityFourOrEighLine(1, 18, 0.2)

    })

    $('#_1to18').mouseout(function() {
        opacityFourOrEighLine(1, 18, 0)

    })

    $('#_19to36').mouseover(function() {
        opacityFourOrEighLine(19, 36, 0.2)
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
        hoverEvenOrOdd(2, 0.2);
    })

    $('#even').mouseout(function() {
        hoverEvenOrOdd(2, 0);
    })

    $('#odd').mouseover(function() {
        hoverEvenOrOdd(1, 0.2);
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
        hoverRedOrBlack('red', 0.2)
    })

    $('#highlightColorRed').mouseout(function() {
        hoverRedOrBlack('red', 0)
    })

    $('#highlightColorBlack').mouseover(function() {
        hoverRedOrBlack('black', 0.2)
    })

    $('#highlightColorBlack').mouseout(function() {
        hoverRedOrBlack('black', 0)
    })

    function hoverRedOrBlack(color, opacity) {
        $(`.${color}`).css({ 'background-color': 'white', 'opacity': `${opacity}` })
    }

});