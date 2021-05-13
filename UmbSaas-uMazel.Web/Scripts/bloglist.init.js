$(document).ready(function () {
    // Masonry Element
    if ($(this).length > 0) {
        var container = $('.masonry');
        container.masonry({
            // columnWidth: 0,
            itemSelector: '.nf-item'
        });
    };

    var $container2 = $('.container-grid');
    $container2.imagesLoaded(function () {
        $container2.isotope({
            itemSelector: '.nf-item',
            layoutMode: 'fitRows'
        });
    });
});