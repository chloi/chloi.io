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
	
	$.fn.serializeObject = function(cb){
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return cb(o);
  };

})(jQuery);

$(document).ready(function(){
 // $('[rel="popover"]').popover({});
 $('.navbar').scrollspy()
 $('.nav a[href*=#]').bind("click", $.CHLOI.navigationJump);
 $('.btt a[href*=#]').bind("click", $.CHLOI.navigationJump);   

  $(document).bind('touchstart',function(e){
    var allTouches = event.touches;
    if (allTouches.length === 11) {
      $("#home img").attr('src','img/brand.jpg')
    }
  });
  
  // message form
  $("form.messages").submit(function(e){
    
    $(this).serializeObject(function(obj){
      
      var win = function(){
        $("#alert").hide().html('<div class="alert alert-success"><h4>Message Sent!</h4><p>Thanks for your message. we will get back to you as soon as possible.</p></div>').fadeIn(200)
        $("form.messages textarea").val("").focus()
      }
      
      var fail = function(reply){
        var errors = JSON.parse(reply.responseText)
        var html  = '<div class="alert"><h4>Message not Sent</h4><ul>'
        errors.messages.forEach(function(error){
          html += '<li>' + error + '</li>'
        })
        html += '</ul></div>'
        $("#alert").hide().html(html).fadeIn(200)
        
        // lets focus first element that needs fixing
        if(errors.details["name"]){
          $("form.messages [name=name]").focus()
        }else if(errors.details["email"]){
          $("form.messages [name=email]").focus()
        }else if(errors.details["body"]){
          $("form.messages [name=body]").focus()
        }
        
      }
      
      $.ajax({  
        type: "POST",
        url: "/messages",
        processData: true,
        data: obj,
        async: true,
        success: win,
        error: fail
      })
      
    })
    
    return false;
  });

	$(window).chloi(function(){
	  console.log("Well Done");
	});
 
});


$.CHLOI = function(){
 $(document).ready(function(){
   try {
     if(location.hash.length > 0){
       var target = location.hash.split('/')[1];
       var of = (target == "header") ? 0 : 350;
       $('html, body').animate({scrollTop: $('#'+target).offset().top + of}, 500);
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
     console.log(target)
     $('html, body').animate({
       scrollTop: $(target).offset().top
     }, 250, function(){
       location.hash = '#/'+target.split('#')[1];
     });
   }
 }
}();
 
