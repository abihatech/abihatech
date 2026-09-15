<?php
/**
 * Fallback template (blog / search / archive listings).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main id="main-content">
	<div class="section">
		<div class="container">
			<?php if ( have_posts() ) : ?>
				<div class="section-head">
					<h1><?php is_home() ? esc_html_e( 'Latest Updates', 'abihatech' ) : the_archive_title(); ?></h1>
				</div>
				<div style="display:grid;gap:28px;max-width:760px;margin:0 auto;">
					<?php
					while ( have_posts() ) :
						the_post();
						?>
						<article style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow);">
							<h2 style="margin-bottom:8px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p style="color:var(--text-muted);"><?php echo esc_html( get_the_date() ); ?></p>
							<p><?php the_excerpt(); ?></p>
							<a class="btn btn-ghost btn-sm" href="<?php the_permalink(); ?>">Read more &rarr;</a>
						</article>
					<?php endwhile; ?>
				</div>
				<div class="text-center" style="margin-top:32px;">
					<?php the_posts_pagination(); ?>
				</div>
			<?php else : ?>
				<div class="section-head">
					<h1><?php esc_html_e( 'Nothing found', 'abihatech' ); ?></h1>
					<p><?php esc_html_e( 'Try visiting the homepage instead.', 'abihatech' ); ?></p>
					<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to Home</a>
				</div>
			<?php endif; ?>
		</div>
	</div>
</main>

<?php get_footer(); ?>
