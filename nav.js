$(".nav-tabs").on("click", "a", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('add_nav')) {
        $(this).tab('show');
    }
}).on("click", "span", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var anchor = $(this).closest('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs a").first().click();
});

$('.add_nav').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(".nav-tabs").children().length;
    var tabId = 'nav_' + id;
    $(this).before('<a class="nav-item nav-link" data-toggle="tab" href="#nav_' + id + '">' + $('#topic').val() + '<span>X</span></a>');
    $('.tab-content').append('<div class="tab-pane" id="' + tabId + '">Contact Form: New Contact ' + id + '</div>');
    $('.nav-tabs a:nth-child(' + id + ')').click();
});