<?php
/**
 * Car Rental feature split section.
 * $args['full'] => show extended feature list (used on the dedicated product page).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$full = ! empty( $args['full'] );
?>
<section class="section section--navy" id="car-rental">
	<div class="container split reverse">
		<div class="split-media">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/car-rental-hero.svg' ); ?>" alt="AbihaTech Car Rentals outstation trip illustration">
		</div>
		<div>
			<span class="eyebrow">AbihaTech Car Rentals &middot; Diu, Gujarat</span>
			<h2>Reliable rides across Diu, built around your itinerary</h2>
			<p>Whether you're landing at Diu Airport, heading to Gir or Somnath, or just need a car for a few hours &mdash; we've got a clean, verified vehicle ready.</p>

			<div class="service-chips">
				<span class="service-chip">&#9992;&#65039; Airport Transfer</span>
				<span class="service-chip">&#127958;&#65039; Tour Packages</span>
				<span class="service-chip">&#128663; Outstation</span>
				<span class="service-chip">&#8987; Hourly Rentals</span>
			</div>

			<div class="feature-list" style="margin-top:32px;">
				<div class="feature-item">
					<div class="feature-icon">&#9989;</div>
					<div><h4>Verified Local Drivers</h4><p>Every driver knows Diu and Gujarat's routes well, from beach roads to highway stretches to Somnath and Gir.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#128179;</div>
					<div><h4>Upfront, Fair Pricing</h4><p>See the total fare before you book &mdash; no surge surprises, no hidden charges at drop-off.</p></div>
				</div>
				<?php if ( $full ) : ?>
				<div class="feature-item">
					<div class="feature-icon">&#128241;</div>
					<div><h4>Instant Online Booking</h4><p>Pick your route, choose a sedan or SUV, and confirm your ride in under two minutes.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#127968;</div>
					<div><h4>Curated Tour Packages</h4><p>Full-day and multi-day packages covering Diu Fort, Nagoa Beach, Gir National Park and Somnath Temple.</p></div>
				</div>
				<?php endif; ?>
			</div>

			<div class="service-area">&#128205; Serving Diu city and greater Gujarat, 24/7</div>

			<div class="hero-actions" style="margin-top:28px;">
				<a href="<?php echo esc_url( home_url( '/car-rental/#booking' ) ); ?>" class="btn btn-primary">Book a Ride &rarr;</a>
			</div>
		</div>
	</div>
</section>
