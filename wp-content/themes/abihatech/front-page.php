<?php
/**
 * Homepage: hero, products overview, both product teasers, reviews,
 * happy customers, and closing CTA.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="main-content">
	<?php
	get_template_part( 'template-parts/section', 'hero' );
	get_template_part( 'template-parts/section', 'products' );
	get_template_part( 'template-parts/section', 'menuspilot' );
	get_template_part( 'template-parts/section', 'car-rental' );
	get_template_part( 'template-parts/section', 'reviews', array( 'limit' => 6 ) );
	get_template_part( 'template-parts/section', 'happy-customers' );
	get_template_part( 'template-parts/section', 'cta' );
	?>
</main>

<?php get_footer(); ?>
