const slides = document.querySelectorAll('.carousel-slide');
const thumbnails = document.querySelectorAll('.thumb');
const btnLeft = document.querySelector('.left-btn');
const btnRight = document.querySelector('.right-btn');
const track = document.querySelector('.carousel-track');

let index = 0;

function updateCarousel(i) {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${i * slideWidth}px)`;

    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === i);
    });

    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === i);
    });

    index = i;
}

btnLeft.addEventListener('click', () => {
    const newIndex = (index - 1 + slides.length) % slides.length;
    updateCarousel(newIndex);
});

btnRight.addEventListener('click', () => {
    const newIndex = (index + 1) % slides.length;
    updateCarousel(newIndex);
});

thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateCarousel(i));
});

window.addEventListener('resize', () => updateCarousel(index));
window.addEventListener('load', () => updateCarousel(index));


const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const overlayClose = document.querySelector('.overlay-close');

// OPEN overlay with animation
document.querySelectorAll('.carousel-slide').forEach((slide) => {
    slide.addEventListener('click', () => {
        const img = slide.querySelector('img').src;
        const title = slide.querySelector('h3')?.textContent || '';
        const desc = slide.querySelector('.desc')?.textContent || '';

        overlayImg.src = img;
        overlayTitle.textContent = title;
        overlayDesc.textContent = desc;

        overlay.classList.remove('hidden'); // make it visible instantly
        requestAnimationFrame(() => {
            overlay.classList.add('show'); // trigger CSS transition
        });
    });
});

// CLOSE overlay with animation
function closeOverlay() {
    overlay.classList.remove('show'); // trigger fade/scale out
    setTimeout(() => {
        overlay.classList.add('hidden'); // remove from layout after animation
    }, 400); // match CSS transition duration
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
});
