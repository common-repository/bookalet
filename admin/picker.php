<?php
define('WP_USE_THEMES', false);
require_once('../../../../wp-load.php');
require_once('class-bookalet-api.php');
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Bookalet Widgets</title>
  <?php 
  $bookalet =  Bookalet::get_instance();
  wp_enqueue_script( $bookalet->get_plugin_name(), plugin_dir_url( __FILE__ ) . 'js/bookalet-admin.js', array( 'jquery' ), $bookalet->get_version(), false );
  do_action( 'admin_print_scripts' ); 
  wp_enqueue_style('common');
  wp_enqueue_style('buttons');
  do_action( 'admin_print_styles' ); 
  ?>
  <script>
    bookaletWidgetBuilder.setMode('wordpress');
    jQuery(document).ready(function(){
        var button = jQuery('#btnSubmit');
        var picker = jQuery('#widgetPicker');

        picker.on('change', function(){
            jQuery('#widgets div').removeClass('is-visible');
            jQuery('#' + jQuery(this).val()).addClass('is-visible');
            if (jQuery(this).val() != '-1') {
                button.addClass('is-visible');
            } else {
                button.removeClass('is-visible');
            }
        });

        jQuery(button).on('click', function() 
        {
            var id = picker.val();
            var codeField = jQuery('#code_' + id);
            if (codeField.val().length > 0)
            {
                top.tinymce.activeEditor.insertContent(codeField.val());
                top.tinymce.activeEditor.windowManager.close();
            }
        });
    });
  </script>
  <style>
    body {
        padding: 10px;
        margin:0 auto;
        height: auto;
        width:100%;
        max-width:400px;
    }
    .field{
        clear:both;
        float:left;
        padding: 0.6em 0;
        width:100%;
    }
    .fieldfor{
        float:left;
        width:100%;
    }
    .picker-label-wrapper{
        float:left;
        margin: 0;
        width: 130px;
    }
    .picker-label{
        vertical-align:top;
    }
    #widgets > div{
        padding-top:1em;
    }
    #widgets > div{
        display:none;
    }
    #widgets > div.is-visible{
        display:block;
    }
    label{
        font-weight:normal;
    }
    select{
        font-size: 1em;
        height: 1.5em;
    }
    #btnSubmit{
        display:none;
    }
    #btnSubmit.is-visible{
        display:inline-block;
    }
  </style>
</head>
<body class="wp-core-ui">
<?php
$api = null;
$apiKey = get_option('bookalet_apikey');
if ($apiKey != null || strlen($apiKey) > 0) {
    $api = new Bookalet_API($apiKey);
}

if ($api == null) {
    include_once 'partials/bookalet-admin-setup.php';
} 
else 
{
    try {
        $groups = $api->getPropertyGroups();
        $properties = $api->getProperties();
        $widgets = $api->getWidgets();
        $themes = $api->getThemes();

?>   
<script>
var properties = {<?php echo $properties['props'] ?>};
var propertyGroups = {<?php echo $groups ?>};
var themes = {<?php echo $themes ?>};
</script>
<div>
    <select id="widgetPicker">
        <option value="-1">Choose a widget</option>
        <optgroup label="Default Widgets">
        <?php foreach($widgets['default'] as $widget) { ?>
            <option value="<?php echo $widget->Id; ?>"><?php echo $api->getWidgetType($widget->Type); ?></option>
        <?php } ?>
        </optgroup>
        <?php if(count($widgets['additional']) > 0) { ?>
            <optgroup label="Custom Widgets">
            <?php foreach($widgets['additional'] as $widget) { ?>
                <option value="<?php echo $widget->Id; ?>"><?php echo $api->getWidgetType($widget->Type); ?> - <?php echo $widget->Description; ?></option>
            <?php } ?>
            </optgroup>
        <?php } ?>
    </select>
</div>
<div id="widgets">
<?php
        foreach($widgets['default'] as $widget)
        {
            include 'picker.widget.php';
        }
        foreach($widgets['additional'] as $widget)
        {
            include 'picker.widget.php';
        }

    } catch (Exception $e) {
        include_once 'partials/bookalet-admin-error.php';
    }	
}
?>
</div>
<button id="btnSubmit" class="button button-primary button-large right">Insert</button>
</body>
</html>