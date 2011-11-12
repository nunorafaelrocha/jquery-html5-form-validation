/*
 * jQuery Html5 Form Validation v.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Nuno Rafael Rocha
 * http://nunorafaelrocha.com
 *
 */


(function( $ ){

  var methods = {
      init : function( options ) { 
        
        var defaults = {
          'error_class' : 'invalid',
        };
        
        var options = $.extend({}, defaults, options); 
        
        var form = $(this);
        form.bind('submit', function () {
          form.html5formvalidation('validation', options );
        });

        // bind all form elements
        form.find('input, textarea, select').bind('change keyup', function () {
          $(this).html5formvalidation('elementValidation', options);
        });
      },
      validation : function( options ) {
        var is_valid = true;
        
        this.find('input, textarea, select').each(function () {
          is_valid = ($(this).html5formvalidation('elementValidation', options) ? is_valid : false);          
        });
        
        return is_valid;
      },
      elementValidation : function( options ) { 
        
        var element = $(this);
        var elem_is_valid = true;

        options.error_class ? element.removeClass(options.error_class) : null;

        // if has required tag
        if (element.attr('required')) 
        {
          var type = element.attr('type');
          // for different kind of types do different validation...
          if (type == 'checkbox' || type == 'radio')
          {        
            if (!$('[name*="'+element.attr('name')+'"]:checked')) 
            {
              options.error_class ? $('[name*="'+element.attr('name')+'"]').addClass(options.error_class) : null;
              elem_is_valid =false;
            }
            else
            {
              options.error_class ? $('[name*="'+element.attr('name')+'"]').removeClass(options.error_class) : null;
            }
          }
          else 
          {
            // for other input types verifies if value is empty
            if(element.val().trim() == '')
            {
              elem_is_valid = false;
              options.error_class ? element.addClass(options.error_class) : null;
            }
          }
        }
        
        
        // if has pattern tag
        if (element.attr('pattern')) 
        {
          // get the pattern
          var pattern = element.attr('pattern');
          // if pattern don't match     
          if(!element.val().match('^'+pattern+'$'))
          {
            elem_is_valid = false;
            options.error_class ? element.addClass(options.error_class) : null;
          }
        }
        
        return elem_is_valid;
      },
      
    };
    
  $.fn.html5formvalidation = function( method ) {

      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.html5formvalidation' );
      }    

    };
      
})( jQuery );
