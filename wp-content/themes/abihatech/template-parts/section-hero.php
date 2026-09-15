<?php
/**
 * Homepage hero: introduces AbihaTech and both products.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<section class="hero">
	<div class="container hero-grid">
		<div>
			<span class="eyebrow">One Company &middot; Two Growing Products</span>
			<h1>We build tools that help local businesses <em style="font-style:normal;color:var(--blue-bright);">serve better</em> and <em style="font-style:normal;color:var(--accent);">travel further</em>.</h1>
			<p class="lead">AbihaTech is the team behind MenuSpilot, a QR-based digital menu &amp; ordering platform for restaurants, and AbihaTech Car Rentals, offering airport transfers, tour packages, outstation trips and hourly rentals across Diu, Gujarat.</p>
			<div class="hero-actions">
				<a href="<?php echo esc_url( home_url( '/menuspilot' ) ); ?>" class="btn btn-primary">Explore MenuSpilot &rarr;</a>
				<a href="<?php echo esc_url( home_url( '/car-rental' ) ); ?>" class="btn btn-outline">Explore Car Rentals &rarr;</a>
			</div>
			<div class="hero-stats">
				<div><strong>500+</strong><span>Restaurants on MenuSpilot</span></div>
				<div><strong>10,000+</strong><span>Rides completed in Diu</span></div>
				<div><strong>4.9&#9733;</strong><span>Average customer rating</span></div>
			</div>
		</div>
		<div class="hero-visual">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-phone.svg' ); ?>" alt="MenuSpilot digital menu on a phone" style="max-width:280px;margin:0 auto;">
			<div class="float-card float-card--top"><span class="badge-dot"></span> Order confirmed &middot; Table 6</div>
			<div class="float-card float-card--bottom">&#128663; Airport pickup in 8 min</div>
		</div>
	</div>
</section>
