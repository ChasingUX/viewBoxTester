$(document).ready(function() {

  var $svg = $('svg')[0],
     $box = $svg.getAttribute('viewBox'),
     $currentViewBox = $box.split(/\s+|,/),
     vbX = $currentViewBox[0],
     vbY = $currentViewBox[1],
     vbWidth = $currentViewBox[2],
     vbHeight = $currentViewBox[3],
     $widthIndicator = $("#scaleBoxWidth h3 span"),
     $heightIndicator = $("#scaleBoxHeight h3 span"),
     $numInput = $(".number input"),
     $minXInput = $("#scaleBoxX input"),
     $minYInput = $("#scaleBoxY input"),
     $vbReport = $('.report h3 span');
         
  $(".flat-slider").slider({
    max: 1600,
    min: 100,
    range: "min",
    step: 9,
    slide: function( event, ui ) {
      var currentSlider = event.target;
      
      if($(currentSlider).hasClass('scaleBoxWidth')){
        vbWidth = ui.value;
        $widthIndicator.text(vbWidth + " units");

      } else if($(currentSlider).hasClass('scaleBoxHeight')){
        vbHeight = ui.value;
        $heightIndicator.text(vbHeight + " units");
      }

      $svg.setAttribute('viewBox', vbX + ' ' + vbY + ' ' + vbWidth + ' ' + vbHeight); 
      $vbReport.text("[ " + vbX + ' ' + vbY + ' ' + vbWidth + ' ' + vbHeight +" ]")
    },
  }).slider("pips", {
    first: "pip",
    last: "pip"
  }).slider("float");

  //set value sliders to that of svg on load
  $( ".scaleBoxWidth" ).slider( "value", vbWidth );
  $( ".scaleBoxHeight" ).slider( "value", vbHeight );

  // set header amounts on load
  $minXInput.attr("placeholder", vbX);
  $minYInput.attr("placeholder", vbY);
  $widthIndicator.text(vbWidth + " units");
  $heightIndicator.text(vbHeight + " units");
  $vbReport.text("[ " + vbX + ' ' + vbY + ' ' + vbWidth + ' ' + vbHeight +" ]");


  //EVENTS
  $($numInput).on('keydown', function(e){
    // Allow: backspace, delete, tab, escape, enter and.
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
      (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    // Dont allow lettrs and other keys
    else if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105 )) {
      e.preventDefault();
    } 
  });

  $($numInput).on('keyup', function(e){

    //8 is the delete key so it updates on delete
    if((e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8){

      var $whichNumber = $(e.target).closest('section')[0].id;  
      if($whichNumber == 'scaleBoxX') {
        vbX = $($numInput[0]).val();
        if($($numInput[0]).val() == '') {
          vbX = 0;
        }
      } 

      else if($whichNumber == 'scaleBoxY') {
        vbY = $($numInput[1]).val();
        if($($numInput[1]).val() == '') {
          vbY = 0;
        }
      }

      //set the position of the svg viewBox
      $svg.setAttribute('viewBox', vbX + ' ' + vbY + ' ' + vbWidth + ' ' + vbHeight); 
      $vbReport.text("[ " + vbX + ' ' + vbY + ' ' + vbWidth + ' ' + vbHeight +" ]");

    } else {
      e.preventDefault();
    }
  });
});