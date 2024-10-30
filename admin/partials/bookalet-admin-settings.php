<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://bookalet.co.uk
 * @since      1.0.0
 *
 * @package    Bookalet
 * @subpackage Bookalet/admin/partials
 */
?>
<div class="wrap">
    <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
    <div id="col-container" class="wp-clearfix">
        <div id="col-left"><div class="col-wrap">
            <div class="form-wrap">
            <form action="options.php" method="post">
                <?php
                    settings_fields( $this->plugin_name );
                    do_settings_sections( $this->plugin_name );
                    submit_button();
                ?>
            </form>
            </div>
        </div></div>
        <div id="col-right"><div class="col-wrap">
            <?php 
            $apiKey = get_option('bookalet_apikey');
            if ($apiKey === null || strlen($apiKey) === 0) {
                include_once 'bookalet-admin-setup.php';
            }
            ?>
        </div></div>
    <div>
    
</div>