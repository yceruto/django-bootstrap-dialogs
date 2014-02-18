/*
* Dialogs; v20140104
* https://github.com/yceruto/bootstrap-dialogs
* Copyright (c) 2014 Yonel Ceruto Glez
*/

if (typeof jQuery === "undefined") { throw new Error("Dialogs requires jQuery") } else
if (typeof $('body').modal === "undefined") { throw new Error("Dialogs requires Modal Bootstrap 3") }

const DIALOG_INFORMATION = DIALOG_PRIMARY = 0,
      DIALOG_QUESTION = DIALOG_INFO = 1,
      DIALOG_SUCCESS = 2,
      DIALOG_WARNING = 3,
      DIALOG_EXCLAMATION = DIALOG_DANGER= 4,
      DIALOG_INVERT = 5;

/**
 * @example
 * DialogBox('Buy?', {
 *    type: DIALOG_QUESTION,                         //Default DIALOG_INFORMATION
 *    title: 'Question',                             //Default 'Information'
 *    buttons: {'Yes': function(){...}, 'No': null}, //Default OK button
 *    onClose: function(){...}                       //Default null
 * })
 *
 */
var DialogBox = function (content, options) {
    if (!$.isPlainObject(options))
        options = {};

    options = $.extend({}, DialogBox.DEFAULTS, options);

    var $modal = $(options.template),
        $footer = $modal.find('.modal-footer'),
        headerClass, buttonClass,

        createButton = function (content, onClick){
            var $button = $(options.buttonTemplate);
            $button.text(content);
            if (onClick && $.isFunction(onClick))
                $button.click(function(){
                    onClick(this, $modal)
                });
            else
                $button.attr('data-dismiss', 'modal');
            return $button;
        };

    if (options.extraClass)
        $modal.addClass(options.extraClass);

    if (!$.isPlainObject(options.buttons) || $.isEmptyObject(options.buttons))
        $footer.append(createButton(options.buttonOK));
    else
        for (var index in options.buttons)
            $footer.append(createButton(index, options.buttons[index]));

    switch (options.type) {
        case DIALOG_QUESTION:
            headerClass = 'modal-header-info';
            buttonClass = 'btn-info';
            break;
        case DIALOG_SUCCESS:
            headerClass = 'modal-header-success';
            buttonClass = 'btn-success';
            break;
        case DIALOG_WARNING:
            headerClass = 'modal-header-warning';
            buttonClass = 'btn-warning';
            break;
        case DIALOG_EXCLAMATION:
            headerClass = 'modal-header-danger';
            buttonClass = 'btn-danger';
            break;
        case DIALOG_INVERT:
            headerClass = 'modal-header-invert';
            buttonClass = 'btn-default';
            break;
        default:
            buttonClass = 'btn-primary';
            break;
    }

    if (headerClass) 
        $modal.find('.modal-header').addClass(headerClass);

    $footer.find('button:first').removeClass('btn-default').addClass(buttonClass);
    $footer.attr('style', 'text-align: ' + options.buttonAlign);

    if (options.marginTop)
        $modal.find('.modal-dialog').prop('style').marginTop = options.marginTop;
    if (options.overflowY)
        $modal.prop('style').overflowY = options.overflowY;

    $modal.find('.modal-dialog').innerWidth(options.width);
    $modal.find('.modal-title').html(options.title);
    $modal.find('.modal-body').html(content);

    $modal.on('hidden.bs.modal', function(){
        if (options.onClose)
            options.onClose();
        $modal.remove();
    });

    $('body').append($modal);

    $modal.modal('show');
};

DialogBox.DEFAULTS = {
    template: '<div class="modal modal-xdialog fade" id="modal-xdialog" tabindex="-1" role="dialog" aria-labelledby="modal-dialog-label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="btnClose" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="modal-dialog-label"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>',
    extraClass: null,
    width: 500,
    title: 'Information',
    type: DIALOG_INFORMATION,
    buttonTemplate: '<button type="button" class="btn btn-default" data-dismiss="modal"></button>',
    buttonOK: 'OK',
    buttonAlign: 'center',
    onClose: null
};

/**
 * @example
 * MessageBox('Buy?', {
 *    type: DIALOG_QUESTION,                         //Default DIALOG_INFORMATION
 *    title: 'Question',                             //Default 'Information'
 *    icon: 'glyphicon-shopping-cart',               //Default 'glyphicon-info-sign'
 *    buttons: {'Yes': function(){...}, 'No': null}, //Default OK button
 *    onClose: function(){...}                       //Default null
 * })
 *
 */
var MessageBox = function (message, options) {
    options  = $.extend({}, MessageBox.DEFAULTS, options);

    var $content = $(options.iconTemplate),
        iconClass;

    if (options.icon && typeof options.icon !== 'string')
        options.icon = null;

    switch (options.type) {
        case DIALOG_QUESTION:
            iconClass = 'text-info ' + (options.icon || 'glyphicon-question-sign');
            break;
        case DIALOG_SUCCESS:
            iconClass = 'text-success ' + (options.icon || 'glyphicon-info-sign');
            break;
        case DIALOG_WARNING:
            iconClass = 'text-warning ' + (options.icon || 'glyphicon-warning-sign');
            break;
        case DIALOG_EXCLAMATION:
            iconClass = 'text-danger ' + (options.icon || 'glyphicon-exclamation-sign');
            break;
        case DIALOG_INVERT:
            iconClass = 'text-muted ' + (options.icon || 'glyphicon-info-sign');
            break;
        default:
            iconClass = 'text-primary ' + (options.icon || options.iconClass);
            break;
    }

    $content.find('#col-icon').html('<i class="glyphicon ' + iconClass + '" style="font-size: ' + options.iconSize + 'px"></i> ');
    $content.find('#col-text').html(message);

    DialogBox($content, options);
};

MessageBox.DEFAULTS = {
    extraClass: 'modal-message-box',
    iconTemplate: '<table><tr><td id="col-icon" valign="top"></td><td id="col-text"></td></tr></table>',
    iconClass: 'glyphicon-info-sign',
    iconSize: 32
};

/**
 * @example
 * FormBox('<form>...</form>', {                           //If content is null then load content from url parameter
 *    type: DIALOG_INFO,                                  //Default DIALOG_PRIMARY
 *    title: 'Login',                                     //Default 'Form'
 *    url: null,                                          //Default null
 *    buttons: {'Save': function(){...}, 'Cancel': null}, //Default 'Close' and 'Save changes' buttons
 *    onSaveCallback: function(){...}                     //Only when the 'buttons' option is empty
 * })
 *
 */
var FormBox = function (content, options) {
    // If url is an object, simulate pre-1.5 signature
    if ( typeof content === "object" ) {
        options = content;
        content = undefined;
    }

    options = $.extend({}, FormBox.DEFAULTS, options);

    if (!$.isPlainObject(options.buttons)) {
        options.buttons = {
            'Save changes': function(sender, $modal) {
                var $form = $modal.find('form'),
                    url = $form.attr('action'),
                    method = $form.attr('method'),
                    data = new FormData($form[0]);

                $.ajax({
                    url: url,
                    type: method,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        switch (response.status) {
                            case 200:
                                if (options.onSaveCallback && $.isFunction(options.onSaveCallback))
                                    options.onSaveCallback($modal, response.content);
                                else if (response.content.indexOf('<form ') == -1)
                                    MessageBox(method.toUpperCase() + ' ' + url + '. The form tag is missing into content response. The FormBox requires a form.', {
                                        type: DIALOG_EXCLAMATION,
                                        title: 'Form Missing'
                                    });
                                else
                                    $modal.find('.modal-body').html(response.content);
                                break;
                            case 301:
                            case 302:
                                $modal.on('hidden.bs.modal', function(){
                                    window.location.href = response.content;
                                });
                                $modal.modal('hide');
                                break;
                            default:
                                MessageBox(response.content, {
                                    type: DIALOG_EXCLAMATION,
                                    title: response.status + ' ' + response.statusText
                                });
                                break;
                        }
                    }
                })
            },
            'Close': null
        };
    }

    if (content) {
        DialogBox(content, options);
    } else {
        $.ajax({
            url: options.url,
            success: function(response) {
                switch (response.status) {
                    case 200:
                        if (response.content.indexOf('<form ') == -1)
                            MessageBox('The form tag is missing into content response (GET ' + options.url + '). The FormBox requires a form tag.', {
                                type: DIALOG_EXCLAMATION,
                                title: 'Form Missing'
                            });
                        else
                            DialogBox(response.content, options);
                        break;
                    default:
                        MessageBox(response.content, {
                            type: DIALOG_EXCLAMATION,
                            title: response.status + ' ' + response.statusText
                        });
                        break;
                }
            }
        });
    }
};

FormBox.DEFAULTS = {
    title: 'Form',
    width: 600,
    buttonTemplate: '<button type="button" class="btn btn-default"></button>',
    url: null,
    buttonAlign: 'right',
    onSaveCallback: null
};