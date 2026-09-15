(function () {
	'use strict';

	/* Mobile nav toggle */
	var toggle = document.getElementById( 'nav-toggle' );
	var nav = document.getElementById( 'main-nav' );

	if ( toggle && nav ) {
		toggle.addEventListener( 'click', function () {
			var isOpen = nav.classList.toggle( 'is-open' );
			toggle.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
		} );

		nav.querySelectorAll( 'a' ).forEach( function ( link ) {
			link.addEventListener( 'click', function () {
				nav.classList.remove( 'is-open' );
				toggle.setAttribute( 'aria-expanded', 'false' );
			} );
		} );
	}

	/* Animated stat counters (runs once stats enter the viewport) */
	var statEls = document.querySelectorAll( '.stat-box strong, .hero-stats strong' );

	function animateCount( el ) {
		var raw = el.textContent.trim();

		/* Skip decimal values (e.g. "4.9★") — counting up a decimal looks broken mid-animation. */
		if ( /\d+\.\d/.test( raw ) ) {
			return;
		}

		var match = raw.match( /^([\d,]+)(.*)$/ );
		if ( ! match ) {
			return;
		}
		var target = parseInt( match[1].replace( /,/g, '' ), 10 );
		var suffix = match[2] || '';
		if ( isNaN( target ) ) {
			return;
		}
		var duration = 900;
		var start = null;

		function step( ts ) {
			if ( start === null ) {
				start = ts;
			}
			var progress = Math.min( ( ts - start ) / duration, 1 );
			var value = Math.floor( progress * target );
			el.textContent = value.toLocaleString() + suffix;
			if ( progress < 1 ) {
				requestAnimationFrame( step );
			} else {
				el.textContent = target.toLocaleString() + suffix;
			}
		}
		requestAnimationFrame( step );
	}

	if ( 'IntersectionObserver' in window && statEls.length ) {
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						animateCount( entry.target );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.4 }
		);
		statEls.forEach( function ( el ) {
			observer.observe( el );
		} );
	}
} )();
