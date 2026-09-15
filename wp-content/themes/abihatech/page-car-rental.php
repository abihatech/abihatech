<?php
/**
 * Template Name: Car Rental Product Page
 * Applies automatically to the page with slug "car-rental".
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="main-content">

	<section class="hero" style="padding:80px 0 64px;">
		<div class="container hero-grid">
			<div>
				<span class="eyebrow">AbihaTech Car Rentals &middot; Diu, Gujarat</span>
				<h1>Your ride around Diu, booked in minutes</h1>
				<p class="lead">Airport transfers, tour packages, outstation trips and hourly rentals &mdash; all with verified local drivers and upfront pricing.</p>
				<div class="hero-actions">
					<a href="#booking" class="btn btn-primary">Book a Ride &rarr;</a>
					<a href="#services" class="btn btn-outline">See our services</a>
				</div>
			</div>
			<div class="hero-visual">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/fleet.svg' ); ?>" alt="AbihaTech Car Rentals fleet in Diu, Gujarat">
			</div>
		</div>
	</section>

	<div id="services">
		<?php get_template_part( 'template-parts/section', 'car-rental', array( 'full' => true ) ); ?>
	</div>

	<section class="section section--alt" id="booking">
		<div class="container">
			<div class="section-head">
				<span class="eyebrow">Screenshots</span>
				<h2>Book in under two minutes</h2>
				<p>Pick your route, choose your car, confirm the ride &mdash; from any device.</p>
			</div>
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/car-booking.svg' ); ?>" alt="AbihaTech Car Rentals booking screen screenshot" style="border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);max-width:820px;margin:0 auto;">
		</div>
	</section>

	<?php
	get_template_part( 'template-parts/section', 'reviews', array( 'product' => 'carrental', 'limit' => 3 ) );
	get_template_part(
		'template-parts/section',
		'cta',
		array(
			'title' => 'Ready to book your next ride in Diu?',
			'text'  => 'Airport transfer, outstation trip, or a quick hourly rental &mdash; we\'re ready when you are.',
		)
	);
	?>

</main>

<?php get_footer(); ?>
