var container = document.querySelector('#container');
var msnry = new Masonry(container, {
	// options
	columnWidth : 320,
	itemSelector : '.item',
	isFitWidth : true
});

$('#container').masonry({
	itemSelector : '.item',
	columnWidth : 320,
	isFitWidth : true
});
//
var extended = [];
//array of extended tiles
var tileExtendingNow = false;
var previousItem;
//if tile is extending now
$('.item').click(function() {
	if (tileExtendingNow != true)
		$(this).stop();

	tileExtendingNow = true;
	//shink other extended tiles
	for (var i in extended) {
		if (extended[i] != this)
		{
			//shring all other extended tiles
			$(extended[i]).animate({
				height : "173px",
				width : "260px"
			}, 90, 'linear', function() {
				var index = extended.indexOf(this);
				extended.splice(index, 1);
				tileExtendingNow = false;
			})
		}
		else
		{
			//we clicked our extended tile, shrink it
			$(this).animate({
				height : "173px",
				width : "260px"
			}, 90, 'linear', function() {
				var index = extended.indexOf(this);
				extended.splice(index, 1);
				tileExtendingNow = false;
				//restart masonry
				$('#container').masonry({
					itemSelector : '.item',
					columnWidth : 320,
					isFitWidth : true
				});
			})
			return;
		}
	}
	
	//bring clicked div to front
	if(previousItem)
		previousItem.style.zIndex = 999;
	this.style.zIndex = 1000;
	previousItem=this;
	//start extending
	$(this).animate({
		height : "559px",
		width : "580px",
		opacity : 1
	}, 100, 'linear', function() {
		//restart masonry
		$('#container').masonry({
			itemSelector : '.item',
			columnWidth : 320,
			isFitWidth : true
		});

		tileExtendingNow = false;
		extended.push(this);//add this tile to extended ones
	})
});

$('.item').mouseover(function() {
	if ($.inArray(this, extended) <= -1) {
		if (tileExtendingNow != true)
			$(this).stop();
		$(this).animate({
			opacity : 0.6
		}, 200);
	}

});
$('.item').mouseout(function() {
	if ($.inArray(this, extended) <= -1) {
		if (tileExtendingNow != true)
			$(this).stop();
		$(this).animate({
			opacity : 1
		}, 200);
	}
}); 