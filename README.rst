django-bootstrap-dialogs
========================

Javascript library for create forms and messages on less time and less code (Windows modal based on Twitter Bootstrap 3).

Requirements
------------
* `Bootstrap 3`_
* `django-ajax`_

.. _`Bootstrap 3`: https://github.com/twbs/bootstrap
.. _`django-ajax`: https://github.com/yceruto/django-ajax

Install
-------

Install django-bootstrap-dialogs in your python environment

1- Download and install package:

.. code:: sh

    $ pip install django-bootstrap-dialogs

or simply with:

.. code:: sh

    $ python setup.py install

2- Add ``'bootstrap_dialogs'`` into the ``INSTALLED_APPS`` list.

3- Read usage section and enjoy its advantages!


Usage
-----

Use the jquery.ajax.min.js as static file into ``base.html`` template

.. code:: html

    <script type="text/javascript" src="{% static 'bootstrap_dialogs/js/jquery.dialogs.js' %}"></script>

**DialogBox**

.. code:: html

    <script type="text/javascript">
        DialogBox('buy?', {
            type: DIALOG_QUESTION,          //Default DIALOG_INFORMATION
            title: 'Question',              //Default 'Information'
            buttons: {                      //Default OK button
                'Yes': function(){
                    alert('Purchased');
                },
                'No': null                  //Close modal
            }
        });
    </script>
    
Result:

.. image:: https://raw.github.com/yceruto/bootstrap-dialogs/master/docs/_screenshot/dialog-box.png
   :alt: DialogBox Screenshot
