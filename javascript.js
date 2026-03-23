const secondsInput = document.getElementById("secondsInput");
const minutesInput = document.getElementById("minutesInput");
const hoursInput = document.getElementById("hoursInput");

const secondsTextLabel = document.getElementById("secondsTextLabel");
const minutesTextLabel = document.getElementById("minutesTextLabel");
const hoursTextLabel = document.getElementById("hoursTextLabel");
const selectLanguageLabel = document.getElementById("selectLanguageLabel");
const pageTitle = document.getElementById("pageTitle");
const startTimerButton = document.getElementById("startTimerButton");


let hoursLeftToPass
let secondsLeftToPass;
let minutesLeftToPass;
let timerRunning = false;
let detectZerosOnLeftRegEx = /^0+/;
let emptyString = "";
let textForStartTimer;
let textForStopTimer;



document.addEventListener("DOMContentLoaded", ApplyCurrentLanguage);
document.addEventListener("DOMContentLoaded", PopulateLanguageDropdown);
secondsInput.addEventListener("input", () => checkIfInputValueIsInvalid(secondsInput, 60));
minutesInput.addEventListener("input", () => checkIfInputValueIsInvalid(minutesInput, 60));
hoursInput.addEventListener("input", () => checkIfInputValueIsInvalid(hoursInput, 24));
startTimerButton.addEventListener("click", StartTimer)
setInterval(StartTimePassing, 1000);


function ApplyCurrentLanguage(){
    const currentLang = getCurrentLanguageTranslations();
    hoursTextLabel.textContent = `${currentLang.hours}`;
    minutesTextLabel.textContent = `${currentLang.minutes}`;
    secondsTextLabel.textContent = `${currentLang.seconds}`;
    startTimerButton.textContent = `${currentLang.startTimer}`;
    textForStartTimer = `${currentLang.startTimer}`;
    textForStopTimer = `${currentLang.stopTimer}`;
    selectLanguageLabel.textContent =`${currentLang.selectLanguage}`;
    pageTitle.textContent = `${currentLang.pageTitle}`;
}


function PopulateLanguageDropdown()
{
    const selectLanguage = document.getElementById('language-selection');
    Object.keys(TRANSLATIONS).forEach(key => { 
        let option = document.createElement('option');
        option.value = key;
        option.text = key;
        option.id = `option-${key}`;
        selectLanguage.append(option);
    });
    Array.from(selectLanguage.options).forEach(option => {
        if(option.text == detectCurrentLanguage())
        {
            selectLanguage.selectedIndex = option.index;
        }
    });

}
    const languageSelector = document.getElementById("language-selection");
    let currentSelectedLanguage;

    document.querySelector('select').addEventListener('change', () => {
    const selectedOption = languageSelector.options[languageSelector.selectedIndex];
    currentSelectedLanguage = selectedOption.textContent;
    console.log("seleccionaste", currentSelectedLanguage);
    ApplyCurrentLanguage();

});


function detectCurrentLanguage() {
    if(currentSelectedLanguage == undefined)
    {
        const browserLang = navigator.language.toLowerCase();
        const langCode = browserLang.split('-')[0];
        return TRANSLATIONS[langCode] ? langCode : 'en';
    }
    else
    {
        return currentSelectedLanguage;
    }
}

function getCurrentLanguageTranslations() {
    const lang = detectCurrentLanguage();
    return TRANSLATIONS[lang];
}

function checkIfInputValueIsInvalid(timeInputUnit, maxValue)
{
    let currentInput = timeInputUnit.value;
    let firstCheck = EliminateZeroesOnLeft(currentInput);
    let secondCheck = NotExceedMaxValue(firstCheck, maxValue);
    console.log(secondCheck);
    timeInputUnit.value = secondCheck;

}

function EliminateZeroesOnLeft(inputValue)
{
    if(inputValue.length > 2 && inputValue.startsWith("0"))
    {  
        let desiredInput = inputValue.replace(detectZerosOnLeftRegEx, emptyString)
        return desiredInput;
    }
    else
    {           
        return inputValue;
    }
}

function NotExceedMaxValue(inputValue, maxValue)
{
    if(inputValue > maxValue)
    {
        return maxValue;
    }
    else
    {
        return inputValue;
    }    
}

function StartTimer(e){
    if(!timerRunning)
    {
        secondsLeftToPass = secondsInput.value;
        minutesLeftToPass = minutesInput.value;
        hoursLeftToPass = hoursInput.value;

        if(!TimeLeftIsZero())
        {
            timerRunning = true;
            startTimerButton.textContent = textForStopTimer;
        }

    }     
    else
    {
        timerRunning = false;
        startTimerButton.innerHTML = textForStartTimer;
    }
}

function StartTimePassing()
{
    if(timerRunning)
    {
        if(ThereAreSecondsLeft())
        {
            secondsLeftToPass = secondsLeftToPass - 1;
            secondsInput.value =  secondsLeftToPass;
        }

        if(ThereAreHoursLeft())
        {
            hoursLeftToPass = hoursLeftToPass -1;
            hoursInput.value = hoursLeftToPass;
            minutesLeftToPass = 59;
            minutesInput.value = minutesLeftToPass;
            secondsLeftToPass = 59;
            secondsInput.value = secondsLeftToPass;
        }

        if(ThereAreMinutesLeft())
        {
            minutesLeftToPass = minutesLeftToPass -1;
            minutesInput.value = minutesLeftToPass;
            secondsLeftToPass = 59;
            secondsInput.value = secondsLeftToPass;
        }
        if(TimeLeftIsZero())
        {
            startTimerButton.innerHTML = textForStartTimer;
            timerRunning = false;
        }
        
    }
}

function ThereAreHoursLeft()
{
    if(minutesLeftToPass <= 0 && hoursLeftToPass >= 1 && secondsLeftToPass == 0)
    {
        return true;
    }

    return false;
}

function ThereAreMinutesLeft()
{
    if(secondsLeftToPass <= 0 && minutesLeftToPass >= 1 && hoursLeftToPass == 0)
    {
        return true;
    }
    
    return false;
}

function ThereAreSecondsLeft()
{
    if(secondsLeftToPass > 0)
    {
        return true;
    }

    return false;
}

function TimeLeftIsZero()
{
    if(secondsLeftToPass == 0 && minutesLeftToPass == 0 && hoursLeftToPass == 0)
    {
        return true;
    }

    return false;
}

