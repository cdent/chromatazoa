$(function() {
	function buildSlidesDom(tiddlers) {
		var impressDiv = $('#impress');
		$.each(tiddlers, function(index, tiddler) {
			var html = tiddler.render ? tiddler.render : tiddler.text,
				newDiv = $('<div class="step">'),
				fields = tiddler.fields;
			newDiv.html(html);
			$.each(fields, function(field, value) {
				if (field.match(/^data-/)) {
					newDiv.attr(field, value);
				}
				if (field === '_id') {
					newDiv.attr('id', value);
				}
				if (field === '_class') {
					newDiv.addClass(value);
				}
			});
			console.log(newDiv.attr('data-x'));
			newDiv.appendTo(impressDiv);
		});
		// start me up!
		impress().init();
	}

	$.ajax({
		dataType: 'json',
		// XXX: replace with current space
		url: '/bags/chromatazoa_public/tiddlers?select=tag:slide;sort=title;fat=1;render=1',
		success: buildSlidesDom,
	});
});
