<?php
/**
 * AbihaTech Marketing theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ABIHATECH_VERSION', '1.0.0' );

/**
 * Theme setup.
 */
function abihatech_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'script', 'style' ) );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'abihatech' ),
			'footer'  => __( 'Footer Menu', 'abihatech' ),
		)
	);
}
add_action( 'after_setup_theme', 'abihatech_setup' );

/**
 * Enqueue styles and scripts.
 */
function abihatech_assets() {
	wp_enqueue_style(
		'abihatech-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'abihatech-style', get_stylesheet_uri(), array(), ABIHATECH_VERSION );
	wp_enqueue_script( 'abihatech-main', get_template_directory_uri() . '/assets/js/main.js', array(), ABIHATECH_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'abihatech_assets' );

/**
 * Register default primary menu when none is assigned, so the header never renders empty.
 */
function abihatech_fallback_menu() {
	echo '<ul>';
	echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'abihatech' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/menuspilot' ) ) . '">MenuSpilot</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/car-rental' ) ) . '">' . esc_html__( 'Car Rental', 'abihatech' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/#reviews' ) ) . '">' . esc_html__( 'Reviews', 'abihatech' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/#contact' ) ) . '">' . esc_html__( 'Contact', 'abihatech' ) . '</a></li>';
	echo '</ul>';
}

require get_template_directory() . '/inc/helpers.php';
require get_template_directory() . '/inc/custom-post-types.php';
require get_template_directory() . '/inc/sample-content.php';
