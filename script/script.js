$(document).ready(function() {
    cretaeStopwatch();
    let inner = $(".inner");
    let spin = $("#spin");
    let reset = $("#reset");
    let data = $(".data");
    let mask = $(".mask");
    let plate = $("#plate");
    let maskDefault = "Place Your Bets";
    let timer = 9000;
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
        var randomNumber = Math.floor(Math.random() * 36),
            color = null;
        inner
            .attr("data-spinto", randomNumber)
            .find("li:nth-child(" + randomNumber + ") input")
            .prop("checked", "checked");
        $(this).hide();
        reset.addClass("disabled").prop("disabled", "disabled").show();

        $(".placeholder").remove();

        setTimeout(function() {
            mask.text("No More Bets");
        }, timer / 2);

        setTimeout(function() {
            mask.text(maskDefault);
        }, timer + 500);

        setTimeout(function() {
            plate.css("animation-play-state", "paused");
            reset.removeClass("disabled").prop("disabled", "");

            if ($.inArray(randomNumber, red) !== -1) {
                color = "red";
            } else {
                color = "black";
            }
            if (randomNumber == 0) {
                color = "green";
            }

            $(".result-number").text(randomNumber);
            $(".result-color").text(color);
            $(".result").css({ "background-color": "" + color + "" });
            data.addClass("reveal");
            inner.addClass("rest");

            createLastData(randomNumber, color, lastDataArray, lastNumberColorArray);
        }, timer);

    }

    function createLastData(number, color, lastDataArray, lastNumberColorArray) {
        $('.lastDataNumber').empty();
        console.log(color);
        lastNumberColorArray.push(color);
        lastDataArray.push({ number, color });

        if (lastDataArray.length > 10) {
            lastDataArray.shift();
        }

        lastDataArray.forEach(value => {
            console.log(value);
            let createDiv = `<div class="numberData col-12" style="background-color: ${value.color}">${value.number}</div>`
            $('.lastDataNumber').append(createDiv);
        })

        // lastNumberColorArray.forEach(value => {
        //     $('.numberData').css({ 'background-color': value });
        // })
    }

    function deleteSharik() {
        inner.attr("data-spinto", "").removeClass("rest");
        $(this).hide();
        spin.show();
        data.removeClass("reveal");
    }


    plate.css("animation-play-state", "paused");
    reset.hide();

    mask.text(maskDefault);

    spin.on("click", function() {

    });

    reset.on("click", function() {
        inner.attr("data-spinto", "").removeClass("rest");
        $(this).hide();
        spin.show();
        data.removeClass("reveal");
    });

    // so you can swipe it too
    var myElement = document.getElementById("plate");
    var mc = new Hammer(myElement);
    mc.on("swipe", function(ev) {
        if (!$reset.hasClass("disabled")) {
            if (spin.is(":visible")) {
                spin.click();
            } else {
                $reset.click();
            }
        }
    });

});