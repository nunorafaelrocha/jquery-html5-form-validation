/*
 * jQuery Html5 Form Validation v.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Nuno Rafael Rocha
 * http://nunorafaelrocha.com
 *
 */
 
/*
 * Verifica se os inputs que estão dentro de um div (elem) estão validos
 * Verifica se os que tem o attributo required estão preenchidos
 * Verifica se os que tem o attributo pattern estão correctos
 * @return true or false
 *      -> coloca os inputs inválidos com a classe error_class_name
 */
jQuery.fn.html5validation = function (error_class_name) {

    // global validation
    var is_valid = true;
    
    error_class_name != '' ? this.find('input,select,textarea').removeClass(error_class_name) : null;
    error_class_name != '' ? $(this).removeClass(error_class_name) : null;
    
    // verificar se os elementos que tem o attributo required estao todos preenchidos
    this.find('[required]').each(function() {
      // get input element 
      var element = $(this);
      // get input type
      var type = element.attr('type');
      
      // for different kind of types do different validation...
      if (type == 'checkbox' || type == 'radio')
      {        
        if (!$('[name*="'+element.attr('name')+'"]:checked')) 
        {
          error_class_name != '' ? $('[name*="'+element.attr('name')+'"]').addClass(error_class_name) : null;
          is_valid =false;
        }
      }
      else 
      {
        // for other input types verifies if value is empty
        if(element.val().trim() == '')
        {
          is_valid =false;
          error_class_name != '' ? element.addClass(error_class_name) : null;
        }
      }

    });

    // verificar se os elementos que tem o attributo pattern estao todos correctamente preenchidos
    this.find('[pattern]').each(function() {
      // get input element       
      var element = $(this);
      // get the pattern
      var pattern = element.attr('pattern');     
      // if pattern don't match     
      if(pattern && pattern != '' && !this.value.match('^'+pattern+'$'))
      {
        is_valid = false;
        error_class_name != '' ? element.addClass(error_class_name) : null;
      }
    });
    
    // verificar ao proprio elemento
    if ($(this).attr('required')) 
    {
      // get input element 
      var element = $(this);
      // get input type
      var type = element.attr('type');
      
      // for different kind of types do different validation...
      if (type == 'checkbox' || type == 'radio')
      {        
        if (!$('[name*="'+element.attr('name')+'"]:checked')) 
        {
          error_class_name != '' ? $('[name*="'+element.attr('name')+'"]').addClass(error_class_name) : null;
          is_valid =false;
        }
      }
      else 
      {
        // for other input types verifies if value is empty
        if(element.val().trim() == '')
        {
          is_valid =false;
          error_class_name != '' ? element.addClass(error_class_name) : null;
        }
      }
    }
    if($(this).attr('pattern'))
    {
      // get input element       
      var element = $(this);
      // get the pattern
      var pattern = element.attr('pattern');     
      // if pattern don't match     
      if(pattern && pattern != '' && !element.val().match('^'+pattern+'$'))
      {
        is_valid = false;
        error_class_name != '' ? element.addClass(error_class_name) : null;
      }
    }
    
    return is_valid;
  
}

jQuery.fn.preparehtml5validation = function (error_class_name)
{  
  $(this).find('input, select, textarea').each(function () {
    $(this).bind('change keyup',function () {  
      $(this).html5validation(error_class_name);
    });

  });
}

jQuery.fn.form5 = function (error_class_name, action_id) {
  
  $(this).bind('submit', function () {
    $(this).html5validation(error_class_name);
  });
  
  $(this).preparehtml5validation(error_class_name);
  
}