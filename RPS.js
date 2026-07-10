function RockPaperScissors(){
    const contents = document.querySelectorAll(".gridBox");
    const choiceSection = document.querySelector(".gridBox.buttons")
    const roundNum = document.querySelector("h2");
    const formatButtons = document.querySelectorAll(".button.formats");
    const choiceButtons = document.querySelectorAll(".button.choices");
    const handIconWrappers = document.querySelectorAll(".imgWrapper");
    const defaultIcons = document.querySelectorAll(".questionMark");
    const playerScoreDisplay = document.querySelector("#playerScore");
    const computerScoreDisplay = document.querySelector("#computerScore");
    const winCounters = document.querySelectorAll(".winCount");
    const lossCounters = document.querySelectorAll(".lossCount");
    const finalScore = document.querySelector(".finalScore");
    const finalScoreDisplay = document.querySelector(".finalScoreDisplay");
    const newGame = document.querySelector(".button.newGame");
    const onOffBtns = document.querySelectorAll(".onOffBtns");
    const onOff = document.querySelectorAll(".onOff");

    let format = 3;
    let computerChoice = "";
    let playerChoice = "";
    let counter = 0;
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;
    let wins = [0, 0];
    let losses = [0, 0];

    formatButtons[0].classList.add("active");
    onOffBtns[0].classList.add("active");
    onOff[0].classList.add("active");

    formatButtons.forEach((button, index) => {
        button.addEventListener("click", event => {
            reset();
            formatButtons.forEach(b => b.classList.remove("active"));
            onOffBtns.forEach(element => {
                element.classList.remove("active");
                onOff.forEach(element => element.classList.remove("active"));
            })
            console.log(onOffBtns[index]);
            onOffBtns[index].classList.add("active");
            onOff[index].classList.add("active");
            format = button.dataset.number;
            event.currentTarget.classList.add("active");
        })
    });

    function getComputerChoice(){
        const randomNum = Math.floor(Math.random() * 3);
        if(randomNum === 0) computerChoice = "rock";
        else if(randomNum === 1) computerChoice = "paper";
        else if(randomNum === 2) computerChoice = "scissors";
        else{
            console.error("Unexpected outcome at getComputerChoice()");
            throw new Error("Error at getComputerChoice");
        }
    }

    function updateDisplay(item, itemDestination){
        itemDestination.textContent = item;
    }

    function determiner(pHand, cHand){
        if(pHand === cHand) return 0;

        const wins = {rock: "scissors", paper: "rock", scissors: "paper"};
        
        return wins[pHand] === cHand? 2 : 1;
    }

    function reset(){
        format = 3;
        counter = 0;
        playerScore = 0;
        computerScore = 0;
        draws = 0;
        for(let i = 0; i < 2; i++){
            wins[i] = 0;
            losses[i] = 0;
        }
        formatButtons.forEach(b => b.classList.remove("active"));
        onOffBtns.forEach(b => b.classList.remove("active"));
        onOff.forEach(b => b.classList.remove("active"));
        formatButtons[0].classList.add("active");
        onOffBtns[0].classList.add("active");
        onOff[0].classList.add("active");
        document.querySelectorAll(".scoreBoardBtns")?.forEach(btn => btn.remove());
        defaultIcons.forEach(element => element.classList.remove("inactive"));
        updateDisplay("", computerScoreDisplay);
        updateDisplay("", playerScoreDisplay);
        winCounters.forEach((counter, index) => updateDisplay("", counter));
        lossCounters.forEach((counter, index) => updateDisplay("", counter));
        updateDisplay("", roundNum);
    }

    function fetchImage(choice, destination){
        let image = document.createElement("img");
        image.classList.add("scoreBoardBtns")
        switch(choice){
            case "rock":
                image.src = "rock.png";
                image.alt = "rock icon image";
                break;
            case "paper":
                image.src = "paper.png";
                image.alt = "paper icon image";
                break;
            case "scissors":
                image.src = "scissors.png";
                image.alt = "scissors icon image";
                break;
            default:
                image.src = "psyduck.gif";
                image.alt = "you have an error"
                break;
        }
        destination.querySelector(".scoreBoardBtns")?.remove();
        destination.appendChild(image);
    }

        choiceButtons.forEach(button =>{
            button.addEventListener("click", event =>{
                let hoverImage = document.createElement("img");
                hoverImage.src = `${event.currentTarget.dataset.value}.png`;
                hoverImage.classList.add("hoverImage");
                event.currentTarget.appendChild(hoverImage);

                hoverImage.addEventListener("animationend", ()=> {   //Note: button.addEvent here is incorrect cuz as more clicks pile up there will be various eventlisteners
                    hoverImage.remove();
                });
            });
        })

    choiceButtons.forEach((button, index) => {
        button.addEventListener("click", event => {
            button.classList.toggle("active");
            let outcome = 0;
            counter++;
            roundNum.textContent = counter;
            playerChoice = event.currentTarget.dataset.value;
            getComputerChoice();
            defaultIcons.forEach(element => element.classList.add("inactive"));
            fetchImage(playerChoice, handIconWrappers[0]);
            fetchImage(computerChoice, handIconWrappers[1]);
            outcome = determiner(playerChoice, computerChoice);

            if(outcome === 0){
                draws++;
            }
            else if(outcome === 1){
                computerScore++;
                wins[1]++;
                losses[0]++;
            }
            else if(outcome === 2){
                playerScore++;
                wins[0]++;
                losses[1]++;
            }
            else{
                throw new Error("Unexpected error at determiner");
            }

            updateDisplay(computerScore, computerScoreDisplay);
            updateDisplay(playerScore, playerScoreDisplay);
            winCounters.forEach((counter, index) => updateDisplay(wins[index], counter));
            lossCounters.forEach((counter, index) => updateDisplay(losses[index], counter));

            if(counter == format){
                contents.forEach(content => content.classList.add("inactive"));
               
                finalScore.classList.add("active");
                if(playerScore == computerScore){
                    finalScoreDisplay.textContent = "Draw";
                    finalScore.style.backgroundColor = "yellow";

                }
                else if(playerScore > computerScore){
                    finalScoreDisplay.textContent = `You've won the game ${playerScore}-${computerScore}-${draws}. Congrats`;
                    finalScore.style.backgroundColor = "green";
                }
                else{
                    finalScoreDisplay.textContent = `You've lost the game ${playerScore}-${computerScore}-${draws}.`;
                    finalScore.style.backgroundColor = "tomato";
                }
            }
        })
    });

    newGame.addEventListener("click", event => {
        reset();
        updateDisplay(0, roundNum);
        event.target.closest(".finalScore").classList.remove("active");
        contents.forEach(content => content.classList.remove("inactive"));
        
    });
   
}

RockPaperScissors();
