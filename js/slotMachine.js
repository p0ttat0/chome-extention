function spinReels(){
    const reels = document.getElementsByClassName('reel');
    const style = getComputedStyle(reels[0]);
    let result = [] // array of reel displacements
    let target = Math.round(Math.random()*8)  // target so more common wins
    let winRate = 1/12     
    let randomVariation =  Math.cbrt(winRate)**-1   // variation arround the target

    for (let i = 0; i < 3; i++) {
        let initalReelPosition;
        let animationDelay;
        if (!parseFloat(getComputedStyle(reels[i]).getPropertyValue('--reelDisplacement'))){ // first spin where reelDisplacement is 0
            reels[i].style.setProperty('--iconHeight', `${parseFloat(style.getPropertyValue('width'))}px`);
            initalReelPosition = Math.round(Math.random()*8); 
            animationDelay = i*0.2 + 0.65;
        } else {
            initalReelPosition = parseInt(getComputedStyle(reels[i]).getPropertyValue('--reelDisplacement')) % 9; 
            animationDelay = i*0.2;
        }

        // adds randomness to target    |   *Math.round(Math.random()*6) adds randomness to size of gaps in the variation around target
        let reelDisplacement = 27 + i*9 + target + Math.round(Math.random()*randomVariation-randomVariation/2)*Math.round(Math.random()*6);
        let animationTime = 3 + i;
        result.push(reelDisplacement % 9);
        
        reels[i].style.setProperty('--initalReelPosition', `${initalReelPosition}`);
        reels[i].style.setProperty('--reelDisplacement', `${reelDisplacement}`);
        reels[i].style.setProperty('--animationDelay', `${animationDelay}s`);
        reels[i].style.setProperty('--animationTime', `${animationTime}s`);

        reels[i].classList.remove('reelAnimation');
        void reels[i].offsetWidth;
        reels[i].classList.add('reelAnimation');
    }

    console.log(result)
    const allEqual = arr => arr.every( v => v === arr[0] )
    if (allEqual(result)) {
        console.log('win')
    }
}

export {spinReels}