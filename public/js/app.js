 $(document).ready(function(){
   // Your code here
   $('[rel="popover"]').popover({})
   $('.nav a[href*=#]').bind("click", $.CHLOI.navigationJump)   
 });

 $.CHLOI = function(){
   $(document).ready(function(){
     try {
       if(location.hash.length > 0){
         var target = location.hash.split('/')[1];
         $('html, body').animate({scrollTop: $('#'+target).offset().top-90}, 500);
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
         scrollTop: $(target).offset().top-90
       }, 500, function(){
         location.hash = '#/'+target.split('#')[1];
       });
     }
   }
 }();
 
