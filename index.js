// Button for points

document.querySelectorAll(".btn-pts").forEach(
    (elem) => {elem.addEventListener("click", function(){addPts(this)})}
)


// Button declaration
document.querySelectorAll(".btn-timer").forEach(
    (elem) => {                                                
        elem.addEventListener("click",  function() {quarterStart(elem)} )   //Create Event Listener to wait for clicked
    }
)

let btnPause = document.getElementById("btn-pause")
btnPause.addEventListener("click", function() {pause(this)})

// Add all time elements into a list
let timeElements = document.querySelectorAll(".time-element")

// Placeholder for timers
let timer = null
let endTimer = null
let distance = null
let tempDistance = null
let updateInterval = 10
let blinkInterval = 300


function addPts(elem) {

    // Reset all button appearance
    document.querySelectorAll(".btn-pts").forEach(
        (item) => {item.classList.replace("clicked", "default")}
    )
    
    // Highlight clicked button
    elem.classList.replace("default","clicked")

    // add pts
    pts = Number(elem.textContent[1])
    if (elem.classList.contains("home")){
        homePts = Number(document.getElementById("home-score").value)
        homePts += pts
        document.getElementById("home-score").value = String(homePts)
    } else if (elem.classList.contains("away")){
        awayPts = Number(document.getElementById("away-score").value)
        awayPts += pts
        document.getElementById("away-score").value = String(awayPts)
    }
}


function quarterStart(btnQ) {
    
    // Reset all button appearance
    document.querySelectorAll(".btn-timer").forEach(
        (elem) => {elem.classList.replace("clicked", "default")}
    )
    
    // Highlight clicked button
    btnQ.classList.replace("default","clicked")

    // Reset pause button
    btnPause.textContent = "PAUSE"

    // Reset timer
    clearInterval(timer)
    clearInterval(endTimer)
    timeElements.forEach(
        (elem) => {elem.classList.replace("blink", "no-blink")}
    )
    

    // Check if there is a previous recorded time
    distance = 12*60*1000 // 12 minutes in miliseconds
    tempDistance = distance

    // Trigger countdown timer
    countdown()
}

function pause(elem) {
    if (elem.textContent == "PAUSE"){

        elem.textContent = "RESUME"
        tempDistance = distance

        clearInterval(timer)
        clearInterval(endTimer)
        timeElements.forEach(
            (elem) => {elem.classList.replace("blink", "no-blink")}
        )

    } 
    else if (elem.textContent == "RESUME"){
        elem.textContent = "PAUSE"
        distance = tempDistance

        countdown()
    }
    
    
}

function countdown() {
    timer = setInterval(function() {
        
        let minute = Math.floor(distance / (60*1000))
        let second = Math.floor( (distance % (60*1000)) / 1000)

        let minuteZero = Math.floor(minute / 10)
        let minuteOne = minute % 10

        let secondZero = Math.floor(second / 10)
        let secondOne = second % 10

        let curTime = [minuteZero, minuteOne, secondZero, secondOne]

        timeElements.forEach(
            (elem, idx) => {elem.textContent = curTime[idx]}
        )

        distance -= updateInterval

        if (distance < 0) {
            
            let blinkCount = 0

            endTimer = setInterval(function() {
                
                if (blinkCount % 2 == 0) {
                    timeElements.forEach(
                        (elem) => {elem.classList.replace("no-blink", "blink")}
                    )
                } else {
                    timeElements.forEach(
                        (elem) => {elem.classList.replace("blink", "no-blink")}
                    )
                }
                
                blinkCount += 1
                if (blinkCount == 20){
                    clearInterval(endTimer)
                }

            }, blinkInterval)

           clearInterval(timer)
        }

    }, updateInterval)
}


