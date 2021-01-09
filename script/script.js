$(document).ready(function(){
    
    function cretaeTime(){
        
        let time = 59;
        let timeDiv = $('#time');
        let timeProcessRight = $('.timeProcessRight');
        let timeProcessLeft = $('.timeProcessLeft');  
        let rotateSize = 0;
        let heightBorder = '90px';
        let colorArrow = 'cadetblue';
        let cretaeDiv;
        let timeNumber = $('#timeNumber');
        
        setInterval(function(){
            cretaeArrow();
        }, 1000)

        function cretaeArrow(){

            processConditions();
            setInterval(function(){
                timeDiv.css({'box-shadow': '1px 1px 15px 10px #411F0C',})
            }, 900)

            appendArrow();
            createArrowStyle();
            timeNumber.text(time--);
            rotateSize+=6;
        }

        function  processConditions(){
            if(rotateSize === 354){
                newStart()
            }else if (rotateSize === 294){
               colorArrow = 'red';
               timeDiv.css({'box-shadow': '1px 1px 15px 10px #411F0C',})
            } else if (rotateSize === 264 || rotateSize === 270 || rotateSize === 276 || rotateSize === 282 || rotateSize === 288){
               timeDiv.css({'box-shadow': '1px 1px 15px 10px white',})   
            }else if (rotateSize > 10){
               heightBorder = '105px';
            }
        }

        function newStart(){
            timeProcessRight.empty();
            timeProcessLeft.empty();
            colorArrow = 'cadetblue';
            heightBorder =  '90px';
            rotateSize = 0;
            time = 59;
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
                timeProcessRight.append(cretaeDiv);
            }else{
                timeProcessLeft.append(cretaeDiv);
                $(`#arrow${rotateSize}`).css({'left': '48px',})
            }  
        }
    }

    cretaeTime();

})