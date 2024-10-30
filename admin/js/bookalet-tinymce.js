(function() {
	tinymce.PluginManager.add( 'bookalet', function( editor, url ) {
		// Add Button to Visual Editor Toolbar
		editor.addButton('bookalet', {
			title: 'Insert Bookalet widget',
			image: url + '../../icon.png',
			cmd: 'bookalet',
		});	
		
		// Add Command when Button Clicked
		editor.addCommand('bookalet', function() {
			// Check we have selected some text that we want to link
			editor.windowManager.open({
				title: 'Bookalet Widgets',
				url: url + '../../picker.php',
				width: 500,
				height: 300
			});
            $('#' + editor.windowManager.windows[0]._id).css('z-index', 999999);
		});
	});

})();