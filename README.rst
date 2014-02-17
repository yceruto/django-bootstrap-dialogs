bootstrap-dialogs
=================

Javascript library for create forms and messages on less time and less code (Windows modal based on Twitter Bootstrap 3).

Requirements
------------
* `Bootstrap 3`_
* `django-ajax`_

.. _`Bootstrap 3`: https://github.com/twbs/bootstrap
.. _`django-ajax`: https://github.com/yceruto/django-ajax

Usage
-----

**DialogBox**

code-block:: javascript

    DialogBox('buy?', {
        type: DIALOG_QUESTION,          //Default DIALOG_INFORMATION
        title: 'Question',              //Default 'Information'
        buttons: {                      //Default OK button
            'Yes': function(){
                alert('Purchased');
            },
            'No': null                  //Close modal
        }
    })
