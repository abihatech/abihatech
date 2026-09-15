<?php
/**
 * Two-product overview grid.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="section" id="products">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Our Products</span>
			<h2>Built for restaurants and travellers alike</h2>
			<p>Two focused products, one team obsessed with making everyday business smoother.</p>
		</div>

		<div class="products-grid">
			<article class="product-card">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-dashboard.svg' ); ?>" alt="MenuSpilot live orders dashboard screenshot">
				<span class="tag tag--menuspilot">SaaS &middot; Restaurants</span>
				<h3>MenuSpilot</h3>
				<p>QR-code digital menus, real-time order management, and zero-commission ordering for restaurants, cafes and cloud kitchens. Guests scan, browse, and order &mdash; straight to your kitchen dashboard.</p>
				<a href="<?php echo esc_url( home_url( '/menuspilot' ) ); ?>" class="btn btn-navy btn-sm">See MenuSpilot &rarr;</a>
			</article>

			<article class="product-card">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/car-booking.svg' ); ?>" alt="AbihaTech Car Rentals booking screenshot">
				<span class="tag tag--carrental">Travel &middot; Diu, Gujarat</span>
				<h3>Car Rental</h3>
				<p>Airport transfers, curated tour packages, outstation trips and hourly rentals across Diu and Gujarat. Clean cars, verified drivers, and upfront pricing every time.</p>
				<a href="<?php echo esc_url( home_url( '/car-rental' ) ); ?>" class="btn btn-navy btn-sm">See Car Rentals &rarr;</a>
			</article>
		</div>
	</div>
</section>
