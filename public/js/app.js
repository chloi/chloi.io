(function($) {

	$.fn.chloi = function(callback, code) {
		if(code == undefined) code = "38,38,40,40,37,39,37,39,66,65";

		return this.each(function() {
			var kkeys = [];
			$(this).keydown(function(e){
				kkeys.push( e.keyCode );
				while (kkeys.length > code.split(',').length) {
					kkeys.shift();
				}
				if ( kkeys.toString().indexOf( code ) >= 0 ){
					$(this).unbind('keydown', arguments.callee);
					callback(e);
				}
			});
		});
	}

})(jQuery);

 $(document).ready(function(){
   // Your code here
   $('[rel="popover"]').popover({});
   $('.navbar').scrollspy()
   $('.nav a[href*=#]').bind("click", $.CHLOI.navigationJump);
   
   $("#introduction").addClass("tran").each(function(x){
     var that = this;
     window.setTimeout(function(){$(that).slideUp('slow')},2000);
   })
   
		$(window).chloi(function(){
		  $('#myMydal').modal('show');
		});
   
 });

 
 $.CHLOI = function(){
   $(document).ready(function(){
     try {
       if(location.hash.length > 0){
         var target = location.hash.split('/')[1];
         $('html, body').animate({scrollTop: $('#'+target).offset().top }, 500);
         $('.nav a[href=#'+target+']').addClass('active');           
       }
     } catch(e) { location.hash = ''; }
   });

   return {
     navigationJump: function(e){
       e.preventDefault();

       $('.nav .active').removeClass('active');
       $(this).addClass('active');

       var target = $(this).attr('href');
       $('html, body').animate({
         scrollTop: $(target).offset().top
       }, 250, function(){
         location.hash = '#/'+target.split('#')[1];
       });
     }
   }
 }();
 
