<div id="<?php echo $widget->Id; ?>" class="inside" style="clear:both;">
    <div id="preview_<?php echo $widget->Id; ?>"></div>
    <?php if ($widget->Description != '') {?>
    <h4 class="left"><?php echo $widget->Description; ?></h4>
    <?php }?>
    <div id="publishforfield_<?php echo $widget->Id; ?>" class="field">
        <p class="picker-label-wrapper"><label class="picker-label">Publish for:</label></p>
        <div style="float:left;width:200px;">
        <?php if ($properties['edition']  == 2 || $properties['edition']  == 3) { ?>
            <label id="publishforfield_all_<?php echo $widget->Id; ?>"><input type="radio" name="publishfor_<?php echo $widget->Id; ?>" value="1" /> All Properties</label><br/>
         <?php } ?>
        <label id="publishforfield_prop_<?php echo $widget->Id; ?>"><input type="radio" name="publishfor_<?php echo $widget->Id; ?>" value="2" /> A Property</label><br/>
        <label id="publishforfield_group_<?php echo $widget->Id; ?>"><input type="radio" name="publishfor_<?php echo $widget->Id; ?>" value="3" /> A Property group</label>
        </div>
    </div>

    <div id="propertyfield_<?php echo $widget->Id; ?>" class="field">
        <p class="picker-label-wrapper"><label class="picker-label" for="property_<?php echo $widget->Id; ?>">Property:</label></p>
        <select name="property_<?php echo $widget->Id; ?>" id="property_<?php echo $widget->Id; ?>" data-disabled="<?php echo (($widget->Type > 1 && $properties['edition'] == 4) ? 'true' : 'false'); ?>">
            <option>Please select..</option>
        </select>
    </div>
    <div id="propertygroupfield_<?php echo $widget->Id; ?>" class="field">
        <p class="picker-label-wrapper"><label class="picker-label" for="propertygroup_<?php echo $widget->Id; ?>">Property group:</label></p>
        <select name="propertygroup_<?php echo $widget->Id; ?>" id="propertygroup_<?php echo $widget->Id; ?>">
            <option>Please select..</option>
        </select>
    </div>
    <div id="monthcountfield_<?php echo $widget->Id; ?>" class="field">
        <p class="picker-label-wrapper"><label class="picker-label" for="monthcount_<?php echo $widget->Id; ?>">Months to display:</label></p>
        <select name="monthcount_<?php echo $widget->Id; ?>" id="monthcount_<?php echo $widget->Id; ?>">
            <option>Default</option>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
        </select>
    </div>
    <div id="themefield_<?php echo $widget->Id; ?>" class="field">
        <p class="picker-label-wrapper"><label class="picker-label" for="theme_<?php echo $widget->Id; ?>">Theme:</label></p>
        <select name="theme_<?php echo $widget->Id; ?>" id="theme_<?php echo $widget->Id; ?>">
            <option>Please select..</option>
        </select>
    </div>
    <div id="output_<?php echo $widget->Id; ?>">
        <input type="hidden" name="code_<?php echo $widget->Id; ?>" id="code_<?php echo $widget->Id; ?>" />
    </div>
    <br class="clear" /><br class="clear" />

</div>
<script>
    jQuery(document).ready(function () {
        bookaletWidgetBuilder.publisher("<?php echo $widget->Id ?>", "<?php echo $widget->Type ?>", properties, propertyGroups, themes);
    });
</script>