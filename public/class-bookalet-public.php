<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://bookalet.co.uk
 * @since      1.0.0
 *
 * @package    Bookalet
 * @subpackage Bookalet/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Bookalet
 * @subpackage Bookalet/public
 * @author     BnB Select Ltd <info@bookalet.co.uk>
 */
class Bookalet_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}
	
	public function register_shortcodes() {
		add_shortcode('bookalet', array( 'Bookalet_Public', 'bookalet_shortcode'));
	}

	public static function bookalet_shortcode( $atts) {
		
		$a = shortcode_atts( array(
			'id' => '',
			'property' => '',
			'monthcount' => '',
			'theme' => ''
		), $atts );

		$script = '<script src="https://widgets.bookalet.co.uk/publish.js" data-bookalet="' . $a['id'] . '"';
		
		if ($a['property'] <> '')
		{
			$script = $script . ' data-property="' . $a['property'] . '"';
		}
		
		if ($a['monthcount'] <> '')
		{
			$script = $script . ' data-monthcount="' . $a['monthcount'] . '"';
		}
		
		if ($a['theme'] <> '')
		{
			$script = $script . ' data-theme="' . $a['theme'] . '"';
		}
		$script = $script . '></script>';
		
		return $script;
	}
}
