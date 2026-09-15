<?php
/**
 * Template Name: MenuSpilot Product Page
 * Applies automatically to the page with slug "menuspilot".
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
				<span class="eyebrow">menuspilot.com &middot; Digital Menu &amp; Ordering</span>
				<h1>Every table, a self-service ordering counter</h1>
				<p class="lead">MenuSpilot gives restaurants, cafes and cloud kitchens a QR-based digital menu with zero-commission ordering and a live kitchen dashboard.</p>
				<div class="hero-actions">
					<a href="https://menuspilot.com" target="_blank" rel="noopener" class="btn btn-primary">Visit menuspilot.com &rarr;</a>
					<a href="#gallery" class="btn btn-outline">See it in action</a>
				</div>
			</div>
			<div class="hero-visual">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-hero.svg' ); ?>" alt="MenuSpilot QR ordering illustration">
			</div>
		</div>
	</section>

	<?php get_template_part( 'template-parts/section', 'menuspilot', array( 'full' => true ) ); ?>

	<section class="section section--alt" id="gallery">
		<div class="container">
			<div class="section-head">
				<span class="eyebrow">Screenshots</span>
				<h2>A closer look at MenuSpilot</h2>
				<p>The guest-facing menu and the restaurant's live orders dashboard.</p>
			</div>
			<div style="display:grid;grid-template-columns:1fr 1.4fr;gap:28px;align-items:start;">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-phone.svg' ); ?>" alt="MenuSpilot guest menu on phone screenshot" style="border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);max-width:300px;margin:0 auto;">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-dashboard.svg' ); ?>" alt="MenuSpilot dashboard screenshot" style="border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">
			</div>
		</div>
	</section>

	<?php
	get_template_part( 'template-parts/section', 'reviews', array( 'product' => 'menuspilot', 'limit' => 3 ) );
	get_template_part(
		'template-parts/section',
		'cta',
		array(
			'title' => 'Bring MenuSpilot to your restaurant',
			'text'  => 'Join 500+ restaurants already taking commission-free orders with MenuSpilot.',
		)
	);
	?>

</main>

<?php get_footer(); ?>
