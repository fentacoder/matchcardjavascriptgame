var timer = 50;
var picsActive = [];
var gridList = '';

var clock = document.getElementById('clock');
var grid = document.getElementById('pictureGrid');
var winOrLoseText = document.getElementById('winOrLose');

var pictureList = [
    {
        id: 0,
        name: 'beach',
        filePath: 'images/beach.jpg'
    },
    {
        id: 1,
        name: 'bookshelf',
        filePath: 'images/bookshelf.jpg'
    },
    {
        id: 2,
        name: 'city',
        filePath: 'images/city.jpg'
    },
    {
        id: 3,
        name: 'cruise',
        filePath: 'images/cruise.jpg'
    },
    {
        id: 4,
        name: 'desert',
        filePath: 'images/desert.jpg'
    },
    {
        id: 5,
        name: 'ferrari',
        filePath: 'images/ferrari.jpg'
    },
    {
        id: 6,
        name: 'grass',
        filePath: 'images/grass.jpg'
    },
    {
        id: 7,
        name: 'motorcycle',
        filePath: 'images/motorcycle.jpg'
    },
    {
        id: 8,
        name: 'beach',
        filePath: 'images/beach.jpg'
    },
    {
        id: 9,
        name: 'bookshelf',
        filePath: 'images/bookshelf.jpg'
    },
    {
        id: 10,
        name: 'city',
        filePath: 'images/city.jpg'
    },
    {
        id: 11,
        name: 'cruise',
        filePath: 'images/cruise.jpg'
    },
    {
        id: 12,
        name: 'desert',
        filePath: 'images/desert.jpg'
    },
    {
        id: 13,
        name: 'ferrari',
        filePath: 'images/ferrari.jpg'
    },
    {
        id: 14,
        name: 'grass',
        filePath: 'images/grass.jpg'
    },
    {
        id: 15,
        name: 'motorcycle',
        filePath: 'images/motorcycle.jpg'
    }
];

function setClock(seconds){
    if(seconds >= 10){
        clock.innerText =`00:${seconds}`;
    }else{
        clock.innerText = `00:0${seconds}`;

        if(clock.style.color != 'red'){
            clock.style.color = 'red';
        }
    }
}

function countDown(){
    timer--;
    if(timer > 0 && pictureList.length > 0){
        setClock(timer);
    }else if(timer <= 0 && pictureList.length > 0){

        let gameOverTime = '00:00';
        clock.innerText = gameOverTime;
        clock.style.color = 'red';

        winOrLoseText.innerText = `You Lose...`;
        winOrLoseText.style.color = 'red';

        grid.className = 'grid-fade';
    }else{
        clock.style.display = 'none';

        winOrLoseText.innerText = `You Win!`;
        winOrLoseText.style.color = 'green';

        grid.className = 'grid-fade';
    }
}

function formatFilePath(fPath){
    let tempStr = '';
    let tempCounter = 0;

    for(i = 0; i < fPath.length; i++){
        tempStr += fPath.substring(i,i+1);
        tempCounter++;

        console.log(tempStr);

        if(tempStr == 'images'){
            continue;
        }else if(tempStr.includes('images')){
            console.log('isndie of include',tempStr);
            continue;
        }else{
            if(tempCounter == 6){
                tempCounter = 0;
                tempStr = '';
            }
        }
    }

    return tempStr;
}

function checkIfRight(){
    let picDiv1 = document.getElementById(picsActive[0].name);
    let picDiv2 = document.getElementById(picsActive[1].name);
    let actualPic1 = document.getElementById(picsActive[0].actualPicName);
    let actualPic2 = document.getElementById(picsActive[1].actualPicName);

    //let formattedPath = formatFilePath(picsActive[0].filePath);

    if(picsActive[0].filePath == picsActive[1].filePath){
        pictureList = pictureList.filter(picture => {
            if(picture.filePath != picsActive[0].filePath){
                console.log('picsActive filepath: ',picsActive[0].filePath);

                console.log(picture.id,': ' ,picture);

                return picture;
            }
        });

        picsActive = [];
        reInitializeGrid(pictureList);
    }else{
        picDiv1.className = 'card-hidden';
        picDiv2.className = 'card-hidden';
        actualPic1.className = 'pic-hide';
        actualPic2.className = 'pic-hide';
        picsActive = [];
    }
}

function picFlip(e){

    let name = e.target.id;
    let picId = name.substring(13);

    let card = document.getElementById(`pic${picId}`);
    let actualPic = document.getElementById(name);

    if(card.className == 'card-hidden'){
        card.className = 'card-show';
        actualPic.className = 'pic-show';

        picsActive.push({
            id: actualPic.id, 
            name: `pic${picId}`, 
            actualPicName: name,
            filePath: `images/${actualPic.alt}.jpg`
        });
    }else{
        card.className = 'card-hidden';
        actualPic.className = 'pic-hide';
        picsActive = picsActive.filter(pic => pic.id != actualPic.id);
    }

    if(picsActive.length == 2){
        checkIfRight();
    }    
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function initializeGrid(picList){
    picList = shuffle(picList);

    picList.forEach(pic => {
        gridList += `<div
            class="card-hidden"
            name="pic${pic.id}" id="pic${pic.id}">
            <img src="${pic.filePath}" alt="${pic.name}" style="width: 100%; height: 100%; overflow: hidden;"
                class="pic-hide" id="actualPicture${pic.id}"/>
            </div>`;
    });

    //set the divs to the grid
    grid.innerHTML= gridList;
}

function reInitializeGrid(picList){
    picList = shuffle(picList);

    picList.forEach(pic => {
        gridList += `<div
            class="already-hidden-card"
            name="pic${pic.id}" id="pic${pic.id}">
            <img src="${pic.filePath}" alt="${pic.name}" style="width: 100%; height: 100%; overflow: hidden;"
                class="already-hidden-pic" id="actualPicture${pic.id}"/>
            </div>`;
    });
}

grid.onclick = function(event){

    picFlip(event);
};

initializeGrid(pictureList);

setInterval(countDown,1000);