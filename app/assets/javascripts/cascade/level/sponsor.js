$(function() {
	$carousels = $('#big-sponsor .carousel ul');

	$carousels.each(function(index, carousel) {
		var slideCount = $(carousel).find('li').length;

		$(carousel).slick({
			infinite: false,
			slidesToShow: slideCount < 4 ? slideCount : 4,
			slidesToScroll: slideCount < 4 ? slideCount : 4,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: slideCount < 3 ? slideCount : 3,
						slidesToScroll: slideCount < 3 ? slideCount : 3,
						infinite: false,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: slideCount < 2 ? slideCount : 2,
						slidesToScroll: slideCount < 2 ? slideCount : 2,
						infinite: false,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
					}
				}
			]
		});
	});
});