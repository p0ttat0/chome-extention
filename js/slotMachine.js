export {spinReels}

function spinReels(firstSpin){
    if (localStorage.getItem("slotsLock") == "true" && !firstSpin) {return}
    localStorage.setItem("slotsLock", "true")

    //variables
    const speedMulti = localStorage.getItem("speed");
    const baseCycles = 5;
    const reelStartDelay = 0.2;
    const baseAnimationTime = 3;
    const reelEndDelay = 1;
    const reels = document.getElementsByClassName('reel');
    const style = getComputedStyle(reels[0]);
    const winRate = 1/10
    const randomVariation =  Math.cbrt(winRate)**-1   // variation arround the target
    const totalAnimationTime = (firstSpin) ? (2*reelStartDelay+(baseAnimationTime + 2*reelEndDelay))/speedMulti+0.65: (2*reelStartDelay+(baseAnimationTime + 2*reelEndDelay))/speedMulti;
    let result = [] // array of reel displacements
    let target = Math.round(Math.random()*8)  //winning image     
    
    setTimeout(() => {localStorage.setItem("slotsLock", "false")}, totalAnimationTime*1000)

    for (let i = 0; i < 3; i++) {
        let initalReelPosition;
        let animationDelay;
        if (firstSpin){
            reels[i].style.setProperty('--iconHeight', `${parseFloat(style.getPropertyValue('width'))/(screen.height/1080*16)/localStorage.getItem('scale')}em`);     
            initalReelPosition = Math.round(Math.random()*8);
            animationDelay = i*reelStartDelay/speedMulti + 0.9;      // delay for aniamtion to finish 
        } else {
            initalReelPosition = parseInt(getComputedStyle(reels[i]).getPropertyValue('--reelDisplacement')) % 9; 
            animationDelay = i*reelStartDelay/speedMulti;
        }

        // adds randomness to target    |   *Math.round(Math.random()*6) adds randomness to size of gaps in the variation around target
        let reelDisplacement = 9*baseCycles + i*9 + target + Math.round(Math.random()*randomVariation-randomVariation/2)*Math.round(Math.random()*6);
        let animationTime = (baseAnimationTime + i*reelEndDelay - reelStartDelay)/speedMulti;
        result.push(reelDisplacement % 9);
        
        reels[i].style.setProperty('--initalReelPosition', `${initalReelPosition}`);
        reels[i].style.setProperty('--reelDisplacement', `${reelDisplacement}`);
        reels[i].style.setProperty('--animationDelay', `${animationDelay}s`);
        reels[i].style.setProperty('--animationTime', `${animationTime}s`);

        reels[i].classList.remove('reelAnimation');
        void reels[i].offsetWidth;
        reels[i].classList.add('reelAnimation');
    }

    const allEqual = arr => arr.every( v => v === arr[0] )
    if (allEqual(result)) {
        localStorage.setItem("asd", 0.5);
        console.log('hit')
    }
}