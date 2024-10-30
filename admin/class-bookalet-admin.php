<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://bookalet.co.uk
 * @since      1.0.0
 *
 * @package    Bookalet
 * @subpackage Bookalet/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Bookalet
 * @subpackage Bookalet/admin
 * @author     BnB Select Ltd <info@bookalet.co.uk>
 */
class Bookalet_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;
	
	/**
	 * The options name to be used in this plugin
	 *
	 * @since  	1.0.0
	 * @access 	private
	 * @var  	string 		$option_name 	Option name of this plugin
	 */
	private $option_name = 'bookalet';
	
	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;
	
	private $api = null;
	
	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    		The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-bookalet-api.php';

		$apiKey = get_option($this->option_name . '_apikey');
		if ($apiKey !== null || strlen($apiKey) > 0) {
			$this->api = new Bookalet_API($apiKey);
		}
		
		if ( is_admin() ) {
			add_action( 'init', array(  $this, 'setup_tinymce_plugin' ) );
		}
		
	}
	
	/**
	 * Initialize admin area
	 *
	 * @since    1.0.0
	 */
	public function admin_init() {
		$this->register_settings();
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Bookalet_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Bookalet_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/bookalet-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/bookalet-admin.js', array( 'jquery' ), $this->version, false );

	}
	
	/**
	 * Check if the current user can edit Posts or Pages, and is using the Visual Editor
	 * If so, add some filters so we can register our plugin
	 */
	function setup_tinymce_plugin() {

		// Check if the logged in WordPress User can edit Posts or Pages
		// If not, don't register our TinyMCE plugin
			
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}

		// Check if the logged in WordPress User has the Visual Editor enabled
		// If not, don't register our TinyMCE plugin
		if ( get_user_option( 'rich_editing' ) !== 'true' ) {
			return;
		}

		// Setup some filters
		add_filter( 'mce_external_plugins', array( &$this, 'add_tinymce_plugin' ) );
		add_filter( 'mce_buttons', array( &$this, 'add_tinymce_toolbar_button' ) );
			
	}
	
	/**
	 * Adds a TinyMCE plugin compatible JS file to the TinyMCE / Visual Editor instance
	 *
	 * @param array $plugin_array Array of registered TinyMCE Plugins
	 * @return array Modified array of registered TinyMCE Plugins
	 */
	function add_tinymce_plugin( $plugin_array ) {
		$plugin_array['bookalet'] = plugin_dir_url( __FILE__ ) . 'js/bookalet-tinymce.js';
		return $plugin_array;
	}
    
	/**
	 * Adds a button to the TinyMCE / Visual Editor which the user can click
	 * to insert a link with a custom CSS class.
	 *
	 * @param array $buttons Array of registered TinyMCE Buttons
	 * @return array Modified array of registered TinyMCE Buttons
	 */
	function add_tinymce_toolbar_button( $buttons ) {
		array_push( $buttons, '|', 'bookalet' );
		return $buttons;
	}
	
	/**
	 * Create menu for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function menu() {
	
		add_submenu_page('options-general.php', 'Bookalet Widgets', 'Bookalet', 'manage_options', 'bookalet', array( $this, 'display_settings_page'), plugin_dir_url( __FILE__ ).'icon.png');

	}
	
	/**
	 * Create plugin action links
	 *
	 * @since    1.0.0
	 */
	public function action_links($links, $file ) {
		if ( $file != plugin_basename($this->plugin_name. "/" . $this->plugin_name . ".php"))
			return $links;

		$settings_link = '<a href="' . menu_page_url( 'bookalet', false ) . '">' . esc_html( __( 'Settings', 'b' ) ) . '</a>';

		array_unshift( $links, $settings_link );
		return $links;
	}
	
	/**
	 * Register all related settings of this plugin
	 *
	 * @since  1.0.0
	 */
	public function register_settings() {
			
		add_settings_section(
			$this->option_name . '_apikey',
			__( 'API Key', $this->plugin_name ),
			array( $this, $this->option_name . '_general_cb' ),
			$this->plugin_name
		);
		add_settings_field(
			$this->option_name . 'apikey',
			__( 'API Key', $this->plugin_name ),
			array( $this, $this->option_name . '_apikey_cb' ),
			$this->plugin_name,
			$this->option_name . '_apikey',
			array( 'label_for' => $this->option_name . 'apikey' )
		);
	
		register_setting( $this->plugin_name, $this->option_name . '_apikey');
	}
	
	/**
	 * Render the text for the api key section
	 *
	 * @since  1.0.0
	 */
	public function bookalet_general_cb() {
		echo '<p>' . __( 'You can find your Bookalet API Key in your Bookalet account under "Administration" -> "Account Details"', 'outdated-notice' ) . '</p>';
	}
	
	/**
	 * Render the radio input field for position option
	 *
	 * @since  1.0.0
	 */
	public function bookalet_apikey_cb() {
		$apikey = get_option( $this->option_name . '_apikey' );
		?>
			<fieldset>
				<input type='text' name="<?php echo $this->option_name . '_apikey'; ?>" id="<?php echo $this->option_name . '_apikey'; ?>" value='<?php echo $apikey; ?>' style="width:300px">
			</fieldset>
		<?php
	}
	
	/**
	 * Render the settings page for plugin
	 *
	 * @since  1.0.0
	 */
	public function display_settings_page() {
		include_once 'partials/bookalet-admin-settings.php';
	}

}
