finnBoka jQuery plugin v1.0.0
=============================
*Finn boka på biblioteket*

A simple jQuery plugin that allows your users to select one of over 400 Norwegian libraries, and search for a book by a supplied freetext search string. The string is supplied from your page when instantiating or by reference to a page element.

Once a library is selected, the user may select the library as their favourite by clicking the link following the select box. The same library will be preselected the next time the select box is used. 

**Note!** The choice is stored in a cookie. You may not want this, or may want to inform your users.

Usage
-----
Include the script after jQuery:

    <script src="/path/to/js/jquery.finnboka.min.js"></script>

Initialize using a search string (title, author, ISBN):

    $('#container').finnBoka({ search: 'Moby Dick' });

Initialize using a selector for an element containing a search string:

    $('#container').finnBoka({ source: '#book-name' });

`#container` would be a selector for the element where you want
the library selector to appear.

Either supply a search string with the `search` option,
or a selector for an element `source` where the search string can be read.

Other options
-------------
The following defaults can also be changed in the initialization options:

    {
        labelString: 'Finn boka på biblioteket',
        favouriteString: 'Sett dette biblioteket som favoritt'
    }

Since the list is quite long, a more user-friendly select box can be helpful. finnBoka works well with [Select2](https://select2.github.io/), which supports more intuitive searching. Add the following lines to the appropriate spots on your page.

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>

Initialize Select2 after running finnBoka:

    <script>
        $('.finnBoka-libs select').select2();
    </script>

License
-------
finnBoka may be freely distributed under the [MIT License](https://opensource.org/licenses/MIT).

Thanks to [Ubok.no](http://ubok.no/) and [Foreningen !les](http://foreningenles.no/) for sponsoring this project.
