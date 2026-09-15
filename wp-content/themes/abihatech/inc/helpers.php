<?php
/**
 * Shared template helpers.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'abihatech_initials' ) ) {
	function abihatech_initials( $text ) {
		$words = preg_split( '/[\s,]+/', trim( $text ) );
		$out   = '';
		foreach ( array_slice( $words, 0, 2 ) as $w ) {
			$out .= mb_substr( $w, 0, 1 );
		}
		return strtoupper( $out ?: 'A' );
	}
}
