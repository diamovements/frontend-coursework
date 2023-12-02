

const wrapper = document.querySelector(".wrapper");
const feed = document.querySelector(".feed");
const arrowBtn = document.querySelectorAll(".wrapper i");
const firstCardWidth = feed.querySelector(".one").offsetWidth;
const carouselChildren = [...feed.children];


let isDragging = false, startX, startScrollLeft, timeoutId;


let cardPerView = Math.round(feed.offsetWidth / firstCardWidth)

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    feed.insertAdjacentHTML("afterbegin", card.outerHTML)
});

carouselChildren.slice(0, cardPerView).forEach(card => {
    feed.insertAdjacentHTML("beforeend", card.outerHTML)
});

arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        feed.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    feed.classList.add("dragging")

    startX = e.pageX;
    startScrollLeft = feed.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    feed.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    feed.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => feed.scrollLeft += firstCardWidth, 2500)
}
autoPlay();

const infiniteScroll = () => {
    if(feed.scrollLeft === 0) {
        feed.classList.add("no-transcription");
        feed.scrollLeft = feed.scrollWidth - (2 * feed.offsetWidth);
        feed.classList.remove("no-transcription");
    } else if(Math.ceil(feed.scrollLeft) === feed.scrollWidth - feed.offsetWidth){
        feed.classList.add("no-transcription");
        feed.scrollLeft = feed.offsetWidth;
        feed.classList.remove("no-transcription");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

feed.addEventListener("mousedown", dragStart);
feed.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
feed.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);