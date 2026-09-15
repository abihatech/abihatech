<?php
/**
 * Closing call-to-action banner.
 * $args['title'], $args['text'] optional overrides.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$title = isset( $args['title'] ) ? $args['title'] : 'Ready to grow with AbihaTech?';
$text  = isset( $args['text'] ) ? $args['text'] : 'Whether you run a restaurant or need a ride around Diu, we\'ve built something for you.';
?>
<section class="section">
	<div class="container">
		<div class="cta-box">
			<h2><?php echo esc_html( $title ); ?></h2>
			<p><?php echo esc_html( $text ); ?></p>
			<div class="cta-actions">
				<a href="<?php echo esc_url( home_url( '/menuspilot' ) ); ?>" class="btn btn-primary">Try MenuSpilot &rarr;</a>
				<a href="<?php echo esc_url( home_url( '/car-rental' ) ); ?>" class="btn btn-outline">Book a Car &rarr;</a>
			</div>
		</div>
	</div>
</section>
