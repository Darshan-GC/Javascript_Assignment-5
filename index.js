console.log("Sript Loaded")
console.clear()

$(document).ready(function(){
    
    
    var Heading = $("<h1>").text("The Quiz App").css({
    "font-size": "90px",
    "font-family": "'Caveat Brush', cursive",
    "text-align": "center",
    "color": "#fad744",
    "text-shadow": "2px 5px #2b3252",
    "margin-top": "40px",
    "margin-bottom": "30px"
    })
    $("section").append(Heading)

    var wrapper = $("<div>").addClass("wrapper")
    $("section").append(wrapper);

    var contentSection = $("<form>").addClass("content").attr("id","form_data")
    $(wrapper).append(contentSection)

    var stickyDiv = $("<div>").addClass("slicky_div")
    $(wrapper).append(stickyDiv);
    var score = $("<p>").text("Score:").css(
        {"font-size":"28px",
         "margin":"40px 0 0 30px",
         "font-weight":"500"
        })
    $(stickyDiv).append(score)
    var scoreNum = $("<p>").text("0/5").css(
        {"font-size":"45px",
         "margin":"18px 0 0 30px",
         "font-weight":"600"
        })
    $(stickyDiv).append(scoreNum)
    

    $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(response){
        for( var i=0;i<response.length;i++)
        {    var questionSection = $("<div>").addClass("question_block")
             var devider = $("<div>").addClass("devider")
             $(contentSection).append(questionSection)
             $(contentSection).append(devider)
            var questions = $("<h1>").text("Q"+[i+1]+"."+response[i].question).addClass("question")
            $(questionSection).append(questions)
            for( var j=0;j<response[i].options.length;j++)
            {   var list = $("<li>").css(
                { "list-style-type":"none",
                  "display":"flex",
                  "align-items":"center",
                })
                var text = $("<label>").text(response[i].options[j]).addClass("answer").attr("for",[i]+""+[j]).attr("id","label"+[i]+[j])
                var radio = $("<input type = 'radio' />").addClass("answer1").attr(
                    {"name":"choice"+[i],
                     "value": response[i].options[j],
                     "id": [i]+""+[j],
                     "required":"true"
                })
                
                
                $(questionSection).append(list)
                $(list).append(radio)
                $(list).append(text)
               
                var  rightIcon = $("<i>").addClass("fas fa-check-circle").attr("id","right").css(
                    {
                        "margin":"25px 0px 0px 10px",
                        "color":"#00bf23",
                        "display":"none",
                    
                    }
                )
                var wrongIcon = $("<i>").addClass("fas fa-times-circle").attr("id","wrong"+[i]+[j]).css(
                    {
                        "margin":"25px 0px 0px 10px",
                        "color":"#f04343",
                        "z-index":"100",
                        "display":"none"
                    
                    }
                )
                
                        if( response[i].options[j] == response[i].options[response[i].answer- 1])
                    {   
                        $(list).append(rightIcon)
                    }else{
                        $(list).append(wrongIcon)
                    }
                    
                   
                
            }
          
        }
        // Submit //
        var button = $("<button>").text("Submit").attr("id","button")
        $(contentSection).append(button)
        $("#form_data").submit(function(e){
          e.preventDefault();
            // Display right answer icons //
           $("[id=right]").css({
                "display":"inline-block"
            }) 
            // Calculating Score //
            var value1 = $("input[type=radio][name=choice0]:checked").val();
            var value2 = $("input[type=radio][name=choice1]:checked").val();
            var value3 = $("input[type=radio][name=choice2]:checked").val();
            var value4 = $("input[type=radio][name=choice3]:checked").val();
            var value5 = $("input[type=radio][name=choice4]:checked").val();
            var radioValues = [];
            radioValues.push(value1,value2,value3,value4,value5);
            var count = 0;
            for(var i=0;i<response.length;i++)
            {   if(radioValues[i] == response[i].options[response[i].answer - 1])
                {
                   var count = count+1;
                   
                }
                
            }

            // Updating Score //
            $(scoreNum).text(count+"/5")

            // Disable radio after submit //
            $("input[type=radio][name=choice0]").attr("disabled",true);
            $("input[type=radio][name=choice1]").attr("disabled",true);
            $("input[type=radio][name=choice2]").attr("disabled",true);
            $("input[type=radio][name=choice3]").attr("disabled",true);
            $("input[type=radio][name=choice4]").attr("disabled",true);
            
              
            //  Check and update icons and text color //
            for(var i=0;i<response.length;i++)
            {   
                for(var j=0;j<response[i].options.length;j++)
                {   
                    if( response[i].options[j] == response[i].options[response[i].answer- 1])
                    {
                        $("#label"+[i]+[j]).css({
                            "color":"#00bf23"
                        }) 
                    }
                    
                    
                    if($("#"+[i]+[j]).is(':checked'))
                    {   
                        if( radioValues[i] != response[i].options[response[i].answer- 1])
                    {   
                       { $("#wrong"+[i]+[j]).css({
                            "display":"inline-block"
                        })
                        $("#label"+[i]+[j]).css({
                            "color":"#f04343"
                        })
                       }
                        
                    } 
                
                    }
                    
                }
            }
        })
    })
})