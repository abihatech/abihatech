<?php
/**
 * Generic page fallback (used for any page other than the front page,
 * "menuspilot", or "car-rental").
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="main-content">
	<div class="section">
		<div class="container" style="max-width:760px;">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<h1><?php the_title(); ?></h1>
				<div><?php the_content(); ?></div>
			<?php endwhile; ?>
		</div>
	</div>
</main>

<?php get_footer(); ?>
