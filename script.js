
function randomRange(start,end)
{
    range = end - start;
    return Math.floor(Math.random()*range+start);
}

function randomOf4()
{
    return randomRange(1,5)
}
function colorToNum(color)
{
    switch(color)
    {
        case "blue":
            return 1;
        case "yellow":
            return 2;
        case "red":
            return 3;
        case "green":
            return 4;
    }
}

function numToColor(n)
{
    switch(n)
    {
        case 1:
            return "blue";
        case 2:
            return "yellow";
        case 3:
            return "red";
        case 4:
            return "green";
        }
    }
    
    function flash(color)
    {
        $("#"+color).addClass("flash");
        setTimeout(function(){$("#"+color).removeClass("flash");}, 150);
    }
    
    function startGame() {
        if (!game) {  // Only create the game instance once
            game = new Game();
            game.levelUp();
            console.log("start");
        }
    }

    class Game
    {
        level = 0;
    current = 0;
    flow  = [];
    notLost = true;
    
    constructor() {}
        
    levelUp()
    {
        var r = randomOf4();
        flash(numToColor(r));
        var a = new Audio(`sounds/${numToColor(r)}.mp3`);
        a.play();
        this.flow.push(r);
        this.level += 1;
        this.current = 0;
        console.log(this.flow);
        $("h2").html("level "+this.level);
    }
        
    userInput(color)
    {
        console.log(color,this.flow[this.current] === color);
        if(this.flow[this.current] === colorToNum(color))
        {
            this.current+=1;
            var a = new Audio(`sounds/${color}.mp3`);
            a.play();
            if(this.current==this.level) 
            {
                setTimeout(() => this.levelUp(), 300);
            }
        }
        else
        {
            var a = new Audio("sounds/"+"wrong"+".mp3");
            a.play();
            console.log("lost")
            this.flow = [];
            this.level = 0;
            this.current = 0;
            setTimeout(() => this.levelUp(), 300);
        }
    }
}

var game;
$("html").on("keydown", startGame);
$("html").on("click", startGame);



    console.log("start");
    $("div.container div.btn").on("click",function(evt)
    {
        if(game)
        {
            color = evt.target.id;
            game.userInput(color);
            flash(color);
        }
    });

