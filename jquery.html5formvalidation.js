/*
 * jQuery Html5 Form Validation v.1.0.2
 * https://github.com/nunorafaelrocha/jquery-html5-form-validation
 *
 * Copyright 2011, Nuno Rafael Rocha
 * http://nunorafaelrocha.com
 *
 */


(function( $ ){
  
  // default options
  var defaults = {
    'error_class' : 'invalid'
  };
  
  var methods = {
      // initialization method
      init : function( options ) { 
        var options = $.extend({}, defaults, options); 
        // form element
        var form = $(this);
        // bind form onsubmit action
        form.bind('submit', function () {
          return form.html5formvalidation('validation', options );
        });
        // bind all form elements
        form.find('input, textarea, select').bind('change keyup', function () {
          $(this).html5formvalidation('elementValidation', options);
        });
      },
      
      // validatoin on all form elements
      validation : function( options ) {
        var options = $.extend({}, defaults, options);         
        // indicaties if form is valid
        var is_valid = true;
        // foreach form element do the validation
        this.find('input, textarea, select').each(function () {
          is_valid = ($(this).html5formvalidation('elementValidation', options) ? is_valid : false);          
        });
        
        return is_valid;
      },
      
      // element validation
      elementValidation : function( options ) { 
        var options = $.extend({}, defaults, options);         
        var element = $(this);
        // element type
        var type = element.attr('type');
        // indicates if element is valid
        var elem_is_valid = true;
        // remove error class (if not null or empty) from this element before validate
        options.error_class ? element.removeClass(options.error_class) : null;

        // if has required tag
        if (element.attr('required')) 
        {
          // for different kind of types do different validation...
          if (type == 'checkbox' || type == 'radio')
          {        
            // verifies if one of the elements with this name has been checked
            if (!$('[name*="'+element.attr('name')+'"]:checked')) 
            {
              elem_is_valid =false;
              // add error class for every elements with the same name
              options.error_class ? $('[name*="'+element.attr('name')+'"]').addClass(options.error_class) : null;
            }
            else
            {
              // removes error class for every elements with the same name
              options.error_class ? $('[name*="'+element.attr('name')+'"]').removeClass(options.error_class) : null;
            }
          }
          else 
          {
            // for other input types verifies if value is empty
            $.trim(element.val()) == '' ? elem_is_valid = false : null;
          }
        }
        
        // if has pattern tag
        if (element.attr('pattern')) 
        {
          // get the pattern
          var pattern = element.attr('pattern');
          // if pattern don't match     
          !element.val().match('^'+pattern+'$') ? elem_is_valid = false : null;
        }
        
        // if has a special type...
        if (type == 'email') 
        {
          // verify if has email format
          // regular expression for email
          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          // if multiple attribute
          if(element.attr('multiple'))
          {
            // splitting on commas (,)
            var emails = element.val().split(',');
            for(var i=0; i<emails.length; i++)
            {
              (emails[i] == '' || !emailReg.test(emails[i])) ? elem_is_valid = false : null;
            }
          } 
          else
          {
            !emailReg.test(element.val()) ? elem_is_valid = false : null;
          }
        }
        
        
        // if element is not valid, apply the error class if not null
        !elem_is_valid && options.error_class ? element.addClass(options.error_class) : null;
        
        return elem_is_valid;
      }
      
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
