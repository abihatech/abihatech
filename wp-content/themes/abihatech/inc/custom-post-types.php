<?php
/**
 * Registers the Testimonial custom post type.
 *
 * Stored in the standard WordPress MySQL tables (wp_posts for the review
 * text, wp_postmeta for rating / product / customer role) so testimonials
 * are editable from wp-admin without any extra database setup.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function abihatech_register_testimonial_cpt() {
	register_post_type(
		'testimonial',
		array(
			'labels'       => array(
				'name'          => __( 'Testimonials', 'abihatech' ),
				'singular_name' => __( 'Testimonial', 'abihatech' ),
				'add_new_item'  => __( 'Add New Testimonial', 'abihatech' ),
			),
			'public'       => true,
			'show_in_menu' => true,
			'menu_icon'    => 'dashicons-star-filled',
			'supports'     => array( 'title', 'editor', 'thumbnail' ),
			'has_archive'  => false,
			'show_in_rest' => true,
			'rewrite'      => false,
		)
	);
}
add_action( 'init', 'abihatech_register_testimonial_cpt' );

/**
 * Meta box for rating, product tag, and customer role.
 */
function abihatech_testimonial_metabox() {
	add_meta_box( 'abihatech_testimonial_meta', __( 'Review Details', 'abihatech' ), 'abihatech_testimonial_meta_html', 'testimonial', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'abihatech_testimonial_metabox' );

function abihatech_testimonial_meta_html( $post ) {
	wp_nonce_field( 'abihatech_testimonial_save', 'abihatech_testimonial_nonce' );
	$rating   = get_post_meta( $post->ID, '_rating', true ) ?: 5;
	$product  = get_post_meta( $post->ID, '_product', true ) ?: 'menuspilot';
	$role     = get_post_meta( $post->ID, '_role', true );
	?>
	<p>
		<label><?php esc_html_e( 'Rating (1-5)', 'abihatech' ); ?></label><br>
		<input type="number" min="1" max="5" name="abihatech_rating" value="<?php echo esc_attr( $rating ); ?>">
	</p>
	<p>
		<label><?php esc_html_e( 'Product', 'abihatech' ); ?></label><br>
		<select name="abihatech_product">
			<option value="menuspilot" <?php selected( $product, 'menuspilot' ); ?>>MenuSpilot</option>
			<option value="carrental" <?php selected( $product, 'carrental' ); ?>>Car Rental</option>
		</select>
	</p>
	<p>
		<label><?php esc_html_e( 'Customer Role / Location', 'abihatech' ); ?></label><br>
		<input type="text" style="width:100%;max-width:360px;" name="abihatech_role" value="<?php echo esc_attr( $role ); ?>" placeholder="e.g. Cafe Owner, Diu">
	</p>
	<?php
}

function abihatech_testimonial_save( $post_id ) {
	if ( ! isset( $_POST['abihatech_testimonial_nonce'] ) || ! wp_verify_nonce( $_POST['abihatech_testimonial_nonce'], 'abihatech_testimonial_save' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( isset( $_POST['abihatech_rating'] ) ) {
		update_post_meta( $post_id, '_rating', absint( $_POST['abihatech_rating'] ) );
	}
	if ( isset( $_POST['abihatech_product'] ) ) {
		update_post_meta( $post_id, '_product', sanitize_text_field( $_POST['abihatech_product'] ) );
	}
	if ( isset( $_POST['abihatech_role'] ) ) {
		update_post_meta( $post_id, '_role', sanitize_text_field( $_POST['abihatech_role'] ) );
	}
}
add_action( 'save_post_testimonial', 'abihatech_testimonial_save' );
