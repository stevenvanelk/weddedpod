window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    // If the user is scrolling, add the 'scrolled' class to the header
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
