//init masonry
var container = document.querySelector('#container');
var msnry = new Masonry(container, {
	columnWidth : 320,
	itemSelector : '.item',
	isFitWidth : true
});
$('#container').masonry({
	itemSelector : '.item',
	columnWidth : 320,
	isFitWidth : true
});


var extended = [];//array of extended tiles
var tileExtendingNow = false;//if some tile is extending now
var previousItem;//used to bring extending tile on top

//click on tile event
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
				//show apropriate tile content
				$(this).children('.smallTileContent').css('display', 'block');
				$(this).children('.bigTileContent').css('display', 'none');
				//and remove them from array extended
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
				//show apropriate tile content
				$(this).children('.smallTileContent').css('display', 'block');
				$(this).children('.bigTileContent').css('display', 'none');

				//remove this from array extended
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
		//restart masonry layout
		$('#container').masonry({
			itemSelector : '.item',
			columnWidth : 320,
			isFitWidth : true
		});
		//show apropriate tile content
		$(this).children('.smallTileContent').css('display', 'none');
		$(this).children('.bigTileContent').css('display', 'block');
		
		tileExtendingNow = false;
		extended.push(this);//add this tile to extended ones
	})
});

//mouse over tile event
$('.item').mouseover(function() {
	//if is not in array extended
	if ($.inArray(this, extended) <= -1) {
		if (tileExtendingNow != true)
			$(this).stop();
		$(this).animate({
			opacity : 0.6
		}, 200);
	}

});
//mouse out of tile event
$('.item').mouseout(function() {
	//if is not in array extended
	if ($.inArray(this, extended) <= -1) {
		if (tileExtendingNow != true)
			$(this).stop();
		$(this).animate({
			opacity : 1
		}, 200);
	}
}); 