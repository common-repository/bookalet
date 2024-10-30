<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * @link       http://bookalet.co.uk
 * @since      1.0.0
 *
 * @package    Bookalet
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

$option_name = 'bookalet_apikey';
 
delete_option($option_name);
delete_site_option($option_name);
 