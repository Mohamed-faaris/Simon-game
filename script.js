
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


class Game
{
    level = 0;
    current = 0;
    flow  = [];
    notLost = true;
    
    constructor() {}
        
    levelUp()
    {
        this.flow.push(randomOf4());
        this.level += 1;
        this.current = 0;
        console.log(this.flow);
    }
        
    userInput(color)
    {
        console.log(color,this.flow[this.current] === color);
        if(this.flow[this.current] === colorToNum(color))
        {
            this.current+=1;
            var a = new Audio("sounds/"+color+".mp3");
            a.play();
            if(this.current==this.level) 
            {
                this.levelUp();
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
            this.levelUp();
        }
    }
}

var game = new Game();
game.levelUp();
$("div.container div.btn").on("click",function(evt)
{
    game.userInput(evt.target.id);
});
