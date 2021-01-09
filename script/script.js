$(document).ready(function(){
    
    function cretaeTime(){
        let time = 59;
        let timeProcessRight = $('.timeProcessRight');
        let timeProcessLeft = $('.timeProcessLeft');
        let rotateSize = 0;
        let heightBorder = '90px';
        let colorArrow = 'cadetblue';
        let cretaeDiv;
        let timeNumber = $('#timeNumber');

        let createTime = setInterval(function(){
            cretaeTimeNuber();   
            cretaeArrow();
        }, 1000)

        function cretaeTimeNuber(){
            timeNumber.text(time--);
            if(time < 0){
                time = 60;
            }
        }

        function cretaeArrow(){
            
            appendArrow();
            createArrowStyle();
            if(rotateSize > 350){
                clearInterval(createTime);
                timeProcessRight.empty()
                timeProcessLeft.empty()       
            }else if (rotateSize > 290){
               colorArrow = 'red';
            } else if (rotateSize > 10){
               heightBorder = '105px';
            } 
            rotateSize+=6;
        }
        
        function createArrowStyle(){
            $(`#arrow${rotateSize}`).css(
                {
                    'position':'absolute',
                    'margin-top': `-5px`,
                    'border': `5px solid ${colorArrow}`,
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
                $(`#arrow${rotateSize}`).css({'left': '45px',})
            }  
        }
    }

    cretaeTime();

    // function changeTime(){
    //     let roit = $('.timeProcessRight');
    //     let roit1 = $('.timeProcessLeft');
    //     let count = 0;
    //     let count1 = '90px';
    //     let cretaeDiv;

    //     let a = setInterval(function(){
           
    //         cretaeDiv = `<div id="arrow${count}"></div>`;

    //         if(count <= 180){
    //             roit.append(cretaeDiv);
    //         }else{
    //             roit1.append(cretaeDiv);
    //             $(`#arrow${count}`).css({'left': '45px',})
    //         }  

    //         console.log(count1);

    //         $(`#arrow${count}`).css(
    //             {
    //                 'position':'absolute',
    //                 'margin-top': `-5px`,
    //                 'border': '4px solid cadetblue',
    //                 'height': `${count1}`,
    //                 'background-color': 'cadetblue',
    //                 'transform': `rotate(${count}deg)`,
    //             })



    //         if(count === 360){
    //             clearInterval(a);
    //         }else if (count > 10){
    //            count1 = '105px';
    //         }
    //         count+=6;

    //     }, 1000);
    // }

    // changeTime();
})