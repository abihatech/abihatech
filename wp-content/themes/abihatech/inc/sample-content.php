<?php
/**
 * Seeds sample pages and testimonials on theme activation so the site is
 * populated out of the box. Everything is written through core WordPress
 * functions, which persist to the MySQL wp_posts / wp_postmeta tables.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function abihatech_seed_pages() {
	$pages = array(
		'menuspilot'  => 'MenuSpilot',
		'car-rental'  => 'Car Rental',
	);

	foreach ( $pages as $slug => $title ) {
		if ( ! get_page_by_path( $slug ) ) {
			wp_insert_post(
				array(
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_status'  => 'publish',
					'post_type'    => 'page',
					'post_content' => '',
				)
			);
		}
	}
}

function abihatech_seed_testimonials() {
	if ( get_option( 'abihatech_testimonials_seeded' ) ) {
		return;
	}

	$testimonials = array(
		array(
			'title'   => 'Zero-commission ordering changed our margins',
			'content' => 'We switched from a food-delivery app to MenuSpilot for in-house QR ordering and stopped losing 20% of every bill to commission. Setup took one afternoon.',
			'rating'  => 5,
			'product' => 'menuspilot',
			'role'    => 'Owner, Cafe Aroma',
		),
		array(
			'title'   => 'Our guests love scanning and ordering instantly',
			'content' => 'No more waiting for a waiter to take an order. Guests scan, browse the menu in their own language, and the kitchen gets it in real time.',
			'rating'  => 5,
			'product' => 'menuspilot',
			'role'    => 'Manager, Spice Route Restaurant',
		),
		array(
			'title'   => 'The dashboard makes managing three outlets easy',
			'content' => 'I run three locations and MenuSpilot gives me one dashboard for orders, menu updates, and daily revenue across all of them.',
			'rating'  => 4,
			'product' => 'menuspilot',
			'role'    => 'Founder, Urban Bites',
		),
		array(
			'title'   => 'On-time airport pickup, every single time',
			'content' => 'Booked an early morning airport transfer from Diu and the driver was waiting before we landed. Clean car, courteous driver, fair price.',
			'rating'  => 5,
			'product' => 'carrental',
			'role'    => 'Traveller, Diu Airport Transfer',
		),
		array(
			'title'   => 'Best outstation trip to Somnath and Gir',
			'content' => 'Booked an outstation package to Somnath and Gir with AbihaTech Car Rentals. The driver knew the routes well and the SUV was spotless and comfortable.',
			'rating'  => 5,
			'product' => 'carrental',
			'role'    => 'Family Trip, Outstation Package',
		),
		array(
			'title'   => 'Hourly rental was perfect for our beach day',
			'content' => 'Needed a car for a few hours to explore Nagoa Beach and the Diu Fort. The hourly rental option was affordable and the booking was instant.',
			'rating'  => 4,
			'product' => 'carrental',
			'role'    => 'Tourist, Hourly Rental',
		),
	);

	foreach ( $testimonials as $t ) {
		$post_id = wp_insert_post(
			array(
				'post_title'   => $t['title'],
				'post_content' => $t['content'],
				'post_status'  => 'publish',
				'post_type'    => 'testimonial',
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			update_post_meta( $post_id, '_rating', $t['rating'] );
			update_post_meta( $post_id, '_product', $t['product'] );
			update_post_meta( $post_id, '_role', $t['role'] );
		}
	}

	update_option( 'abihatech_testimonials_seeded', 1 );
}

function abihatech_run_seed() {
	abihatech_seed_pages();
	abihatech_seed_testimonials();
}
add_action( 'after_switch_theme', 'abihatech_run_seed' );

/**
 * Also seed on init the first time, so content appears even when the theme
 * was already active before these files were added (no re-activation needed).
 */
function abihatech_maybe_seed_on_init() {
	if ( ! get_option( 'abihatech_testimonials_seeded' ) ) {
		abihatech_run_seed();
	}
}
add_action( 'init', 'abihatech_maybe_seed_on_init' );

/**
 * Helper: fetch testimonials, optionally filtered by product ('menuspilot' | 'carrental').
 */
function abihatech_get_testimonials( $product = '', $limit = -1 ) {
	$args = array(
		'post_type'      => 'testimonial',
		'posts_per_page' => $limit,
		'orderby'        => 'date',
		'order'          => 'DESC',
	);
	if ( $product ) {
		$args['meta_query'] = array(
			array(
				'key'   => '_product',
				'value' => $product,
			),
		);
	}
	return get_posts( $args );
}
