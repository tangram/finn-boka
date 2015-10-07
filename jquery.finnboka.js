// finnBoka 1.0.0
// (C) 2015 Eirik Krogstad

// finnBoka may be freely distributed under the MIT license.

// For details and documentation, see:
// https://github.com/tangram/finn-boka

(function($, window, undefined) {

    'use strict';

    // default options for the plugin
    // can be replaced by options when initializing
    var defaults = {
        search: '',
        source: '',
        labelString: 'Finn boka på biblioteket',
        favouriteString: 'Sett dette biblioteket som favoritt'
    };

    // predefined strings to reduce size when minified
    var http = 'http://';
    var bfSearch = '/cgi-bin/websok?';
    var bfFree = 'mode=vt&pubsok_txt_0=';
    var bfMode = bfFree;
    var mmURL = 'websok.mikromarc.no';
    var mmSearch = '/mikromarc3/web/search.aspx?db=';
    var mmFree = '&sc=ft&sw=';
    var mmMode = mmFree;
    var bibliotek = 'bibliotek';
    var folkebibliotek = 'folkebibliotek';

    var libraries = [
        {
            id:   151,
            name: 'Agdenes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'agdenes-fb&unit=6471' + mmMode
        },
        {
            id:   1,
            name: 'Alstahaug ' + folkebibliotek,
            url:  http + 'www.alstahaug.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   2,
            name: 'Alta ' + folkebibliotek,
            url:  http + 'websok.alta.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   152,
            name: 'Alvdal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nord-osterdal&unit=6466' + mmMode
        },
        {
            id:   153,
            name: 'Andebu ' + bibliotek,
            url:  http + mmURL + mmSearch + 'andebu-fb&unit=6471' + mmMode
        },
        {
            id:   3,
            name: 'Andøy ' + folkebibliotek,
            url:  http + 'www.andoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   154,
            name: 'Aremark ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'aremark-fb&unit=6465' + mmMode
        },
        {
            id:   4,
            name: 'Arendal ' + bibliotek,
            url:  http + 'www.arendal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   5,
            name: 'Asker ' + bibliotek,
            url:  http + 'askbib.asker.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   155,
            name: 'Askim ' + bibliotek,
            url:  http + mmURL + mmSearch + 'askim-fb&unit=6471' + mmMode
        },
        {
            id:   156,
            name: 'Askvoll ' + bibliotek,
            url:  http + mmURL + mmSearch + 'askvoll-fb&unit=6465' + mmMode
        },
        {
            id:   6,
            name: 'Askøy ' + folkebibliotek,
            url:  http + 'www.askoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   157,
            name: 'Audnedal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-agder-felles&unit=6469' + mmMode
        },
        {
            id:   158,
            name: 'Aukra ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'aukra-fb&unit=6471' + mmMode
        },
        {
            id:   159,
            name: 'Aure ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'aure-fb&unit=12327' + mmMode
        },
        {
            id:   160,
            name: 'Aurland ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'aurland-fb&unit=6463' + mmMode
        },
        {
            id:   7,
            name: 'Aurskog-Høland ' + bibliotek,
            url:  http + 'www.aurskog-holand.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   161,
            name: 'Austrheim ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12074' + mmMode
        },
        {
            id:   162,
            name: 'Averøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'averoy-fb&unit=6471' + mmMode
        },
        {
            id:   8,
            name: 'Balestrand ' + folkebibliotek,
            url:  http + 'balestrand.bib.no' + bfSearch + bfMode
        },
        {
            id:   9,
            name: 'Ballangen ' + bibliotek,
            url:  http + 'www.ballangen.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   163,
            name: 'Balsfjord ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'balsfjord-fb&unit=6473' + mmMode
        },
        {
            id:   10,
            name: 'Bamble ' + bibliotek,
            url:  http + 'bambib.bamble.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   164,
            name: 'Bardu ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6493' + mmMode
        },
        {
            id:   165,
            name: 'Beiarn ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'beiarn-fb&unit=6465' + mmMode
        },
        {
            id:   166,
            name: 'Berg ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6475' + mmMode
        },
        {
            id:   11,
            name: 'Bergen offentlige ' + bibliotek,
            url:  http + 'www.bergen.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   167,
            name: 'Berlevåg ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/berlevaag/portal.aspx',
        },
        {
            id:   168,
            name: 'Bindal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'bindal-fb&unit=6465' + mmMode
        },
        {
            id:   169,
            name: 'Birkenes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'birkenes-fb&unit=6465' + mmMode
        },
        {
            id:   170,
            name: 'Bjerkreim ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/bjerkreim/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   12,
            name: 'Bodø ' + bibliotek,
            url:  http + 'www.bodo.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   13,
            name: 'Bokn ' + bibliotek,
            url:  http + 'websok.bokn.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   171,
            name: 'Bremanger ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'bremanger-fb&unit=6463' + mmMode
        },
        {
            id:   172,
            name: 'Brønnøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'bronnoy-fb&unit=6465' + mmMode
        },
        {
            id:   173,
            name: 'Bygland ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'bygland-fb&unit=6471' + mmMode
        },
        {
            id:   174,
            name: 'Bykle ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'bykle-fb&unit=6465' + mmMode
        },
        {
            id:   175,
            name: 'Båtsfjord ' + bibliotek,
            url:  http + mmURL + mmSearch + 'batsfjord-fb&unit=6471' + mmMode
        },
        {
            id:   14,
            name: 'Bærum ' + bibliotek,
            url:  http + 'www.barum.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   15,
            name: 'Bømlo ' + folkebibliotek,
            url:  http + 'www.bomlo.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   16,
            name: 'Deichmanske ' + bibliotek,
            url:  http + 'www.deich.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   176,
            name: 'Dovre ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'dovre-fb&unit=6471' + mmMode
        },
        {
            id:   17,
            name: 'Drammen ' + bibliotek,
            url:  http + 'www.drammen.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   177,
            name: 'Drangedal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'drangedal-fb&unit=6471' + mmMode
        },
        {
            id:   178,
            name: 'Dyrøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'dyroy-fb&unit=6471' + mmMode
        },
        {
            id:   18,
            name: 'Dønna ' + bibliotek,
            url:  http + 'www.donna.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   179,
            name: 'Eid ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'eid-fb&unit=6465' + mmMode
        },
        {
            id:   180,
            name: 'Eide ' + bibliotek,
            url:  http + mmURL + mmSearch + 'eide-fb&unit=6471' + mmMode
        },
        {
            id:   181,
            name: 'Eidfjord ' + bibliotek,
            url:  http + mmURL + mmSearch + 'eidfjord-fb&unit=6471' + mmMode
        },
        {
            id:   19,
            name: 'Eidsberg ' + bibliotek,
            url:  http + 'www.eidsberg.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   182,
            name: 'Eidskog ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'eidskog-fb&unit=6471' + mmMode
        },
        {
            id:   20,
            name: 'Eidsvoll ' + bibliotek,
            url:  http + 'www.eidsvoll.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   21,
            name: 'Elverum ' + bibliotek,
            url:  http + 'www.elverum.bib.no' + bfSearch + bfMode
        },
        {
            id:   22,
            name: 'Enebakk ' + bibliotek,
            url:  http + 'www.enebakk.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   23,
            name: 'Engerdal ' + bibliotek,
            url:  http + 'www.engerdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   24,
            name: 'Etne ' + bibliotek,
            url:  http + 'www.etne.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   25,
            name: 'Etnedal ' + bibliotek,
            url:  http + 'www.etnedal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   26,
            name: 'Evenes ' + folkebibliotek,
            url:  http + 'www.evenes.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   183,
            name: 'Evje og Hornnes ' + bibliotek,
            url:  http + mmURL + mmSearch + 'evje-hornnes-fb&unit=6471' + mmMode
        },
        {
            id:   27,
            name: 'Farsund ' + bibliotek,
            url:  http + 'www.farsund.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   184,
            name: 'Fauske ' + bibliotek,
            url:  http + mmURL + mmSearch + 'fauske-fb&unit=6463' + mmMode
        },
        {
            id:   185,
            name: 'Fedje ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12082' + mmMode
        },
        {
            id:   28,
            name: 'Fet ' + folkebibliotek,
            url:  http + 'www.fet.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   29,
            name: 'Fitjar ' + folkebibliotek,
            url:  http + 'www.stord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   186,
            name: 'Fjaler ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'fjaler-fb&unit=6465' + mmMode
        },
        {
            id:   30,
            name: 'Fjell folkeboksamling',
            url:  http + 'www.bivest.bib.no' + bfSearch + bfMode
        },
        {
            id:   31,
            name: 'Flakstad ' + folkebibliotek,
            url:  http + 'www.flakstad.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   187,
            name: 'Flatanger ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'midtre-namdal&unit=6469' + mmMode
        },
        {
            id:   32,
            name: 'Flekkefjord ' + bibliotek,
            url:  http + 'www.flekkefjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   188,
            name: 'Flesberg ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/flesberg/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   189,
            name: 'Flora ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'flora-fb&unit=6465' + mmMode
        },
        {
            id:   190,
            name: 'Flå ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12785' + mmMode
        },
        {
            id:   191,
            name: 'Folldal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-osterdal&unit=6464' + mmMode
        },
        {
            id:   192,
            name: 'Fosnes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'midtre-namdal&unit=6467' + mmMode
        },
        {
            id:   33,
            name: 'Fredrikstad ' + bibliotek,
            url:  http + 'frdbib.fredrikstad.kommune.no' + bfSearch + bfMode
        },
        {
            id:   193,
            name: 'Frogn ' + bibliotek,
            url:  http + mmURL + mmSearch + 'frogn-fb&unit=6465' + mmMode
        },
        {
            id:   194,
            name: 'Froland ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'froland-fb&unit=6471' + mmMode
        },
        {
            id:   195,
            name: 'Frosta ' + bibliotek,
            url:  http + mmURL + mmSearch + 'frosta-fb&unit=6465' + mmMode
        },
        {
            id:   196,
            name: 'Fræna ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'frana-fb&unit=6471' + mmMode
        },
        {
            id:   197,
            name: 'Frøya ' + bibliotek,
            url:  http + mmURL + mmSearch + 'froya-fb&unit=6471' + mmMode
        },
        {
            id:   34,
            name: 'Fusa ' + folkebibliotek,
            url:  http + 'www.fusa.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   198,
            name: 'Fyresdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12169' + mmMode
        },
        {
            id:   35,
            name: 'Førde ' + bibliotek,
            url:  http + 'www.sf.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   199,
            name: 'Gamvik ' + folkebibliotek,
            url:  http + 'www.gamvik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   36,
            name: 'Gaular ' + folkebibliotek,
            url:  http + 'www.sf.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   37,
            name: 'Gausdal ' + bibliotek,
            url:  http + 'www.gausdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   200,
            name: 'Gildeskål ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gsm&unit=19013' + mmMode
        },
        {
            id:   201,
            name: 'Giske ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'giske-fb&unit=6471' + mmMode
        },
        {
            id:   202,
            name: 'Gjemnes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gjemnes-fb&unit=6471' + mmMode
        },
        {
            id:   38,
            name: 'Gjerdrum ' + folkebibliotek,
            url:  http + 'www.gjerdrum.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   203,
            name: 'Gjerstad ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gjerstad-fb&unit=6471' + mmMode
        },
        {
            id:   204,
            name: 'Gjesdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gjesdal-fb&unit=6463' + mmMode
        },
        {
            id:   39,
            name: 'Gjøvik ' + bibliotek,
            url:  http + 'www.gjovik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   205,
            name: 'Gloppen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gloppen-fb&unit=6471' + mmMode
        },
        {
            id:   206,
            name: 'Gol ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12793' + mmMode
        },
        {
            id:   207,
            name: 'Gran ' + bibliotek,
            url:  http + mmURL + mmSearch + 'gran-fb&unit=6471' + mmMode
        },
        {
            id:   208,
            name: 'Granvin ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ulvik-fb&unit=6475' + mmMode
        },
        {
            id:   209,
            name: 'Gratangen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6497' + mmMode
        },
        {
            id:   210,
            name: 'Grimstad ' + bibliotek,
            url:  http + mmURL + mmSearch + 'grimstad-fb&unit=6465' + mmMode
        },
        {
            id:   211,
            name: 'Grong ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6471' + mmMode
        },
        {
            id:   40,
            name: 'Grue ' + folkebibliotek,
            url:  http + 'www.grue.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   212,
            name: 'Gulen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'gulen-fb&unit=6471' + mmMode
        },
        {
            id:   213,
            name: 'Hadsel ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hadsel-fb&unit=6473' + mmMode
        },
        {
            id:   41,
            name: 'Halden ' + bibliotek,
            url:  http + 'www.halden.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   42,
            name: 'Hamar ' + bibliotek,
            url:  http + 'www.hamar.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   214,
            name: 'Hamarøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nvgs&unit=12806' + mmMode
        },
        {
            id:   43,
            name: 'Hammerfest ' + bibliotek,
            url:  http + 'www.hammerfest.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   215,
            name: 'Haram ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'haram-fb&unit=6467' + mmMode
        },
        {
            id:   216,
            name: 'Hareid ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'more-romsdal-felles&unit=6466' + mmMode
        },
        {
            id:   44,
            name: 'Harstad ' + bibliotek,
            url:  http + 'websok.harstad.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   217,
            name: 'Hattfjelldal ' + folkebibliotek,
            url:  http + 'biblioteket.hattfjelldal-kommune.no' + mmSearch + 'hattfjelldal-fb&unit=6471' + mmMode
        },
        {
            id:   45,
            name: 'Haugesund ' + folkebibliotek,
            url:  http + 'websok.haugesund.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   218,
            name: 'Hemne ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hemne-fb&unit=6471' + mmMode
        },
        {
            id:   46,
            name: 'Hemnes ' + folkebibliotek,
            url:  http + 'www.hemnes.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   219,
            name: 'Hemsedal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12799' + mmMode
        },
        {
            id:   47,
            name: 'Herøy ' + folkebibliotek + ' (Nordland)',
            url:  http + 'www.heroy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   220,
            name: 'Herøy ' + folkebibliotek + ' (Møre og Romsdal)',
            url:  http + mmURL + mmSearch + 'more-romsdal-felles&unit=6465' + mmMode
        },
        {
            id:   221,
            name: 'Hitra ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hitra-fb&unit=6471' + mmMode
        },
        {
            id:   222,
            name: 'Hjartdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12171' + mmMode
        },
        {
            id:   223,
            name: 'Hjelmeland ' + bibliotek,
            url:  http + 'www.hjelmeland.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   224,
            name: 'Hobøl ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hobol-fb&unit=6471' + mmMode
        },
        {
            id:   48,
            name: 'Hof ' + folkebibliotek,
            url:  http + 'www.hof.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   225,
            name: 'Hol ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12789' + mmMode
        },
        {
            id:   226,
            name: 'Hole ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hole-fb&unit=6471' + mmMode
        },
        {
            id:   227,
            name: 'Holmestrand ' + bibliotek,
            url:  http + mmURL + mmSearch + 'holmestrand-fb&unit=6465' + mmMode
        },
        {
            id:   228,
            name: 'Holtålen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'holtalen-fb&unit=6471' + mmMode
        },
        {
            id:   229,
            name: 'Hornindal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hornindal-fb&unit=6463' + mmMode
        },
        {
            id:   49,
            name: 'Horten ' + bibliotek,
            url:  http + 'www.horten.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   50,
            name: 'Hurdal ' + bibliotek,
            url:  http + 'www.hurdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   230,
            name: 'Hurum ' + folkebibliotek,
            url:  http + 'bibliotek.hurum.kommune.no/bibliotek/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   51,
            name: 'Hvaler ' + folkebibliotek,
            url:  http + 'hvalbib.hvaler.kommune.no' + bfSearch + bfMode
        },
        {
            id:   231,
            name: 'Hyllestad ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'hyllestad-fb&unit=6465' + mmMode
        },
        {
            id:   53,
            name: 'Hå ' + folkebibliotek,
            url:  http + 'www.ha.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   232,
            name: 'Hægebostad og Eiken ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-agder-felles&unit=6471' + mmMode
        },
        {
            id:   52,
            name: 'Høyanger ' + bibliotek,
            url:  http + 'www.hoyanger.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   233,
            name: 'Høylandet ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6473' + mmMode
        },
        {
            id:   234,
            name: 'Ibestad ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ibestad-fb&unit=6471' + mmMode
        },
        {
            id:   235,
            name: 'Inderøy ' + bibliotek,
            url:  http + mmURL + mmSearch + 'inderoy-fb&unit=6463' + mmMode
        },
        {
            id:   236,
            name: 'Iveland ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'iveland-fb&unit=6471' + mmMode
        },
        {
            id:   54,
            name: 'Jevnaker ' + bibliotek,
            url:  http + 'www.jevnaker.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   55,
            name: 'Jølster ' + folkebibliotek,
            url:  http + 'www.sf.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   237,
            name: 'Karasjok ' + bibliotek,
            url:  http + mmURL + mmSearch + 'karasjok-fb&unit=6471' + mmMode
        },
        {
            id:   238,
            name: 'Karlsøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6477' + mmMode
        },
        {
            id:   56,
            name: 'Karmøy ' + folkebibliotek,
            url:  http + 'www.karmoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   239,
            name: 'Kjøllefjord / Lebesby ' + folkebibliotek,
            url:  http + 'www.kjollefjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   240,
            name: 'Klepp ' + bibliotek,
            url:  http + mmURL + mmSearch + 'jaerbiblioteka&unit=6477' + mmMode
        },
        {
            id:   241,
            name: 'Klæbu ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'klabu-fb&unit=6471' + mmMode
        },
        {
            id:   57,
            name: 'Kongsberg ' + bibliotek,
            url:  http + 'www.kongsberg.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   58,
            name: 'Kongsvinger ' + bibliotek,
            url:  http + 'www.kongsvinger.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   242,
            name: 'Kragerø ' + bibliotek,
            url:  http + mmURL + mmSearch + 'kragero-fb&unit=6465' + mmMode
        },
        {
            id:   243,
            name: 'Kristiansand ' + folkebibliotek,
            url:  http + 'aleph.kristiansand.kommune.no/F/?func=find-b&request=',
        },
        {
            id:   244,
            name: 'Kristiansund ' + bibliotek,
            url:  http + mmURL + mmSearch + 'kristiansund-fb&unit=6471' + mmMode
        },
        {
            id:   59,
            name: 'Kvalsund ' + bibliotek,
            url:  http + 'www.kvalsund.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   245,
            name: 'Kvam ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'kvam-jondal-felles&unit=6477' + mmMode
        },
        {
            id:   246,
            name: 'Kvinesdal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'kvinesdal-fb&unit=6471' + mmMode
        },
        {
            id:   60,
            name: 'Kvinnherad ' + bibliotek,
            url:  http + 'www.kvinnherad.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   247,
            name: 'Kviteseid ' + bibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12177' + mmMode
        },
        {
            id:   248,
            name: 'Kvitsøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'kvitsoy-fb&unit=6471' + mmMode
        },
        {
            id:   249,
            name: 'Kvæfjord ' + bibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6481' + mmMode
        },
        {
            id:   250,
            name: 'Kvænangen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6467' + mmMode
        },
        {
            id:   251,
            name: 'Kåfjord ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6473' + mmMode
        },
        {
            id:   61,
            name: 'Lardal ' + bibliotek,
            url:  http + 'www.lardal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   62,
            name: 'Larvik ' + bibliotek,
            url:  http + 'www.larvik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   252,
            name: 'Lavangen ' + bibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6489' + mmMode
        },
        {
            id:   253,
            name: 'Leikanger ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'leikanger-fb&unit=6465' + mmMode
        },
        {
            id:   63,
            name: 'Leirfjord ' + folkebibliotek,
            url:  http + 'www.leirfjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   254,
            name: 'Leka ' + bibliotek,
            url:  http + mmURL + mmSearch + 'ytre-namdal&unit=6469' + mmMode
        },
        {
            id:   255,
            name: 'Leksvik ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'leksvik-fb&unit=6465' + mmMode
        },
        {
            id:   256,
            name: 'Lenvik ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6471' + mmMode
        },
        {
            id:   257,
            name: 'Lesja ' + bibliotek,
            url:  http + mmURL + mmSearch + 'lesja-fb&unit=6473' + mmMode
        },
        {
            id:   64,
            name: 'Levanger ' + bibliotek,
            url:  http + 'levanger.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   65,
            name: 'Lier ' + bibliotek,
            url:  http + 'www.lier.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   258,
            name: 'Lierne ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6467' + mmMode
        },
        {
            id:   66,
            name: 'Lillehammer ' + bibliotek,
            url:  http + 'www.lillehammer.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   259,
            name: 'Lillesand foke' + bibliotek,
            url:  http + mmURL + mmSearch + 'lillesand-fb&unit=6465' + mmMode
        },
        {
            id:   260,
            name: 'Lindesnes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'lindesnes-fb&unit=6465' + mmMode
        },
        {
            id:   261,
            name: 'Lindås ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12106' + mmMode
        },
        {
            id:   262,
            name: 'Lom ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'lom-fb&unit=6471' + mmMode
        },
        {
            id:   263,
            name: 'Longyearbyen ' + bibliotek,
            url:  http + mmURL + mmSearch + 'longyearbyen-fb&unit=6465' + mmMode
        },
        {
            id:   264,
            name: 'Loppa ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'loppa-fb&unit=6471' + mmMode
        },
        {
            id:   265,
            name: 'Lund ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'lund-fb&unit=6471' + mmMode
        },
        {
            id:   266,
            name: 'Lunner ' + bibliotek,
            url:  http + mmURL + mmSearch + 'lunner-fb&unit=6471' + mmMode
        },
        {
            id:   67,
            name: 'Lurøy ' + bibliotek,
            url:  http + 'www.luroy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   267,
            name: 'Luster ' + bibliotek,
            url:  http + mmURL + mmSearch + 'luster-fb&unit=6465' + mmMode
        },
        {
            id:   68,
            name: 'Lyngdal ' + bibliotek,
            url:  http + 'websok.lyngdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   268,
            name: 'Lyngen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6475' + mmMode
        },
        {
            id:   269,
            name: 'Lærdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'laerdal-fb&unit=6471' + mmMode
        },
        {
            id:   270,
            name: 'Lødingen ' + folkebibliotek,
            url:  http + 'lodingen.bib.no' + bfSearch + bfMode
        },
        {
            id:   69,
            name: 'Lørenskog ' + bibliotek,
            url:  http + 'www.lorenskog.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   271,
            name: 'Løten ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'loten-fb&unit=6471' + mmMode
        },
        {
            id:   70,
            name: 'Malvik ' + bibliotek,
            url:  http + 'www.malvik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   272,
            name: 'Mandal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'mandal-fb&unit=6465' + mmMode
        },
        {
            id:   273,
            name: 'Marker ' + bibliotek,
            url:  http + mmURL + mmSearch + 'marker-fb&unit=6465' + mmMode
        },
        {
            id:   274,
            name: 'Marnardal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-agder-felles&unit=6473' + mmMode
        },
        {
            id:   275,
            name: 'Masfjorden ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12180' + mmMode
        },
        {
            id:   276,
            name: 'Meland ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12148' + mmMode
        },
        {
            id:   277,
            name: 'Meldal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'meldal-fb&unit=6471' + mmMode
        },
        {
            id:   278,
            name: 'Melhus ' + bibliotek,
            url:  http + mmURL + mmSearch + 'melhus-fb&unit=6471' + mmMode
        },
        {
            id:   279,
            name: 'Meløy ' + bibliotek,
            url:  http + mmURL + mmSearch + 'gsm&unit=12828' + mmMode
        },
        {
            id:   280,
            name: 'Meråker ' + bibliotek,
            url:  http + mmURL + mmSearch + 'meraker-fb&unit=6465' + mmMode
        },
        {
            id:   281,
            name: 'Midtre Gauldal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'midtre-gauldal-fb&unit=6465' + mmMode
        },
        {
            id:   282,
            name: 'Modalen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12212' + mmMode
        },
        {
            id:   283,
            name: 'Modum ' + bibliotek,
            url:  http + mmURL + mmSearch + 'modum-fb&unit=6465' + mmMode
        },
        {
            id:   284,
            name: 'Molde ' + bibliotek,
            url:  http + mmURL + mmSearch + 'molde-fb&unit=6465' + mmMode
        },
        {
            id:   71,
            name: 'Moskenes ' + folkebibliotek,
            url:  http + 'www.moskenes.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   72,
            name: 'Moss ' + bibliotek,
            url:  http + 'www.moss.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   285,
            name: 'Målselv ' + bibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6487' + mmMode
        },
        {
            id:   286,
            name: 'Måsøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'masoy-fb&unit=6473' + mmMode
        },
        {
            id:   287,
            name: 'Namdalseid ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'namdalseid-fb&unit=6465' + mmMode
        },
        {
            id:   288,
            name: 'Namsos ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'midtre-namdal&unit=6465' + mmMode
        },
        {
            id:   289,
            name: 'Namsskogan ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6477' + mmMode
        },
        {
            id:   73,
            name: 'Nannestad ' + bibliotek,
            url:  http + 'www.nannestad.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   74,
            name: 'Narvik ' + bibliotek,
            url:  http + 'www.narvik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   75,
            name: 'Naustdal ' + bibliotek,
            url:  http + 'www.sf.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   76,
            name: 'Nedre Eiker ' + bibliotek,
            url:  http + 'www.nedre-eiker.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   77,
            name: 'Nes ' + bibliotek + ' (Akershus)',
            url:  http + 'www.nes-ak.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   290,
            name: 'Nes ' + folkebibliotek + ' (Buskerud)',
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12811' + mmMode
        },
        {
            id:   78,
            name: 'Nesna ' + folkebibliotek,
            url:  http + 'www.nesna.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   291,
            name: 'Nesodden ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nesodden-fb&unit=6465' + mmMode
        },
        {
            id:   292,
            name: 'Nesseby ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nesseby-fb&unit=6465' + mmMode
        },
        {
            id:   293,
            name: 'Nesset ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nesset-fb&unit=6465' + mmMode
        },
        {
            id:   294,
            name: 'Nissedal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12193' + mmMode
        },
        {
            id:   79,
            name: 'Nittedal ' + bibliotek,
            url:  http + 'www.nittedal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   295,
            name: 'Nome ' + folkebibliotek,
            url:  http + 'telebib.tm.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   80,
            name: 'Nord-Aurdal ' + bibliotek,
            url:  http + 'www.nord-aurdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   81,
            name: 'Nord-Fron ' + bibliotek,
            url:  http + 'nfroweb.nord-fron.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   82,
            name: 'Nord-Odal ' + bibliotek,
            url:  http + 'www.nord-odal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   296,
            name: 'Norddal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'norddal-fb&unit=6465' + mmMode
        },
        {
            id:   297,
            name: 'Nordkapp ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nordkapp-fb&unit=6465' + mmMode
        },
        {
            id:   298,
            name: 'Nordre Land ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nordre-land-fb&unit=6463' + mmMode
        },
        {
            id:   299,
            name: 'Nordreisa ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6469' + mmMode
        },
        {
            id:   83,
            name: 'Notodden ' + bibliotek,
            url:  http + 'websok.notodden.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   300,
            name: 'Nærøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ytre-namdal&unit=6465' + mmMode
        },
        {
            id:   301,
            name: 'Odda ' + bibliotek,
            url:  http + mmURL + mmSearch + 'odda-fb&unit=6471' + mmMode
        },
        {
            id:   302,
            name: 'Oppdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'oppdal-fb&unit=6465' + mmMode
        },
        {
            id:   84,
            name: 'Oppegård ' + bibliotek,
            url:  http + 'www.oppegard.bib.no' + bfSearch + bfMode
        },
        {
            id:   303,
            name: 'Orkdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'orkdal-fb&unit=6471' + mmMode
        },
        {
            id:   304,
            name: 'Os bibliotek (Hedmark)',
            url:  http + mmURL + mmSearch + 'osroros-felles&unit=12111' + mmMode
        },
        {
            id:   305,
            name: 'Os folkebibliotek (Hordaland)',
            url:  http + mmURL + mmSearch + 'os-hordaland-fb&unit=6471' + mmMode
        },
        {
            id:   306,
            name: 'Osen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'osen-fb&unit=6464' + mmMode
        },
        {
            id:   307,
            name: 'Osterøy ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12230' + mmMode
        },
        {
            id:   308,
            name: 'Overhalla ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'overhalla-fb&unit=6465' + mmMode
        },
        {
            id:   309,
            name: 'Porsanger ' + bibliotek,
            url:  http + mmURL + mmSearch + 'porsanger-fb&unit=6471' + mmMode
        },
        {
            id:   85,
            name: 'Porsgrunn ' + bibliotek,
            url:  http + 'www.porsgrunn.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   310,
            name: 'Radøy ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nordhordland-felles&unit=12270' + mmMode
        },
        {
            id:   311,
            name: 'Rakkestad ' + bibliotek,
            url:  http + mmURL + mmSearch + 'rakkestad-fb&unit=6473' + mmMode
        },
        {
            id:   86,
            name: 'Rana ' + bibliotek,
            url:  http + 'www.rana.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   312,
            name: 'Randaberg ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'randaberg-fb&unit=6471' + mmMode
        },
        {
            id:   87,
            name: 'Rauma ' + folkebibliotek,
            url:  http + 'www.rauma.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   88,
            name: 'Re ' + bibliotek,
            url:  http + 'www.re.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   89,
            name: 'Rendalen ' + bibliotek,
            url:  http + 'www.rendalen.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   313,
            name: 'Rennebu ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'rennebu-fb&unit=6471' + mmMode
        },
        {
            id:   90,
            name: 'Rennesøy ' + folkebibliotek,
            url:  http + 'www.rennesoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   314,
            name: 'Rindal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'surnadal-fb&unit=6469' + mmMode
        },
        {
            id:   91,
            name: 'Ringebu ' + folkebibliotek,
            url:  http + 'www.ringebu.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   92,
            name: 'Ringerike ' + bibliotek,
            url:  http + 'ringerike.bib.no' + bfSearch + bfMode
        },
        {
            id:   93,
            name: 'Ringsaker ' + bibliotek,
            url:  http + 'ringsaker.bib.no' + bfSearch + bfMode
        },
        {
            id:   315,
            name: 'Rissa ' + bibliotek,
            url:  http + mmURL + mmSearch + 'rissa-fb&unit=12230' + mmMode
        },
        {
            id:   94,
            name: 'Risør ' + bibliotek,
            url:  http + 'www.risor.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   95,
            name: 'Rjukan ' + folkebibliotek,
            url:  http + 'www.rjukan.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   316,
            name: 'Roan ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'roan-fb&unit=6473' + mmMode
        },
        {
            id:   317,
            name: 'Rollag ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/rollag/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   318,
            name: 'Rygge ' + bibliotek,
            url:  http + mmURL + mmSearch + 'rygge-fb&unit=6465' + mmMode
        },
        {
            id:   100,
            name: 'Råde ' + bibliotek,
            url:  http + 'www.rade.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   96,
            name: 'Rælingen ' + bibliotek,
            url:  http + 'ralingen.akershus.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   97,
            name: 'Rødøy ' + folkebibliotek,
            url:  http + 'www.rodoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   319,
            name: 'Rømskog ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'romskog-fb&unit=6465' + mmMode
        },
        {
            id:   320,
            name: 'Røros ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'osroros-felles&unit=12127' + mmMode
        },
        {
            id:   98,
            name: 'Røst ' + folkebibliotek,
            url:  http + 'www.rost.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   99,
            name: 'Røyken ' + bibliotek,
            url:  http + 'websok.royken.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   321,
            name: 'Røyrvik ' + bibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6469' + mmMode
        },
        {
            id:   322,
            name: 'Salangen ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6485' + mmMode
        },
        {
            id:   323,
            name: 'Saltdal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'saltdal-fb&unit=6465' + mmMode
        },
        {
            id:   324,
            name: 'Samnanger ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'samnanger-fb&unit=6464' + mmMode
        },
        {
            id:   325,
            name: 'Sande bibliotek (Møre og Romsdal)',
            url:  http + mmURL + mmSearch + 'more-romsdal-felles&unit=6464' + mmMode
        },
        {
            id:   326,
            name: 'Sande folkebibliotek (Vestfold)',
            url:  http + mmURL + mmSearch + 'sande-fb&unit=6471' + mmMode
        },
        {
            id:   101,
            name: 'Sandefjord ' + bibliotek,
            url:  http + 'www.sandefjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   327,
            name: 'Sandnes ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sandnes-fb&unit=6471' + mmMode
        },
        {
            id:   328,
            name: 'Sandøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sandoy-fb&unit=6465' + mmMode
        },
        {
            id:   329,
            name: 'Sarpsborg ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sarpsborg-fb&unit=6477' + mmMode
        },
        {
            id:   330,
            name: 'Sauda ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ryfylkebiblioteket&unit=29587' + mmMode
        },
        {
            id:   331,
            name: 'Sauherad ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sauherad-fb&unit=6471' + mmMode
        },
        {
            id:   102,
            name: 'Sel ' + bibliotek,
            url:  http + 'websok.sel.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   332,
            name: 'Selbu ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'selbu-fb&unit=6471' + mmMode
        },
        {
            id:   333,
            name: 'Selje folkeboksamling',
            url:  http + mmURL + mmSearch + 'selje-fb&unit=6469' + mmMode
        },
        {
            id:   334,
            name: 'Seljord folkeboksamling',
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12189' + mmMode
        },
        {
            id:   335,
            name: 'Siljan ' + bibliotek,
            url:  http + mmURL + mmSearch + 'siljan-fb&unit=6471' + mmMode
        },
        {
            id:   336,
            name: 'Sirdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sirdal-fb&unit=6471' + mmMode
        },
        {
            id:   337,
            name: 'Skaun ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'skaun-fb&unit=6471' + mmMode
        },
        {
            id:   103,
            name: 'Skedsmo ' + bibliotek,
            url:  http + 'skedsmo.akershus.fylkesbibl.no' + bfSearch + bfMode
        },
        {
            id:   338,
            name: 'Ski ' + bibliotek,
            url:  http + mmURL + mmSearch + 'ski-fb&unit=6471' + mmMode
        },
        {
            id:   104,
            name: 'Skien ' + bibliotek,
            url:  http + 'www.skien.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   105,
            name: 'Skiptvet ' + bibliotek,
            url:  http + 'www.skiptvet.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   339,
            name: 'Skjervøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6483' + mmMode
        },
        {
            id:   340,
            name: 'Skjåk ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'skjak-fb&unit=6471' + mmMode
        },
        {
            id:   341,
            name: 'Skodje ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'skodje-orskog-fb&unit=6465' + mmMode
        },
        {
            id:   106,
            name: 'Skånland ' + bibliotek,
            url:  http + 'www.skanland.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   342,
            name: 'Smøla ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'smola-fb&unit=6471' + mmMode
        },
        {
            id:   344,
            name: 'Snåsa ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'indre-namdal&unit=6465' + mmMode
        },
        {
            id:   107,
            name: 'Sogndal ' + bibliotek,
            url:  http + 'sdalbib.sogndal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   345,
            name: 'Sola ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'jaerbiblioteka&unit=6477' + mmMode
        },
        {
            id:   346,
            name: 'Solund ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'solund-fb&unit=6465' + mmMode
        },
        {
            id:   347,
            name: 'Songdalen ' + bibliotek,
            url:  http + 'websok.songdalen-bibliotek.no' + mmSearch + 'mikromarc3&unit=6471' + mmMode
        },
        {
            id:   108,
            name: 'Sortland ' + bibliotek,
            url:  http + 'www.sortland.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   348,
            name: 'Spydeberg ' + bibliotek,
            url:  http + mmURL + mmSearch + 'spydeberg-fb&unit=6471' + mmMode
        },
        {
            id:   349,
            name: 'Stange ' + bibliotek,
            url:  http + mmURL + mmSearch + 'stange-fb&unit=6471' + mmMode
        },
        {
            id:   350,
            name: 'Stavanger ' + bibliotek,
            url:  http + 'aleph.stavanger.kommune.no/F/?func=find-b&request=',
        },
        {
            id:   109,
            name: 'Steigen ' + folkebibliotek,
            url:  http + 'steigen.bib.no' + bfSearch + bfMode
        },
        {
            id:   110,
            name: 'Steinkjer ' + bibliotek,
            url:  http + 'websok.steinkjer.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   351,
            name: 'Stjørdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'stjordal-fb&unit=6465' + mmMode
        },
        {
            id:   352,
            name: 'Stokke ' + bibliotek,
            url:  http + mmURL + mmSearch + 'stokke-fb&unit=6471' + mmMode
        },
        {
            id:   111,
            name: 'Stor-Elvdal ' + bibliotek,
            url:  http + 'www.stor-elvdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   112,
            name: 'Stord ' + folkebibliotek,
            url:  http + 'www.stord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   354,
            name: 'Stordal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'stordal-fb&unit=6471' + mmMode
        },
        {
            id:   355,
            name: 'Storfjord ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-troms-felles&unit=6479' + mmMode
        },
        {
            id:   356,
            name: 'Strand ' + bibliotek,
            url:  http + mmURL + mmSearch + 'ryfylkebiblioteket&unit=29587' + mmMode
        },
        {
            id:   357,
            name: 'Stranda ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'stranda-fb&unit=6465' + mmMode
        },
        {
            id:   358,
            name: 'Stryn ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'stryn-fb&unit=6465' + mmMode
        },
        {
            id:   359,
            name: 'Sula ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sula-fb&unit=6471' + mmMode
        },
        {
            id:   360,
            name: 'Suldal ' + folkebibliotek,
            url:  http + 'www.suldal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   113,
            name: 'Sund ' + folkebibliotek,
            url:  http + 'www.bivest.bib.no' + bfSearch + bfMode
        },
        {
            id:   361,
            name: 'Sunndal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sunndal-fb&unit=6465' + mmMode
        },
        {
            id:   362,
            name: 'Surnadal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'surnadal-fb&unit=6465' + mmMode
        },
        {
            id:   114,
            name: 'Sveio ' + bibliotek,
            url:  http + 'www.sveio.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   115,
            name: 'Svelvik ' + bibliotek,
            url:  http + 'www.svelvik.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   363,
            name: 'Sykkylven ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sykkylven-fb&unit=6471' + mmMode
        },
        {
            id:   116,
            name: 'Søgne ' + bibliotek,
            url:  http + 'www.sogne.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   364,
            name: 'Sømna ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'somna-fb&unit=6465' + mmMode
        },
        {
            id:   365,
            name: 'Søndre Land ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sondre-land-fb&unit=6471' + mmMode
        },
        {
            id:   117,
            name: 'Sør-Aurdal ' + folkebibliotek,
            url:  http + 'www.sor-aurdal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   366,
            name: 'Sør-Fron ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sor-fron-fb&unit=6471' + mmMode
        },
        {
            id:   118,
            name: 'Sør-Odal ' + bibliotek,
            url:  http + 'www.sor-odal.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   367,
            name: 'Sør-Varanger ' + bibliotek,
            url:  http + mmURL + mmSearch + 'sorvaranger-fb&unit=6473' + mmMode
        },
        {
            id:   368,
            name: 'Sørfold ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'sorfold-fb&unit=6465' + mmMode
        },
        {
            id:   369,
            name: 'Sørreisa ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6483' + mmMode
        },
        {
            id:   119,
            name: 'Sørum ' + bibliotek,
            url:  http + 'www.sorum.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   370,
            name: 'Tana ' + bibliotek,
            url:  http + mmURL + mmSearch + 'tana-fb&unit=6465' + mmMode
        },
        {
            id:   371,
            name: 'Time ' + bibliotek,
            url:  http + mmURL + mmSearch + 'jaerbiblioteka&unit=6477' + mmMode
        },
        {
            id:   372,
            name: 'Tingvoll ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'tingvoll-fb&unit=6465' + mmMode
        },
        {
            id:   373,
            name: 'Tjeldsund ' + folkebibliotek,
            url:  http + 'tjeldsund.bib.no' + bfSearch + bfMode
        },
        {
            id:   374,
            name: 'Tjøme ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'tjome-fb&unit=6471' + mmMode
        },
        {
            id:   375,
            name: 'Tokke ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=12163' + mmMode
        },
        {
            id:   376,
            name: 'Tolga ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'nord-osterdal&unit=6465' + mmMode
        },
        {
            id:   377,
            name: 'Tranøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'troms-felles&unit=6495' + mmMode
        },
        {
            id:   120,
            name: 'Tromsø ' + bibliotek,
            url:  http + 'www.tromso.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   121,
            name: 'Trondheim ' + folkebibliotek,
            url:  http + 'www.trondheim.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   122,
            name: 'Trysil ' + folkebibliotek,
            url:  http + 'www.trysil.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   123,
            name: 'Træna ' + folkebibliotek,
            url:  http + 'www.trana.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   378,
            name: 'Trøgstad ' + bibliotek,
            url:  http + mmURL + mmSearch + 'trogstad-fb&unit=6471' + mmMode
        },
        {
            id:   379,
            name: 'Tvedestrand ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'tvedestrand-fb&unit=6471' + mmMode
        },
        {
            id:   380,
            name: 'Tydal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'tydal-fb&unit=6465' + mmMode
        },
        {
            id:   381,
            name: 'Tynset ' + bibliotek,
            url:  http + mmURL + mmSearch + 'nord-osterdal&unit=6467' + mmMode
        },
        {
            id:   124,
            name: 'Tysfjord ' + folkebibliotek,
            url:  http + 'www.tysfjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   382,
            name: 'Tysnes ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/tysnes/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   125,
            name: 'Tysvær ' + folkebibliotek,
            url:  http + 'www.tysver.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   126,
            name: 'Tønsberg og Nøtterøy ' + bibliotek,
            url:  http + 'websok.tonsberg.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   127,
            name: 'Ullensaker ' + bibliotek,
            url:  http + 'www.ullensaker.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   383,
            name: 'Ullensvang ' + bibliotek,
            url:  http + mmURL + mmSearch + 'ullensvang-fb&unit=6489' + mmMode
        },
        {
            id:   384,
            name: 'Ulstein ' + bibliotek,
            url:  http + mmURL + mmSearch + 'more-romsdal-felles&unit=6463' + mmMode
        },
        {
            id:   385,
            name: 'Ulvik ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ulvik-fb&unit=6471' + mmMode
        },
        {
            id:   128,
            name: 'Utsira ' + folkebibliotek,
            url:  http + 'www.utsira.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   129,
            name: 'Vadsø ' + bibliotek,
            url:  http + 'www.vadso.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   386,
            name: 'Vaksdal ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vaksdal-fb&unit=6471' + mmMode
        },
        {
            id:   387,
            name: 'Valle ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'valle-fb&unit=6471' + mmMode
        },
        {
            id:   130,
            name: 'Vang ' + folkebibliotek,
            url:  http + 'www.vang.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   388,
            name: 'Vanylven ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vanylven-fb&unit=6465' + mmMode
        },
        {
            id:   389,
            name: 'Vardø ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vardo-fb&unit=6473' + mmMode
        },
        {
            id:   131,
            name: 'Vefsn ' + bibliotek,
            url:  http + 'www.vefsn.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   390,
            name: 'Vega ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vega-fb&unit=6465' + mmMode
        },
        {
            id:   391,
            name: 'Vegårshei ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vegarshei-fb&unit=6465' + mmMode
        },
        {
            id:   132,
            name: 'Verdal ' + bibliotek,
            url:  http + 'verbib.verdal.kommune.no' + bfSearch + bfMode
        },
        {
            id:   133,
            name: 'Verran ' + folkebibliotek,
            url:  http + 'websok-verran.steinkjer.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   392,
            name: 'Vestby ' + bibliotek,
            url:  http + mmURL + mmSearch + 'vestby-fb&unit=6465' + mmMode
        },
        {
            id:   393,
            name: 'Vestnes ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vestnes-fb&unit=6471' + mmMode
        },
        {
            id:   134,
            name: 'Vestre Slidre ' + bibliotek,
            url:  http + 'www.vestre-slidre.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   135,
            name: 'Vestre Toten ' + bibliotek,
            url:  http + 'www.vestre-toten.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   136,
            name: 'Vestvågøy ' + bibliotek,
            url:  http + 'www.vestvagoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   394,
            name: 'Vevelstad ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vevelstad-fb&unit=6465' + mmMode
        },
        {
            id:   395,
            name: 'Vik ' + folkebibliotek,
            url:  http + 'asp.bibliotekservice.no/vik/doclist.aspx?fquery=fr%3d',
        },
        {
            id:   396,
            name: 'Vikna ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'ytre-namdal&unit=6467' + mmMode
        },
        {
            id:   137,
            name: 'Vindafjord ' + folkebibliotek,
            url:  http + 'www.vindafjord.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   397,
            name: 'Vinje ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vest-telemark-felles&unit=22889' + mmMode
        },
        {
            id:   398,
            name: 'Volda ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'orsta-volda-fb&unit=6475' + mmMode
        },
        {
            id:   138,
            name: 'Voss ' + folkebibliotek,
            url:  http + 'www.voss.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   140,
            name: 'Vågan ' + bibliotek,
            url:  http + 'www.vagan.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   399,
            name: 'Vågsøy ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'vagsoy-fb&unit=6465' + mmMode
        },
        {
            id:   400,
            name: 'Vågå ' + bibliotek,
            url:  http + mmURL + mmSearch + 'vaga-fb&unit=6471' + mmMode
        },
        {
            id:   401,
            name: 'Våler bibliotek (Østfold)',
            url:  http + mmURL + mmSearch + 'valer-fb&unit=6471' + mmMode
        },
        {
            id:   141,
            name: 'Våler folkebibliotek (Hedmark)',
            url:  http + 'www.vaaler-he.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   139,
            name: 'Værøy ' + folkebibliotek,
            url:  http + 'www.varoy.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   404,
            name: 'Åfjord ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'afjord-fb&unit=6471' + mmMode
        },
        {
            id:   405,
            name: 'Ål ' + bibliotek,
            url:  http + mmURL + mmSearch + 'hallingdal-felles&unit=12779' + mmMode
        },
        {
            id:   148,
            name: 'Ålesund ' + bibliotek,
            url:  http + 'websok.alesund.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   406,
            name: 'Åmli ' + bibliotek,
            url:  http + mmURL + mmSearch + 'amli-fb&unit=6471' + mmMode
        },
        {
            id:   149,
            name: 'Åmot ' + folkebibliotek,
            url:  http + 'www.amot.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   407,
            name: 'Årdal ' + bibliotek,
            url:  http + mmURL + mmSearch + 'ardal-fb&unit=12764' + mmMode
        },
        {
            id:   408,
            name: 'Ås ' + bibliotek,
            url:  http + mmURL + mmSearch + 'as-fb&unit=29490' + mmMode
        },
        {
            id:   409,
            name: 'Åseral ' + bibliotek,
            url:  http + mmURL + mmSearch + 'vest-agder-felles&unit=6465' + mmMode
        },
        {
            id:   150,
            name: 'Åsnes ' + folkebibliotek,
            url:  http + 'www.asnes.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   142,
            name: 'Øksnes ' + bibliotek,
            url:  http + 'www.oksnes.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   402,
            name: 'Ørskog ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'skodje-orskog-fb&unit=6465' + mmMode
        },
        {
            id:   403,
            name: 'Ørsta ' + folkebibliotek,
            url:  http + mmURL + mmSearch + 'orsta-volda-fb&unit=6471' + mmMode
        },
        {
            id:   143,
            name: 'Østre Toten ' + bibliotek,
            url:  http + 'websok.ostre-toten.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   144,
            name: 'Øvre Eiker ' + bibliotek,
            url:  http + 'www.ovre-eiker.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   145,
            name: 'Øyer ' + folkebibliotek,
            url:  http + 'www.oyer.folkebibl.no' + bfSearch + bfMode
        },
        {
            id:   146,
            name: 'Øygarden ' + bibliotek,
            url:  http + 'www.bivest.bib.no' + bfSearch + bfMode
        },
        {
            id:   147,
            name: 'Øystre Slidre ' + folkebibliotek,
            url:  http + 'www.oystre-slidre.folkebibl.no' + bfSearch + bfMode
        }
    ]

    $.fn.extend({

        // Usage:
        // $('#container').finnBoka({ search: 'Moby Dick' });
        // $('#container').finnBoka({ source: '#book-name' });

        // '#container' would be a selector for the element where you want
        // the library selector to appear.

        // Either supply a search string with the 'search' option,
        // or a selector for an element 'source' where the search string can be read.

        finnBoka: function(options) {

            options = $.extend({}, defaults, options);

            // helper function to create cookie
            function createCookie(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = '; expires=' + date.toGMTString();
                } else {
                    var expires = '';
                }
                document.cookie = name + '=' + value + expires + '; path=/';
            }

            // helper function to read cookie
            function readCookie(name) {
                var nameEq = name + '=';
                var cookies = document.cookie.split(';');
                for(var i = 0; i < cookies.length; i++) {
                    var c = cookies[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEq) == 0)
                        return c.substring(nameEq.length, c.length);
                }
                return null;
            }

            var favourite = +readCookie('finnboka-fav');

            return $(this).each(function() {

                var selections = '';
                $(libraries).each(function(index, library) {
                    var selected = library.id == favourite ? ' selected' : '';
                    selections += '<option value="' + library.id + '"' + selected + '>' + library.name + '</option>';
                })

                var form = '' +
                '<form class="finnboka-libs">' +
                '  <label>' + options.labelString + '</label>' +
                '  <select class="lib" name="lib">' +
                     selections +
                '  </select>' +
                '  <input class="button" type="submit" value="Søk">' +
                '  <a class="finnboka-fav" href="">' + options.favouriteString + '</a>' +
                '</form>';

                $(this).append(form);

                // navigate on submit
                $('.finnboka-libs').on('submit', function(e) {
                    e.preventDefault();
                    var selected = +$('.lib').val();

                    var library = libraries.filter(function(lib) {
                        return lib.id === selected;
                    })[0];

                    var search = options.search;
                    if (!search)
                        search = $(options.source).text().trim();

                    if (library)
                        window.location = library.url + search;
                })

                // set favourite library
                $('.finnboka-fav').on('click', function(e) {
                    e.preventDefault();
                    var selected = +$('.lib').val();

                    createCookie('finnboka-fav', selected);
                })
            });
        }
    });

})(jQuery, window);
