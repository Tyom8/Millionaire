let firstDiv = document.getElementById("firstDiv")
let questBox = document.getElementById("questbox");
let questDiv = document.getElementById("question");
let hallIcon = document.getElementById("hall");
let fiftyIcon = document.getElementById("fifty");
let phoneIcon = document.getElementById("phone");
let answerDiv = document.getElementsByClassName("answerboxik2");
let startGame = document.getElementById("startGame");
let rules = document.getElementById("rules");
let exit = document.getElementById("exit");
let startMenu = document.getElementById("startMenu");
let startDiv = document.getElementById("startDiv");
let allDiv = document.getElementById("allDiv");
let audio = document.getElementById("audio");
let audioFifty = document.getElementById("audioFifty");
let audioCorrect = document.getElementById("audioCorrect");
let audioYellow = document.getElementById("audioYellow");
let audioWrong = document.getElementById("audioWrong");
let audioClick = document.getElementById("audioClick");
let audioloadHall = document.getElementById("audioloadHall");
let answerHall = document.getElementById("answerHall");
let exitMoney = document.getElementById("exitMoney");
let clockDiv = document.getElementById("app");

startGame.addEventListener("click", () => {
    startDiv.style.display = "none";
    allDiv.style.display = "flex";
    let milioner = new Game();
    milioner.start();
    audio.play();
    audio.volume = 0.8;
});

rules.addEventListener("click", () => {
    startGame.style.display = "none";
    rules.style.display = "none";
    exit.style.display = "none";
    startMenu.classList.remove("startMenu");
    startMenu.classList.add("startMenu2");
    let texts = document.createElement("div");
    texts.classList.add("startMenu2");
    texts.innerText = `Խաղը բաղկացած է 10 հարցից,որից 4-ը և 7-ը անձեռնամխելի են:
    Դուք ունեք օգնության 3 հնարավորություն,յուրաքանչ
    յուրից կարող եք օգտվել 1 անգամ:`;
    startMenu.append(texts);
    let rulesOK = document.createElement("button");
    rulesOK.classList.add("ok");
    rulesOK.style.background = "yellow"
    rulesOK.innerText = "OK";
    startMenu.append(rulesOK);
    rulesOK.addEventListener("click", () => {
        startMenu.classList.remove("startMenu2");
        startMenu.classList.add("startMenu");
        startGame.style.display = "flex";
        rules.style.display = "flex";
        exit.style.display = "flex";
        texts.remove();
        rulesOK.remove();
    })
});

function* questionsGenerator(harcer) {
    for (let i = 0; i < harcer.length; i++) {
        const question = harcer[i];
        yield question;
    }
};

function* answersGenerator(patasxan) {
    for (let x = 0; x < patasxan.length; x++) {
        const answers = patasxan[x];
        yield answers;
    }
}

class Game {
    nextQuest;
    nextAnswer;
    oneClick = true;
    id = 0;
    colorId = 0;
    allAnswers = [];
    helpsStopper = true;
    timerSecond = 30000;
    timerHall = false;
    timerCall = false;
    constructor() {
        const questionsArray = [
            new Question("Հարց 1 - Մարդու ուղեղը մոտավորապես քանի՞ տոկոսով է բաղկացած ջրից:", 1),
            new Question("Հարց 2 - Ո՞վ ունի այնպիսի մատնահետք, ինչպիսին քոնն է:", 2),
            new Question("Հարց 3 - Որ քաղաքում է գտնվում կարմիր հրապարակը:", 3),
            new Question("Հարց 4 - Որ թվականին է հայաստանը ընդունել քրիստոնեությունը", 4),
            new Question("Հարց 5 - Ով է Տեսլայի հիմնադիրը:", 5),
            new Question("Հարց 6 - Ո՞ր քաղաքն է ամենախիտ բնակեցվածը աշխարհում:", 6),
            new Question("Հարց 7 - Հետևյալ ֆիլմերից ո՞րում չի նկարահանվել Լեոնարդո Դի Կապրիոն:", 7),
            new Question("Հարց 8 - Ո՞ր պետությունով է հոսում Ամազոն գետը:", 8),
            new Question("Հարց 9 - Քանի՞ սև կետ են ունենում նոր ծնված Դալմատին ցեղատեսակի շները:", 9),
            new Question("Հարց 10 - Ինչպիսի՞ ծրագրավորող է այս խաղի հեղինակը:", 10)
        ];
        const answersArray = [
            new Answer(["80%", "20%", "30%", "70%"]),
            new Answer(["Ոչ ոք", "Մայրդ", "Հայրդ", "Պապիկդ"]),
            new Answer(["Մոսկվա", "Փարիզ", "Երևան", "Լոնդոն"]),
            new Answer(["301", "401", "304", "314"]),
            new Answer(["Իլոն Մասկ", "Ցուկենբեռգ", "Բռեդ Պիտ", "Տիգրան"]),
            new Answer(["Տոկիո", "Լոնդոն", "Նյու Յորք", "Փարիզ"]),
            new Answer(["Ֆոկուս", "Տիտանիկ", "Ուոլ Սթրիթի գայլը", "Բռնիր ինձ,թե կարող ես"]),
            new Answer(["Բրազաիլիա", "Արգենտինա", "Կոլումբիա", "Պերու"]),
            new Answer(["Ոչ մի", "Հինգ", "Տաս", "Քսան"]),
            new Answer(["Ամենալավը", "Գերազանց", "Լավ", "Հիանալի"])
        ];
        this.questions = questionsGenerator(questionsArray);
        this.answers = answersGenerator(answersArray);
    };
    start() {
        this.askQuestion();
        this.clickAnswer();
        this.helps();
        this.exit();
    };
    clickAnswer() {
        for (const option of answerDiv) {
            option.addEventListener("click", () => {
                if (this.oneClick) {
                    this.oneClick = false;
                    this.stugum(option.innerHTML, option);
                    onTimesUp();
                }
            })
        }
    }

    stugum(optionInner, option) {
        if (optionInner === "A." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id < 10
            || optionInner === "B." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id < 10
            || optionInner === "C." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id < 10
            || optionInner === "D." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id < 10) {
            for (let index = 0; index < answerDiv.length; index++) {
                answerDiv[index].style.display = "flex"
            }
            this.colorId++;
            let moneyDiv = document.getElementById([this.colorId]);
            audio.pause();
            audioYellow.play();
            audio.volume = 0.8;
            option.style.background = "yellow";
            setTimeout(() => {
                audioYellow.pause();
                audioYellow.currentTime = 0;
                audioCorrect.play();
                audioCorrect.volume = 0.8;
                const p = setInterval(() => {
                    moneyDiv.style.background = "lime";
                    option.style.background = "lime"
                }, 500);//500
                const d = setInterval(() => {
                    option.style.background = "green";
                    moneyDiv.style.background = "greenyellow";
                }, 1000);//1000
                if (this.nextQuest.value.id > 0 && this.nextQuest.value.id < 4) {
                    audio.play();
                }
                else if (this.nextQuest.value.id > 3 && this.nextQuest.value.id < 7) {
                    audio.src = "./audio/erg 6-8 harc.mp3"
                    audio.currentTime = 0;
                    audio.play();
                } else if (this.nextQuest.value.id > 6 && this.nextQuest.value.id < 9) {
                    audio.src = "./audio/erg 9 - 10 harc.mp3"
                    audio.currentTime = 0;
                    audio.play();
                } else if (this.nextQuest.value.id = 9) {
                    audio.src = "./audio/verjiHarc.mp3"
                    audio.play();
                }
                setTimeout(() => {
                    clearInterval(p);
                    clearInterval(d);
                    option.style.background = "#213c96";
                    moneyDiv.style.background = "greenyellow";
                    this.askQuestion(true)
                }, 3000);//3000
            }, 3000);//2000
        } else if (optionInner === "A." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id === 10
            || "B." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id === 10
            || "C." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id === 10
            || "D." + this.nextAnswer.value.answers[0] && this.nextQuest.value.id === 10) {
            this.colorId++;
            let moneyDiv = document.getElementById([this.colorId]);
            audio.pause();
            audioYellow.play();
            option.style.background = "yellow";
            setTimeout(() => {
                audioYellow.pause();
                audioCorrect.src = "./audio/verjiHarciChishtpatasxan.mp3";
                audioCorrect.play();
                audioCorrect.volume = 0.8;
                const p = setInterval(() => {
                    moneyDiv.style.background = "lime";
                    option.style.background = "lime"
                }, 500);//500
                const d = setInterval(() => {
                    option.style.background = "green";
                    moneyDiv.style.background = "greenyellow";
                }, 1000);//1000
                setTimeout(() => {
                    clearInterval(p);
                    clearInterval(d);
                    option.style.background = "#213c96";
                    moneyDiv.style.background = "greenyellow";
                    this.win();
                }, 3000);//3000
            }, 10000) //2000
        } else {
            this.helpsStopper = false;
            this.gameOver(option);
        }
    };

    askQuestion() {
        setInterval(() => {
            let x = timeCount.innerHTML.slice(2, 4);
            if (x == "01") {
                this.timeOut();
            }
        }, 1000);
        timePassed = 0;
        startTimer();
        
        this.id++;
        document.getElementById([this.id]).style.border = "2px solid greenyellow";
        this.oneClick = true;
        this.nextQuest = this.questions.next();
        console.log(this.nextQuest.value.id);
        questDiv.innerHTML = this.nextQuest.value.question;
        this.nextAnswer = this.answers.next();
        const indexes = [];
        let abcd = ["A.", "B.", "C.", "D."];
        do {
            const i = Math.floor(Math.random() * 4);
            if (indexes.indexOf(i) === -1) {
                indexes.push(i)
            }
        } while (indexes.length < 4);
        for (let i = 0; i < 4; i++) {
            answerDiv[i].innerHTML = abcd[i] + this.nextAnswer.value.answers[indexes[i]];
            this.allAnswers.push(answerDiv[i].innerHTML);
        }

        this.allAnswers = [];
        for (let x = 0; x < 4; x++) {
            if (answerDiv[x].innerHTML === "A." + this.nextAnswer.value.answers[0]
                || answerDiv[x].innerHTML === "B." + this.nextAnswer.value.answers[0]
                || answerDiv[x].innerHTML === "C." + this.nextAnswer.value.answers[0]
                || answerDiv[x].innerHTML === "D." + this.nextAnswer.value.answers[0]) {
                this.allAnswers.unshift(answerDiv[x].innerHTML.slice(0, 2));
            } else {
                this.allAnswers.push(answerDiv[x].innerHTML.slice(0, 2));
            }
        };
    };

    exit() {
        exitMoney.addEventListener("click", () => {
            if (this.helpsStopper) {
                this.helpsStopper = false;
                this.oneClick = false;
                Exit.exit(this.nextQuest.value.id)
            }
        })
    }

    helps() {
        hallIcon.addEventListener("click", () => {
            if (this.helpsStopper) {
                Help.helphall(this.allAnswers)
            }
        }, { once: true });
        fiftyIcon.addEventListener("click", () => {
            if (this.helpsStopper) {
                Help.fifty(this.allAnswers)
            }
        }, { once: true });
        phoneIcon.addEventListener("click", () => {
            if (this.helpsStopper) {
                Help.callFriend(this.nextQuest.value.id)
            }
        }, { once: true })
    }

    timeOut() {
        this.helpsStopper = false;
        this.oneClick = false;
        answerDiv[0].innerHTML = "";
        answerDiv[1].innerHTML = "";
        answerDiv[2].innerHTML = "";
        answerDiv[3].innerHTML = "";
        audio.pause();
        audioWrong.play();
        setTimeout(() => {
            audio.src = "./audio/finish.mp3";
            audio.play();
        }, 2800);
        if (this.nextQuest.value.id < 5) {
            questDiv.innerHTML = "Ձեր ժամանակը սպառվեց,դուք պարտվեցիք և կորցրեցիք ամբողջ գումարը:";
        } else if (this.nextQuest.value.id > 4 && this.nextQuest.value.id < 8) {
            questDiv.innerHTML = "Ձեր ժամանակը սպառվեց,դուք ավարտեցիք խաղը շահելով 50.000 Դրամ:";
        } else if (this.nextQuest.value.id > 7) {
            questDiv.innerHTML = "Ձեր ժամանակը սպառվեց,դուք ավարտեցիք խաղը շահելով 400.000 Դրամ:";
        }
    };

    gameOver(option) {
        this.helpsStopper = false;
        audio.pause();
        audioYellow.play();
        audio.volume = 0.8;
        option.style.background = "yellow";
        setTimeout(() => {
            audioYellow.pause();
            audioYellow.currentTime = 0;
            audioWrong.play();
            audioWrong.volume = 0.8;
            option.style.background = "red";
            if (this.nextQuest.value.id < 5) {
                questDiv.innerHTML = "Դուք պարտվեցիք և կորցրեցիք ամբողջ գումարը:";
            } else if (this.nextQuest.value.id > 4 && this.nextQuest.value.id < 8) {
                questDiv.innerHTML = "Դուք ավարտեցիք խաղը շահելով 50.000 Դրամ:";
            } else if (this.nextQuest.value.id > 7) {
                questDiv.innerHTML = "Դուք ավարտեցիք խաղը շահելով 400.000 Դրամ:";
            }
        }, 3000);
    };

    win() {
        audio.src = "./audio/WIN.mp3";
        audio.play();
        questDiv.classList.remove("question");
        questDiv.classList.add("lastQuestion");
        questDiv.innerHTML = "Դուք հաղթեցիք այս խաղը շահելով 1.000.000 Դրամ:";
        let dollars = document.createElement("img");
        dollars.src = "./pictures/dollars.gif";
        dollars.classList.add("dollars");
        allDiv.append(dollars);
        setTimeout(() => {
            audio.src = "./audio/finish.mp3";
            audio.play();
        }, 10000);
    }
};
class Question {
    constructor(question, id) {
        this.question = question;
        this.id = id;
    }
};
class Answer {
    constructor(answers) {
        this.answers = answers
    }
};

class Exit {
    static exit(id) {
        answerDiv[0].innerHTML = "";
        answerDiv[1].innerHTML = "";
        answerDiv[2].innerHTML = "";
        answerDiv[3].innerHTML = "";
        audio.pause();
        audioWrong.play();
        setTimeout(() => {
            audio.src = "./audio/finish.mp3";
            audio.play();
        }, 2800);
        if (id === 1) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից առանց շահում:"
        } else if (id === 2) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 500 դրամ;"
        } else if (id === 3) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 5.000 դրամ;"
        } else if (id === 4) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 20.000 դրամ;"
        } else if (id === 5) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 50.000 դրամ;"
        } else if (id === 6) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 100.000 դրամ;"
        } else if (id === 7) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 200.000 դրամ;"
        } else if (id === 8) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 400.000 դրամ;"
        } else if (id === 9) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 600.000 դրամ;"
        } else if (id === 10) {
            questDiv.innerHTML = "Դուք հեռացել եք խաղից վերցնելով 800.000 դրամ;"
        }
    }
}

class randomProcents {
    randomNums() {
        let sum = 100;
        let num = [];

        for (let i = 0; i < 3; i++) {
            const n = Math.floor(Math.random() * sum);
            sum -= n;
            num.push(n)
        }
        num.push(sum);

        const findMax = (numbers) => {
            return numbers.reduce(
                (acc, number) => (number > acc ? number : acc),
                numbers[0]
            );
        };

        let mas = [];
        if (findMax(num) === num[0]) {
            mas.push(num[0]);
            mas.push(num[1]);
            mas.push(num[2]);
            mas.push(num[3]);
        } else if (findMax(num) === num[1]) {
            mas.push(num[1])
            mas.push(num[0])
            mas.push(num[2])
            mas.push(num[3])
        } else if (findMax(num) === num[2]) {
            mas.push(num[2]);
            mas.push(num[0])
            mas.push(num[1])
            mas.push(num[3])
        } else if (findMax(num) === num[3]) {
            mas.push(num[3])
            mas.push(num[0])
            mas.push(num[1])
            mas.push(num[2])
        }
        return mas
    };

}

class Help {
    static fifty(answer) {
        let deleteAnswers;
        const randIndex = Math.floor(1 + (Math.random() * answer.length - 1))
        if (randIndex > 0 && randIndex < 4) {
            deleteAnswers = answer.filter(function (f) { return f !== answer[0] && f !== answer[randIndex] });
        } else {
            deleteAnswers = answer.filter(function (f) { return f !== answer[0] && f !== answer[randIndex + 1] });
        };
        audioFifty.play();
        audioFifty.volume = 0.8;
        fiftyIcon.innerText = `////`;
        if (answerDiv[0].innerHTML.slice(0, 2) === deleteAnswers[0]) {
            answerDiv[0].style.display = "none";
        };
        if (answerDiv[0].innerHTML.slice(0, 2) === deleteAnswers[1]) {
            answerDiv[0].style.display = "none"
        };
        if (answerDiv[1].innerHTML.slice(0, 2) === deleteAnswers[0]) {
            answerDiv[1].style.display = "none"
        };
        if (answerDiv[1].innerHTML.slice(0, 2) === deleteAnswers[1]) {
            answerDiv[1].style.display = "none"
        };
        if (answerDiv[2].innerHTML.slice(0, 2) === deleteAnswers[0]) {
            answerDiv[2].style.display = "none"
        };
        if (answerDiv[2].innerHTML.slice(0, 2) === deleteAnswers[1]) {
            answerDiv[2].style.display = "none"
        };
        if (answerDiv[3].innerHTML.slice(0, 2) === deleteAnswers[0]) {
            answerDiv[3].style.display = "none"
        };
        if (answerDiv[3].innerHTML.slice(0, 2) === deleteAnswers[1]) {
            answerDiv[3].style.display = "none"
        }
    };
    static callFriend(id) {
        onTimesUp();
        clockDiv.style.display = "none";
        audioClick.play();
        audio.pause();
        questBox.style.display = "none";
        let hallDiv = document.createElement("div");
        hallDiv.classList.add("hallDiv");
        let loadDiv = document.createElement("div");
        loadDiv.classList.add("loadingDiv");
        hallDiv.append(loadDiv);
        let loading1 = document.createElement("div");
        loading1.classList.add("loading1");
        loadDiv.append(loading1);
        let loading2 = document.createElement("div");
        loading2.classList.add("loading2");
        loadDiv.append(loading2);
        let loading3 = document.createElement("div");
        loading3.classList.add("loading3");
        loadDiv.append(loading3);
        setTimeout(() => {
            audioloadHall.src = "./audio/calling.mp3";
            audioloadHall.currentTime = 1.5;
            audioloadHall.play();
            loading1.style.background = "red"
        }, 600);
        setTimeout(() => {
            loading2.style.background = "blue"
        }, 1200);
        setTimeout(() => {
            loading3.style.background = "#FF7802"
        }, 1800);
        setTimeout(() => {
            loading1.style.background = ""
            loading2.style.background = ""
            loading3.style.background = ""
        }, 2400);
        setInterval(() => {
            setTimeout(() => {
                loading1.style.background = "red"
            }, 600);
            setTimeout(() => {
                loading2.style.background = "blue"
            }, 1200);
            setTimeout(() => {
                loading3.style.background = "#FF7802"
            }, 1800);
            setTimeout(() => {
                loading1.style.background = ""
                loading2.style.background = ""
                loading3.style.background = ""
            }, 2400);
        }, 2400);

        firstDiv.append(hallDiv);

        let ok = document.createElement("button");
        setTimeout(() => {
            let img = document.createElement("img");
            img.src = "./pictures/calllling-removebg-preview.png";
            hallDiv.append(img);
            audioloadHall.pause();
            if (id === 1) {
                answerHall.src = "./audio/callQuestions/quest1.mp3";
            } else if (id === 2) {
                answerHall.src = "./audio/callQuestions/quest2.mp3";
            } else if (id === 3) {
                answerHall.src = "./audio/callQuestions/quest3.mp3";
            } else if (id === 4) {
                answerHall.src = "./audio/callQuestions/quest4.mp3";
            } else if (id === 5) {
                answerHall.src = "./audio/callQuestions/quest5.mp3";
            } else if (id === 6) {
                answerHall.src = "./audio/callQuestions/quest6.mp3";
            } else if (id === 7) {
                answerHall.src = "./audio/callQuestions/quest7.mp3";
            } else if (id === 8) {
                answerHall.src = "./audio/callQuestions/quest8.mp3";
            } else if (id === 9) {
                answerHall.src = "./audio/callQuestions/quest9.mp3";
            } else if (id === 10) {
                answerHall.src = "./audio/callQuestions/quest10.mp3";
            }
            answerHall.play();
            loadDiv.remove();
            setTimeout(() => {
                if (id === 1) {
                    audioFifty.src = "./audio/callAnswers/answer1.mp3";
                } else if (id === 2) {
                    audioFifty.src = "./audio/callAnswers/answer2.mp3";
                } else if (id === 3) {
                    audioFifty.src = "./audio/callAnswers/answer3.mp3";
                } else if (id === 4) {
                    audioFifty.src = "./audio/callAnswers/answer4.mp3";
                } else if (id === 5) {
                    audioFifty.src = "./audio/callAnswers/answer5.mp3";
                } else if (id === 6) {
                    audioFifty.src = "./audio/callAnswers/answer6.mp3";
                } else if (id === 7) {
                    audioFifty.src = "./audio/callAnswers/answer7.mp3";
                } else if (id === 8) {
                    audioFifty.src = "./audio/callAnswers/answer8.mp3";
                } else if (id === 9) {
                    audioFifty.src = "./audio/callAnswers/answer9.mp3";
                } else if (id === 10) {
                    audioFifty.src = "./audio/callAnswers/answer10.mp3";
                }
                audioFifty.play();
            }, 10000);
            setTimeout(() => {
                ok.classList.add("ok");
                ok.innerText = "ԼԱՎ"
                firstDiv.append(ok);
            }, 14000);

            ok.addEventListener("click", () => {
                clockDiv.style.display = "flex";
                startTimer();
                audio.play();
                hallDiv.remove();
                ok.remove();
                questBox.style.display = "flex";
                phoneIcon.style.background = "red";
                phoneIcon.style.borderRadius = "40px";
            })
        }, 8000);
    };
    static helphall(answer) {
        onTimesUp();
        clockDiv.style.display = "none";
        audioClick.play();
        audio.pause();
        let randomProcent = new randomProcents();
        let randomNum = randomProcent.randomNums();
        const hall = [];
        hall.push(`${answer[0]} (${randomNum[0]}%)  `);
        hall.push(`${answer[1]} (${randomNum[1]}%)  `);
        hall.push(`${answer[2]} (${randomNum[2]}%)  `);
        hall.push(`${answer[3]} (${randomNum[3]}%).`);

        questBox.style.display = "none";
        let hallDiv = document.createElement("div");
        hallDiv.classList.add("hallDiv");
        let loadDiv = document.createElement("div");
        loadDiv.classList.add("loadingDiv");
        hallDiv.append(loadDiv);
        let loading1 = document.createElement("div");
        loading1.classList.add("loading1");
        loadDiv.append(loading1);
        let loading2 = document.createElement("div");
        loading2.classList.add("loading2");
        loadDiv.append(loading2);
        let loading3 = document.createElement("div");
        loading3.classList.add("loading3");
        loadDiv.append(loading3);
        setTimeout(() => {
            audioloadHall.play();
            loading1.style.background = "red"
        }, 600);
        setTimeout(() => {
            loading2.style.background = "blue"
        }, 1200);
        setTimeout(() => {
            loading3.style.background = "#FF7802"
        }, 1800);
        setTimeout(() => {
            loading1.style.background = ""
            loading2.style.background = ""
            loading3.style.background = ""
        }, 2400);
        setInterval(() => {
            setTimeout(() => {
                loading1.style.background = "red"
            }, 600);
            setTimeout(() => {
                loading2.style.background = "blue"
            }, 1200);
            setTimeout(() => {
                loading3.style.background = "#FF7802"
            }, 1800);
            setTimeout(() => {
                loading1.style.background = ""
                loading2.style.background = ""
                loading3.style.background = ""
            }, 2400);
        }, 2400);

        firstDiv.append(hallDiv);

        setTimeout(() => {
            audioloadHall.pause();
            answerHall.play();
            loadDiv.remove();
            let ok = document.createElement("button");
            ok.classList.add("ok");
            ok.innerText = "ԼԱՎ"
            firstDiv.append(ok);
            hallDiv.classList.remove("hallDiv");
            hallDiv.classList.add("hallDivNew");
            let hallSmallDiv1 = document.createElement("div");
            hallSmallDiv1.classList.add("hallSmallDiv");
            hallDiv.append(hallSmallDiv1)
            let hallSmallDiv2 = document.createElement("div");
            hallSmallDiv2.classList.add("hallSmallDiv");
            hallDiv.append(hallSmallDiv2)
            let hallSmallDiv3 = document.createElement("div");
            hallSmallDiv3.classList.add("hallSmallDiv");
            hallDiv.append(hallSmallDiv3)
            let hallSmallDiv4 = document.createElement("div");
            hallSmallDiv4.classList.add("hallSmallDiv");
            hallDiv.append(hallSmallDiv4)

            for (let index = 0; index < hall.length; index++) {
                if (hall[index].slice(0, 2) === "A.") {
                    hallSmallDiv1.style.height = `${hall[index].replace(/\D+/g, "")}%`;
                    hallSmallDiv1.innerHTML = hall[index];
                } else if (hall[index].slice(0, 2) === "B.") {
                    hallSmallDiv2.style.height = `${hall[index].replace(/\D+/g, "")}%`;
                    hallSmallDiv2.innerHTML = hall[index];
                } else if (hall[index].slice(0, 2) === "C.") {
                    hallSmallDiv3.style.height = `${hall[index].replace(/\D+/g, "")}%`;
                    hallSmallDiv3.innerHTML = hall[index];
                } else if (hall[index].slice(0, 2) === "D.") {
                    hallSmallDiv4.style.height = `${hall[index].replace(/\D+/g, "")}%`;
                    hallSmallDiv4.innerHTML = hall[index];
                }
            }

            ok.addEventListener("click", () => {
                clockDiv.style.display = "flex";
                startTimer();
                audio.play();
                hallDiv.remove();
                ok.remove();
                questBox.style.display = "flex";
                hallIcon.innerText = `/////`;
            })
        }, 5000);
    }
};



//TIMER
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

clockDiv.innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

function onTimesUp() {
    clearInterval(timerInterval);
}
let timeCount = document.getElementById("base-timer-label");
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        timeCount.innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}