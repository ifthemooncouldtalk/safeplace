// Onwards, gentlemen.
$(function() {

/* ================================================================================ *\
	The thoughts room
\* ================================================================================ */
	if($('html').attr('id') == 'thoughts') {
		if(!swfobject.hasFlashPlayerVersion('1')) {
			$('#thoughts-done, #final').remove();
		};
	};

/* ================================================================================ *\
	Quick browser check
\* ================================================================================ */
	var $ua = $.browser;
	if(($ua.mozilla && $ua.version.slice(0, 3) < 2) || ($ua.msie && $ua.version < 9)) {
		window.location = 'http://amitaytweeto.com/thequietplace/old_version/';
		return false;
	};

/* ================================================================================ *\
	Global vars
\* ================================================================================ */
	var $window = $(window),
	    $doc = $(document),
	    $html = $('html'),
	    $body = $('body'),
	    $header = $('header'),
	    $message = $header.find('.message'),
	    messages = $message.length - 1,
	    message = Math.floor(Math.random() * messages),
	    $nav = $('nav'),
	    $yt_music = $('#yt-music'),
	    $html_music = $('#html-music'),
	    $container = $('#container'),
	    $panel = $container.find('.panel'),
	    $people = $('#people'),
	    $person = $people.find('.person'),
	    $row = $people.find('.people-row'),
	    row = 0,
	    total_rows = $row.length,
	    nav_top = $nav.offset().top,
	    block = $html.attr('id') == 'thoughts' ? true : false;
	    
/* ================================================================================ *\
	Showing and *slicing* people
\* ================================================================================ */
	$person.slice(0, 30).addClass('top-rows');
	
	$person.each(function() {
		if($(this).offset().top + 50 > nav_top) {
			$(this).find('div').remove();
		};
	});

	function show_people() {
		if(row > total_rows) { return false };
		$row.slice(row, ++row).css('opacity', 1);
		setTimeout(show_people, 23);
	};
	
	if(!Modernizr.touch) {
		$window.load(function() {
			setTimeout(show_people, 1000);
		});
		$html_music.remove();
	} else {
		window.scrollTo(0, 1);
		$person.not('.top-rows').find('img').attr('src', '');
		$('.share-button').remove();
		$yt_music.remove();
	};
	    
/* ================================================================================ *\
	Music~~
\* ================================================================================ */
	function play_music() {
		if(!Modernizr.touch) {
			var music = $yt_music.attr('src').replace('autoplay=0', 'autoplay=1');
			$yt_music.attr('src', music);
		} else {
			document.getElementById('html-music').play();
		};
	};
	    
/* ================================================================================ *\
	Trigger ALL the events!
\* ================================================================================ */
	$doc.on('keydown touchstart', function(event) {
		if((event.type == 'keydown' && event.which == 32) || event.type == 'touchstart') {
			$window.trigger('moveon');
		};
	});
	    
/* ================================================================================ *\
	window is the god
\* ================================================================================ */
	$window.on('moveon', function() {
		
		// Do nothing if blocked
		if(block) {
			return false
		};
		
		// Some vars
		var $panel = $panel = $('#container').find('.panel'),
		    $current = $container.find('.current'),
		    next = $current.index() - 1;
			$next = $panel.eq(next);
		
		// Do it all for us
		if($current.data('name') == '90seconds') {
			$doc.off('keydown touchstart');
			setInterval(function() {
				$window.trigger('moveon');
			}, 9000);
		
		// 30 seconds and counting ... until GLaDOS kills you
		} else if($current.data('name') == 'relax') {
			block = true;
			$current.data('name', '');
			var wrap_time = $current.html().replace(/30/g, '<span class="time">29<\/span>');
			$current.html(wrap_time);
			setInterval(function() {
				$current.find('.time').each(function() {
					var text = $(this).text();
					if(text > 0) {
						$(this).text($(this).text() - 1);
					};
				});
			}, 1200);
			setTimeout(function() {
				block = false;
				$window.trigger('moveon');
			}, 34800);
			return false;
		
		// You shall NOT pass!
		} else if($current.data('name') == 'final') {
			block = true;
			return false;
		
		// Show menu
		} else if($next.data('name') == 'final') {
			$nav.removeClass('hide');
		};
		
		// Hide menu and play music
		if($next.data('name') == 'music') {
			$nav.addClass('hide');
			play_music();
		};
		
		// If your browser does not support CSS3, it's crap.
		if(Modernizr.csstransitions) {
			$current.removeClass('current').addClass('used');
			$next.addClass('current');
		} else {
			$current.css({ opacity: 1 }).removeClass('current').animate({ opacity: 0, marginTop: 60 }, 1000);
			$next.css({ opacity: 0 }).addClass('current').animate({ opacity: 1 }, 700);
		};
		
	});
	    
/* ================================================================================ *\
	Changing messages on sub pages
\* ================================================================================ */
	(function change_message() {
		var time = 500;
		message++;
		if(message > messages) { message = 0 };
		$message.eq(message - 1).animate({ opacity: 0 }, time);
		$message.eq(message).animate({ opacity: 1 }, time);
		setTimeout(change_message, 7000);
	})();

// Exit $. Thank you.
});