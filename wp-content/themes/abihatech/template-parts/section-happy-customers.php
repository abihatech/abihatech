<?php
/**
 * "Happy customers" stats + avatar wall section.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$names   = array( 'Rakesh Patel', 'Meera Shah', 'Cafe Aroma', 'Urban Bites', 'Sanjay Rao', 'Priya Nair', 'Spice Route', 'Amit Desai', 'Nagoa Stays', 'Fatima Sheikh', 'Kiran Joshi', 'Diu Trails' );
$palette = array( '#155EEF', '#00B2FF', '#FF8A00', '#0A1F44', '#16A34A', '#E67300' );
?>
<section class="section" id="happy-customers">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Our Happy Customers</span>
			<h2>Trusted by restaurants and travellers alike</h2>
			<p>A growing community of businesses and guests who rely on AbihaTech every day.</p>
		</div>

		<div class="stats-bar">
			<div class="stat-box"><strong>500+</strong><span>Restaurants on MenuSpilot</span></div>
			<div class="stat-box"><strong>10,000+</strong><span>Rides completed</span></div>
			<div class="stat-box"><strong>4.9&#9733;</strong><span>Average rating</span></div>
			<div class="stat-box"><strong>2</strong><span>Products, one mission</span></div>
		</div>

		<div class="avatar-wall">
			<?php foreach ( $names as $i => $name ) : ?>
				<div class="happy-avatar" style="background:<?php echo esc_attr( $palette[ $i % count( $palette ) ] ); ?>;" title="<?php echo esc_attr( $name ); ?>">
					<?php echo esc_html( abihatech_initials( $name ) ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
