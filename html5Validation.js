/*
 * Verifica se os inputs que estão dentro de um div (elem) estão validos
 * Verifica se os que tem o attributo required estão preenchidos
 * Verifica se os que tem o attributo pattern estão correctos
 * @return true or false
 *      -> coloca os inputs inválidos com a classe error_class_name
 */
jQuery.fn.html5Validation = function (error_class_name) {

    // global validation
    var is_valid = true;
    
    error_class_name != '' ? this.find('input').removeClass(error_class_name) : null;
    
    // verificar se os elementos que tem o attributo required estao todos preenchidos
    this.find('input:[required]').each(function() {
      // get input element 
      var element = $(this);
      // get input type
      var type = element.attr('type');
      
      // for different kind of types do different validation...
      if (type == 'checkbox' || type == 'radio')
      {
        var is_valid_group = true;
        
        $('[name*="'+this.name+'"]').each(function () {
          if (!$(this).attr('checked')) 
          {
            is_valid_group = false;
            error_class_name != '' ? $(this).addClass(error_class_name) : null;
          }
        });
        
        if (!is_valid_group) 
        {
          is_valid =false;
          error_class_name != '' ? element.addClass(error_class_name) : null;
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
    this.find('input:[pattern]').each(function() {
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
    
    return is_valid;
  
}
