<?php
/**
 * Footer template.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<footer class="site-footer" id="contact">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="AbihaTech" style="filter:brightness(0) invert(1);">
				<p>AbihaTech builds products that help local businesses grow &mdash; from digital menus for restaurants to reliable rides across Diu, Gujarat.</p>
				<div class="social-row">
					<a href="#" aria-label="Facebook">f</a>
					<a href="#" aria-label="Instagram">ig</a>
					<a href="#" aria-label="LinkedIn">in</a>
					<a href="#" aria-label="X / Twitter">x</a>
				</div>
			</div>

			<div class="footer-col">
				<h4>MenuSpilot</h4>
				<ul>
					<li><a href="<?php echo esc_url( home_url( '/menuspilot' ) ); ?>">Overview</a></li>
					<li><a href="<?php echo esc_url( home_url( '/menuspilot/#features' ) ); ?>">Features</a></li>
					<li><a href="https://menuspilot.com" target="_blank" rel="noopener">menuspilot.com</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4>Car Rental</h4>
				<ul>
					<li><a href="<?php echo esc_url( home_url( '/car-rental' ) ); ?>">Overview</a></li>
					<li><a href="<?php echo esc_url( home_url( '/car-rental/#services' ) ); ?>">Airport Transfer</a></li>
					<li><a href="<?php echo esc_url( home_url( '/car-rental/#services' ) ); ?>">Tour Packages</a></li>
					<li><a href="<?php echo esc_url( home_url( '/car-rental/#services' ) ); ?>">Outstation &amp; Hourly</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4>Company</h4>
				<ul>
					<li><a href="<?php echo esc_url( home_url( '/#reviews' ) ); ?>">Reviews</a></li>
					<li><a href="<?php echo esc_url( home_url( '/#happy-customers' ) ); ?>">Our Customers</a></li>
					<li><a href="mailto:hello@abihatech.com">hello@abihatech.com</a></li>
					<li>Diu, Daman &amp; Diu, Gujarat, India</li>
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<span>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> AbihaTech. All rights reserved.</span>
			<span>Innovate &middot; Build &middot; Grow</span>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
