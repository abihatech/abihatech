<?php
/**
 * MenuSpilot feature split section.
 * $args['full'] => show extended feature list (used on the dedicated product page).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$full = ! empty( $args['full'] );
?>
<section class="section section--alt" id="menuspilot">
	<div class="container split">
		<div>
			<span class="eyebrow">MenuSpilot &middot; menuspilot.com</span>
			<h2>Turn every table into a self-service ordering counter</h2>
			<p>MenuSpilot replaces paper menus and app-based delivery commissions with a simple QR-code experience your guests already know how to use.</p>

			<div class="feature-list">
				<div class="feature-item">
					<div class="feature-icon">&#128241;</div>
					<div><h4>Scan &amp; Order in Seconds</h4><p>Guests scan a table QR code, browse a beautiful digital menu, and place their order without waiting for staff.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#128176;</div>
					<div><h4>Zero Commission</h4><p>Unlike delivery marketplaces, every order goes straight to you &mdash; no per-order cut taken from your revenue.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#128202;</div>
					<div><h4>Live Kitchen Dashboard</h4><p>Track orders, revenue and QR scans in real time from one dashboard, across single or multiple outlets.</p></div>
				</div>
				<?php if ( $full ) : ?>
				<div class="feature-item">
					<div class="feature-icon">&#127760;</div>
					<div><h4>Multi-language Menus</h4><p>Serve local and international guests with menus that switch language instantly, no extra setup.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#9881;&#65039;</div>
					<div><h4>Instant Menu Updates</h4><p>Sold out of a dish or running a special? Update pricing and availability in seconds, live for every table.</p></div>
				</div>
				<div class="feature-item">
					<div class="feature-icon">&#11088;</div>
					<div><h4>Built-in Feedback</h4><p>Collect ratings and reviews after every order to keep improving service and menu quality.</p></div>
				</div>
				<?php endif; ?>
			</div>

			<div class="hero-actions" style="margin-top:32px;">
				<a href="https://menuspilot.com" target="_blank" rel="noopener" class="btn btn-primary">Visit menuspilot.com &rarr;</a>
				<?php if ( ! $full ) : ?>
				<a href="<?php echo esc_url( home_url( '/menuspilot' ) ); ?>" class="btn btn-ghost">Learn more</a>
				<?php endif; ?>
			</div>
		</div>
		<div class="split-media">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mockups/menuspilot-dashboard.svg' ); ?>" alt="MenuSpilot restaurant dashboard screenshot">
		</div>
	</div>
</section>
