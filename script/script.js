$(document).ready(function(){
    
    function cretaeStopwatch(){
        
        let stopwatch = 59;
        let stopwatchDiv = $('.stopwatch');
        let stopwatchProcessRight = $('.stopwatchProcessRight');
        let stopwatchProcessLeft = $('.stopwatchProcessLeft');  
        let rotateSize = 0;
        let heightBorder = '90px';
        let colorArrow = 'cadetblue';
        let cretaeDiv;
        let stopwatchNumber = $('#stopwatchNumber');
        
        setInterval(function(){
            cretaeArrow();
        }, 1000)

        function cretaeArrow(){

            processConditions();
            setInterval(function(){
                stopwatchDiv.css({'box-shadow': '1px 1px 15px 10px #411F0C',})
            }, 900)

            appendArrow();
            createArrowStyle();
            stopwatchNumber.text(stopwatch--);
            rotateSize+=6;
        }

        function  processConditions(){
            if(rotateSize === 354){
                newStart()
            }else if (rotateSize === 294){
               colorArrow = 'red';
               stopwatchDiv.css({'box-shadow': '1px 1px 15px 10px #411F0C',})
            } else if (rotateSize === 264 || rotateSize === 270 || rotateSize === 276 || rotateSize === 282 || rotateSize === 288 || rotateSize === 2){
                stopwatchDiv.css({'box-shadow': '1px 1px 15px 10px white',})   
            }else if (rotateSize > 10){
               heightBorder = '105px';
            }
        }

        function newStart(){
            stopwatchProcessRight.empty();
            stopwatchProcessLeft.empty();
            colorArrow = 'cadetblue';
            heightBorder =  '90px';
            rotateSize = 0;
            stopwatch = 59;
        }
        
        function createArrowStyle(){
            $(`#arrow${rotateSize}`).css(
                {
                    'position':'absolute',
                    'margin-top': `-5px`,
                    'border': `4px solid ${colorArrow}`,
                    'height': `${heightBorder}`,
                    'background-color': `${colorArrow}`,
                    'transform': `rotate(${rotateSize}deg)`,
                })
        }

        function appendArrow(){
            cretaeDiv = `<div id="arrow${rotateSize}"></div>`;
            if(rotateSize <= 180){
                stopwatchProcessRight.append(cretaeDiv);
            }else{
                stopwatchProcessLeft.append(cretaeDiv);
                $(`#arrow${rotateSize}`).css({'left': '48px',})
            }  
        }
    }


    function createLastData(number){
        let lastNumber = 4;
        let lastDataArray = [24,25, 26, 28, 29, 30, 31, 32, 33, 34];
        lastDataArray.push(lastNumber);
        lastDataArray.shift();
        lastDataArray.forEach(value => {
            let createDiv = `<div class="numberData col-12">${value}</div>`
            $('.lastDataNumber').append(createDiv);
        })
    }

    cretaeStopwatch();
    createLastData();

})