document.addEventListener("DOMContentLoaded", function () {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', function(event) {
            console.log("click");
            const heart = likeButton.querySelector(".heart");

            if (heart.classList.contains("fa-regular")) {
                heart.classList.remove("fa-regular");
                heart.classList.add("fa-solid");
            } else {
                heart.classList.remove("fa-solid");
                heart.classList.add("fa-regular");
            }
        });
    });
});