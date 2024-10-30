;(function (bookaletWidgetBuilder, undefined) {
    "use strict";

    //Private Property
    var env = 'production';
    var vars = {
        debug: {
            baseUrl: 'https://widgets.bookaletlocal.co.uk:44381',
            secureUrl: 'https://secure.bookaletlocal.co.uk:44380',
            debug: true
        },
        staging: {
            baseUrl: 'https://widgets.bookaletdev.co.uk',
            secureUrl: 'https://secure.bookaletdev.co.uk',
            debug: false
        },
        production: {
            baseUrl: 'https://widgets.bookalet.co.uk',
            secureUrl: 'https://secure.bookalet.co.uk',
            debug: false
        }
    };

    var types = {
        1: {
            name: 'Calendar',
            prop: true,
            multi: true,
            calendar: true,
            minEdition: 1,
            options: ['Standard', 'Calendar']
        },
        2: {
            name: 'Calendar and Booking Form',
            prop: true,
            multi: true,
            calendar: true,
            minEdition: 1,
            options: ['Standard', 'Calendar', 'BookingForm'],
            defaults: { canBook: true }
        },
        3: {
            name: 'Rate Card',
            prop: true,
            multi: false,
            calendar: true,
            minEdition: 1,
            options: ['Standard', 'RateCard']
        },
        4: {
            name: 'Enquiry Form',
            prop: true,
            multi: true,
            calendar: false,
            minEdition: 1,
            options: ['Standard', 'Enquiry']
        },
        5: {
            name: 'Search',
            prop: false,
            multi: true,
            calendar: false,
            minEdition: 3,
            options: ['Standard', 'SearchForm', 'SearchResults', 'BookingForm'],
            defaults: { canBook: true, monthCount: 6 }
        },
        6: {
            name: 'Special Offers',
            prop: true,
            multi: true,
            calendar: false,
            minEdition: 2,
            options: ['Standard', 'SpecialOffers']
        },
        7: {
            name: 'Facilities List',
            prop: true,
            multi: false,
            calendar: false,
            minEdition: 2,
            options: ['Standard', 'FacilitiesList']
        },
        8: {
            name: 'Map Search',
            prop: false,
            multi: true,
            calendar: false,
            minEdition: 3,
            options: ['Standard', 'Map', 'SearchForm']
        }
    };

    var options = {
        Standard: {
            label: 'General options',
            fields: {
                ShowTitle: { type: 'toggle', label: 'Display header?', desc: 'Show or hide the widget header bar', value: true },
                Compact: { type: 'toggle', label: 'Compact mode?', desc: 'Enable compact calendars', value: false },
                Colour: { type: 'colour', label: 'Primary colour', desc: 'Choose a primary colour that will be reflected throughout your widget. For more advanced control, see the \'Themes\' section', value: '#4588D9' },
            }
        },
        Calendar: {
            label: 'Calendar',
            fields: {
                LinkToDetails: { type: 'toggle', label: 'Multi-property - link property name to details page', desc: 'Link property names in multi-property calendar to property details rather than 12 month booking form', value: false },
                LinkToDetailsNewWindow: { type: 'toggle', label: 'Open links in new window', desc: 'Open links in a new window rather than same as widget. Necessary when widget is loaded in an iFrame as in some web builders e.g. Wix, etc', value: false },
                FromMonth: {
                    type: 'select', label: 'From (month)', value: '-1', desc: 'Display calendar from',
                    data: [{ 'Current Month': '' }, { 'January': 1 }, { 'Febuary': 2 }, { 'March': 3 }, { 'April': 4 }, { 'May': 5 }, { 'June': 6 }, { 'July': 7 }, { 'August': 8 }, { 'September': 9 }, { 'October': 10 }, { 'November': 11 }, { 'December': 12 }],
                },
                FromYear: { type: 'year', label: 'From (year)', desc: 'Leave blank to use current year', value: '' },
                ToMonth: {
                    type: 'select', label: 'To (month)', value: '-1', desc: 'Display calendar until',
                    data: [{ 'None': '' }, { 'January': 1 }, { 'Febuary': 2 }, { 'March': 3 }, { 'April': 4 }, { 'May': 5 }, { 'June': 6 }, { 'July': 7 }, { 'August': 8 }, { 'September': 9 }, { 'October': 10 }, { 'November': 11 }, { 'December': 12 }],
                },
                ToYear: { type: 'year', label: 'To (year)', desc: 'Leave blank to use current year', value: '' },
                WeekStart: {
                    type: 'select', label: 'Week startday', value: '6', desc: 'Display weeks starting on',
                    data: [{ 'Monday': 1 }, { 'Tuesday': 2 }, { 'Wednesday': 3 }, { 'Thursday': 4 }, { 'Friday': 5 }, { 'Saturday': 6 }, { 'Sunday': 7 }],
                }
            }
        },
        BookingForm: {
            label: 'Booking Form',
            fields: {
                CollectChildCount: { type: 'toggle', label: 'Collect child count?', desc: 'Enable to display a drop down list that collects the number of children in party', value: true },
                CollectInfantCount: { type: 'toggle', label: 'Collect infant count?', desc: 'Enable to display a drop down list that collects the number of infants in party', value: true },
                CollectAddress: { type: 'toggle', label: 'Collect customer address?', desc: 'Enable to display form fields that collects the guest\'s address', value: true },
                CollectDayPhone: { type: 'toggle', label: 'Collect daytime phone number?', desc: 'Enable to display a form field that collects the guest\'s daytime phone number', value: true },
                CollectDayPhoneRequired: { type: 'toggle', label: 'Daytime phone number is required?', desc: 'Make the day time telephone number a required field', value: false },
                CollectEvePhone: { type: 'toggle', label: 'Collect evening phone number?', desc: 'Enable to display a form field that collects the guest\'s evening phone number', value: true },
                CollectEvePhoneRequired: { type: 'toggle', label: 'Evening phone number is required?', desc: 'Make the evening telephone number a required field', value: false },
                CollectMobPhone: { type: 'toggle', label: 'Collect mobile phone number?', desc: 'Enable to display a form field that collects the guest\'s mobile phone number', value: true },
                CollectMobPhoneRequired: { type: 'toggle', label: 'Mobile phone number is required?', desc: 'Make the mobile telephone number a required field', value: false },
                CollectComments: { type: 'toggle', label: 'Collect comments/notes?', desc: 'Enable to display a text field to allow the guest to enter any comments/message', value: true },
                CollectEstimatedArrival: { type: 'toggle', label: 'Collect estimated arrival time?', desc: 'Enable to display that collects the guest\'s estimated time of arrival', value: true },
                CollectGuestNames: { type: 'toggle', label: 'Collect guest names?', desc: 'Enable to display a form field for each guest\s name', value: false },
                CollectAdultAges: { type: 'toggle', label: 'Collect adult ages?', desc: 'Enable to display a form field for each adult guest\s age', value: false },
                CollectChildAges: { type: 'toggle', label: 'Collect child ages?', desc: 'Enable to display a form field for each child guest\s age', value: false },
                BreakageLabel: { type: 'textbox', label: 'Breakage deposit label', desc: 'Change default `Breakage deposit` label i.e. security deposit, bond etc', value: 'Refundable breakage deposit' },
                CustomField1: { type: 'textbox', label: 'Custom field 1 label', desc: 'Enter text to display a text box with the specified label', value: '' },
                CustomField1Required: { type: 'toggle', label: 'Custom field 1 is required?', desc: 'Make the custom field 1 a required field', value: false },
                CustomField2: { type: 'textbox', label: 'Custom field 2 label', desc: 'Enter text to display a text box with the specified label', value: '' },
                CustomField2Required: { type: 'toggle', label: 'Custom field 2 is required?', desc: 'Make the custom field 2 a required field', value: false },
                CustomField3: { type: 'textbox', label: 'Custom field 3 label', desc: 'Enter text to display a text box with the specified label', value: '' },
                CustomField3Required: { type: 'toggle', label: 'Custom field 3 is required?', desc: 'Make the custom field 3 a required field', value: false },
                CollectMarketingOptIn: { type: 'toggle', label: 'Marketing opt-in?', desc: 'Show text box allowing opt-in to e-mail marketing', value: true },
                MarketingOptInText: { type: 'textbox', label: 'Marketing opt-in text', desc: 'Label to show next to marketing email opt-in checbox', value: 'I would like to receive offers, news and information via email' },
                EnforceTerms: { type: 'toggle', label: 'Enforce Terms and Conditions?', desc: 'Enable to show a mandatory checkbox indicating that the guest agrees with your terms and conditions', value: true },
                ShowDiscounts: { type: 'toggle', label: 'List discounts on booking form?', desc: 'If disabled, the base price will be reduced and individual discounts (other than any applied voucher code) will not be displayed', value: true },
                BookingTrackingCode: { type: 'textarea', label: 'Tracking Code', desc: 'Code will be inserted on booking thank you page, useful for tracking conversions through Google Analytics etc. (please include all script tags)', value: '' },
                ShowCurrency: { type: 'toggle', label: 'Show Currency Conversion?', desc: 'If enabled, an approximate currency conversion will be displayed', value: false },

            }
        },
        Enquiry: {
            label: 'Enquiry Form',
            fields: {
                CollectChildCount: { type: 'toggle', label: 'Collect child count?', desc: 'Enable to display a drop down list that collects the number of children in party', value: true },
                CollectInfantCount: { type: 'toggle', label: 'Collect infant count?', desc: 'Enable to display a drop down list that collects the number of infants in party', value: true },
                CollectTitle: { type: 'toggle', label: 'Collect customer title?', desc: 'Enable to display a text box that collects the guest\'s title', value: true },
                CollectAddress: { type: 'toggle', label: 'Collect customer address?', desc: 'Enable to display form fields that collects the guest\'s address', value: true },
                AddressRequired: { type: 'toggle', label: 'Customer address required?', desc: 'Make guest\'s address a required field', value: false },
                CollectDayPhone: { type: 'toggle', label: 'Collect daytime phone number?', desc: 'Enable to display a form field that collects the guest\'s daytime phone number', value: true },
                CollectDayPhoneRequired: { type: 'toggle', label: 'Daytime phone number is required?', desc: 'Make the day time telephone number a required field', value: false },
                CollectEvePhone: { type: 'toggle', label: 'Collect evening phone number?', desc: 'Enable to display a form field that collects the guest\'s evening phone number', value: true },
                CollectEvePhoneRequired: { type: 'toggle', label: 'Evening phone number is required?', desc: 'Make the evening telephone number a required field', value: false },
                CollectMobPhone: { type: 'toggle', label: 'Collect mobile phone number?', desc: 'Enable to display a form field that collects the guest\'s mobile phone number', value: true },
                CollectMobPhoneRequired: { type: 'toggle', label: 'Mobile phone number is required?', desc: 'Make the mobile telephone number a required field', value: false },
                CollectComments: { type: 'toggle', label: 'Collect comments/notes?', desc: 'Enable to display a text field to allow the guest to enter any comments/message', value: true },
                CollectEstimatedArrival: { type: 'toggle', label: 'Collect estimated arrival time?', desc: 'Enable to display that collects the guest\'s estimated time of arrival', value: true },
                OriginRequired: { type: 'toggle', label: 'Origin Required?', desc: 'Make \'How did you hear about us?\' a required field', value: true },
                CollectMarketingOptIn: { type: 'toggle', label: 'Marketing opt-in?', desc: 'Show text box allowing opt-in to e-mail marketing', value: true },
                MarketingOptInText: { type: 'textbox', label: 'Marketing opt-in text', desc: 'Label to show next to marketing email opt-in checbox', value: 'I would like to receive offers, news and information via email' },
                EnquiryTrackingCode: { type: 'textarea', label: 'Tracking Code', desc: 'Code will be inserted on enquiry thank you page, useful for tracking conversions through Google Analytics etc. (please include all script tags)', value: '' },
            }
        },
        SearchForm: {
            label: 'Search Form',
            fields: {
                DaysEitherSideDefault: {
                    type: 'select', label: 'Default value for +/- days', value: '0', desc: 'Choose the default value for the flexible dates field',
                    data: ['0',
                           '1',
                           '2',
                           '3',
                           '4',
                           '5',
                           '6',
                           '7']
                },
                ShowAdvancedDefault: { type: 'toggle', label: 'Show advanced search filters by default?', desc: 'By default, certain filters are hidden behind a collapsed \'Advanced Search\' link, enabling this option will keep these visible', value: false },
                ShowLocations: { type: 'toggle', label: 'Show location filter?',  desc: 'Enabling this options shows a drop-down list of each town that your properties are in and allows the guest to filter by these', value: false },
                ShowChangeover: { type: 'toggle', label: 'Show changeover day filter?', value: false },
                Facilities: { type: 'checkboxlist_container', label: 'Facilities', desc:'Choose whether your facilities should be shown as filterable options in the search form and/or displayed as icons in the search results', value:'Show in', data: window.facilities },
                ShowFacilitiesFilters: { type: 'checkboxlist:Facilities', label: 'filter:', value: '', data: window.facilities },
                ShowFacilitiesResults: { type: 'checkboxlist:Facilities', label: 'results:', value: '', data: window.facilities },
                ShowPropertyGroupFilters: { type: 'checkboxlist', label: 'Property Groups Filters:', desc: 'Add filters by property group', value: '', data: window.propertyGroups },
          }
        },
        SearchResults: {
            label: 'Search Results',
            fields: {
                DefaultView: {
                    type: 'select', label: 'Default view for search results', desc: 'Choose whether to display search results as a grid or in a list', value: 'List',
                    data: ['List', 'Grid', 'Map']
                },
                ShowAllDefault: { type: 'toggle', label: 'Show all properties before searching?', desc: 'Enabling this will display all properties as \'results\' before a search is made', value: false },
                ResultsNewWindow: { type: 'toggle', label: 'Open results in pop-up window?', desc: 'Open search results in a new window instead of underneath the search form', value: false },
                LinksNewWindow: { type: 'toggle', label: 'Open "More Information" pages in new window?', desc: 'Open property \'more information\' links in a new window instead of over the top of the page with the search form', value: false },
                ResultsPageUrl: { type: 'textbox', label: 'Results page URL:', desc: 'By default, the search results load under the search form. You can specify an alternative results page here, which must also have a search widget published to it. This is useful if you wish to use a "mini" search on your homepage or sidebar where displaying results in-line is impractical', value: '' },
                AllowMapView: { type: 'toggle', label: 'Allow map view', desc: 'Adds option to display search results on map', value: false },
                HideTrueLocation: { type: 'toggle', label: 'Hide true property location on map?', desc: 'When zoomed in property location will be indicated by a vauge circle rather than a marker shwoing its exact location', value: false },
            }
        },
        Map: {
            label: 'Map',
            fields: {
                ShowSearchForm: { type: 'toggle', label: 'Show search form?', desc: 'Enabling this will dsplay the search form above the map', value: false },
                HideTrueLocation: { type: 'toggle', label: 'Hide true property location?', desc: 'When zoomed in property location will be indicated by a vauge circle rather than a marker shwoing its exact location', value: false },
                LinksNewWindow: { type: 'toggle', label: 'Open "More Information" pages in new window?', desc: 'Open property \'more information\' links in a new window instead of over the top of the page with the search form', value: false },
            }
        },
        RateCard: {
            label: 'Rate card',
            fields: {
                ShowSplitWeeks: { type: 'toggle', label: 'Show split week pricing?', desc:'Enable to show additional columns for \'Midweek\' and \'Weekend\' pricing', value: false },
                ShowBooked: { type: 'toggle', label: 'Separate booked/provisionally booked periods', desc: 'Enable to show booked periods as separate lines - booked periods with no pricing will be still be displayed as "Booked"', value: false },
                HeaderText: { type: 'textarea', label: 'Header Text', desc: 'Text that will be displayed above the rate card', value: '' },
                HeaderColour: { type: 'colour', label: 'Header colour', desc: 'Choose the colour that the header text will be displayed in', value: '#D51616' },
                FooterText: { type: 'textarea', label: 'Footer Text', desc: 'Text that will be displayed under the rate card', value: '' },
                FooterColour: { type: 'colour', label: 'Footer colour', desc: 'Choose the colour that the footer text will be displayed in', value: '#000000' },
                ShowCurrency: { type: 'toggle', label: 'Show Currency Conversion?', desc: 'If enabled, an approximate currency conversion will be displayed', value: true }
            }
        },
        SpecialOffers: {
            label: 'Special Offers',
            fields: {
                GroupByProperty: { type: 'toggle', label: 'Group special weeks by property?', desc: 'Group offers by property rather than listing individually', value: false },
            }
        },
        FacilitiesList: {
            label: 'Facilities List',
            fields: {
                FacilityColumns: { type: 'textbox', label: 'Number of columns', desc: 'Number of columns to display list in', value: 1 },
                ShowFacilityIcons: { type: 'toggle', label: 'Show icons?', desc: 'Show an icon for each facility', value: true },
                ShowFacilityText: { type: 'toggle', label: 'Show text label?', desc: 'Show a text label for each facility', value: true },
            }
        }

    };

    var mode = 'script';
    bookaletWidgetBuilder.setMode = function (m) {
        mode = m;
    }

    var data = {};
    var form = {};

    /* Shims */
    var f = function () { };
    if (!window.console) {
        window.console = {
            log: f, info: f, warn: f, debug: f, error: f
        };
    }

    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    bookaletWidgetBuilder.EventHandler = {
        bind: function (el, ev, fn) {
            if (window.addEventListener) { // modern browsers including IE9+
                el.addEventListener(ev, fn, false);
            } else if (window.attachEvent) { // IE8 and below
                el.attachEvent('on' + ev, fn);
            } else {
                el['on' + ev] = fn;
            }
        },

        unbind: function (el, ev, fn) {
            if (window.removeEventListener) {
                el.removeEventListener(ev, fn, false);
            } else if (window.detachEvent) {
                el.detachEvent('on' + ev, fn);
            } else {
                elem['on' + ev] = null;
            }
        },

        stop: function (ev) {
            var e = ev || window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
        }
    }

    //Public Method
    bookaletWidgetBuilder.publisher = function (id, typeId, properties, propertyGroups, themes) {

        var form_publishforfield = document.getElementById('publishforfield_' + id);
        var form_publishforfield_all = document.getElementById('publishforfield_all_' + id);
        var form_publishforfield_prop = document.getElementById('publishforfield_prop_' + id);
        var form_publishforfield_group = document.getElementById('publishforfield_group_' + id);
        var form_propertyfield = document.getElementById('propertyfield_' + id);
        var form_propertygroupfield = document.getElementById('propertygroupfield_' + id);
        var form_monthcountfield = document.getElementById('monthcountfield_' + id);
        var form_monthcount = document.getElementById('monthcount_' + id);
        var form_themefield = document.getElementById('themefield_' + id);
        var form_theme = document.getElementById('theme_' + id);
        var form_code = document.getElementById('code_' + id);
        var form_url = document.getElementById('url_' + id);
        var form_preview = document.getElementById('preview_' + id);
        var form_output = document.getElementById('output_' + id);

        form_propertyfield.style.display = 'none';
        form_propertygroupfield.style.display = 'none';
        form_output.style.display = 'none';
        if (form_preview !== null) form_preview.style.display = 'none';

        var type = types[typeId];
        if (vars.debug) console.log("Type: " + type.name);

        if (type.prop) {
            var form_property = document.getElementById('property_' + id);
            form_publishforfield_prop.style.display = 'inline';
            bindProperties(form_property, properties);
            if (vars.debug) console.log("Bind Properties");
        } else {
            form_publishforfield_prop.style.display = 'none';
            bookaletWidgetBuilder.updateCode(id);
        }

        if (type.calendar) {
            form_monthcountfield.style.display = 'block';
            form_monthcount.getValue = function () {
                return [parseInt(this.value)];
            }
            bookaletWidgetBuilder.EventHandler.bind(form_monthcount, 'change', bookaletWidgetBuilder.changeMonthCount);
        } else {
            form_monthcountfield.style.display = 'none';
            form_monthcount.getValue = function () {
                return null;
            }
        }

        if (type.multi && form_publishforfield_all !== null)
        {
            if (vars.debug) console.log("Multi");
            form_publishforfield_all.childNodes[0].checked = true;
            form_publishforfield.setAttribute('data-filter', 1);
            form_publishforfield_all.style.display = 'inline';

            bookaletWidgetBuilder.EventHandler.bind(form_publishforfield_all, 'change', bookaletWidgetBuilder.changeFilterType);

            if (form_publishforfield_group !== null && propertyGroups !== undefined && propertyGroups !== null && Object.keys(propertyGroups).length > 0) {
                var form_propertygroup = document.getElementById('propertygroup_' + id);
                bindPropertyGroups(form_propertygroup, propertyGroups);
                form_publishforfield_group.style.display = 'inline';
                bookaletWidgetBuilder.EventHandler.bind(form_publishforfield_group, 'change', bookaletWidgetBuilder.changeFilterType);
            } else {
                if (form_publishforfield_group !== null) {
                    form_publishforfield_group.style.display = 'none';
                }
            }
        }
        else
        {
            if (vars.debug) console.log("Not Multi");
            if (form_publishforfield_all !== null) {
                form_publishforfield_all.style.display = 'none';
            }
            if (form_publishforfield_group !== null) {
                form_publishforfield_group.style.display = 'none';
            }
            form_publishforfield_prop.childNodes[0].checked = true;
            form_publishforfield.setAttribute('data-filter', 2);
        }
        bookaletWidgetBuilder.EventHandler.bind(form_publishforfield_prop, 'change', bookaletWidgetBuilder.changeFilterType);

        if (form_theme !== null && themes !== undefined && themes !== null && Object.keys(themes).length > 0) {
            bindThemes(form_theme, themes);
            form_themefield.style.display = 'inline';
            bookaletWidgetBuilder.EventHandler.bind(form_theme, 'change', bookaletWidgetBuilder.changeTheme);
        } else {
            if (form_themefield !== null) {
                form_themefield.style.display = 'none';
            }
        }

        bookaletWidgetBuilder.updateCode(id);
    }



    bookaletWidgetBuilder.changeFilterType = function (e) {

        if (vars.debug) console.log("Filters changed by " + e.target.id + ' for ' + id);
        var id = e.target.getAttribute("name").replace('publishfor_', '');
        var type = e.target.value;

        var publishForField = document.getElementById('publishforfield_' + id);
        publishForField.setAttribute('data-filter', type);

        bookaletWidgetBuilder.updateCode(id);
    }

    bookaletWidgetBuilder.changeProp = function (e) {
        if (vars.debug) console.log("Property changed");
        var id = e.target.id.replace('property_', '');
        bookaletWidgetBuilder.updateCode(id);
    }

    bookaletWidgetBuilder.changeMonthCount = function (e) {
        if (vars.debug) console.log("Month count changed");
        var id = e.target.id.replace('monthcount_', '');
        bookaletWidgetBuilder.updateCode(id);
    }

    bookaletWidgetBuilder.changePropGroup = function (e) {
        if (vars.debug) console.log("Property Group changed");
        var id = e.target.id.replace('propertygroup_', '');
        bookaletWidgetBuilder.updateCode(id);
    }

    bookaletWidgetBuilder.changeTheme = function (e) {
        if (vars.debug) console.log("Theme changed");
        var id = e.target.id.replace('theme_', '');
        bookaletWidgetBuilder.updateCode(id);
    }

    bookaletWidgetBuilder.updateCode = function (id) {

        var required = false;
        var filter = 1;
        var publishForField = document.getElementById('publishforfield_' + id);
        var propFieldContainer = document.getElementById('propertyfield_' + id);
        var propGroupFieldContainer = document.getElementById('propertygroupfield_' + id);

        filter = publishForField.getAttribute('data-filter');
        switch (filter)
        {
            case '1':
                propFieldContainer.style.display = "none";
                propGroupFieldContainer.style.display = "none";
                break;

            case '2':
                propFieldContainer.style.display = "block";
                propGroupFieldContainer.style.display = "none";
                break;

            case '3':
                propFieldContainer.style.display = "none";
                propGroupFieldContainer.style.display = "block";
                break;
        }

        var propField = document.getElementById('property_' + id);
        var prop = 0;
        if (propFieldContainer.style.display !== 'none' && propField !== null && propField !== undefined && typeof propField.getValue === 'function' && propField.getValue() > 0) {
            prop = propField.getValue();
        }

        var propGroupField = document.getElementById('propertygroup_' + id);
        var propGroup = 0;
        if (propGroupFieldContainer.style.display !== 'none' && propGroupField !== null && propGroupField !== undefined && typeof propGroupField.getValue === 'function' && propGroupField.getValue() > 0) {
            propGroup = propGroupField.getValue();
        }

        var monthCountField = document.getElementById('monthcount_' + id);
        var monthCount = null;
        if (monthCountField.style.display !== 'none' && monthCountField !== null && monthCountField !== undefined && typeof monthCountField.getValue === 'function' && monthCountField.getValue() > 0) {
            monthCount = monthCountField.getValue();
        }

        var themeField = document.getElementById('theme_' + id);
        var theme = 0;
        if (themeField.style.display !== 'none' && themeField !== null && themeField !== undefined && typeof themeField.getValue === 'function' && themeField.getValue() > 0) {
            theme = themeField.getValue();
        }

        switch (filter) {

            case '2':
                if (prop === 0) required = true;
                break;

            case '3':
                if (propGroup === 0) required = true;
                break;
        }

        if (vars.debug) console.log("Code updated: " + id + " | Prop " + prop + " | Group " + propGroup + " | Month " + monthCount);

        var code = document.getElementById('code_' + id);
        var url = document.getElementById('url_' + id);
        var preview = document.getElementById('preview_' + id);
        var output = document.getElementById('output_' + id);
        var preview_base = null;
        if (preview !== null) preview_base = preview.getAttribute("data-baseurl");

        if (required) {
            code.value = '';
            if (url !== null) {
                url.value = '';
            }
            output.style.display = 'none';
            if (preview !== null) preview.style.display = 'none';
            return true;
        }

        var variable_preset = ' data-';

        if (mode === 'wordpress')
        {
            variable_preset = ' ';
            code.value = '[bookalet id="' + id + '"';
        } else {
            code.value = '<div><script src="' + vars[env].baseUrl + '/publish.js" data-bookalet="' + id + '"';
            if (preview !== null) preview.href = preview_base + '?id=' + id;
            if (url !== null) url.value = vars[env].secureUrl + '/widget?id=' + id;
        }
        
        if (vars.debug) console.log(code.value);
        if (prop > 0) {
            code.value = code.value + variable_preset + 'property="' + prop.toString() + '"';
            if (url !== null) url.value = url.value + '&property=' + prop.toString();
            if (preview !== null) preview.href = preview.href + '&property=' + prop.toString();
        }
        if (monthCount > 0) {
            code.value = code.value + variable_preset + 'monthcount="' + monthCount.toString() + '"';
            if (url !== null) url.value = url.value + '&monthcount=' + monthCount.toString();
            if (preview !== null) preview.href = preview.href + '&monthcount=' + monthCount.toString();
        }
        if (propGroup > 0) {
            code.value = code.value + variable_preset + 'propgroup="' + propGroup.toString() + '"';
            if (url !== null) url.value = url.value + '&propgroup=' + propGroup.toString();
            if (preview !== null) preview.href = preview.href + '&propgroup=' + propGroup.toString();
        }
        if (theme > 0) {
            code.value = code.value + variable_preset + 'theme="' + theme.toString() + '"';
            if (url !== null) url.value = url.value + '&theme=' + theme.toString();
            if (preview !== null) preview.href = preview.href + '&theme=' + theme.toString();
        }
        if (vars.debug) console.log(code.value);
        if (mode === 'wordpress') {
            code.value = code.value + ']';
        } else {
            code.value = code.value + '></script></div>';
        }

        output.style.display = 'block'; 
        if (preview !== null) preview.style.display = 'inline';

        if (vars.debug) console.log(code.value);
    }


    bookaletWidgetBuilder.builder = function (optionsField, minEdition) {
        if (minEdition === undefined) { minEdition = 0; }
        form.options = optionsField;
        if (form.options !== undefined && form.options !== null && form.options.value.length > 0) {
            data = JSON.parse(form.options.value);
        }

        var elements = getBuilderFormElements();
        for (var i = 0; i < elements.length; i++) {
            form[elements[i].getAttribute('data-widget')] = elements[i];
        }

        if (form.type !== undefined) {
            var option = document.createElement('option');
            option.setAttribute('value', '');
            option.innerHTML = 'Please Select..';
            form.type.appendChild(option);

            for (var key in types) {
                if (types.hasOwnProperty(key) && types[key].minEdition <= minEdition) {
                    var option = document.createElement('option');
                    option.setAttribute('value', key);
                    if (data['type'] == key) {
                        option.setAttribute('selected', 'selected');
                    }
                    option.innerHTML = types[key].name;

                    form.type.appendChild(option);
                }
            }
            bookaletWidgetBuilder.EventHandler.bind(form.type, 'change', bookaletWidgetBuilder.changeType)

            form.type.getValue = function () {
                return parseInt(this.value);
            }
        }

        if (data['type'] != undefined) {
            bookaletWidgetBuilder.changeType(false);
        }
    }

    bookaletWidgetBuilder.changeType = function (clearData) {

        if (clearData == undefined) { clearData = true; }

        if (clearData) {
            data = {};
        }
        if (form.type != undefined) {
            data['type'] = form.type.getValue();
        }
        bindForm()
    }

    bookaletWidgetBuilder.saveChanges = function (e) {

        for (var key in form) {
            if (form.hasOwnProperty(key) && key != 'optionscontainer' && key != 'options' && typeof(form[key].getValue) == 'function')
            {
                var input = form[key];

                if (input !== null) {
                    var val = form[key].getValue();
                    if (val !== null) {
                        data[key] = val;
                    }
                }

            }
        }
        form.options.value = JSON.stringify(data);
    }

    function clearProperties(formField) {
        while (formField.firstChild) {
            formField.removeChild(formField.firstChild);
        }

        var option = document.createElement('option');
        option.setAttribute('value', '-1');
        option.innerHTML = 'N/A';
        formField.appendChild(option);
    }

    function bindProperties(formField, properties)
    {
        while (formField.firstChild) {
            formField.removeChild(formField.firstChild);
        }

        var option = document.createElement('option');
        option.setAttribute('value', '');
        option.innerHTML = 'Please Select..';
        formField.appendChild(option);

        var propertiesLength = 0;
        for (var key in properties) {
            propertiesLength = propertiesLength + 1;
        }

        var propBound = false;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {

                var option = document.createElement('option');
                option.setAttribute('value', key);
                if (data['property'] == key)
                {
                    option.setAttribute('selected', 'selected');
                    propBound = true;
                }
                option.innerHTML = properties[key];

                formField.appendChild(option);
            }
        }

        formField.getValue = function () {
            return [parseInt(this.value)];
        }

        formField.removeAttribute('disabled');
        bookaletWidgetBuilder.EventHandler.bind(formField, 'change', bookaletWidgetBuilder.changeProp);
        if (propBound)
        {
            bookaletWidgetBuilder.changeProp();
        }
    }

    function bindPropertyGroups(formField, propertyGroups) {
        while (formField.firstChild) {
            formField.removeChild(formField.firstChild);
        }

        var option = document.createElement('option');
        option.setAttribute('value', '');
        option.innerHTML = 'Please Select..';
        formField.appendChild(option);

        var propertiesLength = 0;
        for (var key in propertyGroups) {
            propertiesLength = propertiesLength + 1;
        }

        var propertyGroupBound = false;
        for (var key in propertyGroups) {
            if (propertyGroups.hasOwnProperty(key)) {
                var optgroup = document.createElement('optgroup');
                optgroup.setAttribute('label', propertyGroups[key].name);
                console.log(propertyGroups[key]);
                for (var itemKey in propertyGroups[key].items) {
                    var option = document.createElement('option');
                    option.setAttribute('value', itemKey);
                    if (data['property'] == itemKey) {
                        option.setAttribute('selected', 'selected');
                        propertyGroupBound = true;
                    }
                    option.innerHTML = propertyGroups[key].items[itemKey];
                    optgroup.appendChild(option)
                }

                formField.appendChild(optgroup);
            }
        }

        formField.getValue = function () {
            return [parseInt(this.value)];
        }

        formField.removeAttribute('disabled');
        bookaletWidgetBuilder.EventHandler.bind(formField, 'change', bookaletWidgetBuilder.changePropGroup);
        if (propertyGroupBound) {
            bookaletWidgetBuilder.changePropGroup();
        }
    }

    function bindThemes(formField, themes) {
        while (formField.firstChild) {
            formField.removeChild(formField.firstChild);
        }

        var option = document.createElement('option');
        option.setAttribute('value', '');
        option.innerHTML = 'None';
        formField.appendChild(option);

        var themesBound = false;

        var themesLength = 0;
        for (var key in themes) {
            themesLength = themesLength + 1;
        }

        if (themesLength > 0) {
            for (var key in themes) {
                if (themes.hasOwnProperty(key)) {

                    var option = document.createElement('option');
                    option.setAttribute('value', key);
                    if (data['property'] == key) {
                        option.setAttribute('selected', 'selected');
                        themesBound = true;
                    }
                    option.innerHTML = themes[key];

                    formField.appendChild(option);
                }
            }
        }

        formField.getValue = function () {
            return [parseInt(this.value)];
        }

        formField.removeAttribute('disabled');
        bookaletWidgetBuilder.EventHandler.bind(formField, 'change', bookaletWidgetBuilder.changeTheme);
        if (themesBound) {
            bookaletWidgetBuilder.changeTheme();
        }
    }

    function bindForm()
    {
        form.optionscontainer.innerHTML = '';
        var type = types[data['type']];
        for (var defaultVal in type.defaults)
        {
            if (type.defaults.hasOwnProperty(defaultVal)) {
                setDefaultValue(defaultVal, type.defaults[defaultVal]);
            }
        }

        for (var section in type.options) {
            var option = options[type.options[section]];
            if (option !== undefined && option !== null)
            {
                var fieldset = document.createElement('fieldset');
                fieldset.className = 'panel';
                var legend = document.createElement('legend');
                legend.innerText = option.label;
                legend.className = 'title';
                fieldset.appendChild(legend);
                var container = document.createElement('div');
                container.className = 'panel_content options';

                for (var field in option.fields) {
                    if (option.fields.hasOwnProperty(field)) {

                        if (!(option.fields[field].value == undefined || option.fields[field].value == null)) {
                            setDefaultValue(field, option.fields[field].value);
                        }
                        console.log(option.fields[field]);
                        var created = createField(field, option.fields[field].type, option.fields[field].label, option.fields[field].desc, data[field], option.fields[field].data);
                        if (created instanceof Node)
                        {
                            container.appendChild(created);
                        }
                    }
                }
                fieldset.appendChild(container);
                form.optionscontainer.appendChild(fieldset);
            }
        }
    }

    function setDefaultValue(field, value) {
        if (data[field] == undefined || data[field] == null)
        {
            data[field] = value;
        }
    }

    var create = {
        'textbox': function (id, value) {
            if (value == undefined) value = '';

            var input = document.createElement('input');
            input.setAttribute('id', id);
            input.setAttribute('type', 'text');
            input.setAttribute('value', value);
            input.getValue = function () {
                return this.value;
            }

            return input;
        },
        'year': function (id, value) {
            if (value == undefined) value = '';

            var input = document.createElement('input');
            input.setAttribute('id', id);
            input.setAttribute('type', 'number');
            input.setAttribute('step', '1');
            input.setAttribute('min', (new Date()).getFullYear());
            input.setAttribute('value', value);
            input.getValue = function () {
                return this.value;
            }

            return input;
        },
        'textarea': function (id, value) {
            if (value == undefined) value = '';

            var input = document.createElement('textarea');
            input.setAttribute('id', id);
            input.value = value;
            input.getValue = function () {
                return this.value;
            }

            return input;
        },
        'colour': function (id, value) {
            if (value == undefined) value = '';

            var input = document.createElement('div');

            var field = document.createElement('input');
            field.setAttribute('id', id);
            field.setAttribute('type', 'text');
            var picker = new jscolor(field, { hash: true })
            field.setAttribute('class', 'jscolor');
            field.value = value.toUpperCase();
            input.appendChild(field);

            input.getValue = function () {
                return this.getElementsByTagName('input')[0].value;
            }

            return input;
        },
        'select': function (id, data, values) {
            console.log(id);
            console.log(data);
            console.log(values);
            if (values == undefined) values = [];
            if (data == undefined) data = '';

            var input = document.createElement('select');
            input.setAttribute('id', id);
            for (var i = 0; i < values.length; i++) {
                var option = document.createElement('option');
                var text = '';
                var value = null;
                console.log(values[i]);
                if (values[i] instanceof Object) {
                    console.log(values[i]);
                    for (var x in values[i]) {
                        text = x;
                        value = values[i][x];
                    }
                } else {
                    text = values[i];
                    value = values[i];
                }
                option.setAttribute('value', value);
                option.innerHTML = text;
                if (value == data) option.setAttribute('selected', 'selected');

                input.appendChild(option);
            }
            input.getValue = function () {
                return this.value;
            }


            return input;
        },
        'toggle': function (id, checked) {
            if (checked == undefined) checked = false;

            var input = document.createElement('div');
            input.setAttribute('id', id);
            input.className = 'tgl';

            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', id + '_chk');
            input.appendChild(checkbox);

            var lbl = document.createElement('label');
            lbl.setAttribute('for', id + '_chk');
            input.appendChild(lbl);

            if (checked) checkbox.setAttribute('checked', 'checked');

            input.getValue = function () {
                return this.getElementsByTagName('input')[0].checked;
            }

            return input;
        },
        'checkbox': function (id, checked, value) {
            if (checked == undefined) checked = false;
            if (value == undefined) value = null;

            var input = document.createElement('input');
            input.setAttribute('id', id);
            input.setAttribute('type', 'checkbox');
            input.setAttribute('class', 'checkbox');
            if (value !== null) input.setAttribute('value', value);
            if (checked) input.setAttribute('checked', 'checked');
            input.getValue = function () {
                if (this.checked) {
                    var val = this.getAttribute('value');
                    if (val !== undefined && val !== null) {
                        return val;
                    }
                    return true;
                }
                return false;
            }

            return input;
        },
        'checkboxlist': function (id, data, values) {

            if (values == undefined) values = [];
            if (data == undefined) data = [];

            var input = document.createElement('div');
            input.setAttribute('class', 'checkbox_list');
            input.childCheckbox = [];
            for (var key in values) {
                if (values.hasOwnProperty(key)) {
                    var checked = (data.indexOf(key) >= 0)
                    var div = document.createElement('div');
                    div.setAttribute('class', 'checkbox');
                    input.childCheckbox[key] = create.checkbox(id + '_' + key, checked, key);
                    div.appendChild(createLabel(id + '_' + key, values[key], false));
                    div.appendChild(input.childCheckbox[key]);
                    input.appendChild(div);
                }
            }
            input.getValue = function () {
                var value = [];
                for (var i = 0; i < this.childCheckbox.length; i++) {
                    if (this.childCheckbox[i] != undefined && this.childCheckbox[i].checked) {
                        value.push(this.childCheckbox[i].getAttribute('value'));
                    }
                }
                return value;
            }

            return input;
        },
        'checkboxlist_container': function (id, label, values) {

            if (values == undefined) values = [];
            if (label == undefined) data = '';

            var input = document.createElement('table');
            input.setAttribute('class', 'checkbox_list_container');

            var row = document.createElement('tr');
            row.className = "checkbox_list_header"
            var cell = document.createElement('td');
            if (label.length > 0) {
                cell.innerText = label;
            }
            row.appendChild(cell);
            input.appendChild(row);

            input.childInput = [];

            for (var key in values) {
                var row = document.createElement('tr');
                row.setAttribute('id', 'tr_' + id + '_' + key);
                var cell = document.createElement('th');
                cell.setAttribute('scope', 'row');
                cell.appendChild(createLabel(id + '_' + key, values[key], false));
                row.appendChild(cell);
                input.appendChild(row);
            }
            input.getValue = function () {

                return null;
            }

            return input;
        },
        'checkboxlist_child': function (id, parentId, label, data, values) {

            var table = form[parentId];
            var cell = document.createElement('td');
            cell.appendChild(createLabel(id + '_' + key, label, false));
            table.rows[0].appendChild(cell);

            form[parentId].childInput[id] = [];

            for (var key in values) {
                var checked = (data.indexOf(key) >= 0)
                var row = null;
                for (var i = 0, currentRow; currentRow = table.rows[i]; i++) {
                    if (currentRow.id == 'tr_' + parentId + '_' + key) {
                        row = currentRow;
                    }
                }

                if (row !== null) {
                    cell = document.createElement('td');
                    form[parentId].childInput[id][key] = create.checkbox(id + '_' + key, checked, key);
                    cell.appendChild(form[parentId].childInput[id][key]);
                    row.appendChild(cell);
                }
            }

            var input = new Object();
            input.form = form;
            input.parentId = parentId;
            input.id = id;

            input.getValue = function () {

                var checkboxes = this.form[this.parentId].childInput[this.id];
                var value = [];
                for (var i = 1; i <= checkboxes.length; i++) {
                    if (checkboxes[i] != null && checkboxes[i].checked) {
                        value.push(checkboxes[i].getAttribute('value'));
                    }
                }
                return value;
            }

            return input;
        }
    }

    function createField(id, type, label, desc, value, data)
    {
        if (label == undefined) label = '';
        if (data == undefined) data = [];

        var field = null;
        if (type.indexOf('checkboxlist:') !== -1)
        {
            var parentId = type.substr(type.length - type.indexOf(':') + 2);
            var input = create['checkboxlist_child'](id, parentId, label, value, data);
            form[id] = input;
        }
        else
        {
            field = document.createElement('div');
            field.setAttribute('class', 'field ' + type);

            if (label.length > 0)
            {
                field.appendChild(createLabel(id, label, true, desc))
            }

            var input = create[type](id, value, data);
            form[id] = input;

            var inputDiv = document.createElement('div');
            inputDiv.setAttribute('class', 'fieldInput');
            inputDiv.appendChild(input);
            field.appendChild(inputDiv);
        }

        return field;
    }

    function createLabel(id, text, addClass, desc)
    {
        if (addClass == undefined) addClass = true;
        var div = document.createElement('div');
        if (addClass) div.className = 'fieldLabel';

        var label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = text;
        div.appendChild(label);

        if (desc !== undefined && desc.length > 0) {
            var p = document.createElement('p');
            p.innerHTML = desc;
            div.appendChild(p);
        }

        return div;
    }

    function getBuilderFormElements() {
        var matchingElements = [];
        var allElements = document.getElementsByTagName('input');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute('data-widget') !== null) {
                // Element exists with attribute. Add to array.
                matchingElements.push(allElements[i]);
            }
        }
        allElements = document.getElementsByTagName('select');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute('data-widget') !== null) {
                // Element exists with attribute. Add to array.
                matchingElements.push(allElements[i]);
            }
        }
        allElements = document.getElementsByTagName('div');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute('data-widget') !== null) {
                // Element exists with attribute. Add to array.
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

}(window.bookaletWidgetBuilder = window.bookaletWidgetBuilder || {}, void 0));
