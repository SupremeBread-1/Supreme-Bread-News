// alert('works');

var d = new Date();
document.getElementById('dater').innerHTML = d;
// api_key = 'db9d8712c5ebef8be66f7905354d165a';
api_key = '6224f354ea4e750144c51e8c3a9aec24';
// api_key = '6b19f0b4ce7006ae0dfa2c3b43528663';
// dead // api_key = 'ecdc6e25ad145c6854edc3c04e32f4eb';
// dead // api_key = '87a75157c6580dd16ae12c3fab51e1ea';
// api_key = 'ae5eea7b3edfd78ad5781f11e15ddd84';
// api_key = '5b3263f5afbb0e3a420d51f10d93cdc6';


const TOPH_URL = `https://gnews.io/api/v4/top-headlines?token=${api_key}&lang=en`;
const LEFTH_URL = `https://gnews.io/api/v4/top-headlines?topic=world&token=${api_key}&lang=en`;
const RIGHTH_URL = `https://gnews.io/api/v4/top-headlines?topic=entertainment&token=${api_key}&lang=en`;
// const EVERYTHING_URL = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=dfbc5d33af6141129a08b311ee343dfc';

let newsHeader, newsBigs, newsSmalls;
let star = 'defined';

const $main = $('#main');

const $cards = $('#cards');
const $deck = $('#double-decker');

function url_change (modifier) {
    const apple = `https://gnews.io/api/v4/top-headlines?topic=${modifier}&token=${api_key}&lang=en`;
    dataGetter(true, apple, 0);
}

function url_search (keyword) {

    const searching = document.querySelector('#text-here').value;
    const banana = `https://gnews.io/api/v4/top-headlines?q=${searching}&token=${api_key}&lang=en`;
    document.querySelector('#text-here').value = "";
    dataGetter(true, banana, 0);
}

function reset_button (home) {
    // var clearOut = document.querySelector("#main").innerHTML;
    // clearOut = "";
    document.querySelector("#main").innerHTML = "";
    // console.log(clearOut);
    if (home === 'matrix') {
        dataGetter(true, TOPH_URL, 1)
        dataGetter(true, LEFTH_URL, 0, 0);
        dataGetter(true, RIGHTH_URL, 0, 1);
    }
}

// url_change('health');

const linkOut = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

function linethrough (linker) {
    document.getElementById(linkOut[linker]).classList.add('dead');
}

// $cards.on('click', 'article.card', clicker);



function init() {
    dataGetter();
};


// Run functions
init();



// Connect with News Api
function dataGetter(alt, orange, binary, split) {
    // let url;
    // url = TOPH_URL;
    // console.log(url);

    if (alt === true) {
        // reset_button();
        // $('.main-left').remove();
        // $('aside').remove();

        $.ajax(orange).then(function(data){
            // if(bottom === undefined){
                
            // } else {
                // newsHeader = data;
                // console.log('Data:', data);
                // begin.push(data.articles[0].title);
                // middle.push(data.articles[0].image);
                // end.push(data.articles[0].description);
                // console.log(begin,middle,end);
                // render();
            newsBigs = data;
            if (binary === 0) {
                if (split === 0) {
                    // reset_button();
                    render(true, 0, 0);
                    // render(1);
                } else if (split === 1){
                    render(true, 1, 0);
                } else {
                    reset_button();
                    render(true, 0, 2);
                    console.log('you suck at this');
                }
            } else if (binary === 1) {
                render(0);
            } else {
                console.log('You wrong');
            }
            // }
        }, 
        function(error) {
            console.log('Error: ', error);
        })
    } else {
        frustration = TOPH_URL;
        // console.log('tp',top);
        left = LEFTH_URL;
        // console.log('le',left);
        right = RIGHTH_URL;
        // console.log('rg',right);
        $.ajax(frustration).then(function(data){
            // if(bottom === undefined){
                // console.log("da",data);
            // } else {
                newsHeader = data;
                // console.log('Data:', data);
                // begin.push(data.articles[0].title);
                // middle.push(data.articles[0].image);
                // end.push(data.articles[0].description);
                // console.log(begin,middle,end);
                // console.log('nh',newsHeader);
                render(0);
                // render(true);
            // }
        }, 
        function(error) {
            console.log('Error: ', error);
        });
        $.ajax(left).then(function(data){
            // if(bottom === undefined){
                
            // } else {
                newsBigs = data;
                // console.log('Data:', data);
                // begin.push(data.articles[0].title);
                // middle.push(data.articles[0].image);
                // end.push(data.articles[0].description);
                // console.log(begin,middle,end);
                render(true,0);
                // render(true);
            // }
        }, 
        function(error) {
            console.log('Error: ', error);
        });
        $.ajax(right).then(function(data){
            // if(bottom === undefined){
                
            // } else {
                // newsSmalls = data;
                newsBigs = data;
                // console.log('Data:', data);
                // begin.push(data.articles[0].title);
                // middle.push(data.articles[0].image);
                // end.push(data.articles[0].description);
                // console.log(begin,middle,end);
                // render(false);
                render(true,1);
            // }
        }, 
        function(error) {
            console.log('Error: ', error);
        });

    }
    

    
}


// Render Function
// 0 = big slideshow render main page
// true = world news card render
// false = entertainment news card render
// 1 = nav button clicked, clear contents of main and display associated topic news
// 2 = search query submit runs function, also clears contents of main and displays articles associated with keywords, totalArticles count on top
// 3 = SB NEWS/Home button, runs dataGetter(); "refreshes" the main page
// 4 = display single article with title,description, image,source.name, publishedAt, content, url
// other tasks 
// css top-bar and card hover
// css search and article page

function render(imgarray, card_value, home_value) {
    if(imgarray === 0) {
        // const arr = [];
        // console.log(imgarray);
        const begin = [];
        const middle = [];
        const end = [];
        const carousel = newsHeader.articles.map((newsHead) => {
            begin.push(newsHead.image);
            middle.push(newsHead.title);
            end.push(newsHead.description);
        })
        console.log(middle,begin,end);
        crud(middle,begin,end);
    } else if(imgarray === true){
        $slippery = function() {
            if (card_value === 0 && home_value === 0) {
                return `<div class="main-left" id="problem-child">
                            <section id="headline" class="big-cheese">
                            
                            </section>
                            <hr>
                            <section id="cards" class="lil-cheese">

                            </section>
                        </div>`;
            } else if (card_value === 1 && home_value === 0) {
                return `<aside id="deck" class="main-right">
                            <section id="double-decker" class="big-cheese">
                            
                            </section>
                        </aside>`;
            } else {
                console.log("work?");
            }};
        const cardItems = newsBigs.articles.map((newsBig) => {
            // begin.push(newsHead.title);
            // middle.push(newsHead.image);
            // end.push(newsHead.description);
            // console.log(begin,middle,end);
            
            if (card_value === 0 && home_value === 0 || card_value === 1 && home_value === 0 || card_value === 0 || card_value === 1) {
                    return `<a href="${newsBig.url}" target="_blank">
                                <article data-url="${newsBig.url}" class="crumbs">
                                    <h3 class="ctr">${newsBig.title}</h3>
                                    <br>
                                    <img class="ctr" src="${newsBig.image}" alt="${newsBig.title}">
                                    <br>
                                    <p class="ctr" >${newsBig.description}</p>
                                </article>
                            </a>`;
            } else {
                console.log('Im done with this shit');
            }
        });
        if (card_value === 0) {
            if (home_value === 0) {
                console.log('1', $slippery);
                // $slippery = $(slippery);
                // console.log('slip', typeof $slippery);
                $main.html($slippery);
                $card = $('#cards');
                // render(true,0);
                $card.html(cardItems);
                // console.log(typeof cardItems);
                // document.querySelector('#cards').appendChild(cardItems);
            } else if(home_value === 2) {
                $main.html(cardItems);
            } else {
                $cards.html(cardItems);
            }
        } else if (card_value === 1) {
            if (home_value === 0) {
                console.log($main);
                // console.log('2',slippery);
                // $slippery = $(slippery);
                console.log($slippery);
                // document.querySelector("#problem-child").insertAdjacentHTML('afterend', $slippery);
                $('#problem-child').after($slippery);
                $dec = $('#double-decker');
                console.log($dec);
                $dec.html(cardItems);
                // document.querySelector('#deck').appendChild(cardItems);
            } else {
                $deck.html(cardItems);
            }
        } else {
            console.log('how did it come to this???');
        }
        // $cards.html(cardItems);
        // $deck.html(cardItems);
    } 
    // else if (imgarray === false){
    //     const deckItems = newsSmalls.articles.map((newsSmall) => {
    //         // begin.push(newsHead.title);
    //         // middle.push(newsHead.image);
    //         // end.push(newsHead.description);
    //         // console.log(begin,middle,end);
            
    //         return `
    //         <a href="${newsSmall.url}" target="_blank">
    //             <article data-url="${newsSmall.url}" class="crumbs">
    //                 <h3 class="ctr">${newsSmall.title}</h3>
    //                 <br>
    //                 <img class="ctr" src="${newsSmall.image}" alt="${newsSmall.title}">
    //                 <br>
    //                 <p class="ctr" >${newsSmall.description}</p>
    //             </article>
    //         </a>`;
    //     });
    //     $deck.html(deckItems);
    // } 
    else if (imgarray === 1) {
        console.log('cat!');
    } else if (imgarray === 2) {
        console.log('mouse!');
    } else {
        console.log('why???');
    }
}


// Previews
// function clicker {

// }

// CRUD for slideshow

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// crud

// const captionFill = ['1-1','2-2','3-3','4-4','5-5','6-6','7-7','8-8','9-9','10-10'];
// const imageFill = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10'];
// const desFill = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10'];

// crud(captionFill, imageFill, desFill);

function crud (a,b,c) {
    console.log(a,b,c);
    // const body = document.querySelector('body');
    // const haha = document.querySelector('#ha');
    
    const heck = document.getElementById('headline');

    // const supercontainer = document.createElement('div');
    // supercontainer.classList.add('fill');
    const slideshowcont = document.createElement('div');
    slideshowcont.classList.add('slideshow-container');
    const dotter = document.createElement('div');
    dotter.style.textAlign = 'center';
    a.forEach(function(value, i) {
        var showme = document.createElement('div');
        showme.classList.add('mySlides', 'fade');
        var caption = document.createElement('div');
        caption.classList.add('numbertext');
        caption.textContent = `${i + 1} / ${a.length}`;
        var imgset = document.createElement('img');
        imgset.setAttribute('src', b[i]);
        imgset.style.width = '100%';
        var text = document.createElement('div');
        text.classList.add('text');
        text.textContent = c[i];
        showme.append(caption,imgset,text);
        slideshowcont.append(showme);
        // supercontainer.append(slideshowcont);
        // body.append(supercontainer);
        // haha.before(supercontainer);
        // heck.append(supercontainer);
        heck.append(slideshowcont);

        var spand = document.createElement('span');
        spand.classList.add('dot');
        spand.setAttribute('onclick', `currentSlide(${i + 1})`);
        dotter.append(spand);
    });
    const previ = document.createElement('a');
    previ.classList.add('prev');
    previ.setAttribute('onclick','plusSlides(-1)');
    previ.innerHTML = '&#10094;';
    const nex = document.createElement('a');
    nex.classList.add('next');
    nex.setAttribute('onclick','plusSlides(1)');
    nex.innerHTML = '&#10095;';
    slideshowcont.append(previ,nex);
    const breaking = document.createElement('br');
    slideshowcont.after(breaking);
    breaking.after(dotter);
    


    
}




{/* <a href="${newsBig.url}" target="_blank">
<article data-url="${newsBig.url}" class="crumbs">
    <h3 class="ctr">${newsBig.title}</h3>
    <br>
    <img class="ctr" src="${newsBig.image}" alt="${newsBig.title}">
    <br>
    <p class="ctr" >${newsBig.description}</p>
</article>
</a> */}