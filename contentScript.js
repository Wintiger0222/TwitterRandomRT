function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}


function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}

async function OnRandom(response) {

    let modal = false;
    var element, load_more;
    var find = document.querySelectorAll('[id="retweets"]');
    if (find.length == 0) {
        modal = true;
        element = document.getElementsByClassName('retweets')[0];
        load_more = document.getElementsByClassName('retweets-more')[0];
    }
    else{
        modal = false;
        element = document.getElementById('retweets');
        load_more = document.getElementById('retweets-more');
    }


    await sleep(500);
    var preRetweet = element.getElementsByClassName('following-item').length;

    while (true) {
        load_more.click();
        await sleep(500);
        var currentRetweet = element.getElementsByClassName('following-item').length;
        
        if(currentRetweet != preRetweet){
            preRetweet = currentRetweet;
        }
        else {
            break;
        }
    }

    await sleep(500);

    var find = element.getElementsByClassName('following-item');
    var numbers = new Set();
    for (var i = 0; i < find.length; i++) {
        numbers.add(i);
    }

    var index = getRandomItem(numbers);

    if (find[index].getElementsByClassName('span').length == 0) {
        numbers.delete(index);
        index = getRandomItem(numbers);
    }

    find[index].scrollIntoView();
    await sleep(500);
    find[index].style.backgroundColor = "var(--lil-darker-gray)";
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    OnRandom(response);
});
