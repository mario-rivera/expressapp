/*
|--------------------------------------------------------------------------
| EXPRESS Validation
|--------------------------------------------------------------------------
|
*/
(function ( $, EXPRESS ) {

var Validation = Namespace( 'VALIDATION', EXPRESS );

Validation.renderFormErrors = function(form, validation_errors){
    var inputs = $(':input', form);
    
    $.each(inputs, function(index, input){
        
        if( typeof validation_errors[input.name] !== 'undefined' ){
            Validation.renderInputErrors(input, validation_errors[input.name]);
        }
        
    });
};

Validation.renderInputErrors = function(input, errors){
    var $group = $(input).closest('.form-group');
    $group.addClass('has-error');
    
    $.each(errors, function(index, error){
        $('<span />', {class: 'help-block', text: error})
        .appendTo($group);
    });
};

Validation.clearFormErrors = function(form){
    $(form).find('.help-block').remove();
    
    $(form).find('.form-group').each(function(index, el){
        $(el).removeClass('has-error');
    });
};

}( jQuery, EXPRESS ));