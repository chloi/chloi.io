 $(document).ready(function(){
   // Your code here
   $('[rel="popover"]').popover({});
   $('.navbar').scrollspy()
   $('.nav a[href*=#]').bind("click", $.CHLOI.navigationJump);
   
   $("#introduction").addClass("tran").each(function(x){
     var that = this;
     window.setTimeout(function(){$(that).slideUp('slow')},2000);
   })
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
 
