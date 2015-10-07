finnBoka jQuery plugin v1.0.0
=============================
*Finn boka på biblioteket*

A simple jQuery plugin that allows your users to select one of over 400 Norwegian libraries, and search for a book by freetext search string. The string is supplied from your page when instantiating or by reference to a page element.

Once a library is selected, the user may select the library as their favourite by clicking the link following the select box. The same library will be preselected the next time the select box is used. 

**Note!** The choice is stored in a cookie. You may not want this, or may want to inform your users.

Usage
-----
Include the script after jQuery:

    <script src="/path/to/js/jquery.finnboka.min.js"></script>

Using a search string (title, author, ISBN):

    $('#container').finnBoka({ search: 'Moby Dick' });

Using selector for an element containing a search string:

    $('#container').finnBoka({ source: '#book-name' });

`#container` would be a selector for the element where you want
the library selector to appear.

Either supply a search string with the `search` option,
or a selector for an element `source` where the search string can be read.

Other options
-------------
The following defaults can also be changed by a supplied options object:

    {
        labelString: 'Finn boka på biblioteket',
        favouriteString: 'Sett dette biblioteket som favoritt'
    }

License
-------
finnBoka may be freely distributed under the [MIT License](https://opensource.org/licenses/MIT).

Thanks to [Ubok.no](http://ubok.no/) and [Foreningen !les](http://foreningenles.no/) for sponsoring this project.
