$(document).ready(function() {

	$('#menu-mobile').sidr({
		name: 'sidr',
		// name: 'menu',
		source: '#menu',
		onOpen: function(){
			$('#overlay').show();
			$('#overlay').on('click', function(event) {
				event.preventDefault();
				// $.sidr('close', 'sidr');
				closeMenu();
				console.log('click overlay');
			});
		},
		onClose: function(){
			$('#overlay').off('click', function(event) {
				event.preventDefault();
				// $.sidr('close', 'sidr');
				closeMenu();
			});
		}
	});
	// $('#menu-mobile').trigger('click');
	setEvents();
});

function setEvents () {

	// Scroll to section
	$('#menu ul li span, .sidr ul li span').on('click', function(event) {
		event.preventDefault();
		var scrollToID = $(this).attr('data-href');
		
		if($(this).parents('.sidr').length > 0){
			// $.sidr('close', 'sidr');
			closeMenu();
		}
		$('html, body').animate({
	        scrollTop: $("#"+scrollToID).offset().top
	    }, 1000);
	});

	// Play sound when scroll reaches an element
	$(document).on('scroll', function(event) {
		var audioElement = document.getElementById('audio1');
		var positionSkate = $('#skate-module').offset();
		var positionNext = $('#why').offset();
		var y = $(this).scrollTop();

	    if(y > positionSkate.top && y < (positionNext.top - 1)){
	        // console.log('reached');
	        $('#eyes').addClass('on');
	        audioElement.play();
	    }else{
	        // console.log('NOT reached');
	        $('#eyes').removeClass('on');
	        audioElement.currentTime = 0;
	        audioElement.pause();
	    }
	});

	// Mute and unmute
	$('#volume').on('click', function(event) {
		event.preventDefault();
		
		var audioElement = document.getElementById('audio1');

		if(audioElement.muted){
			// console.log('muted');
			$('#volume').removeClass('off');
			audioElement.muted = false;
		}
		else{
			// console.log('NOt muted');
			$('#volume').addClass('off');
			audioElement.muted = true;
		}
	});

	// Share on Facebook
	$('#share-fb').on('click', function(event){
		event.preventDefault();

		FB.ui({
			method: 'share',
			href: 'http://javiaranega.com/skatewall/',
		}, function(response){});

	});

	// Share on Twitter
	$('#share-twitter').on('click', function(event){
		event.preventDefault();
		
		text = "Skate Wall is a project born in LOLA Madrid in collaboration with Nomad Skateboards http://javiaranega.com/skatewall/";
		
		var encodedText = encodeURIComponent(text);
		window.open("http://twitter.com/intent/tweet?text=" + encodedText, "twitter", "height=300,width=600");

	});
}

function closeMenu(){
	$('#overlay').hide();
	$.sidr('close', 'sidr');
}