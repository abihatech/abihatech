<?php
/**
 * Customer reviews section.
 * $args['product'] => '' | 'menuspilot' | 'carrental' to filter reviews.
 * $args['limit']   => number of reviews to show (default 6).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$product      = isset( $args['product'] ) ? $args['product'] : '';
$limit        = isset( $args['limit'] ) ? (int) $args['limit'] : 6;
$testimonials = abihatech_get_testimonials( $product, $limit );

$initials_palette = array( '#155EEF', '#00B2FF', '#FF8A00', '#0A1F44', '#16A34A', '#E67300' );
?>
<section class="section section--alt" id="reviews">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow eyebrow--amber">Customer Reviews</span>
			<h2>What people say about MenuSpilot &amp; our rides</h2>
			<p>Real feedback from restaurant owners and travellers using AbihaTech's products.</p>
		</div>

		<?php if ( $testimonials ) : ?>
		<div class="reviews-track">
			<?php foreach ( $testimonials as $i => $post ) :
				$rating = (int) get_post_meta( $post->ID, '_rating', true ) ?: 5;
				$prod   = get_post_meta( $post->ID, '_product', true );
				$role   = get_post_meta( $post->ID, '_role', true );
				$color  = $initials_palette[ $i % count( $initials_palette ) ];
				?>
			<article class="review-card">
				<div style="display:flex;align-items:center;gap:10px;">
					<span class="review-stars"><?php echo esc_html( str_repeat( '&#9733;', $rating ) . str_repeat( '&#9734;', 5 - $rating ) ); ?></span>
					<span class="review-source <?php echo 'carrental' === $prod ? 'review-source--cr' : 'review-source--ms'; ?>">
						<?php echo 'carrental' === $prod ? 'Car Rental' : 'MenuSpilot'; ?>
					</span>
				</div>
				<p class="quote">&ldquo;<?php echo esc_html( get_the_excerpt( $post ) ?: wp_trim_words( $post->post_content, 28 ) ); ?>&rdquo;</p>
				<div class="review-person">
					<div class="review-avatar" style="background:<?php echo esc_attr( $color ); ?>;"><?php echo esc_html( abihatech_initials( $post->post_title ) ); ?></div>
					<div>
						<strong><?php echo esc_html( $role ? explode( ',', $role )[0] : 'Verified Customer' ); ?></strong>
						<span><?php echo esc_html( $role ); ?></span>
					</div>
				</div>
			</article>
			<?php endforeach; ?>
		</div>
		<?php else : ?>
		<p class="text-center" style="color:var(--text-muted);">Reviews will appear here once published from the WordPress admin.</p>
		<?php endif; ?>
	</div>
</section>
