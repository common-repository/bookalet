<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://bookalet.co.uk
 * @since             1.0.3
 * @package           Bookalet
 *
 * @wordpress-plugin
 * Plugin Name:       Bookalet
 * Plugin URI: 		  https://www.bookalet.co.uk/wordpress
 * Description:       Allows for easy management and publication of Bookalet widgets (Availability Calendards, Booking Forms, Enquiry Forms etc) from your WordPress website.
 * Version:           1.0.3
 * Author:            BnB Select Ltd
 * Author URI:        http://bookalet.co.uk
 * Copyright: 		  2018 BnB Select Ltd
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bookalet
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-bookalet-activator.php
 */
function activate_bookalet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-bookalet-activator.php';
	Bookalet_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-bookalet-deactivator.php
 */
function deactivate_bookalet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-bookalet-deactivator.php';
	Bookalet_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_bookalet' );
register_deactivation_hook( __FILE__, 'deactivate_bookalet' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-bookalet.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_bookalet() {

	$plugin = Bookalet::get_instance();
	$plugin->run();

}
run_bookalet();
