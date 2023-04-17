/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.13.4/e-2.1.2/b-2.3.6/sl-1.6.2
 *
 * Included libraries:
 *   DataTables 1.13.4, Editor 2.1.2, Buttons 2.3.6, Select 1.6.2
 */

/*! DataTables 1.13.4
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.13.4
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		// jQuery's factory checks for a global window - if it isn't present then it
		// returns a factory function that expects the window object
		var jq = require('jquery');

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				return factory( $, root, root.document );
			};
		}
		else {
			return factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		window.DataTable = factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	
	var DataTable = function ( selector, options )
	{
		// Check if called with a window or jQuery object for DOM less applications
		// This is for backwards compatibility
		if (DataTable.factory(selector, options)) {
			return DataTable;
		}
	
		// When creating with `new`, create a new DataTable, returning the API instance
		if (this instanceof DataTable) {
			return $(selector).DataTable(options);
		}
		else {
			// Argument switching
			options = selector;
		}
	
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = Array.isArray(data) && ( Array.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		
	
		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;
	
		if ( emptyInit ) {
			options = {};
		}
	
		this.oApi = this.internal = _ext.internal;
	
		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}
	
		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;
	
			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = Array.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = Array.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnCamelToHungarian( defaults.oLanguage, json );
						_fnLanguageCompat( json );
						$.extend( true, oLanguage, json, oSettings.oInit.oLanguage );
			
						_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			else {
				_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if (! col) {
						_fnLog( oSettings, 0, 'Incorrect column count', 18 );
					}
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
							col._isArrayHost = true;
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').insertAfter(thead);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
			
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};
	
	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		let type = typeof d;
		var strType = type === 'string';
	
		if ( type === 'number' || type === 'bigint') {
			return true;
		}
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	// Surprisingly this is faster than [].concat.apply
	// https://jsperf.com/flatten-an-array-loop-vs-reduce/2
	var _flatten = function (out, val) {
		if (Array.isArray(val)) {
			for (var i=0 ; i<val.length ; i++) {
				_flatten(out, val[i]);
			}
		}
		else {
			out.push(val);
		}
	  
		return out;
	}
	
	var _includes = function (search, start) {
		if (start === undefined) {
			start = 0;
		}
	
		return this.indexOf(search, start) !== -1;	
	};
	
	// Array.isArray polyfill.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	if (! Array.isArray) {
	    Array.isArray = function(arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    };
	}
	
	if (! Array.prototype.includes) {
		Array.prototype.includes = _includes;
	}
	
	// .trim() polyfill
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	  };
	}
	
	if (! String.prototype.includes) {
		String.prototype.includes = _includes;
	}
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		},
	
		/**
		 * Create a function that will write to a nested object or array
		 * @param {*} source JSON notation string
		 * @returns Write function
		 */
		set: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				/* Unlike get, only the underscore (global) option is used for for
				 * setting data since we don't know the type here. This is why an object
				 * option is not documented for `mData` (which is read/write), but it is
				 * for `mRender` which is read only.
				 */
				return DataTable.util.set( source._ );
			}
			else if ( source === null ) {
				// Nothing to do when the data source is null
				return function () {};
			}
			else if ( typeof source === 'function' ) {
				return function (data, val, meta) {
					source( data, 'set', val, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				// Like the get, we need to get data from a nested object
				var setData = function (data, val, src) {
					var a = _fnSplitObjNotation( src ), b;
					var aLast = a[a.length-1];
					var arrayNotation, funcNotation, o, innerSrc;
		
					for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ ) {
						// Protect against prototype pollution
						if (a[i] === '__proto__' || a[i] === 'constructor') {
							throw new Error('Cannot set prototype values');
						}
		
						// Check if we are dealing with an array notation request
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
		
						if ( arrayNotation ) {
							a[i] = a[i].replace(__reArray, '');
							data[ a[i] ] = [];
		
							// Get the remainder of the nested object to set so we can recurse
							b = a.slice();
							b.splice( 0, i+1 );
							innerSrc = b.join('.');
		
							// Traverse each entry in the array setting the properties requested
							if ( Array.isArray( val ) ) {
								for ( var j=0, jLen=val.length ; j<jLen ; j++ ) {
									o = {};
									setData( o, val[j], innerSrc );
									data[ a[i] ].push( o );
								}
							}
							else {
								// We've been asked to save data to an array, but it
								// isn't array data to be saved. Best that can be done
								// is to just save the value.
								data[ a[i] ] = val;
							}
		
							// The inner call to setData has already traversed through the remainder
							// of the source and has set the data, thus we can exit here
							return;
						}
						else if ( funcNotation ) {
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]( val );
						}
		
						// If the nested object doesn't currently exist - since we are
						// trying to set the value - create it
						if ( data[ a[i] ] === null || data[ a[i] ] === undefined ) {
							data[ a[i] ] = {};
						}
						data = data[ a[i] ];
					}
		
					// Last item in the input - i.e, the actual set
					if ( aLast.match(__reFn ) ) {
						// Function call
						data = data[ aLast.replace(__reFn, '') ]( val );
					}
					else {
						// If array notation is used, we just want to strip it and use the property name
						// and assign the value. If it isn't used, then we get the result we want anyway
						data[ aLast.replace(__reArray, '') ] = val;
					}
				};
		
				return function (data, val) { // meta is also passed in, but not used
					return setData( data, val, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, val) { // meta is also passed in, but not used
					data[source] = val;
				};
			}
		},
	
		/**
		 * Create a function that will read nested objects from arrays, based on JSON notation
		 * @param {*} source JSON notation string
		 * @returns Value read
		 */
		get: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				// Build an object of get functions, and wrap them in a single call
				var o = {};
				$.each( source, function (key, val) {
					if ( val ) {
						o[key] = DataTable.util.get( val );
					}
				} );
		
				return function (data, type, row, meta) {
					var t = o[type] || o._;
					return t !== undefined ?
						t(data, type, row, meta) :
						data;
				};
			}
			else if ( source === null ) {
				// Give an empty string for rendering / sorting etc
				return function (data) { // type, row and meta also passed, but not used
					return data;
				};
			}
			else if ( typeof source === 'function' ) {
				return function (data, type, row, meta) {
					return source( data, type, row, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				/* If there is a . in the source string then the data source is in a
				 * nested object so we loop over the data for each level to get the next
				 * level down. On each loop we test for undefined, and if found immediately
				 * return. This allows entire objects to be missing and sDefaultContent to
				 * be used if defined, rather than throwing an error
				 */
				var fetchData = function (data, type, src) {
					var arrayNotation, funcNotation, out, innerSrc;
		
					if ( src !== "" ) {
						var a = _fnSplitObjNotation( src );
		
						for ( var i=0, iLen=a.length ; i<iLen ; i++ ) {
							// Check if we are dealing with special notation
							arrayNotation = a[i].match(__reArray);
							funcNotation = a[i].match(__reFn);
		
							if ( arrayNotation ) {
								// Array notation
								a[i] = a[i].replace(__reArray, '');
		
								// Condition allows simply [] to be passed in
								if ( a[i] !== "" ) {
									data = data[ a[i] ];
								}
								out = [];
		
								// Get the remainder of the nested object to get
								a.splice( 0, i+1 );
								innerSrc = a.join('.');
		
								// Traverse each entry in the array getting the properties requested
								if ( Array.isArray( data ) ) {
									for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
										out.push( fetchData( data[j], type, innerSrc ) );
									}
								}
		
								// If a string is given in between the array notation indicators, that
								// is used to join the strings together, otherwise an array is returned
								var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
								data = (join==="") ? out : out.join(join);
		
								// The inner call to fetchData has already traversed through the remainder
								// of the source requested, so we exit from the loop
								break;
							}
							else if ( funcNotation ) {
								// Function call
								a[i] = a[i].replace(__reFn, '');
								data = data[ a[i] ]();
								continue;
							}
		
							if ( data === null || data[ a[i] ] === undefined ) {
								return undefined;
							}
	
							data = data[ a[i] ];
						}
					}
		
					return data;
				};
		
				return function (data, type) { // row and meta also passed, but not used
					return fetchData( data, type, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, type) { // row and meta also passed, but not used
					return data[source];
				};
			}
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! Array.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			var origClass = oCol.sClass;
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			// Merge class from previously defined classes with this one, rather than just
			// overwriting it in the extend above
			if (origClass !== oCol.sClass) {
				oCol.sClass = origClass + ' ' + oCol.sClass;
			}
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' && ! oCol._isArrayHost ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Convert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Convert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string - but it
						// must not be empty
						if ( detectedType === 'html' && ! _empty(cache[k]) ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.target !== undefined
					? def.target
					: def.targets !== undefined
						? def.targets
						: def.aTargets;
	
				if ( ! Array.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter|search' 'sort|order')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		if (type === 'search') {
			type = 'filter';
		}
		else if (type === 'order') {
			type = 'sort';
		}
	
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type === 'display' ) {
			return '';
		}
	
		if ( type === 'filter' ) {
			var fomatters = DataTable.ext.type.search;
	
			if ( fomatters[ col.sType ] ) {
				cellData = fomatters[ col.sType ]( cellData );
			}
		}
	
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	var _fnGetObjectDataFn = DataTable.util.get;
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	var _fnSetObjectDataFn = DataTable.util.set;
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = (cell.innerHTML).trim();
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
	
				if (! nTd) {
					_fnLog( oSettings, 0, 'Incorrect column count', 18 );
				}
	
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
	
		/* Deal with the footer - add classes if required */
		$(thead).children('tr').children('th, td').addClass( classes.sHeaderTH );
		$(tfoot).children('tr').children('th, td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
	
				if (column) {
					column.nTf = cells[i].cell;
		
					if ( column.sClass ) {
						$(column.nTf).addClass( column.sClass );
					}
				}
				else {
					_fnLog( oSettings, 0, 'Incorrect column count', 18 );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @param ajaxComplete true after ajax call to complete rendering
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings, ajaxComplete )
	{
		// Allow for state saving and a custom start position
		_fnStart( oSettings );
	
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var oLang = oSettings.oLanguage;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		oSettings.bDrawing = true;
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !ajaxComplete)
		{
			_fnAjaxUpdate( oSettings );
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Set the start position for draw
	 *  @param {object} oSettings dataTables settings object
	 */
	function _fnStart( oSettings )
	{
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var iInitDisplayStart = oSettings.iInitDisplayStart;
	
		// Check and see if we have an initial draw position from state saving
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && Array.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			var status = oSettings.jqXHR
				? oSettings.jqXHR.status
				: null;
	
			if ( json === null || (typeof status === 'number' && status == 204 ) ) {
				json = {};
				_fnAjaxDataSrc( oSettings, json, [] );
			}
	
			var error = json.error || json.sError;
			if ( error ) {
				_fnLog( oSettings, 0, error );
			}
	
			oSettings.json = json;
	
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": callback,
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		settings.iDraw++;
		_fnProcessingDisplay( settings, true );
	
		_fnBuildAjax(
			settings,
			_fnAjaxParameters( settings ),
			function(json) {
				_fnAjaxUpdateDraw( settings, json );
			}
		);
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw !== undefined ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		// No data in returned object, so rather than an array, we show an empty table
		if ( ! data ) {
			data = [];
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		_fnDraw( settings, true );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	 function _fnAjaxDataSrc ( oSettings, json, write )
	 {
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		if ( ! write ) {
			if ( dataSrc === 'data' ) {
				// If the default, then we still want to support the old style, and safely ignore
				// it if possible
				return json.aaData || json[dataSrc];
			}
	
			return dataSrc !== "" ?
				_fnGetObjectDataFn( dataSrc )( json ) :
				json;
		}
	
		// set
		_fnSetObjectDataFn( dataSrc )( json, write );
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function(event) {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
			if(previousSearch.return && event.key !== "Enter") {
				return;
			}
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive,
					"return": previousSearch.return
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'mouseup', function(e) {
				// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
				// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
				// checks the value to see if it has changed. In other browsers it won't have.
				setTimeout( function () {
					searchFn.call(jqFilter[0], e);
				}, 10);
			} )
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
			oPrevSearch.return = oFilter.return;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive, oInput.return );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = Array.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
		else {
			// No change event - paging was called, but no change
			_fnCallbackFire( settings, null, 'page-nc', [settings] );
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing,
				'role': 'status'
			} )
			.html( settings.oLanguage.sProcessing )
			.append('<div><div></div><div></div><div></div><div></div></div>')
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css('max-height', scrollY);
		if (! scroll.bCollapse) {
			$(scrollBody).css('height', scrollY);
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
			footerCopy.find('[id]').removeAttr('id');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
		headerCopy.find('[id]').removeAttr('id');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			var style = window.getComputedStyle ?
				window.getComputedStyle(nSizer).width :
				_fnStringToCss( $(nSizer).width() );
	
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( style );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			nToSize.style.width = headerWidths[i];
		}, headerTrgEls );
	
		$(headerSrcEls).css('height', 0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( Math.round(table.outerWidth()) < Math.round(sanityWidth) )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! Array.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( Array.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.ariaTitle || col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if (settings._bLoadingState) {
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		settings.oSavedState = state;
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
		
		if ( settings.oFeatures.bStateSave && !settings.bDestroying )
		{
			settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
		}	
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var loaded = function(state) {
			_fnImplementState(settings, state, callback);
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			_fnImplementState( settings, state, callback );
		}
		// otherwise, wait for the loaded callback to be executed
	
		return true;
	}
	
	function _fnImplementState ( settings, s, callback) {
		var i, ien;
		var columns = settings.aoColumns;
		settings._bLoadingState = true;
	
		// When StateRestore was introduced the state could now be implemented at any time
		// Not just initialisation. To do this an api instance is required in some places
		var api = settings._bInitComplete ? new DataTable.Api(settings) : null;
	
		if ( ! s || ! s.time ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Allow custom and plug-in manipulation functions to alter the saved data set and
		// cancelling of loading by returning false
		var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
		if ( $.inArray( false, abStateLoad ) !== -1 ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Reject old data
		var duration = settings.iStateDuration;
		if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Number of columns have changed - all bets are off, no restore of settings
		if ( s.columns && columns.length !== s.columns.length ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Store the saved state so it might be accessed at any time
		settings.oLoadedState = $.extend( true, {}, s );
	
		// Page Length
		if ( s.length !== undefined ) {
			// If already initialised just set the value directly so that the select element is also updated
			if (api) {
				api.page.len(s.length)
			}
			else {
				settings._iDisplayLength   = s.length;
			}
		}
	
		// Restore key features - todo - for 1.11 this needs to be done by
		// subscribed events
		if ( s.start !== undefined ) {
			if(api === null) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			else {
				_fnPageChange(settings, s.start/settings._iDisplayLength);
			}
		}
	
		// Order
		if ( s.order !== undefined ) {
			settings.aaSorting = [];
			$.each( s.order, function ( i, col ) {
				settings.aaSorting.push( col[0] >= columns.length ?
					[ 0, col[1] ] :
					col
				);
			} );
		}
	
		// Search
		if ( s.search !== undefined ) {
			$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
		}
	
		// Columns
		if ( s.columns ) {
			for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
				var col = s.columns[i];
	
				// Visibility
				if ( col.visible !== undefined ) {
					// If the api is defined, the table has been initialised so we need to use it rather than internal settings
					if (api) {
						// Don't redraw the columns on every iteration of this loop, we will do this at the end instead
						api.column(i).visible(col.visible, false);
					}
					else {
						columns[i].bVisible = col.visible;
					}
				}
	
				// Search
				if ( col.search !== undefined ) {
					$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
				}
			}
			
			// If the api is defined then we need to adjust the columns once the visibility has been changed
			if (api) {
				api.columns.adjust();
			}
		}
	
		settings._bLoadingState = false;
		_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
		callback();
	};
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( Array.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( Array.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && Array.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).trigger('blur'); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
			var table = $(settings.nTable);
	
			table.trigger( e, args );
	
			// If not yet attached to the document, trigger the event
			// on the body directly to sort of simulate the bubble
			if (table.parents('body').length === 0) {
				$('body').trigger( e, args );
			}
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	
	
	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( Array.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			var fn = DataTable.util.get(prop);
	
			return this.map( function ( el ) {
				return fn(el);
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( Array.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					Array.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		if ( Array.isArray(selector) ) {
			return $.map( selector, function (item) {
				return __table_selector(item, a);
			} );
		}
	
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector !== undefined && selector !== null ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? (a[j]).trim() : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and filter=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( Array.isArray( data ) && row.nTr && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	$(document).on('plugin-init.dt', function (e, context) {
		var api = new _Api( context );
		var namespace = 'on-plugin-init';
		var stateSaveParamsEvent = 'stateSaveParams.' + namespace;
		var destroyEvent = 'destroy. ' + namespace;
	
		api.on( stateSaveParamsEvent, function ( e, settings, d ) {
			// This could be more compact with the API, but it is a lot faster as a simple
			// internal loop
			var idFn = settings.rowIdFn;
			var data = settings.aoData;
			var ids = [];
	
			for (var i=0 ; i<data.length ; i++) {
				if (data[i]._detailsShow) {
					ids.push( '#' + idFn(data[i]._aData) );
				}
			}
	
			d.childRows = ids;
		});
	
		api.on( destroyEvent, function () {
			api.off(stateSaveParamsEvent + ' ' + destroyEvent);
		});
	
		var loaded = api.state.loaded();
	
		if ( loaded && loaded.childRows ) {
			api
				.rows( $.map(loaded.childRows, function (id){
					return id.replace(/:/g, '\\:')
				}) )
				.every( function () {
					_fnCallbackFire( context, null, 'requestChild', [ this ] )
				});
		}
	});
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( Array.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td></td></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	// Make state saving of child row details async to allow them to be batch processed
	var __details_state = DataTable.util.throttle(
		function (ctx) {
			_fnSaveState( ctx[0] )
		},
		500
	);
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
				$( row.nTr ).removeClass( 'dt-hasChild' );
				__details_state( ctx );
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
					$( row.nTr ).addClass( 'dt-hasChild' );
				}
				else {
					row._details.detach();
					$( row.nTr ).removeClass( 'dt-hasChild' );
				}
	
				_fnCallbackFire( ctx[0], null, 'childRow', [ show, api.row( api[0] ) ] )
	
				__details_events( ctx[0] );
				__details_state( ctx );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-sizing'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $(_flatten( [], cells ));
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! Array.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return Array.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Set the jQuery or window object to be used by DataTables
	 *
	 * @param {*} module Library / container object
	 * @param {string} type Library or container type `lib` or `win`.
	 */
	DataTable.use = function (module, type) {
		if (type === 'lib' || module.fn) {
			$ = module;
		}
		else if (type == 'win' || module.document) {
			window = module;
			document = module.document;
		}
	}
	
	/**
	 * CommonJS factory function pass through. This will check if the arguments
	 * given are a window object or a jQuery object. If so they are set
	 * accordingly.
	 * @param {*} root Window
	 * @param {*} jq jQUery
	 * @returns {boolean} Indicator
	 */
	DataTable.factory = function (root, jq) {
		var is = false;
	
		// Test if the first parameter is a window object
		if (root && root.document) {
			window = root;
			document = root.document;
		}
	
		// Test if the second parameter is a jQuery object
		if (jq && jq.fn && jq.fn.jquery) {
			$ = jq;
			is = true;
		}
	
		return is;
	}
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			var orig = settings.nTableWrapper.parentNode;
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );	
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.13.4";
	
	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];
	
	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true,
	
		/**
		 * Flag to indicate if DataTables should only trigger a search when
		 * the return key is pressed.
		 *  @type boolean
		 *  @default false
		 */
		"return": false
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would add around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit).
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {
				return {};
			}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed display and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all for DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};
	
	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"dt/dt-1.13.4/e-2.1.2/b-2.3.6/sl-1.6.2",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatibility only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_desc_disabled",
		"sSortableDesc": "sorting_asc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( Array.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = settings.fnFormatNumber( button + 1 );
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								var tag = settings.oInit.pagingTag || 'a';
								var disabled = btnClass.indexOf(disabledClass) !== -1;
			
	
								node = $('<'+tag+'>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-disabled': disabled ? 'true' : null,
										'aria-label': aria[ button ],
										'aria-role': 'link',
										'aria-current': btnClass === classes.sPageButtonActive ? 'page' : null,
										'data-dt-idx': button,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
		
		let type = typeof d;
	
		if (type === 'number' || type === 'bigint') {
			return d;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		if (Array.isArray(d)) {
			d = d.join(',');
		}
	
		return typeof d === 'string' ?
			d
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;') :
			d;
	};
	
	// Common logic for moment, luxon or a date action
	function __mld( dt, momentFn, luxonFn, dateFn, arg1 ) {
		if (window.moment) {
			return dt[momentFn]( arg1 );
		}
		else if (window.luxon) {
			return dt[luxonFn]( arg1 );
		}
		
		return dateFn ? dt[dateFn]( arg1 ) : dt;
	}
	
	
	var __mlWarning = false;
	function __mldObj (d, format, locale) {
		var dt;
	
		if (window.moment) {
			dt = window.moment.utc( d, format, locale, true );
	
			if (! dt.isValid()) {
				return null;
			}
		}
		else if (window.luxon) {
			dt = format && typeof d === 'string'
				? window.luxon.DateTime.fromFormat( d, format )
				: window.luxon.DateTime.fromISO( d );
	
			if (! dt.isValid) {
				return null;
			}
	
			dt.setLocale(locale);
		}
		else if (! format) {
			// No format given, must be ISO
			dt = new Date(d);
		}
		else {
			if (! __mlWarning) {
				alert('DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17');
			}
	
			__mlWarning = true;
		}
	
		return dt;
	}
	
	// Wrapper for date, datetime and time which all operate the same way with the exception of
	// the output string for auto locale support
	function __mlHelper (localeString) {
		return function ( from, to, locale, def ) {
			// Luxon and Moment support
			// Argument shifting
			if ( arguments.length === 0 ) {
				locale = 'en';
				to = null; // means toLocaleString
				from = null; // means iso8601
			}
			else if ( arguments.length === 1 ) {
				locale = 'en';
				to = from;
				from = null;
			}
			else if ( arguments.length === 2 ) {
				locale = to;
				to = from;
				from = null;
			}
	
			var typeName = 'datetime-' + to;
	
			// Add type detection and sorting specific to this date format - we need to be able to identify
			// date type columns as such, rather than as numbers in extensions. Hence the need for this.
			if (! DataTable.ext.type.order[typeName]) {
				// The renderer will give the value to type detect as the type!
				DataTable.ext.type.detect.unshift(function (d) {
					return d === typeName ? typeName : false;
				});
	
				// The renderer gives us Moment, Luxon or Date obects for the sorting, all of which have a
				// `valueOf` which gives milliseconds epoch
				DataTable.ext.type.order[typeName + '-asc'] = function (a, b) {
					var x = a.valueOf();
					var y = b.valueOf();
	
					return x === y
						? 0
						: x < y
							? -1
							: 1;
				}
	
				DataTable.ext.type.order[typeName + '-desc'] = function (a, b) {
					var x = a.valueOf();
					var y = b.valueOf();
	
					return x === y
						? 0
						: x > y
							? -1
							: 1;
				}
			}
		
			return function ( d, type ) {
				// Allow for a default value
				if (d === null || d === undefined) {
					if (def === '--now') {
						// We treat everything as UTC further down, so no changes are
						// made, as such need to get the local date / time as if it were
						// UTC
						var local = new Date();
						d = new Date( Date.UTC(
							local.getFullYear(), local.getMonth(), local.getDate(),
							local.getHours(), local.getMinutes(), local.getSeconds()
						) );
					}
					else {
						d = '';
					}
				}
	
				if (type === 'type') {
					// Typing uses the type name for fast matching
					return typeName;
				}
	
				if (d === '') {
					return type !== 'sort'
						? ''
						: __mldObj('0000-01-01 00:00:00', null, locale);
				}
	
				// Shortcut. If `from` and `to` are the same, we are using the renderer to
				// format for ordering, not display - its already in the display format.
				if ( to !== null && from === to && type !== 'sort' && type !== 'type' && ! (d instanceof Date) ) {
					return d;
				}
	
				var dt = __mldObj(d, from, locale);
	
				if (dt === null) {
					return d;
				}
	
				if (type === 'sort') {
					return dt;
				}
				
				var formatted = to === null
					? __mld(dt, 'toDate', 'toJSDate', '')[localeString]()
					: __mld(dt, 'format', 'toFormat', 'toISOString', to);
	
				// XSS protection
				return type === 'display' ?
					__htmlEscapeEntities( formatted ) :
					formatted;
			};
		}
	}
	
	// Based on locale, determine standard number formatting
	// Fallback for legacy browsers is US English
	var __thousands = ',';
	var __decimal = '.';
	
	if (Intl) {
		try {
			var num = new Intl.NumberFormat().formatToParts(100000.1);
		
			for (var i=0 ; i<num.length ; i++) {
				if (num[i].type === 'group') {
					__thousands = num[i].value;
				}
				else if (num[i].type === 'decimal') {
					__decimal = num[i].value;
				}
			}
		}
		catch (e) {
			// noop
		}
	}
	
	// Formatted date time detection - use by declaring the formats you are going to use
	DataTable.datetime = function ( format, locale ) {
		var typeName = 'datetime-detect-' + format;
	
		if (! locale) {
			locale = 'en';
		}
	
		if (! DataTable.ext.type.order[typeName]) {
			DataTable.ext.type.detect.unshift(function (d) {
				var dt = __mldObj(d, format, locale);
				return d === '' || dt ? typeName : false;
			});
	
			DataTable.ext.type.order[typeName + '-pre'] = function (d) {
				return __mldObj(d, format, locale) || 0;
			}
		}
	}
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		date: __mlHelper('toLocaleDateString'),
		datetime: __mlHelper('toLocaleString'),
		time: __mlHelper('toLocaleTimeString'),
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			// Auto locale detection
			if (thousands === null || thousands === undefined) {
				thousands = __thousands;
			}
	
			if (decimal === null || decimal === undefined) {
				decimal = __decimal;
			}
	
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					if (d === '' || d === null) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					// If zero, then can't have a negative prefix
					if (intPart === 0 && parseFloat(floatPart) === 0) {
						negative = '';
					}
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnImplementState: _fnImplementState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	
	
	// jQuery access
	$.fn.dataTable = DataTable;
	
	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;
	
	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;
	
	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};
	
	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );

	return DataTable;
}));


/*! DataTables styling integration
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;





return DataTable;
}));


/*!
 * Version:     2.1.2
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2023 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

(function(){C5Mnx[32718]=(function(){var C=2;for(;C !== 9;){switch(C){case 5:var k;C=4;break;case 1:return globalThis;break;case 2:C=typeof globalThis === '\x6f\x62\x6a\x65\x63\x74'?1:5;break;case 4:try{var A=2;for(;A !== 6;){switch(A){case 9:delete k['\u0047\u0052\x79\x5f\u004d'];var X=Object['\u0070\x72\x6f\u0074\x6f\u0074\x79\u0070\u0065'];delete X['\u0075\x72\x63\u0073\x59'];A=6;break;case 3:throw "";A=9;break;case 4:A=typeof GRy_M === '\x75\x6e\x64\x65\u0066\u0069\u006e\x65\x64'?3:9;break;case 2:Object['\u0064\x65\x66\x69\x6e\x65\x50\x72\x6f\u0070\x65\u0072\x74\x79'](Object['\x70\u0072\u006f\u0074\x6f\u0074\x79\x70\u0065'],'\u0075\u0072\x63\u0073\x59',{'\x67\x65\x74':function(){var O=2;for(;O !== 1;){switch(O){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});k=urcsY;k['\u0047\x52\u0079\x5f\u004d']=k;A=4;break;}}}catch(P){k=window;}return k;break;}}})();q2ECI_(C5Mnx[32718]);C5Mnx.n6y="nt";C5Mnx[187046]="am";C5Mnx.h0r="dataTable";C5Mnx[2930]='object';C5Mnx[611221]="f";C5Mnx.T5V=function(){return typeof C5Mnx.D1a.i1kWSI8 === 'function'?C5Mnx.D1a.i1kWSI8.apply(C5Mnx.D1a,arguments):C5Mnx.D1a.i1kWSI8;};C5Mnx.E0X="fn";function C5Mnx(){}C5Mnx.u$S="8";C5Mnx.S5=function(){return typeof C5Mnx[618757].X6XFBGN === 'function'?C5Mnx[618757].X6XFBGN.apply(C5Mnx[618757],arguments):C5Mnx[618757].X6XFBGN;};C5Mnx[266184]="";C5Mnx[618757]=(function(h){function L(Z){var L2=2;for(;L2 !== 15;){switch(L2){case 2:var W,y,M,V,z,l,E;L2=1;break;case 10:L2=l >= 0 && V >= 0?20:18;break;case 1:L2=!R--?5:4;break;case 12:L2=!R--?11:10;break;case 5:E=N[h[4]];L2=4;break;case 7:L2=!R--?6:14;break;case 19:return W;break;case 16:W=V - Z > y;L2=19;break;case 18:L2=l >= 0?17:16;break;case 4:L2=!R--?3:9;break;case 3:y=34;L2=9;break;case 11:l=(z || z === 0) && E(z,y);L2=10;break;case 13:z=h[7];L2=12;break;case 17:W=Z - l > y;L2=19;break;case 14:L2=!R--?13:12;break;case 20:W=Z - l > y && V - Z > y;L2=19;break;case 9:L2=!R--?8:7;break;case 6:V=M && E(M,y);L2=14;break;case 8:M=h[6];L2=7;break;}}}var J4=2;for(;J4 !== 10;){switch(J4){case 3:J4=!R--?9:8;break;case 11:return {X6XFBGN:function(J){var I7=2;for(;I7 !== 13;){switch(I7){case 4:I=L(u);I7=3;break;case 9:g=u + 60000;I7=8;break;case 1:I7=u > g?5:8;break;case 3:I7=!R--?9:8;break;case 2:var u=new N[h[0]]()[h[1]]();I7=1;break;case 5:I7=!R--?4:3;break;case 8:var Q=(function(M7,w){var v7=2;for(;v7 !== 10;){switch(v7){case 11:return O7;break;case 3:var O7,y5=0;v7=9;break;case 4:w=h;v7=3;break;case 8:var V6=N[w[4]](M7[w[2]](y5),16)[w[3]](2);var W8=V6[w[2]](V6[w[5]] - 1);v7=6;break;case 6:v7=y5 === 0?14:12;break;case 9:v7=y5 < M7[w[5]]?8:11;break;case 5:v7=typeof w === 'undefined' && typeof h !== 'undefined'?4:3;break;case 1:M7=J;v7=5;break;case 2:v7=typeof M7 === 'undefined' && typeof J !== 'undefined'?1:5;break;case 12:O7=O7 ^ W8;v7=13;break;case 13:y5++;v7=9;break;case 14:O7=W8;v7=13;break;}}})(undefined,undefined);I7=7;break;case 14:return Q?I:!I;break;case 6:(function(){var P2=2;for(;P2 !== 35;){switch(P2){case 5:var Y9="f";var z1="S";P2=3;break;case 20:r5+=H7;var b5=e2;b5+=w6;b5+=I_;P2=16;break;case 23:return;break;case 16:b5+=s4;b5+=z1;b5+=Y9;P2=26;break;case 24:P2=b8[b5]?23:22;break;case 9:var s4="n";var I_="j";var R3=32718;P2=6;break;case 22:try{var n2=2;for(;n2 !== 1;){switch(n2){case 2:expiredWarning();n2=1;break;}}}catch(R5){}b8[r5]=function(){};P2=35;break;case 6:var r5=e2;r5+=w6;P2=13;break;case 3:var e2="G";P2=9;break;case 13:r5+=I_;r5+=s4;r5+=z1;r5+=Y9;P2=20;break;case 26:b5+=H7;var b8=C5Mnx[R3];P2=24;break;case 2:var w6="2";var H7="g";P2=5;break;}}})();I7=14;break;case 7:I7=!I?6:14;break;}}}};break;case 8:J4=!R--?7:6;break;case 9:q=typeof G;J4=8;break;case 6:J4=!R--?14:13;break;case 1:J4=!R--?5:4;break;case 2:var N,q,T,R;J4=1;break;case 7:T=q.L9Cru(new N[m]("^['-|]"),'S');J4=6;break;case 4:var G='fromCharCode',m='RegExp';J4=3;break;case 14:h=h.P$chT(function(t){var S$=2;for(;S$ !== 13;){switch(S$){case 7:S$=!p?6:14;break;case 9:p+=N[T][G](t[D] + 90);S$=8;break;case 14:return p;break;case 2:var p;S$=1;break;case 1:S$=!R--?5:4;break;case 8:D++;S$=3;break;case 5:p='';S$=4;break;case 4:var D=0;S$=3;break;case 3:S$=D < t.length?9:7;break;case 6:return;break;}}});J4=13;break;case 13:J4=!R--?12:11;break;case 5:N=C5Mnx[32718];J4=4;break;case 12:var I,g=0;J4=11;break;}}})([[-22,7,26,11],[13,11,26,-6,15,19,11],[9,14,7,24,-25,26],[26,21,-7,26,24,15,20,13],[22,7,24,25,11,-17,20,26],[18,11,20,13,26,14],[29,-41,-33,16,-40,-40,22,-36],[25,25,15,25,27,30,-42,9]]);C5Mnx[32718].J499=C5Mnx;C5Mnx[604463]='function';C5Mnx.Y$4="document";C5Mnx.U3r="me";C5Mnx[440425]="d";C5Mnx.D1a=(function(){var l9w=2;for(;l9w !== 9;){switch(l9w){case 2:var D79=[arguments];D79[7]=undefined;D79[2]={};D79[2].i1kWSI8=function(){var D57=2;for(;D57 !== 145;){switch(D57){case 150:b5D[32]++;D57=127;break;case 126:b5D[91]=b5D[4][b5D[32]];try{b5D[47]=b5D[91][b5D[46]]()?b5D[20]:b5D[22];}catch(S$M){b5D[47]=b5D[22];}D57=124;break;case 105:b5D[4].M6sl_j(b5D[60]);b5D[40]=[];b5D[20]='t1y';b5D[22]='p1m';b5D[36]='z3c';b5D[33]='d_d';D57=130;break;case 19:b5D[5]=b5D[8];b5D[6]={};b5D[6].z3c=['U_W'];b5D[6].U$2=function(){var V2Y=function(){return ('aa').charCodeAt(1);};var x1s=(/\071\u0037/).H4gYb(V2Y + []);return x1s;};D57=15;break;case 116:b5D[4].M6sl_j(b5D[52]);b5D[4].M6sl_j(b5D[38]);b5D[4].M6sl_j(b5D[77]);b5D[4].M6sl_j(b5D[81]);b5D[4].M6sl_j(b5D[5]);b5D[4].M6sl_j(b5D[2]);D57=110;break;case 11:b5D[8]={};b5D[8].z3c=['t24'];b5D[8].U$2=function(){var H_r=function(){return ("01").substring(1);};var B82=!(/\u0030/).H4gYb(H_r + []);return B82;};D57=19;break;case 151:b5D[79]++;D57=123;break;case 1:D57=D79[7]?5:4;break;case 108:b5D[4].M6sl_j(b5D[73]);b5D[4].M6sl_j(b5D[93]);b5D[4].M6sl_j(b5D[7]);D57=105;break;case 73:b5D[35].z3c=['U_W'];b5D[35].U$2=function(){var x7y=function(){return encodeURI('%');};var f4f=(/\u0032\065/).H4gYb(x7y + []);return f4f;};b5D[93]=b5D[35];b5D[43]={};b5D[43].z3c=['a$t'];D57=68;break;case 2:var b5D=[arguments];D57=1;break;case 91:b5D[4].M6sl_j(b5D[80]);b5D[4].M6sl_j(b5D[68]);b5D[4].M6sl_j(b5D[66]);b5D[4].M6sl_j(b5D[21]);D57=116;break;case 4:b5D[4]=[];b5D[9]={};D57=9;break;case 9:b5D[9].z3c=['U_W'];b5D[9].U$2=function(){var G3H=function(){var x_F=function(X5x){for(var Z2b=0;Z2b < 20;Z2b++){X5x+=Z2b;}return X5x;};x_F(2);};var o9F=(/\u0031\x39\u0032/).H4gYb(G3H + []);return o9F;};b5D[1]=b5D[9];b5D[3]={};D57=14;break;case 31:b5D[21]=b5D[96];b5D[41]={};b5D[41].z3c=['a$t'];b5D[41].U$2=function(){var N$k=typeof K9rKrS === 'function';return N$k;};b5D[73]=b5D[41];b5D[18]={};b5D[18].z3c=['a$t'];D57=41;break;case 5:return 26;break;case 122:b5D[61]={};b5D[61][b5D[94]]=b5D[91][b5D[36]][b5D[79]];b5D[61][b5D[33]]=b5D[47];b5D[40].M6sl_j(b5D[61]);D57=151;break;case 99:b5D[38]=b5D[37];b5D[4].M6sl_j(b5D[11]);b5D[4].M6sl_j(b5D[1]);b5D[4].M6sl_j(b5D[84]);b5D[4].M6sl_j(b5D[53]);D57=94;break;case 82:b5D[70].z3c=['t24','c8v'];b5D[70].U$2=function(){var B8y=function(s0P){return s0P && s0P['b'];};var b65=(/\u002e/).H4gYb(B8y + []);return b65;};b5D[52]=b5D[70];b5D[39]={};D57=78;break;case 94:b5D[4].M6sl_j(b5D[15]);b5D[4].M6sl_j(b5D[71]);b5D[4].M6sl_j(b5D[34]);D57=91;break;case 128:b5D[32]=0;D57=127;break;case 149:D57=(function(e3b){var s8W=2;for(;s8W !== 22;){switch(s8W){case 7:s8W=x31[4] < x31[0][0].length?6:18;break;case 12:x31[8].M6sl_j(x31[7][b5D[94]]);s8W=11;break;case 24:x31[4]++;s8W=16;break;case 10:s8W=x31[7][b5D[33]] === b5D[20]?20:19;break;case 18:x31[3]=false;s8W=17;break;case 13:x31[9][x31[7][b5D[94]]]=(function(){var W4C=2;for(;W4C !== 9;){switch(W4C){case 2:var x4a=[arguments];x4a[5]={};x4a[5].h=0;x4a[5].t=0;return x4a[5];break;}}}).z0jOOg(this,arguments);s8W=12;break;case 8:x31[4]=0;s8W=7;break;case 15:x31[5]=x31[8][x31[4]];x31[6]=x31[9][x31[5]].h / x31[9][x31[5]].t;s8W=26;break;case 16:s8W=x31[4] < x31[8].length?15:23;break;case 4:x31[9]={};x31[8]=[];x31[4]=0;s8W=8;break;case 19:x31[4]++;s8W=7;break;case 23:return x31[3];break;case 5:return;break;case 6:x31[7]=x31[0][0][x31[4]];s8W=14;break;case 14:s8W=typeof x31[9][x31[7][b5D[94]]] === 'undefined'?13:11;break;case 20:x31[9][x31[7][b5D[94]]].h+=true;s8W=19;break;case 26:s8W=x31[6] >= 0.5?25:24;break;case 1:s8W=x31[0][0].length === 0?5:4;break;case 17:x31[4]=0;s8W=16;break;case 2:var x31=[arguments];s8W=1;break;case 11:x31[9][x31[7][b5D[94]]].t+=true;s8W=10;break;case 25:x31[3]=true;s8W=24;break;}}})(b5D[40])?148:147;break;case 130:b5D[46]='U$2';b5D[94]='u7R';D57=128;break;case 15:b5D[7]=b5D[6];b5D[95]={};b5D[95].z3c=['c8v'];b5D[95].U$2=function(){var W91=function(){debugger;};var O$s=!(/\144\x65\x62\165\147\u0067\u0065\162/).H4gYb(W91 + []);return O$s;};D57=24;break;case 48:b5D[23].U$2=function(){var p6i=function(){'use stirct';return 1;};var E5d=!(/\u0073\164\x69\162\x63\x74/).H4gYb(p6i + []);return E5d;};b5D[80]=b5D[23];b5D[99]={};b5D[99].z3c=['t24','U_W'];b5D[99].U$2=function(){var u8G=function(){return (![] + [])[+!+[]];};var H$f=(/\x61/).H4gYb(u8G + []);return H$f;};D57=64;break;case 77:b5D[57].z3c=['t24'];b5D[57].U$2=function(){var R1C=function(){return [0,1,2].join('@');};var P57=(/\x40[0-9]/).H4gYb(R1C + []);return P57;};b5D[68]=b5D[57];b5D[35]={};D57=73;break;case 21:b5D[12].U$2=function(){var B1c=typeof g31XB === 'function';return B1c;};b5D[66]=b5D[12];b5D[96]={};b5D[96].z3c=['a$t'];D57=32;break;case 147:D79[7]=57;return 17;break;case 14:b5D[3].z3c=['c8v'];b5D[3].U$2=function(){var X7u=function(){if(false){console.log(1);}};var R52=!(/\x31/).H4gYb(X7u + []);return R52;};b5D[2]=b5D[3];D57=11;break;case 68:b5D[43].U$2=function(){var u58=typeof M$mrRd === 'function';return u58;};b5D[84]=b5D[43];b5D[55]={};b5D[55].z3c=['t24'];D57=89;break;case 56:b5D[76]=b5D[31];b5D[57]={};D57=77;break;case 89:b5D[55].U$2=function(){var E0q=function(){return ("01").substr(1);};var H66=!(/\060/).H4gYb(E0q + []);return H66;};D57=88;break;case 24:b5D[11]=b5D[95];b5D[12]={};b5D[12].z3c=['a$t'];D57=21;break;case 51:b5D[34]=b5D[25];b5D[23]={};b5D[23].z3c=['c8v'];D57=48;break;case 110:b5D[4].M6sl_j(b5D[56]);b5D[4].M6sl_j(b5D[76]);D57=108;break;case 86:b5D[65].z3c=['c8v'];b5D[65].U$2=function(){var m6i=function(T6A,Q7F,I1o,U5i){return !T6A && !Q7F && !I1o && !U5i;};var g9G=(/\x7c\u007c/).H4gYb(m6i + []);return g9G;};b5D[53]=b5D[65];b5D[70]={};D57=82;break;case 32:b5D[96].U$2=function(){function l0c(U37,W8t){return U37 + W8t;};var F0p=(/\x6f\x6e[\u200a\f\t\u2029 \n\u205f\v\r\u3000\u2028\u00a0\u1680-\u2000\u202f\ufeff]{0,}\050/).H4gYb(l0c + []);return F0p;};D57=31;break;case 127:D57=b5D[32] < b5D[4].length?126:149;break;case 60:b5D[15]=b5D[64];b5D[31]={};b5D[31].z3c=['U_W'];b5D[31].U$2=function(){var j4J=function(){return decodeURIComponent('%25');};var E5Z=!(/\062\065/).H4gYb(j4J + []);return E5Z;};D57=56;break;case 124:b5D[79]=0;D57=123;break;case 148:D57=70?148:147;break;case 78:b5D[39].z3c=['c8v'];b5D[39].U$2=function(){var c12=function(O_L,r7r,S$d){return !!O_L?r7r:S$d;};var E1W=!(/\x21/).H4gYb(c12 + []);return E1W;};b5D[60]=b5D[39];b5D[37]={};b5D[37].z3c=['U_W'];b5D[37].U$2=function(){var a5j=function(){return ('\u0041\u030A').normalize('NFC') === ('\u212B').normalize('NFC');};var g87=(/\u0074\u0072\x75\u0065/).H4gYb(a5j + []);return g87;};D57=99;break;case 41:b5D[18].U$2=function(){var V03=false;var P5x=[];try{for(var d1R in console){P5x.M6sl_j(d1R);}V03=P5x.length === 0;}catch(R4G){}var W7m=V03;return W7m;};b5D[56]=b5D[18];b5D[63]={};b5D[63].z3c=['t24'];D57=37;break;case 88:b5D[71]=b5D[55];b5D[65]={};D57=86;break;case 123:D57=b5D[79] < b5D[91][b5D[36]].length?122:150;break;case 37:b5D[63].U$2=function(){var d8d=function(A5g,X$d){return A5g + X$d;};var p3a=function(){return d8d(2,2);};var L_F=!(/\x2c/).H4gYb(p3a + []);return L_F;};b5D[81]=b5D[63];b5D[25]={};b5D[25].z3c=['U_W'];b5D[25].U$2=function(){var f9U=function(){return ('x').toUpperCase();};var l26=(/\130/).H4gYb(f9U + []);return l26;};D57=51;break;case 64:b5D[77]=b5D[99];b5D[64]={};b5D[64].z3c=['t24'];b5D[64].U$2=function(){var G1L=function(q8d,q50){if(q8d){return q8d;}return q50;};var j6s=(/\u003f/).H4gYb(G1L + []);return j6s;};D57=60;break;}}};return D79[2];break;}}})();C5Mnx.W2u='undefined';C5Mnx.i36="c";C5Mnx.J_Y=function(){return typeof C5Mnx.D1a.i1kWSI8 === 'function'?C5Mnx.D1a.i1kWSI8.apply(C5Mnx.D1a,arguments):C5Mnx.D1a.i1kWSI8;};C5Mnx[574232]="a";function q2ECI_(E0Z){function z0P(X1l){var E2E=2;for(;E2E !== 5;){switch(E2E){case 2:var R_T=[arguments];return R_T[0][0].Function;break;}}}function w9S(T77){var I7D=2;for(;I7D !== 5;){switch(I7D){case 2:var w5U=[arguments];return w5U[0][0];break;}}}function H2$(l$E){var f34=2;for(;f34 !== 5;){switch(f34){case 2:var G7g=[arguments];return G7g[0][0].Array;break;}}}var w3R=2;for(;w3R !== 98;){switch(w3R){case 11:M5L[8]="4gY";M5L[4]="9Cr";M5L[1]="";M5L[1]="";M5L[1]="H";w3R=17;break;case 33:M5L[81]="";M5L[81]="rKr";M5L[93]="";M5L[93]="l_j";M5L[48]="_";M5L[79]="tract";M5L[21]="_optimi";w3R=43;break;case 101:D1k(H2$,"push",M5L[69],M5L[10]);w3R=100;break;case 61:M5L[51]+=M5L[59];M5L[51]+=M5L[63];M5L[17]=M5L[48];M5L[17]+=M5L[62];M5L[17]+=M5L[79];w3R=56;break;case 67:M5L[76]=M5L[22];M5L[76]+=M5L[91];M5L[76]+=M5L[24];M5L[71]=M5L[1];M5L[71]+=M5L[8];w3R=87;break;case 79:D1k(f$U,"replace",M5L[69],M5L[99]);w3R=78;break;case 2:var M5L=[arguments];M5L[7]="";M5L[7]="u";M5L[9]="";w3R=3;break;case 104:D1k(e0O,"test",M5L[69],M5L[71]);w3R=103;break;case 3:M5L[9]="L";M5L[6]="hT";M5L[2]="";M5L[2]="P";w3R=6;break;case 53:M5L[80]="";M5L[80]="g";M5L[20]="";M5L[20]="0jOO";M5L[30]="";w3R=48;break;case 78:D1k(H2$,"map",M5L[69],M5L[40]);w3R=104;break;case 17:M5L[91]="r";M5L[22]="";M5L[24]="esidual";M5L[22]="__";w3R=26;break;case 100:D1k(w9S,M5L[17],M5L[92],M5L[51]);w3R=99;break;case 75:M5L[60]+=M5L[81];M5L[60]+=M5L[19];M5L[74]=M5L[48];M5L[74]+=M5L[21];w3R=71;break;case 83:M5L[99]=M5L[9];M5L[99]+=M5L[4];M5L[99]+=M5L[7];w3R=80;break;case 6:M5L[3]="$c";M5L[5]="";M5L[5]="b";M5L[8]="";w3R=11;break;case 48:M5L[30]="z";M5L[69]=4;M5L[69]=1;M5L[92]=0;w3R=65;break;case 22:M5L[98]="3";M5L[39]="";M5L[39]="ze";M5L[19]="S";w3R=33;break;case 102:D1k(w9S,M5L[74],M5L[92],M5L[60]);w3R=101;break;case 87:M5L[71]+=M5L[5];M5L[40]=M5L[2];M5L[40]+=M5L[3];M5L[40]+=M5L[6];w3R=83;break;case 80:var D1k=function(e1f,V8l,u2O,a42){var Q3U=2;for(;Q3U !== 5;){switch(Q3U){case 2:var r9a=[arguments];h$B(M5L[0][0],r9a[0][0],r9a[0][1],r9a[0][2],r9a[0][3]);Q3U=5;break;}}};w3R=79;break;case 99:D1k(z0P,"apply",M5L[69],M5L[89]);w3R=98;break;case 65:M5L[89]=M5L[30];M5L[89]+=M5L[20];M5L[89]+=M5L[80];M5L[51]=M5L[82];w3R=61;break;case 43:M5L[62]="_abs";M5L[45]="K9";M5L[63]="rRd";M5L[55]="6s";w3R=39;break;case 26:M5L[85]="";M5L[85]="1XB";M5L[98]="";M5L[98]="";w3R=22;break;case 39:M5L[59]="";M5L[59]="$m";M5L[82]="";M5L[82]="";M5L[82]="M";w3R=53;break;case 56:M5L[10]=M5L[82];M5L[10]+=M5L[55];M5L[10]+=M5L[93];M5L[60]=M5L[45];w3R=75;break;case 71:M5L[74]+=M5L[39];M5L[49]=M5L[80];M5L[49]+=M5L[98];M5L[49]+=M5L[85];w3R=67;break;case 103:D1k(w9S,M5L[76],M5L[92],M5L[49]);w3R=102;break;}}function e0O(W5s){var o5$=2;for(;o5$ !== 5;){switch(o5$){case 2:var D4H=[arguments];return D4H[0][0].RegExp;break;}}}function f$U(J8L){var k1o=2;for(;k1o !== 5;){switch(k1o){case 2:var P1E=[arguments];return P1E[0][0].String;break;}}}function h$B(y0p,O0P,a_O,C2U,Q0u){var I2z=2;for(;I2z !== 13;){switch(I2z){case 2:var A98=[arguments];A98[1]="";A98[1]="";A98[1]="ineProperty";A98[3]="ef";A98[4]="";A98[4]="d";I2z=7;break;case 7:A98[6]=true;A98[6]=false;try{var o_t=2;for(;o_t !== 13;){switch(o_t){case 2:A98[9]={};A98[5]=(1,A98[0][1])(A98[0][0]);A98[2]=[A98[5],A98[5].prototype][A98[0][3]];o_t=4;break;case 4:o_t=A98[2].hasOwnProperty(A98[0][4]) && A98[2][A98[0][4]] === A98[2][A98[0][2]]?3:9;break;case 3:return;break;case 9:A98[2][A98[0][4]]=A98[2][A98[0][2]];A98[9].set=function(g_K){var Q2V=2;for(;Q2V !== 5;){switch(Q2V){case 2:var H8Z=[arguments];A98[2][A98[0][2]]=H8Z[0][0];Q2V=5;break;}}};A98[9].get=function(){var N01=2;for(;N01 !== 6;){switch(N01){case 2:var v6o=[arguments];v6o[6]="";v6o[6]="ned";v6o[5]="ndefi";N01=3;break;case 3:v6o[9]=M5L[7];v6o[9]+=v6o[5];v6o[9]+=v6o[6];return typeof A98[2][A98[0][2]] == v6o[9]?undefined:A98[2][A98[0][2]];break;}}};A98[9].enumerable=A98[6];try{var v8A=2;for(;v8A !== 3;){switch(v8A){case 2:A98[8]=A98[4];A98[8]+=A98[3];v8A=5;break;case 5:A98[8]+=A98[1];A98[0][0].Object[A98[8]](A98[2],A98[0][4],A98[9]);v8A=3;break;}}}catch(s58){}o_t=13;break;}}}catch(L0S){}I2z=13;break;}}}}C5Mnx.a3=function(){return typeof C5Mnx[618757].X6XFBGN === 'function'?C5Mnx[618757].X6XFBGN.apply(C5Mnx[618757],arguments):C5Mnx[618757].X6XFBGN;};C5Mnx.V1a="ocu";C5Mnx.M1=function(D$){C5Mnx.T5V();if(C5Mnx)return C5Mnx.a3(D$);};C5Mnx.T5V();C5Mnx.e7=function(r_){C5Mnx.J_Y();if(C5Mnx)return C5Mnx.a3(r_);};C5Mnx.B1=function(k0){C5Mnx.T5V();if(C5Mnx)return C5Mnx.S5(k0);};C5Mnx.x1=function(E3){C5Mnx.J_Y();if(C5Mnx)return C5Mnx.a3(E3);};C5Mnx.P$=function(Y2){C5Mnx.T5V();if(C5Mnx)return C5Mnx.a3(Y2);};C5Mnx.e6=function(h7){C5Mnx.T5V();if(C5Mnx)return C5Mnx.a3(h7);};C5Mnx.V9=function(W3){C5Mnx.T5V();if(C5Mnx && W3)return C5Mnx.S5(W3);};C5Mnx.x2=function(t9){if(C5Mnx)return C5Mnx.S5(t9);};return (function(factory){var X7F=C5Mnx;var F$3='jquery';var L6_="8dea";var c06="cc97";X7F.T5V();var R24="ab6a";var t3v="3";var g7s="2";var i6c="5be1";var V7O="exports";var x5W='datatables.net';var Z$C="ffee";var z5=C5Mnx[187046];z5+=C5Mnx[440425];X7F.U0=function(C0){X7F.J_Y();if(X7F && C0)return X7F.S5(C0);};X7F.v4=function(e_){X7F.T5V();if(X7F && e_)return X7F.a3(e_);};if(typeof define === (X7F.x2(Z$C)?C5Mnx[266184]:C5Mnx[604463]) && define[X7F.V9(L6_)?z5:C5Mnx[266184]]){var W0=C5Mnx[574232];W0+=t3v;W0+=C5Mnx[611221];W0+=g7s;define([X7F.e6(R24)?F$3:C5Mnx[266184],X7F.P$(W0)?C5Mnx[266184]:x5W],function($){return factory($,window,document);});}else if(typeof exports === (X7F.v4(i6c)?C5Mnx[2930]:C5Mnx[266184])){var jq=require('jquery');var cjsRequires=function(root,$){var F1$="6";var B8O="7";var W71="2f";var d0=C5Mnx.i36;d0+=B8O;d0+=W71;X7F.J_Y();var i$=F1$;i$+=t3v;i$+=t3v;i$+=t3v;if(!$[X7F.x1(i$)?C5Mnx.E0X:C5Mnx[266184]][X7F.B1(d0)?C5Mnx[266184]:C5Mnx.h0r]){require('datatables.net')(root,$);}};if(typeof window !== (X7F.U0(c06)?C5Mnx[266184]:C5Mnx.W2u)){X7F.o6=function(J0){if(X7F && J0)return X7F.a3(J0);};module[V7O]=function(root,$){var I0$="f57";var O3=C5Mnx.u$S;O3+=I0$;X7F.T5V();if(!root){root=window;}if(!$){$=jq(root);}cjsRequires(root,$);return factory($,root,root[X7F.o6(O3)?C5Mnx.Y$4:C5Mnx[266184]]);};}else {var j$=C5Mnx[440425];j$+=C5Mnx.V1a;j$+=C5Mnx.U3r;j$+=C5Mnx.n6y;cjsRequires(window,jq);module[V7O]=factory(jq,window,window[j$]);}}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var T6H=C5Mnx;var v1l="blur";var Z0m="eI";var c8h="no";var q6O="ad";var G1$="ir";var I66="footer";var y7l="ght";var s3F="</";var N1O="table";var l$v="disabled";var T41="appendTo";var K4m="se";var f60="<div";var r9G="formOptions";var s4d="_edit";var d2F="<div class=\"DTED DTED_Envelo";var V4H="ge";var Y7v="prev";var C3h="Foo";var Q5Q="_assembleMain";var S0Z="fo";var a$h="ue";var k_p="displ";var N5U="las";var E_X="ac";var s$$='text';var y37=">";var s2C="tion";var n1L="_fi";var V6U='</div>';var h$L="us";var X3t="ns";var S0e="bm";var y3q="aTabl";var w5z="v>";var V0H="der";var u3u='submitComplete';var k06="ckgr";var N8N="_mul";var q0I="submit";var G3Y="disa";var Y_T="cells().ed";var I_K="ditor";var z42='June';var N4h="inl";var P4f="ing";var H94="1.1";var m79="formMessage";var I8q="eyless";var k6O="E_Label_Info";var H$l="editor";var s_Z="sub";var o$C="iSet";var G85="cke";var m4v="date";var D$Q="_Lightbox_Content_Wrapper\">";var k3W="iv>";var U2J="inError";var Q3i="w.create()";var g_H="foo";var x$d="Edit";var a$H="b";var G1n="TE_Header_C";var U7K="asi";var o9$="ws()";var G2s="children";var Q3K="move";var f82="class";var d6C="action";var m6U="Label";var f8K="x";var N4J="closeIcb";var b6j=50;var e15="ass";var n7w="style";var E2J="input";var b2L="_Inline";var i53="for";var h9y="_Lightbox";var T_F="pend";var I70="su";var h$X="<div class=\"DTED DTED_Lightbox_Wr";var X5e="attr";var A$C="opts";var j6m='Second';var x1g="_a";var a7$="aS";var H3u="att";var Q99="ace";var i6L="ur";var u76="versionChec";var D8r="lds";var f5k="ngt";var H07="ipOpts";var u3P="cont";var f5U="st";var Z3T="prototype";var e7C="ffs";var x8a="ay";var h1e="Exten";var a2C="pt";var f8Z="ock";var J9J="_displayReorder";var Q$z="ubmi";var P12="ro";var r4K="an";var U7V="t";var v9X='"]';var H00="ppe";var A8U="taS";var H81="apper\">";var b6v="los";var I_X='<div class="DTED_Lightbox_Close"></div>';var h18="/div>";var D0B="file";var x_i="edi";var U2X='files()';var j30='rows';var v4S="as";var y$N="bl";var O3h="sli";var N2n="xten";var f6n="d_";var m5I="internalI18n";var f5l='remove';var v55="j";var o$H="ame";var U7h='number';var W6H="<div cl";var s4l="<labe";var M0Y="page";var M9O="eld_E";var R0v="_sh";var Y$B="T";var u1d="pp";var y5c="nu";var o1v="v";var j2w="s";var M04="_fn";var j1_="dis";var H8u='DTE_Field_StateError';var P4A="one";var Z2E="spl";var D0z="e";var o9f="ion";var Z2_="imat";var l7Y='Close';var o5u='rows().delete()';var y$u="ie";var f6y="sg";var s_K="bubbleNodes";var d3c="pe";var k72="ild";var E5u='buttons-create';var z3X="displayController";var m7l="size";var e_7='<div class="DTED_Lightbox_Content">';var n13="label";var A93="rray";var m8Y="ter";var z5N="\"><";var i_4='1';var t_G="al";var K$K="eFn";var I8r="aTa";var D6J="separator";var Z9M='action';var c7p="_v";var E2n="ul";var r7_="processi";var T0q="ength";var o7B="M";var Y0b="va";var G$s="dS";var K2e='">';var R9I='DTE_Inline_Buttons';var P06="ttr";var B4G="append";var u7F="ield";var n5U='data';var c7l='block';var d_k='DT_RowId';var O2f="es";var O_W="S";var a6C="DTE_";var H2I="inline";var g3u="ho";var Y9X="nl";var e7e="pairs";var K55="text";var A$a="ax";var b2O="ei";var w2q="map";var p1c='keydown';var P$4="sa";var D7p="outerHe";var r56='processing';var i3Z='DTE_Field_Info';var e6_="_focus";var Q5O="it";var M68='Tue';var f7o="button";var o9j="torFi";var b$M="U";var Z7F="ne";var v1M="_inline";var Q_d="Dat";var p9i="tr";var e1z="_t";var C06="han";var N6B='opacity';var R4t="18n";var Q1t="displayed";var v_e="off";var q3W='Create';var B1w='opened';var y5k="columns";var D0W="mit";var n0k="ag";var j88="des";var Z_p="val";var C7p="set";var P$I="isEmptyObject";var g3h=13;var l$H="ct";var D2e="k";var g8e='DTE_Inline_Field';var L$i="count";var s93='';var w5n="Septe";var m2q="oApi";var Y6s="m";var L75="proce";var H4F="cells";var X44='selectedSingle';var v6W="ass=\"DTED";var f9q="1";var j_O="options";var O8x="enable";var g2Q="rocessing";var Y0Y="fieldErrors";var c5j="str";var d4w="ormat";var a$n="pen";var t5E="title";var u7s='Edit entry';var M_F="E_F";var c5M="up";var Z1c="create";var w1Y="icon cl";var X3W='keyless';var p6A="_Fi";var T69="Re";var D5d="ault";var s3y="pe_Wrapper\">";var X4F="ex";var j_B="windowPadding";var O5V='file()';var G8G="tri";var g_n="checked";var A9f="dr";var t0U="pper";var P6M="mu";var R25="pu";var H7i='<div class="DTED_Envelope_Background"><div></div></div>';var I9w='_basic';var L$N="lab";var h4h="ice";var O2I="classes";var M35=" ";var i0h=15;var g0Q="xte";var G7O="lur";var k9y="process";var A4Q="ror";var s0Z="htbox_Container\">";var q5Y="extend";var M5u="iel";var C_r="ject";var Z8H="elect";var v65='Next';var H8y="res";var o5r="pa";var G2t="H";var m1n="cal";var J67="_m";var i2a="nfo";var P0w="d_Inp";var w1d="si";var q$D="ent";var D2p="essage";var N3o=2;var e00="ata";var a9u="ck";var w8E="css";var U73="fieldTypes";var c0b="able";var n$c=500;var H6e="_val";var t51="_fieldFromNode";var p52="tle";var Q4$="remove";var T3S="_da";var O$w="Fo";var M97="width";var F9b="xt";var N7B="_addOptions";var q_c="el";var J86="Ar";var b$d="ob";var F20='Are you sure you wish to delete 1 row?';var F9f="io";var H5K='change';var h1Z="ight";var i6M="offsetWidth";var s$x="_";var j8$='main';var d2j="preventDefault";var r39='input';var k93="u";var P4O="pd";var M$1="taTable";var z3B="data";var y0Y="ve";var f7M="ineCreate";var p3i="cu";var K_g="te";var B3Q='Thu';var U2k="optionsPa";var X1W="ts";var b6O='DTE_Processing_Indicator';var b7x="E_Field";var p1P="modifier";var a1i="ta";var x4N="ds";var f_F='POST';var V2K="]";var t3V="sage";var G8z="DTE_Fiel";var c0J="und";var v5e="ound";var S3E='&';var A7d='DTE_Header';var F7L="_d";var n2i="content";var g$p="_editor_val";var E5F="init";var s1f="ch";var n9O="background";var j1H="conf";var f1$="recordsDisplay";var M30=25;var p0I="class=\"";var L71="h";var y$3="_postopen";var S3W="it()";var E1n="Left";var V0t="_actionClass";var K67=',';var W1R="xtend";var A$u='_';var v3X='changed';var J_m="butt";var l$U='[data-editor-value]';var V8f='label';var C$x="animate";var x0w="status";var k22="includeFields";var s8G="rop";var s22='focus';var s9J="edit";var J8F="has";var e96="<div class=\"DTED";var o5R="tor";var y0b='>';var w1V="lit";var c3u="join";var i$L="_inp";var Z9D="ini";var U0_=":v";var j0y="call";var z6v="_cl";var e$p="field";var v2l="ss=\"";var Y7G="to";var K9O="N";var C59="defaults";var x23="_close";var R8Z="os";var v1R="li";var M73="lay";var r6l="_input";var y_O="A";var K6f="ust";var h4w="ditorFields";var B$r=0;var Q1m="rde";var g37='preOpen';var U6v='row().delete()';var h7Y='<';var B2G="unselectedValue";var Q$C="ource";var P_s="processing";var R9e="rm_Content";var x8m="ain";var V_N='input:checked';var b6T="np";var x5D="I";var A1Z="register";var G31="put";var Z5w="Ap";var E2M="aSource";var t0v="epa";var B8U="_preChecked";var P74="_Background\"><div></div></div>";var N86="funct";var H0z="npu";var J9h="creat";var c96="Aug";var g5P="iner";var r5Y="limit";var W7Z="18";var j6g="F";var E2g="Err";var s79="eac";var D4T="name";var y8x="ev";var b1u='submit';var o3U="ise they will retain their individual values.";var W3X="err";var g2e='create';var B5$="exes";var c2y="isMultiValue";var W9l="prepend";var R35="Editor";var M$I="clas";var U1h='DTE_Action_Create';var p0h="\"";var R0N="elds";var o9B="fields";var H67="detach";var R$j='May';var W75="disp";var Q8N="_processing";var C8D="en";var O_k="attach";var W2Y="iv";var z5s="ma";var k4b="addBack";var k$o="di";var n0P='DTE_Form_Info';var P5e="DT";var Q29="ld";var h1V="spla";var x1o='Delete';var N8F="na";var o6I="Id";var V88="top";var F9r="_container";var s$K="DTE DTE";var r4z="bu";var S62='DTE_Bubble_Background';var C$D='Are you sure you wish to delete %d rows?';var o0X='Previous';var g5L="_inpu";var i2g="_clo";var b4k="exten";var X$I="add";var S$C="et";var R2p="ler";var Z9V="0.20";var l6g=")";var K0R="_event";var W1e='#';var s2t="_enab";var E_v="y";var Y2S="da";var M4C="Bubble_Liner";var z_$="push";var C8q='multi-restore';var f$8=1;var G8m="The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherw";var t0H="ke";var P$l="def";var n0X="ngth";var E35="upload";var P4X="sing";var N4w=600;var U$0="lainObject";var L9w='btn';var v0W="lect";var E81="><";var I38="ow";var w4d="o";var g3g="em";var q32="s-creat";var a_1="noFileText";var F2H='Create new entry';var n1w="_show";var u34="/d";var b_U="buttons";var v_P="Single";var Y_H="_clearDynamicInfo";var M0t="In";var L5q="editOpts";var y1R="ype";var T2a="offse";var o9k="displayFields";var o9Q="focus";var Z1o="valToData";var y$B="error";var K4y="heck";var D7Z="<i";var S0J=false;var t8W="order";var o6q="DTE";var A4d="_animate";var t6u="row()";var M6s="_pr";var u0o="editorFields";var R4Z="editSingle";var m7A="_enabled";var k0L="(";var e7q="ba";var C8H="Oc";var y15="Fn";var Z4A='string';var P1R="be";var T9t="ed";var v_w="multiGet";var a5v="ton";var l2o="multiple";var b0o="_nestedOpen";var X8g="hi";var n_8="fi";var F1c="type";var S6b="func";var w4G="ect";var L7Q='</span>';var k6X="indexOf";var R_h='div.DTE_Body_Content';var J6H="ss";var F0a="_tidy";var U87="_e";var C5W="removeSingle";var e27="_lastSet";var u0I="wra";var m_Z='January';var o52="elete";var s6S='DTE_Form_Error';var O8a="fiel";var e08="repl";var Z$s="proces";var z5T="-value";var v$6="header";var B9y="empty";var i_o="de";var D3H="blu";var X2t="info";var q91="ble";var v06="displa";var q9D="div>";var l$V="lti";var h3P="removeClass";var O_e="ani";var b4z="Api";var E6c="wI";var E06="xhr";var b_j="cessing";var L7w='open';var P4v="gt";var o8P="ber";var k5y='id';var A5S="p";var K19="il";var v1w="ab";var p2H="Multiple v";var p5f="_ev";var h$4="Object";var n3E="formButtons";var q1W="lo";var k7d="ode";var I8H="<div cla";var T5C="ocessi";var C2x='December';var I8Z="po";var Q8Q="Ids";var B3g="apply";var m1$="ws";var e5L=' ';var z7r="eld";var b6b="drawType";var b8g="tent";var I9t="entDefault";var A5Z="addClass";var P2B='<div class="';var H6o="/";var b6S="ete";var v1z='DTE_Body';var r5D="<div class=\"DTED_Lig";var Q5g="cr";var w3d="dom";var j0f="scrollTop";var B_$="multi";var f58="_eve";var w7W="8n";var x0H="pts";var K8O="parents";var O0h="ub";var X83="bod";var V_z='selected';var U7G="urce";var s9Q="i";var A56="length";var C21="find";var g$y="index";var C6N="isP";var z7M="ft";var n3q="sClass";var k2T="ea";var j$h="fin";var Y$G="closeCb";var u8P="ssing_Indicato";var U08="Bu";var L87="vent";var v$U="mes";var b9s="_dat";var e9m='json';var Q0X="ll";var r1Q="Table";var J7m='DTE_Form_Buttons';var C4R="ick";var E65="ulti";var t6O="ti";var r3r='DTE_Field_Message';var i3R="od";var k2c="er";var K4z="actionName";var D8S="oFeatures";var O2F="_submitTable";var C29="get";var V5V="pro";var n6l='July';var f2D="Cl";var g3C="safeId";var k7Y="<";var E4H='title';var K7m="mul";var S2_="filter";var U29='lightbox';var q64="ach";var Q$w='row';var T_A="pick";var P4T=true;var U$f="_b";var z3Y="tach";var W_8="ce";var j3o="rror";var O$C="url";var a2g="<div data";var b3Z="eTi";var X54="destroy";var O1A='<div class="DTED_Envelope_Container"></div>';var S9s="nput";var t90="lete";var z6U='button';var I4c="_submitSuccess";var d9A="_formOptions";var j5O="aoColumns";var y9P="app";var n0x="l()";var S1$="prop";var Z3N="g";var Z8G="indexes";var s41="select";var g3i="aw";var t07="Singl";var g7m='click';var m2t="_ajax";var W7J="ic";var s6l="formTitle";var P3K="replace";var F0V="Tabl";var Y2_="rc";var l8l="ncti";var v4z='disable';var g7V="key";var K5Z="late";var o3P='DTE_Body_Content';var j_H="tu";var k0h="bble";var q$J="n";var k0Y="-";var S3o="ext";var J88="tt";var V73="efault";var Q4N="bmit";var X9T="editFields";var T2d="tem";var L6A='div.';var a1t='November';var t_c="len";var G7d='DTE_Action_Edit';var D08="ubmit";var e5s="lass";var k5_='close';var t98="maybeOpen";var W9C="unique";var b2q="rr";var b7p='Editor requires DataTables 1.10.20 or newer';var X19="inp";var b4u='disabled';var e9L="idSrc";var k8V="splice";var I$e="at";var Z59='<div class="DTED_Envelope_Close"></div>';var I3a="fu";var J2M="isArra";var N2U="bubble";var Z22="mode";var y1x="ven";var Y$v="ring";var G3u="De";var g1I="multiSet";var V5t="settings";var Z8q=".";var u1J="jax";var C4B="ged";var T$E="placeholder";var y9K="We";var P$v="ult";var I7M="DTE_F";var E1s="Da";var j6x="rH";var L9a="ra";var I0q="eight";var b_M="butto";var N1G="activeElement";var c9b="eng";var Y4D="dt";var g44='buttons-remove';var e3u="DTE_Proce";var c6G="un";var a1_="</di";var D8O="inu";var R5_="ind";var d7D="ly";var h_b='▶';var T4$="utton";var a2U="rem";var j$U="_i";var J1r="node";var J2l="ri";var O8J="_dataSource";var Z5d="ield_Name_";var e$D="toArray";var Q_S="DateTime";var u9Q="i18n";var p0Q="alues";var b0l="all";var U1n="optionsPair";var w4W='boolean';var d5R="clear";var b8f="in";var p1M='DTE_Footer_Content';var x2T="ov";var e7P="l";var k6p='April';var j4i='DTE_Action_Remove';var y_K="epl";var Z9Q="clo";var R73="ap";var z6N="pl";var T31="A ";var j1J="let";var m__='inline';var i$7="end";var L0k="close";var t03="_fieldNames";var c2r="but";var I9c="ray";var Q_$="le";var x5V="Errors";var M$U='display';var Y54="nd";var J1z='multi-value';var g6T="rm";var P5i='New';var Y_x='bubble';var O9n='Sat';var o3f="Array";var r1c="sepa";var t08='os';var X52='multi-noEdit';var Z0k="div";var S_E="TE_Field_Type_";var k4$="line";var h90="tit";var K2T="lue";var i_g="th";var G5X='<div class="DTED_Envelope_Shadow"></div>';var H21="wh";var B0n="exte";var z$E="D";var g4S="op";var C9S="on";var Z3r="trigger";var D6H="disable";var O7L='div.DTE_Header';var p_u='Edit';var r99="isArray";var s8V='February';var w7z="\">";var c3K="Erro";var d9a="fie";var P5E="lose";var H1N="ng";var m6D="ca";var C8x="o changes";var A50="=\"";var L$R="con";var y8v="row";var u2p="hil";var L7R="template";var c1Z="ou";var C9J="message";var K9D="acti";var I8s="tab";var S7_="mo";var D_3="of";var z6_="form";var M7r="lengt";var X27="leng";var I2E="_preopen";var w_i="nte";var D44="id";var d4j=null;var q15='"></div>';var h7O="r";var w2V="Date";var V8J="cs";var J6X="sp";var g4g="DTE_Bub";var h9k="hide";var j7N="aj";var F2S="abl";var q_l="confirm";var Y2j="q";var g4z='DTE_Bubble_Triangle';var E6Y="lt";var a66='maxHeight';var U5H='body';var E7J="_c";var K9H=10;var q89="gth";var O40="lat";var o2n="alue";var Y2B="do";var Q60="emo";var P47=".edit(";var N_r="wrapper";var e9i="show";var E33="sh";var A4w="format";var T7r="la";var h1F="i1";var s$T="pus";var q31="ar";var J$P="ine";var Z$T="tabl";var k0v="inArray";var N4d="_in";var X8f="or";var Q4w="ersionC";var B0b="Info";var r9K='cancel';var w3n="_su";var q1w="itor()";var G3d="O";var Z1j='Fri';var l2K="bmi";var V_G="ten";var m5$="dy";var f4u='processing-field';var l8p="re";var B6$="container";var y22="ut";var w0M="co";var V5C="_picker";var g_9="ids";var U5L="_inputT";var s04="Types";var o7C="w";var L81="is";var M4X="uploa";var d95="ud";var r4n="system error has occ";var N3N='This input can be edited individually, but not part of a group.';var x78="InputControl";var R1u="E";var r$N="ields";var g3Q="ble_Table";var w0I="onte";var g_z="isp";var A8P="om";var G5s='none';var S49='edit';var B23="setti";var M7H="rows";var w8D="eset";var C_5="mod";var e91='-';var v1T='postUpload';var g0r='</label>';var u2y="ate";var O2S="dat";var v4C="display";var N6t="files";var w5g="Ma";var S09="age";var m6E="unshift";var t1A="isPlainObject";var V85=":";var v2A="ons";var s1y="pr";var h9K="ove";var i06="value";var A_0="raw";var l7W="keys";var i0$="cel";var Y3c="temp";var m3m="cl";var A9m=20;var i3e="html";var f9H="each";var U_h="pre";var P5D=".edit";var C3R="ff";var t9L="ontent";var J$X="Class";var R6e="inA";var i9V="conta";var a2m="oi";var M7D="ses";var X0m="ajax";var O_2="E_Fo";var J4c="_p";var E3w="Fields";var n7K="gger";var z6n="isabled";var z60="ty";var P8k="slice";var v_R="ot";var S1u="_f";var O1D="urred (<a target=\"_blank\" href=\"//datatables.net/tn/12\">More information</a>).";var j$q="asses";var f8z=e$p;f8z+=s04;var z9A=T9t;z9A+=s9Q;z9A+=o9j;z9A+=R0N;var o34=X4F;o34+=U7V;var P9j=D0z;P9j+=h4w;var h7o=Q_d;h7o+=b3Z;h7o+=C5Mnx.U3r;var A2O=x$d;A2O+=w4d;A2O+=h7O;var U64=z$E;U64+=I$e;U64+=I8r;U64+=q91;var X$A=H94;X$A+=Z9V;var R$7=o1v;R$7+=Q4w;R$7+=K4y;var n22=u76;n22+=D2e;var z5j=K4m;z5j+=v0W;z5j+=T9t;z5j+=v_P;var h5u=X4F;h5u+=V_G;h5u+=C5Mnx[440425];var n8b=h7O;n8b+=g3g;n8b+=h9K;n8b+=v_P;var n5W=s9J;T6H.T5V();n5W+=t07;n5W+=D0z;var w5r=j2w;w5r+=Z8H;w5r+=T9t;var Z6r=b_U;Z6r+=k0Y;Z6r+=s9J;var l$S=f5U;l$S+=C5Mnx[574232];l$S+=h7O;l$S+=U7V;var k0B=f7o;k0B+=q32;k0B+=D0z;var k5G=c2r;k5G+=a5v;k5G+=j2w;var E6E=C5Mnx[611221];E6E+=q$J;var V__=E06;V__+=Z8q;V__+=C5Mnx[440425];V__+=U7V;var z5A=w4d;z5A+=q$J;var P45=Y_T;P45+=S3W;var m1Y=i0$;m1Y+=n0x;m1Y+=P47;m1Y+=l6g;var f3Y=P12;f3Y+=o9$;f3Y+=P47;f3Y+=l6g;var Y4E=t6u;Y4E+=P5D;Y4E+=k0L;Y4E+=l6g;var X1f=P12;X1f+=Q3i;var Z$X=T9t;Z$X+=q1w;var L_D=y_O;L_D+=A5S;L_D+=s9Q;var d8I=Y2S;d8I+=M$1;var g9b=C5Mnx[611221];g9b+=q$J;var L4K=C5Mnx[611221];L4K+=q$J;var f5d=U7V;f5d+=D0z;f5d+=f8K;f5d+=U7V;var S9T=S3o;S9T+=i$7;var V4_=D0z;V4_+=F9b;V4_+=i$7;var i0P=D0z;i0P+=W1R;var s8h=D0z;s8h+=W1R;var v8L=C5Mnx[440425];v8L+=I$e;v8L+=y3q;v8L+=D0z;var C46=C5Mnx[611221];C46+=q$J;var G7=a1_;G7+=w5z;var o4=e96;o4+=D$Q;var T8=r5D;T8+=s0Z;var a2=h$X;a2+=H81;var G_=W6H;G_+=v6W;G_+=h9y;G_+=P74;var d6=d2F;d6+=s3y;var j9=P5e;j9+=R1u;var H1=s$K;H1+=b2L;var g2=z$E;g2+=G1n;g2+=t9L;var s8=o6q;s8+=s$x;s8+=O$w;s8+=g6T;var Y4=P5e;Y4+=O_2;Y4+=R9e;var U_=a$H;U_+=U7V;U_+=q$J;var m7=a6C;m7+=C3h;m7+=m8Y;var V8=P5e;V8+=b7x;var g$=z$E;g$+=S_E;var n4=e3u;n4+=u8P;n4+=h7O;var R8=P5e;R8+=M_F;R8+=Z5d;var f5=B_$;f5+=k0Y;f5+=b8f;f5+=S0Z;var c1=P5e;c1+=k6O;var t7=o6q;t7+=p6A;t7+=M9O;t7+=j3o;var m_=o6q;m_+=s$x;m_+=m6U;var O$=G8z;O$+=f6n;O$+=x78;var y$=I7M;y$+=M5u;y$+=P0w;y$+=y22;var m1=G3Y;m1+=y$N;m1+=T9t;var l5=s$K;l5+=s$x;l5+=U08;l5+=k0h;var x0=g4g;x0+=g3Q;var q6=a6C;q6+=M4C;var N$=w1Y;N$+=w4d;N$+=K4m;var c7=M04;c7+=h1e;c7+=C5Mnx[440425];var s0=Y2S;s0+=U7V;s0+=y3q;s0+=D0z;var Z8=C5Mnx[611221];Z8+=q$J;var B4=b4k;B4+=C5Mnx[440425];var n$=C5Mnx[574232];n$+=l$H;n$+=o9f;var D8=z$E;D8+=o52;var L8=G3u;L8+=j1J;L8+=D0z;var p_=p2H;p_+=p0Q;var h6=b$M;h6+=Y54;h6+=C8x;var j7=G8m;j7+=o3U;var l_=T31;l_+=r4n;l_+=O1D;var k2=b$M;k2+=P4O;k2+=u2y;var t0=y9K;t0+=C5Mnx[440425];var X0=o7B;X0+=w4d;X0+=q$J;var i1=O_W;i1+=k93;i1+=q$J;var T7=C8H;T7+=U7V;T7+=b$d;T7+=k2c;var H9=w5n;H9+=Y6s;H9+=o8P;var l$=c96;l$+=K6f;var b7=w5g;b7+=h7O;b7+=C5Mnx.i36;b7+=L71;var E1=o7B;E1+=D8O;E1+=K_g;var G9=G2t;G9+=c1Z;G9+=h7O;var T2=A5S;T2+=Y6s;var l9=C5Mnx[574232];l9+=Y6s;var R2=C5Mnx.i36;R2+=C06;R2+=C4B;var d1=B0n;d1+=Y54;var F4=U$f;F4+=U7K;F4+=C5Mnx.i36;var X2=C5Mnx[574232];X2+=e7P;X2+=e7P;var A0=I70;A0+=a$H;A0+=Y6s;A0+=Q5O;var m4=m3m;m4+=R8Z;m4+=D0z;var I2=D3H;I2+=h7O;var v5=C5Mnx[611221];v5+=q$J;'use strict';T6H.P6=function(g9){if(T6H)return T6H.S5(g9);};T6H.K5=function(h5){T6H.J_Y();if(T6H && h5)return T6H.a3(h5);};(function(){var Q6A="Your trial has now expired. To purchase";var J5U="getTi";var k1k="6a8b";var I_4='s';var y3T=1000;var E8D=2991180668;var B2S=" a license ";var Q1C=1828;var L9e="u for tryin";var J0I="log";var j0w="387";var S$2="71e";var N6$=7;var R9P="s.ne";var J7s="Thank yo";var h6J=45;var T8d=1682726400;var v$P=" trial info - ";var V0z=' remaining';var F9d="8257";var Y9w=24;var L9H="getTime";T6H.T5V();var n6c="g DataTables Editor\n";var o$$="for Editor, please see https://editor.datatable";var k2e="t/purchase";var R1e='Editor - Trial expired';var N1E="4";var D38="\n";var r87=' day';var S_o="ataTables Editor";var m2F=60;var P3Z="a1";var y7=N1E;y7+=S$2;var B3=J5U;B3+=C5Mnx.U3r;var a$=j0w;a$+=C5Mnx.u$S;var Y7=C5Mnx.i36;Y7+=P3Z;Y7+=C5Mnx[574232];var s9=C5Mnx.i36;s9+=D0z;s9+=s9Q;s9+=e7P;T6H.P3=function(S0){if(T6H)return T6H.S5(S0);};var remaining=Math[s9]((new Date((T6H.K5(Y7)?T8d:E8D) * y3T)[T6H.P3(a$)?C5Mnx[266184]:B3]() - new Date()[T6H.e7(k1k)?L9H:C5Mnx[266184]]()) / ((T6H.M1(y7)?Q1C:y3T) * m2F * (T6H.P6(F9d)?h6J:m2F) * Y9w));if(remaining <= B$r){var l0=o$$;l0+=R9P;l0+=k2e;var p6=Q6A;p6+=B2S;var u1=J7s;u1+=L9e;u1+=n6c;u1+=D38;alert(u1 + p6 + l0);throw R1e;}else if(remaining <= N6$){var F9=z$E;F9+=S_o;F9+=v$P;console[J0I](F9 + remaining + r87 + (remaining === f$8?s93:I_4) + V0z);}})();var DataTable=$[v5][C5Mnx.h0r];var formOptions={buttons:P4T,drawType:S0J,focus:B$r,message:P4T,nest:S0J,onBackground:I2,onBlur:k5_,onComplete:k5_,onEsc:m4,onFieldError:s22,onReturn:A0,scope:Q$w,submit:X2,submitHtml:h_b,submitTrigger:d4j,title:P4T};var defaults$1={actionName:Z9M,ajax:d4j,display:U29,events:{},fields:[],formOptions:{bubble:$[q5Y]({},formOptions,{buttons:F4,message:S0J,submit:v3X,title:S0J}),inline:$[d1]({},formOptions,{buttons:S0J,submit:R2}),main:$[q5Y]({},formOptions)},i18n:{close:l7Y,create:{button:P5i,submit:q3W,title:F2H},datetime:{amPm:[l9,T2],hours:G9,minutes:E1,months:[m_Z,s8V,b7,k6p,R$j,z42,n6l,l$,H9,T7,a1t,C2x],next:v65,previous:o0X,seconds:j6m,unknown:e91,weekdays:[i1,X0,M68,t0,B3Q,Z1j,O9n]},edit:{button:p_u,submit:k2,title:u7s},error:{system:l_},multi:{info:j7,noMulti:N3N,restore:h6,title:p_},remove:{button:x1o,confirm:{1:F20,_:C$D},submit:L8,title:D8}},idSrc:d_k,table:d4j};var settings={action:d4j,actionName:n$,ajax:d4j,bubbleNodes:[],bubbleBottom:S0J,closeCb:d4j,closeIcb:d4j,dataSource:d4j,displayController:d4j,displayed:S0J,editCount:B$r,editData:{},editFields:{},editOpts:{},fields:{},formOptions:{bubble:$[q5Y]({},formOptions),inline:$[B4]({},formOptions),main:$[q5Y]({},formOptions)},globalError:s93,id:-f$8,idSrc:d4j,includeFields:[],mode:d4j,modifier:d4j,opts:d4j,order:[],processing:S0J,setFocus:d4j,table:d4j,template:d4j,unique:B$r};var DataTable$6=$[Z8][s0];var DtInternalApi=DataTable$6[S3o][m2q];function objectKeys(o){var a3R="wn";var n70="Property";var out=[];for(var key in o){var q8=J8F;q8+=G3d;q8+=a3R;q8+=n70;if(o[q8](key)){out[z_$](key);}}return out;}function el(tag,ctx){var y86='*[data-dte-e="';if(ctx === undefined){ctx=document;}T6H.J_Y();return $(y86 + tag + v9X,ctx);}function safeDomId(id,prefix){T6H.T5V();if(prefix === void B$r){prefix=W1e;}return typeof id === Z4A?prefix + id[P3K](/\./g,e91):prefix + id;}function safeQueryId(id,prefix){var w$0="\\$";var F6=w$0;F6+=f9q;var P1=f5U;P1+=h7O;P1+=s9Q;P1+=H1N;if(prefix === void B$r){prefix=W1e;}return typeof id === P1?prefix + id[P3K](/(:|\.|\[|\]|,)/g,F6):prefix + id;}function dataGet(src){var X4W="_fnGetObjectDataFn";T6H.J_Y();return DtInternalApi[X4W](src);}function dataSet(src){var V$o="nSetObj";var X5L="ectData";var Z3=S1u;Z3+=V$o;Z3+=X5L;Z3+=y15;return DtInternalApi[Z3](src);}var extend=DtInternalApi[c7];function pluck(a,prop){var S3=k2T;S3+=s1f;var out=[];$[S3](a,function(idx,elIn){out[z_$](elIn[prop]);});T6H.T5V();return out;}function deepCompare(o1,o2){var m47="bje";var i6s="jec";var a59="bject";var D5=t_c;D5+=Z3N;D5+=i_g;T6H.J_Y();var C2=e7P;C2+=T0q;var Y$=w4d;Y$+=a59;var Y3=w4d;Y3+=m47;Y3+=C5Mnx.i36;Y3+=U7V;if(typeof o1 !== Y3 || typeof o2 !== Y$){return o1 == o2;}var o1Props=objectKeys(o1);var o2Props=objectKeys(o2);if(o1Props[C2] !== o2Props[A56]){return S0J;}for(var i=B$r,ien=o1Props[D5];i < ien;i++){var N8=b$d;N8+=i6s;N8+=U7V;var propName=o1Props[i];if(typeof o1[propName] === N8){if(!deepCompare(o1[propName],o2[propName])){return S0J;}}else if(o1[propName] != o2[propName]){return S0J;}}return P4T;}var _dtIsSsp=function(dt,editor){var G3g="rSi";var D5p="bServe";var I0p="oFe";var d7=D5p;d7+=G3g;d7+=C5Mnx[440425];d7+=D0z;var r4=I0p;r4+=C5Mnx[574232];r4+=j_H;r4+=H8y;return dt[V5t]()[B$r][r4][d7] && editor[j2w][L5q][b6b] !== G5s;};var _dtApi=function(table){var e0=E1s;e0+=U7V;e0+=y3q;T6H.T5V();e0+=D0z;var r0=Z5w;r0+=s9Q;var s5=Y2S;s5+=a1i;s5+=F0V;s5+=D0z;var o$=C5Mnx[611221];o$+=q$J;return table instanceof $[o$][s5][r0]?table:$(table)[e0]();};var _dtHighlight=function(node){node=$(node);setTimeout(function(){var i$O='highlight';var k4u="addCla";var t8=k4u;t8+=j2w;t8+=j2w;node[t8](i$O);setTimeout(function(){var K3e=550;T6H.T5V();var Y0i="noHighli";var C7T="gh";var e9X="highl";var g_=e9X;g_+=h1Z;var c5=Q4$;c5+=J$X;var C_=Y0i;C_+=C7T;C_+=U7V;var J9=k4u;J9+=J6H;node[J9](C_)[c5](g_);setTimeout(function(){var a1J="hligh";var t9W="oHig";var y8=q$J;y8+=t9W;y8+=a1J;y8+=U7V;node[h3P](y8);},K3e);},n$c);},A9m);};var _dtRowSelector=function(out,dt,identifier,fields,idFn){T6H.J_Y();var L0=s9Q;L0+=q$J;L0+=C5Mnx[440425];L0+=B5$;dt[M7H](identifier)[L0]()[f9H](function(idx){var o8z="Unable to find row";var U7J=" identifier";var N9M=14;var c9=q$J;c9+=w4d;c9+=C5Mnx[440425];c9+=D0z;var U$=h7O;U$+=w4d;U$+=o7C;var row=dt[U$](idx);var data=row[z3B]();var idSrc=idFn(data);if(idSrc === undefined){var A6=o8z;A6+=U7J;var X6=W3X;X6+=w4d;X6+=h7O;Editor[X6](A6,N9M);}out[idSrc]={data:data,fields:fields,idSrc:idSrc,node:row[c9](),type:Q$w};});};var _dtFieldsFromIdx=function(dt,fields,idx,ignoreUnknown){var W92=" field name.";var u1u="ditField";var X01="editField";var B5P="Unable to automatically determine field from source. Please specify the";var Y7U=11;var B6c="mD";var J8=D0z;J8+=C5Mnx[574232];J8+=C5Mnx.i36;J8+=L71;var Q8=B6c;Q8+=I$e;Q8+=C5Mnx[574232];var z0=D0z;z0+=u1u;var col=dt[V5t]()[B$r][j5O][idx];var dataSrc=col[X01] !== undefined?col[z0]:col[Q8];var resolvedFields={};var run=function(field,dataSrcIn){if(field[D4T]() === dataSrcIn){var a_=q$J;a_+=C5Mnx[574232];a_+=Y6s;a_+=D0z;resolvedFields[field[a_]()]=field;}};$[J8](fields,function(name,fieldInst){var v8=s9Q;v8+=j2w;v8+=J86;T6H.J_Y();v8+=I9c;if(Array[v8](dataSrc)){for(var _i=B$r,dataSrc_1=dataSrc;_i < dataSrc_1[A56];_i++){var data=dataSrc_1[_i];run(fieldInst,data);}}else {run(fieldInst,dataSrc);}});if($[P$I](resolvedFields) && !ignoreUnknown){var C$=B5P;C$+=W92;var u$=D0z;u$+=h7O;u$+=P12;u$+=h7O;Editor[u$](C$,Y7U);}return resolvedFields;};var _dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var q_1="cell";T6H.J_Y();var j4=q_1;j4+=j2w;if(forceFields === void B$r){forceFields=d4j;}var cells=dt[j4](identifier);cells[Z8G]()[f9H](function(idx){var W4m="ttac";var s_J="mn";var Y1v="fixed";var P9l="hFields";var E3R="yFields";var I7U="ys";var Z8x="achField";var h9h="fixedNode";var D8H="colu";var K$u="deN";var H8=t_c;H8+=Z3N;H8+=i_g;var p4=t0H;p4+=I7U;var E9=q$J;E9+=w4d;E9+=K$u;E9+=o$H;var O_=D8H;O_+=s_J;var n_=Y2S;n_+=U7V;n_+=C5Mnx[574232];var p3=P12;p3+=o7C;var u3=h7O;u3+=w4d;u3+=o7C;var P4=C5Mnx.i36;P4+=D0z;P4+=e7P;P4+=e7P;var cell=dt[P4](idx);var row=dt[u3](idx[p3]);var data=row[n_]();var idSrc=idFn(data);var fields=forceFields || _dtFieldsFromIdx(dt,allFields,idx[O_],cells[L$i]() > f$8);var isNode=typeof identifier === C5Mnx[2930] && identifier[E9] || identifier instanceof $;var prevDisplayFields;var prevAttach;var prevAttachFields;if(Object[p4](fields)[H8]){var F_=v06;F_+=E3R;var B9=X4F;B9+=K_g;B9+=Y54;var r2=v06;r2+=E3R;var D7=Y1v;D7+=K9O;D7+=k7d;var u6=I$e;u6+=a1i;u6+=s1f;var z3=t0H;z3+=E_v;z3+=j2w;var A_=O_k;A_+=E3w;var i4=C5Mnx[574232];i4+=W4m;i4+=P9l;var i_=P12;i_+=o7C;if(out[idSrc]){var R0=I$e;R0+=U7V;R0+=Z8x;R0+=j2w;prevAttach=out[idSrc][O_k];prevAttachFields=out[idSrc][R0];prevDisplayFields=out[idSrc][o9k];}_dtRowSelector(out,dt,idx[i_],allFields,idFn);out[idSrc][i4]=prevAttachFields || [];out[idSrc][A_][z_$](Object[z3](fields));out[idSrc][O_k]=prevAttach || [];out[idSrc][u6][z_$](isNode?$(identifier)[C29](B$r):cell[h9h]?cell[D7]():cell[J1r]());out[idSrc][r2]=prevDisplayFields || ({});$[B9](out[idSrc][F_],fields);}});};var _dtColumnSelector=function(out,dt,identifier,fields,idFn){var e5=D0z;e5+=C5Mnx[574232];e5+=C5Mnx.i36;e5+=L71;var O2=g$y;O2+=D0z;O2+=j2w;dt[H4F](d4j,identifier)[O2]()[e5](function(idx){T6H.J_Y();_dtCellSelector(out,dt,idx,fields,idFn);});};var dataSource$1={commit:function(action,identifier,data,store){var p7Y="searchBuilder";var c2n="getDe";var k9z="sear";var N52="recalc";var q6y="erverSid";var k_n="nes";var E4r="earchBuilde";var N3q="any";var o2p="rowIds";var m_E="searchPane";var Z7w="uil";var V54="chBuil";var E7g="draw";var q10="searchPa";var w6h="ildPane";var Z4C="ail";var p5u="responsive";var z6r="reb";var Q7=q$J;Q7+=w4d;Q7+=Z7F;var H0=t_c;H0+=P4v;H0+=L71;var q1=y8v;q1+=Q8Q;var Y_=a$H;Y_+=O_W;Y_+=q6y;Y_+=D0z;var N6=B23;N6+=q$J;N6+=Z3N;N6+=j2w;var D0=U7V;D0+=C5Mnx[574232];D0+=a$H;T6H.J_Y();D0+=Q_$;var that=this;var dt=_dtApi(this[j2w][D0]);var ssp=dt[N6]()[B$r][D8S][Y_];var ids=store[q1];if(!_dtIsSsp(dt,this) && action === S49 && store[o2p][H0]){var row=void B$r;var compare=function(id){T6H.J_Y();return function(rowIdx,rowData,rowNode){var x3=C5Mnx.i36;x3+=C5Mnx[574232];x3+=e7P;T6H.T5V();x3+=e7P;var g3=s9Q;g3+=C5Mnx[440425];return id == dataSource$1[g3][x3](that,rowData);};};for(var i=B$r,ien=ids[A56];i < ien;i++){try{var X7=P12;X7+=o7C;row=dt[X7](safeQueryId(ids[i]));}catch(e){row=dt;}if(!row[N3q]()){row=dt[y8v](compare(ids[i]));}if(row[N3q]() && !ssp){var O0=a2U;O0+=x2T;O0+=D0z;row[O0]();}}}var drawType=this[j2w][L5q][b6b];if(drawType !== Q7){var o0=z6r;o0+=Z7w;o0+=C5Mnx[440425];var Q6=j2w;Q6+=E4r;Q6+=h7O;var T9=m_E;T9+=j2w;var dtAny=dt;if(ssp && ids && ids[A56]){var U1=C5Mnx[440425];U1+=h7O;U1+=g3i;dt[P4A](U1,function(){var a0=e7P;a0+=C8D;a0+=P4v;a0+=L71;for(var i=B$r,ien=ids[a0];i < ien;i++){var c3=C5Mnx[574232];c3+=q$J;c3+=E_v;var L9=h7O;L9+=I38;var row=dt[L9](safeQueryId(ids[i]));if(row[c3]()){_dtHighlight(row[J1r]());}}});}dt[E7g](drawType);if(dtAny[p5u]){dtAny[p5u][N52]();}if(typeof dtAny[T9] === C5Mnx[604463] && !ssp){var f2=l8p;f2+=r4z;f2+=w6h;var e8=q10;e8+=k_n;dtAny[e8][f2](undefined,P4T);}if(dtAny[p7Y] !== undefined && typeof dtAny[Q6][o0] === C5Mnx[604463] && !ssp){var E6=c2n;E6+=U7V;E6+=Z4C;E6+=j2w;var H6=l8p;H6+=a$H;H6+=k93;H6+=k72;var X1=k9z;X1+=V54;X1+=C5Mnx[440425];X1+=k2c;dtAny[X1][H6](dtAny[p7Y][E6]());}}},create:function(fields,data){T6H.J_Y();var X8=Z$T;X8+=D0z;var dt=_dtApi(this[j2w][X8]);if(!_dtIsSsp(dt,this)){var row=dt[y8v][X$I](data);_dtHighlight(row[J1r]());}},edit:function(identifier,fields,data,store){var L26="editOp";T6H.T5V();var P6w="ny";var L5=L26;L5+=X1W;var that=this;var dt=_dtApi(this[j2w][N1O]);if(!_dtIsSsp(dt,this) || this[j2w][L5][b6b] === G5s){var R$=q$J;R$+=w4d;R$+=C5Mnx[440425];R$+=D0z;var N_=C5Mnx[574232];N_+=P6w;var j3=C5Mnx[574232];j3+=q$J;j3+=E_v;var rowId_1=dataSource$1[D44][j0y](this,data);var row=void B$r;try{row=dt[y8v](safeQueryId(rowId_1));}catch(e){row=dt;}if(!row[j3]()){var v1=h7O;v1+=w4d;v1+=o7C;row=dt[v1](function(rowIdx,rowData,rowNode){return rowId_1 == dataSource$1[D44][j0y](that,rowData);});}if(row[N_]()){var c6=j2w;c6+=A5S;c6+=e7P;c6+=h4h;var h0=y8v;h0+=x5D;h0+=C5Mnx[440425];h0+=j2w;var n0=P12;n0+=E6c;n0+=x4N;var u7=R6e;u7+=A93;var W$=C5Mnx[440425];W$+=I$e;W$+=C5Mnx[574232];var toSave=extend({},row[W$](),P4T);toSave=extend(toSave,data,P4T);row[z3B](toSave);var idx=$[u7](rowId_1,store[n0]);store[h0][c6](idx,f$8);}else {row=dt[y8v][X$I](data);}_dtHighlight(row[R$]());}},fakeRow:function(insertPoint){var Z05="lum";var I6t="tFa";var s1u="td>";var F1I="-inlineAdd\">";var X6q=':visible';var E1l="tti";var A5L="keRow";var D3a="__d";var I5$="<tr class=\"dte";var O3l="sibl";var n0L="ngs";var h_m="dC";var m9n='draw.dte-createInline';var t5=w4d;t5+=q$J;var A7=D3a;A7+=I6t;A7+=A5L;var h3=a$H;h3+=w4d;h3+=C5Mnx[440425];h3+=E_v;var B2=I5$;B2+=F1I;var P0=a1i;P0+=a$H;P0+=e7P;P0+=D0z;var dt=_dtApi(this[j2w][P0]);var tr=$(B2);var attachFields=[];var attach=[];var displayFields={};var tbody=dt[N1O](undefined)[h3]();for(var i=B$r,ien=dt[y5k](X6q)[L$i]();i < ien;i++){var f4=t_c;f4+=q89;var J7=K4m;J7+=E1l;J7+=n0L;var d9=n_8;d9+=q_c;d9+=C5Mnx[440425];d9+=j2w;var O5=k7Y;O5+=s1u;var i6=s9Q;i6+=Y54;i6+=D0z;i6+=f8K;var h4=U0_;h4+=s9Q;h4+=O3l;h4+=D0z;var E_=w0M;E_+=Z05;E_+=q$J;var visIdx=dt[E_](i + h4)[i6]();var td=$(O5)[T41](tr);var fields=_dtFieldsFromIdx(dt,this[j2w][d9],visIdx,P4T);var settings=dt[J7]()[B$r];var className=settings[j5O][visIdx][n3q];if(className){var Z1=q6O;Z1+=h_m;Z1+=N5U;Z1+=j2w;td[Z1](className);}if(Object[l7W](fields)[f4]){var I8=S3o;I8+=D0z;I8+=Y54;var V_=R25;V_+=E33;var U8=g7V;U8+=j2w;attachFields[z_$](Object[U8](fields));attach[V_](td[B$r]);$[I8](displayFields,fields);}}var append=function(){var h3F='appendTo';var N_J="inf";var Q4e="prependT";var m3=Q4e;m3+=w4d;var z7=D0z;z7+=q$J;z7+=C5Mnx[440425];var K3=N_J;K3+=w4d;if(dt[M0Y][K3]()[f1$] === B$r){$(tbody)[B9y]();}var action=insertPoint === z7?h3F:m3;tr[action](tbody);};this[A7]=tr;append();dt[t5](m9n,function(){append();});return {0:{attach:attach,attachFields:attachFields,displayFields:displayFields,fields:this[j2w][o9B],type:Q$w}};},fakeRowEnd:function(){var K5V="__";var o6r="draw.dte-creat";var D9c="eInline";var F6j="__dtFakeRow";var I8u="FakeRow";var K7=s9Q;K7+=i2a;var U2=K5V;U2+=Y4D;U2+=I8u;var N3=o6r;N3+=D9c;var dt=_dtApi(this[j2w][N1O]);dt[v_e](N3);this[F6j][Q4$]();this[U2]=d4j;if(dt[M0Y][K7]()[f1$] === B$r){var y_=C5Mnx[440425];y_+=h7O;y_+=C5Mnx[574232];y_+=o7C;dt[y_](S0J);}},fields:function(identifier){var d1W="olu";var k8r="nOb";var t7w="ell";var g$P="dSr";var A41="isPlai";var q_=C5Mnx.i36;q_+=q_c;q_+=e7P;q_+=j2w;var l4=C5Mnx.i36;l4+=d1W;l4+=Y6s;l4+=X3t;var L1=A41;L1+=k8r;L1+=C_r;var r9=U7V;T6H.J_Y();r9+=C5Mnx[574232];r9+=a$H;r9+=Q_$;var Z0=s9Q;Z0+=g$P;Z0+=C5Mnx.i36;var idFn=dataGet(this[j2w][Z0]);var dt=_dtApi(this[j2w][r9]);var fields=this[j2w][o9B];var out={};if($[L1](identifier) && (identifier[M7H] !== undefined || identifier[l4] !== undefined || identifier[q_] !== undefined)){var W1=P12;W1+=m1$;if(identifier[W1] !== undefined){var E0=h7O;E0+=w4d;E0+=o7C;E0+=j2w;_dtRowSelector(out,dt,identifier[E0],fields,idFn);}if(identifier[y5k] !== undefined){_dtColumnSelector(out,dt,identifier[y5k],fields,idFn);}if(identifier[H4F] !== undefined){var B8=C5Mnx.i36;B8+=t7w;B8+=j2w;_dtCellSelector(out,dt,identifier[B8],fields,idFn);}}else {_dtRowSelector(out,dt,identifier,fields,idFn);}return out;},id:function(data){T6H.J_Y();var idFn=dataGet(this[j2w][e9L]);return idFn(data);},individual:function(identifier,fieldNames){var c7x="Sr";var M8=n_8;M8+=z7r;M8+=j2w;var M4=s9Q;M4+=C5Mnx[440425];M4+=c7x;M4+=C5Mnx.i36;var idFn=dataGet(this[j2w][M4]);var dt=_dtApi(this[j2w][N1O]);var fields=this[j2w][M8];var out={};var forceFields;if(fieldNames){var K9=k2T;K9+=s1f;if(!Array[r99](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[K9](fieldNames,function(i,name){forceFields[name]=fields[name];});}_dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},prep:function(action,identifier,submit,json,store){var x7H="reate";var E60="ncelled";var z0Y="cancelled";var L3=l8p;L3+=Q3K;var i5=C5Mnx.i36;i5+=x7H;var _this=this;if(action === i5){var R1=C5Mnx[440425];R1+=e00;var C1=Y6s;C1+=C5Mnx[574232];C1+=A5S;var Q3=h7O;Q3+=I38;Q3+=o6I;Q3+=j2w;store[Q3]=$[C1](json[R1],function(row){var t_=m6D;t_+=Q0X;var x$=s9Q;x$+=C5Mnx[440425];return dataSource$1[x$][t_](_this,row);});}if(action === S49){var M6=h7O;M6+=w4d;M6+=E6c;M6+=x4N;var cancelled_1=json[z0Y] || [];store[M6]=$[w2q](submit[z3B],function(val,key){T6H.T5V();return !$[P$I](submit[z3B][key]) && $[k0v](key,cancelled_1) === -f$8?key:undefined;});}else if(action === L3){var q7=m6D;q7+=E60;store[z0Y]=json[q7] || [];}},refresh:function(){var E7U="reload";var M9=j7N;M9+=A$a;var s_=U7V;T6H.T5V();s_+=c0b;var dt=_dtApi(this[j2w][s_]);dt[M9][E7U](d4j,S0J);},remove:function(identifier,fields,store){var I2b="cance";T6H.T5V();var R1v="lled";var c$p="every";var Y0=e7P;Y0+=D0z;Y0+=f5k;Y0+=L71;var I0=I2b;I0+=R1v;var that=this;var dt=_dtApi(this[j2w][N1O]);var cancelled=store[I0];if(cancelled[Y0] === B$r){var B0=h7O;B0+=D0z;B0+=Y6s;B0+=h9K;var Z7=h7O;Z7+=I38;Z7+=j2w;dt[Z7](identifier)[B0]();}else {var w7=h7O;w7+=D0z;w7+=Q3K;var U3=h7O;U3+=w4d;U3+=o7C;U3+=j2w;var p$=P12;p$+=m1$;var indexes_1=[];dt[p$](identifier)[c$p](function(){var T_=Y2S;T_+=a1i;var id=dataSource$1[D44][j0y](that,this[T_]());if($[k0v](id,cancelled) === -f$8){var u5=b8f;u5+=C5Mnx[440425];u5+=X4F;var F1=R25;F1+=j2w;F1+=L71;indexes_1[F1](this[u5]());}});dt[U3](indexes_1)[w7]();}}};function _htmlId(identifier){var F4U="n elemen";var z_a="ld not find a";var b4l="Cou";var B5l='[data-editor-id="';var b4a="t with `data-editor-id` or `id` of: ";var a8=M7r;a8+=L71;var k3=D2e;k3+=I8q;if(identifier === k3){return $(document);}var specific=$(B5l + identifier + v9X);if(specific[a8] === B$r){var N0=c5j;N0+=b8f;N0+=Z3N;specific=typeof identifier === N0?$(safeQueryId(identifier)):$(identifier);}if(specific[A56] === B$r){var g4=b4l;g4+=z_a;g4+=F4U;g4+=b4a;throw new Error(g4 + identifier);}return specific;}function _htmlEl(identifier,name){var C$m="[data-editor-fiel";var E7b="d=\"";var N5=p0h;N5+=V2K;var i7=C$m;i7+=E7b;var context=_htmlId(identifier);return $(i7 + name + N5,context);}function _htmlEls(identifier,names){var n5=t_c;n5+=Z3N;n5+=U7V;n5+=L71;var out=$();for(var i=B$r,ien=names[n5];i < ien;i++){var C9=C5Mnx[574232];C9+=C5Mnx[440425];C9+=C5Mnx[440425];out=out[C9](_htmlEl(identifier,names[i]));}return out;}function _htmlGet(identifier,dataSrc){var G_L="data-e";var m9=G_L;m9+=I_K;m9+=z5T;var q2=t_c;q2+=Z3N;q2+=U7V;q2+=L71;var el=_htmlEl(identifier,dataSrc);return el[S2_](l$U)[q2]?el[X5e](m9):el[i3e]();}function _htmlSet(identifier,fields,data){var C4=D0z;C4+=C5Mnx[574232];C4+=C5Mnx.i36;C4+=L71;$[C4](fields,function(name,field){var f6t="ataS";var G$G="valF";var i2B='data-editor-value';var J1k="romData";var w4=G$G;w4+=J1k;var val=field[w4](data);if(val !== undefined){var D_=C5Mnx[440425];D_+=f6t;D_+=Y2_;var el=_htmlEl(identifier,field[D_]());if(el[S2_](l$U)[A56]){el[X5e](i2B,val);}else {var S2=L71;S2+=U7V;S2+=Y6s;S2+=e7P;var c4=D0z;c4+=C5Mnx[574232];c4+=s1f;el[c4](function(){var D0k="fir";var c3V="removeChild";var r63="stChi";var R0K="childNodes";var s7=t_c;s7+=Z3N;s7+=U7V;s7+=L71;while(this[R0K][s7]){var z$=D0k;z$+=r63;z$+=Q29;this[c3V](this[z$]);}})[S2](val);}}});}var dataSource={create:function(fields,data){T6H.J_Y();if(data){var I$=C5Mnx.i36;I$+=b0l;var id=dataSource[D44][I$](this,data);try{if(_htmlId(id)[A56]){_htmlSet(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var y7L="less";var i9=t0H;i9+=E_v;i9+=y7L;var id=dataSource[D44][j0y](this,data) || i9;_htmlSet(id,fields,data);},fields:function(identifier){var S6=h7O;S6+=w4d;S6+=o7C;var out={};if(Array[r99](identifier)){for(var i=B$r,ien=identifier[A56];i < ien;i++){var C3=m1n;C3+=e7P;var res=dataSource[o9B][C3](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[j2w][o9B];if(!identifier){var Q$=D2e;Q$+=I8q;identifier=Q$;}$[f9H](fields,function(name,field){var p1i="Src";var f_=O2S;f_+=C5Mnx[574232];f_+=p1i;var val=_htmlGet(identifier,field[f_]());field[Z1o](data,val === d4j?undefined:val);});out[identifier]={data:data,fields:fields,idSrc:identifier,node:document,type:S6};return out;},id:function(data){var idFn=dataGet(this[j2w][e9L]);return idFn(data);},individual:function(identifier,fieldNames){var U3a='[data-editor-id]';var i4a='addBack';var G1N='data-editor-field';var S2V="nodeName";var a5a='editor-id';var f_3="eyles";var y8p="Self";var B2U="and";var T5x='Cannot automatically determine field name from data source';var W7=D0z;W7+=E_X;W7+=L71;var E2=D0z;E2+=C5Mnx[574232];E2+=s1f;var K$=C5Mnx[611221];K$+=M5u;K$+=C5Mnx[440425];K$+=j2w;var h$=C5Mnx.i36;h$+=C5Mnx[574232];h$+=e7P;h$+=e7P;var H_=Q_$;H_+=q$J;H_+=q89;var attachEl;if(identifier instanceof $ || identifier[S2V]){var z6=C5Mnx[440425];z6+=C5Mnx[574232];z6+=a1i;var O1=B2U;O1+=y8p;attachEl=identifier;if(!fieldNames){fieldNames=[$(identifier)[X5e](G1N)];}var back=$[C5Mnx.E0X][k4b]?i4a:O1;identifier=$(identifier)[K8O](U3a)[back]()[z6](a5a);}if(!identifier){var w9=D2e;w9+=f_3;w9+=j2w;identifier=w9;}if(fieldNames && !Array[r99](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[H_] === B$r){throw new Error(T5x);}var out=dataSource[o9B][h$](this,identifier);var fields=this[j2w][K$];var forceFields={};$[E2](fieldNames,function(i,name){forceFields[name]=fields[name];});$[W7](out,function(id,set){var g7=v4C;g7+=E3w;var f6=C5Mnx[574232];f6+=U7V;f6+=z3Y;f6+=E3w;var X4=C5Mnx.i36;X4+=D0z;X4+=e7P;X4+=e7P;set[F1c]=X4;set[f6]=[fieldNames];set[O_k]=attachEl?$(attachEl):_htmlEls(identifier,fieldNames)[e$D]();set[o9B]=fields;set[g7]=forceFields;});return out;},initField:function(cfg){var J0q="ta-editor-label=\"";var F1e="[da";var e2D="abel";var W2=e7P;W2+=C5Mnx[574232];W2+=P1R;W2+=e7P;var Q9=p0h;Q9+=V2K;var r6=N8F;r6+=C5Mnx.U3r;var q$=Y2S;q$+=U7V;q$+=C5Mnx[574232];var e4=F1e;e4+=J0q;var label=$(e4 + (cfg[q$] || cfg[r6]) + Q9);if(!cfg[W2] && label[A56]){var K0=e7P;K0+=e2D;cfg[K0]=label[i3e]();}},remove:function(identifier,fields){T6H.T5V();if(identifier !== X3W){_htmlId(identifier)[Q4$]();}}};var classNames={actions:{create:U1h,edit:G7d,remove:j4i},body:{content:o3P,wrapper:v1z},bubble:{bg:S62,close:N$,liner:q6,pointer:g4z,table:x0,wrapper:l5},field:{'disabled':m1,'error':H8u,'input':y$,'inputControl':O$,'label':m_,'msg-error':t7,'msg-info':i3Z,'msg-label':c1,'msg-message':r3r,'multiInfo':f5,'multiNoEdit':X52,'multiRestore':C8q,'multiValue':J1z,'namePrefix':R8,'processing':n4,'typePrefix':g$,'wrapper':V8},footer:{content:p1M,wrapper:m7},form:{button:U_,buttonInternal:L9w,buttons:J7m,content:Y4,error:s6S,info:n0P,tag:s93,wrapper:s8},header:{content:g2,title:{tag:d4j,class:s93},wrapper:A7d},inline:{buttons:R9I,liner:g8e,wrapper:H1},processing:{active:r56,indicator:b6O},wrapper:j9};var displayed$2=S0J;var cssBackgroundOpacity=f$8;var dom$1={background:$(H7i)[B$r],close:$(Z59)[B$r],content:d4j,wrapper:$(d6 + G5X + O1A + V6U)[B$r]};function findAttachRow(editor,attach){var k4c='head';var U4$="nod";var F8=Z$T;F8+=D0z;var s1=C5Mnx[611221];s1+=q$J;var dt=new $[s1][C5Mnx.h0r][b4z](editor[j2w][F8]);if(attach === k4c){var T6=Z$T;T6+=D0z;return dt[T6](undefined)[v$6]();;}else if(editor[j2w][d6C] === g2e){var X3=I8s;X3+=e7P;X3+=D0z;return dt[X3](undefined)[v$6]();}else {var k6=U4$;k6+=D0z;return dt[y8v](editor[j2w][p1P])[k6]();}}function heightCalc$1(dte){var G86="oute";var r0S="Heig";var f0E="eigh";var G7n="Height";var p2t="outer";var D_Z='div.DTE_Footer';var s$=G86;s$+=j6x;s$+=b2O;s$+=y7l;var T0=Y2B;T0+=Y6s;var t2=w0M;t2+=q$J;t2+=C5Mnx[611221];var i3=L71;i3+=f0E;i3+=U7V;var C8=p2t;C8+=r0S;C8+=L71;C8+=U7V;var r3=c1Z;r3+=K_g;r3+=h7O;r3+=G7n;var header=$(O7L,dom$1[N_r])[r3]();var footer=$(D_Z,dom$1[N_r])[C8]();var maxHeight=$(window)[i3]() - envelope[t2][j_B] * N3o - header - footer;$(R_h,dom$1[N_r])[w8E](a66,maxHeight);return $(dte[T0][N_r])[s$]();}function hide$2(dte,callback){T6H.J_Y();var m46="offsetHeight";if(!callback){callback=function(){};}if(displayed$2){var N1=C5Mnx.i36;N1+=w0I;N1+=C5Mnx.n6y;$(dom$1[N1])[C$x]({top:-(dom$1[n2i][m46] + b6j)},N4w,function(){var Z1x="ckg";var g7T='normal';T6H.T5V();var A1i="ade";var f$=C5Mnx[611221];f$+=A1i;f$+=G3d;f$+=y22;var L7=e7q;L7+=Z1x;L7+=P12;L7+=c0J;$([dom$1[N_r],dom$1[L7]])[f$](g7T,function(){var k5=C5Mnx[440425];k5+=D0z;k5+=a1i;k5+=s1f;T6H.J_Y();$(this)[k5]();callback();});});displayed$2=S0J;}}function init$1(){var m$V="pe_Con";var z9f="tainer";var j4O="ckground";var P3H="div.DTED_Envelo";var y9=C5Mnx.i36;y9+=j2w;y9+=j2w;var G5=e7q;G5+=j4O;var t3=u0I;t3+=t0U;var y3=P3H;y3+=m$V;y3+=z9f;dom$1[n2i]=$(y3,dom$1[t3])[B$r];cssBackgroundOpacity=$(dom$1[G5])[y9](N6B);}function show$2(dte,callback){var n35="tyle";var R_$="opacity";var u0J="kgrou";var S_a="click.DTED_Enve";var c4P="yle";var Z0$="opac";var v5D='resize.DTED_Envelope';var F_g="itle";var A7u="div.DTED_Li";var K5u="paci";var e0U="marginLeft";var a32="wrappe";var V1M='px';var h45="rap";var W$7="ick.DTED_En";var G8r='click.DTED_Envelope';var C7U="lope";var u3Z="cli";var F9s="oun";var T3$='0';var u$Y="rmal";var k5u="ED_Envelope";var C$E="au";var a$C="ghtbox_Content_Wr";var z5w="anim";var u1t="tHeight";var J$c="resize.DTED_Envelo";var I$F="k.DT";var U9O="velope";var d$J="bac";var a7r="backgr";var B0O="ity";var O9=J$c;O9+=d3c;var T5=D_3;T5+=C5Mnx[611221];var k8=u3Z;k8+=C5Mnx.i36;k8+=I$F;k8+=k5u;var W5=A7u;W5+=a$C;W5+=y9P;W5+=k2c;var u0=w4d;u0+=q$J;var M_=S_a;M_+=C7U;var L4=m3m;L4+=W$7;L4+=U9O;var Z2=w4d;Z2+=C5Mnx[611221];Z2+=C5Mnx[611221];var m$=C5Mnx.i36;m$+=b6v;m$+=D0z;var K1=s9Q;K1+=f9q;K1+=C5Mnx.u$S;K1+=q$J;var c8=U7V;c8+=F_g;var k1=C$E;k1+=Y7G;var R9=L71;R9+=b2O;R9+=y7l;var I4=C5Mnx.i36;I4+=w4d;I4+=w_i;I4+=C5Mnx.n6y;var v3=a$H;v3+=w4d;v3+=C5Mnx[440425];v3+=E_v;if(!callback){callback=function(){};}$(v3)[B4G](dom$1[n9O])[B4G](dom$1[N_r]);dom$1[I4][n7w][R9]=k1;if(!displayed$2){var Q1=z5w;Q1+=u2y;var x5=u3P;x5+=q$D;var A2=C5Mnx[611221];A2+=q6O;A2+=D0z;A2+=M0t;var E4=q$J;E4+=w4d;E4+=u$Y;var T4=r4K;T4+=Z2_;T4+=D0z;var P7=W75;P7+=e7P;P7+=x8a;var k7=j2w;k7+=U7V;k7+=c4P;var j6=d$J;j6+=u0J;j6+=Y54;var J$=w4d;J$+=K5u;J$+=U7V;J$+=E_v;var L6=e7q;L6+=k06;L6+=F9s;L6+=C5Mnx[440425];var h_=A5S;h_+=f8K;var z8=T2a;z8+=u1t;var G6=w4d;G6+=e7C;G6+=D0z;G6+=U7V;var q9=U7V;q9+=w4d;q9+=A5S;var V0=f5U;V0+=E_v;V0+=Q_$;var E5=A5S;E5+=f8K;var q4=o7C;q4+=h45;q4+=A5S;q4+=k2c;var Y8=A5S;Y8+=f8K;var a5=j2w;a5+=n35;var f0=c8h;f0+=Z7F;var j8=C5Mnx[574232];j8+=U7V;j8+=z3Y;var M3=k$o;M3+=J6X;M3+=M73;var p5=Z0$;p5+=B0O;var V2=j2w;V2+=n35;var x8=a32;x8+=h7O;var style=dom$1[x8][V2];style[p5]=T3$;style[M3]=c7l;var height=heightCalc$1(dte);var targetRow=findAttachRow(dte,envelope[j1H][j8]);var width=targetRow[i6M];style[v4C]=f0;style[R_$]=i_4;dom$1[N_r][a5][M97]=width + Y8;dom$1[q4][n7w][e0U]=-(width / N3o) + E5;dom$1[N_r][V0][q9]=$(targetRow)[G6]()[V88] + targetRow[z8] + h_;dom$1[n2i][n7w][V88]=-f$8 * height - A9m + V1M;dom$1[L6][n7w][J$]=T3$;dom$1[j6][k7][P7]=c7l;$(dom$1[n9O])[T4]({opacity:cssBackgroundOpacity},E4);$(dom$1[N_r])[A2]();$(dom$1[x5])[Q1]({top:B$r},N4w,callback);}$(dom$1[L0k])[X5e](c8,dte[K1][m$])[Z2](L4)[C9S](G8r,function(e){var F3=C5Mnx.i36;F3+=e7P;F3+=w4d;T6H.J_Y();F3+=K4m;dte[F3]();});$(dom$1[n9O])[v_e](M_)[u0](G8r,function(e){var R6=a7r;R6+=c1Z;T6H.J_Y();R6+=Y54;dte[R6]();});$(W5,dom$1[N_r])[v_e](G8r)[C9S](k8,function(e){var t0j='DTED_Envelope_Content_Wrapper';var l2T="asCl";var L7F="rge";var P8=L71;P8+=l2T;T6H.T5V();P8+=v4S;P8+=j2w;var I9=U7V;I9+=C5Mnx[574232];I9+=L7F;I9+=U7V;if($(e[I9])[P8](t0j)){var D2=a7r;D2+=v5e;dte[D2]();}});$(window)[T5](v5D)[C9S](O9,function(){T6H.T5V();heightCalc$1(dte);});displayed$2=P4T;}var envelope={close:function(dte,callback){T6H.J_Y();hide$2(dte,callback);},conf:{attach:Q$w,windowPadding:b6j},destroy:function(dte){hide$2();},init:function(dte){init$1();return envelope;},node:function(dte){T6H.J_Y();return dom$1[N_r][B$r];},open:function(dte,append,callback){var z57="pendCh";var L54="ldre";var z7T="Chi";var f1=R73;f1+=z57;f1+=k72;var t6=B4G;t6+=z7T;t6+=e7P;t6+=C5Mnx[440425];var S4=s1f;S4+=s9Q;S4+=L54;S4+=q$J;var Z9=w0M;Z9+=q$J;Z9+=b8g;$(dom$1[Z9])[S4]()[H67]();dom$1[n2i][t6](append);dom$1[n2i][f1](dom$1[L0k]);show$2(dte,callback);}};function isMobile(){var z4a="rWidth";var H1B="ute";T6H.J_Y();var k3y=576;var c2a="orientation";var z9=w4d;z9+=H1B;z9+=z4a;return typeof window[c2a] !== C5Mnx.W2u && window[z9] <= k3y?P4T:S0J;}var displayed$1=S0J;var ready=S0J;var scrollTop=B$r;var dom={background:$(G_),close:$(I_X),content:d4j,wrapper:$(a2 + T8 + o4 + e_7 + V6U + V6U + G7 + V6U)};function heightCalc(){var W$F='px)';var t6w="max";var s_a="div.DTE_Foo";var u_h="Content";var x7a="rapp";var E4$='calc(100vh - ';var B4T="div.DTE_";T6H.T5V();var B1_="Body_";var H6m="height";var Z9m="outerHeight";var P5=D7p;P5+=h1Z;var T3=o7C;T3+=x7a;T3+=D0z;T3+=h7O;var g8=s_a;g8+=K_g;g8+=h7O;var headerFooter=$(O7L,dom[N_r])[Z9m]() + $(g8,dom[T3])[P5]();if(isMobile()){var G0=B4T;G0+=B1_;G0+=u_h;$(G0,dom[N_r])[w8E](a66,E4$ + headerFooter + W$F);}else {var Z5=t6w;Z5+=G2t;Z5+=I0q;var J_=C5Mnx.i36;J_+=j2w;J_+=j2w;var maxHeight=$(window)[H6m]() - self[j1H][j_B] * N3o - headerFooter;$(R_h,dom[N_r])[J_](Z5,maxHeight);}}function hide$1(dte,callback){var h8D="imate";var p9n="_an";var j7r=".DTED_Lightbox";var Q4_="offset";var A_q="ni";var t5n="resize";var w1=t5n;w1+=j7r;var e3=w4d;e3+=C5Mnx[611221];e3+=C5Mnx[611221];var F7=e7q;F7+=k06;F7+=v5e;var a4=Q4_;a4+=y_O;a4+=A_q;var u8=C5Mnx.i36;u8+=w4d;u8+=q$J;u8+=C5Mnx[611221];var z2=p9n;z2+=h8D;if(!callback){callback=function(){};}T6H.T5V();$(U5H)[j0f](scrollTop);dte[z2](dom[N_r],{opacity:B$r,top:self[u8][a4]},function(){$(this)[H67]();callback();});dte[A4d](dom[F7],{opacity:B$r},function(){$(this)[H67]();});displayed$1=S0J;$(window)[e3](w1);}function init(){var l1d='div.DTED_Lightbox_Content';var m48="opacit";var K4=m48;K4+=E_v;var k_=C5Mnx.i36;k_+=j2w;k_+=j2w;var U6=u0I;U6+=A5S;U6+=d3c;U6+=h7O;if(ready){return;}dom[n2i]=$(l1d,dom[N_r]);dom[U6][w8E](N6B,B$r);dom[n9O][k_](K4,B$r);ready=P4T;}function show$1(dte,callback){var L8X="ightbox";var K7p='DTED_Lightbox_Mobile';var v1D=".DTED_Lig";var o7i="lick.DTED";var v1$='div.DTED_Lightbox_Content_Wrapper';var T1W="nf";var i50="tAni";var x$1="gr";var k1N="back";var f62='click.DTED_Lightbox';var j2O="htbox";var o$X='auto';var N_b='height';var V3g="click.DTED_L";var t$=w4d;t$+=q$J;var r1=o7C;r1+=h7O;r1+=y9P;r1+=k2c;var h9=V3g;h9+=L8X;var G$=w4d;G$+=q$J;T6H.T5V();var S1=C5Mnx.i36;S1+=o7i;S1+=h9y;var y0=s9Q;y0+=W7Z;y0+=q$J;var W_=h90;W_+=Q_$;var B6=C5Mnx[574232];B6+=U7V;B6+=p9i;if(isMobile()){var k9=a$H;k9+=w4d;k9+=C5Mnx[440425];k9+=E_v;$(k9)[A5Z](K7p);}$(U5H)[B4G](dom[n9O])[B4G](dom[N_r]);heightCalc();if(!displayed$1){var B_=l8p;B_+=m7l;B_+=v1D;B_+=j2O;var b0=w4d;b0+=q$J;var b1=k1N;b1+=x$1;b1+=c1Z;b1+=Y54;var l8=T2a;l8+=i50;var M$=C5Mnx.i36;M$+=w4d;M$+=T1W;var R7=o7C;R7+=L9a;R7+=u1d;R7+=k2c;displayed$1=P4T;dom[n2i][w8E](N_b,o$X);dom[R7][w8E]({top:-self[M$][l8]});dte[A4d](dom[N_r],{opacity:f$8,top:B$r},callback);dte[A4d](dom[b1],{opacity:f$8});$(window)[b0](B_,function(){heightCalc();});scrollTop=$(U5H)[j0f]();}dom[L0k][B6](W_,dte[y0][L0k])[v_e](S1)[G$](f62,function(e){var L7l="clos";var N4=L7l;N4+=D0z;T6H.J_Y();dte[N4]();});dom[n9O][v_e](h9)[C9S](f62,function(e){var Z2X="stopImmediatePropagat";var k7V="backgrou";var j0=k7V;j0+=Y54;var o9=Z2X;o9+=o9f;T6H.T5V();e[o9]();dte[j0]();});$(v1$,dom[r1])[v_e](f62)[t$](f62,function(e){var G0N="ation";var x5f="DTED_Lightbox_Content_";var H5Z="stopImm";var N8U="rg";var w6Z="ediateProp";var o$R="Wrapper";var n8=x5f;n8+=o$R;var m8=J8F;T6H.J_Y();m8+=J$X;var z4=U7V;z4+=C5Mnx[574232];z4+=N8U;z4+=S$C;if($(e[z4])[m8](n8)){var r$=H5Z;r$+=w6Z;r$+=n0k;r$+=G0N;e[r$]();dte[n9O]();}});}var self={close:function(dte,callback){hide$1(dte,callback);},conf:{offsetAni:M30,windowPadding:M30},destroy:function(dte){if(displayed$1){hide$1(dte);}},init:function(dte){init();return self;},node:function(dte){T6H.J_Y();return dom[N_r][B$r];},open:function(dte,append,callback){var Y1=C5Mnx.i36;Y1+=u2p;Y1+=A9f;Y1+=C8D;var content=dom[n2i];T6H.T5V();content[Y1]()[H67]();content[B4G](append)[B4G](dom[L0k]);show$1(dte,callback);}};var DataTable$5=$[C5Mnx.E0X][C5Mnx.h0r];function add(cfg,after,reorder){var R8R='\'. A field already exists with this name';var n7e="rd";var Q04="ing field \'";var M6U="or add";var L4i="rse";var s$8="reve";var a2k='Error adding field. The field requires a `name` option';var p_P="dd";var V$6="Fie";var T6r="tFi";var L1b="tiRese";var b_=Y6s;b_+=w4d;b_+=C5Mnx[440425];b_+=D0z;var I3=f82;I3+=D0z;I3+=j2w;var u2=j6g;u2+=s9Q;T6H.T5V();u2+=z7r;var X$=b8f;X$+=Q5O;X$+=V$6;X$+=Q29;var j1=b9s;j1+=a7$;j1+=w4d;j1+=U7G;var j_=N8F;j_+=C5Mnx.U3r;if(reorder === void B$r){reorder=P4T;}if(Array[r99](cfg)){var D9=w4d;D9+=n7e;D9+=k2c;var Z4=e7P;Z4+=C8D;Z4+=Z3N;Z4+=i_g;if(after !== undefined){var A5=s$8;A5+=L4i;cfg[A5]();}for(var _i=B$r,cfg_1=cfg;_i < cfg_1[Z4];_i++){var h2=C5Mnx[574232];h2+=p_P;var cfgDp=cfg_1[_i];this[h2](cfgDp,after,S0J);}this[J9J](this[D9]());return this;}var name=cfg[j_];if(name === undefined){throw new Error(a2k);}if(this[j2w][o9B][name]){var O6=E2g;O6+=M6U;O6+=Q04;throw new Error(O6 + name + R8R);}this[j1](X$,cfg);var editorField=new Editor[u2](cfg,this[I3][e$p],this);if(this[j2w][b_]){var M5=P6M;M5+=e7P;M5+=L1b;M5+=U7V;var X_=x_i;X_+=T6r;X_+=q_c;X_+=x4N;var editFields=this[j2w][X_];editorField[M5]();$[f9H](editFields,function(idSrc,editIn){var f68="romD";var D4=C5Mnx[440425];D4+=D0z;D4+=C5Mnx[611221];var p2=Y6s;p2+=k93;T6H.T5V();p2+=E6Y;p2+=o$C;var v6=C5Mnx[440425];v6+=C5Mnx[574232];v6+=a1i;var value;if(editIn[v6]){var b3=Y2S;b3+=a1i;var N7=Z_p;N7+=j6g;N7+=f68;N7+=e00;value=editorField[N7](editIn[b3]);}editorField[p2](idSrc,value !== undefined?value:editorField[D4]());});}this[j2w][o9B][name]=editorField;if(after === undefined){var k$=A5S;k$+=h$L;k$+=L71;var p8=w4d;p8+=h7O;p8+=C5Mnx[440425];p8+=k2c;this[j2w][p8][k$](name);}else if(after === d4j){this[j2w][t8W][m6E](name);}else {var M0=X8f;M0+=V0H;var idx=$[k0v](after,this[j2w][t8W]);this[j2w][M0][k8V](idx + f$8,B$r,name);}if(reorder !== S0J){this[J9J](this[t8W]());}return this;}function ajax(newAjax){var Q0=C5Mnx[574232];Q0+=u1J;if(newAjax){this[j2w][X0m]=newAjax;return this;}return this[j2w][Q0];}function background(){var G8p="onB";T6H.J_Y();var L3P="ackgr";var Y3k='blur';var o0h="ubm";var L_=j2w;L_+=O0h;L_+=D0W;var X9=C5Mnx.i36;X9+=e7P;X9+=R8Z;X9+=D0z;var n1=G8p;n1+=L3P;n1+=w4d;n1+=c0J;var onBackground=this[j2w][L5q][n1];if(typeof onBackground === C5Mnx[604463]){onBackground(this);}else if(onBackground === Y3k){var o_=a$H;o_+=e7P;o_+=k93;o_+=h7O;this[o_]();}else if(onBackground === X9){this[L0k]();}else if(onBackground === L_){var g6=j2w;g6+=o0h;g6+=Q5O;this[g6]();}return this;}function blur(){var A8=s$x;A8+=a$H;A8+=G7O;this[A8]();return this;}function bubble(cells,fieldNames,showIn,opts){var l59="inOb";var T7t="bb";var n6g="isPla";var q_h='individual';var K7$="ataSource";var Z$n="Objec";var l7=F7L;l7+=K7$;var P9=r4z;P9+=T7t;P9+=Q_$;var n6=n6g;n6+=b8f;n6+=Z$n;n6+=U7V;var p1=n6g;p1+=l59;p1+=C_r;var c_=s$x;c_+=t6O;c_+=m5$;var _this=this;if(showIn === void B$r){showIn=P4T;}var that=this;if(this[c_](function(){that[N2U](cells,fieldNames,opts);})){return this;}if($[p1](fieldNames)){opts=fieldNames;fieldNames=undefined;showIn=P4T;}else if(typeof fieldNames === w4W){showIn=fieldNames;fieldNames=undefined;opts=undefined;}if($[n6](showIn)){opts=showIn;showIn=P4T;}if(showIn === undefined){showIn=P4T;}opts=$[q5Y]({},this[j2w][r9G][P9],opts);var editFields=this[l7](q_h,cells,fieldNames);this[s4d](cells,editFields,Y_x,opts,function(){var K8l=" s";var L_i="ncat";var v9$='" title="';var R9k="bbl";var I$r="bg";var i93="bleP";var a0y="child";var d9J="_ani";var I0L="<div ";var d5h='resize.';var J4M="_form";var q2v='<div class="DTE_Processing_Indicator"><span></div>';var J3g="mInf";var A7Q="ass=\"";var c$7="oll";var d99="ndT";var v3O="\"><div></div></d";var r18="osition";var l8e="inter";var P5d="ubble";var D8G="Optio";var A6k="loseReg";var M_n="rmErr";var A_y="v class=";var e9N="ttons";var G3v="<d";var U5=d9J;U5+=z5s;U5+=K_g;var S7=a$H;S7+=k93;S7+=R9k;S7+=D0z;var a1=a$H;a1+=O0h;a1+=i93;a1+=r18;var A1=w4d;A1+=q$J;var W9=E7J;W9+=A6k;var U9=a$H;U9+=k93;U9+=e9N;var Z6=S0Z;Z6+=g6T;var s6=C5Mnx[440425];s6+=A8P;var w$=S0Z;w$+=M_n;w$+=X8f;var b6=R73;b6+=A5S;b6+=C8D;b6+=C5Mnx[440425];var C6=a0y;C6+=h7O;C6+=C8D;var U7=D0z;U7+=Y2j;var H2=I8Z;H2+=l8e;var X5=I0L;X5+=m3m;X5+=A7Q;var p7=s3F;p7+=k$o;p7+=o1v;p7+=y37;var d5=h1F;d5+=C5Mnx.u$S;d5+=q$J;var g1=C5Mnx.i36;g1+=e7P;g1+=R8Z;g1+=D0z;var r8=G3v;r8+=s9Q;r8+=A_y;r8+=p0h;var d2=p0h;d2+=y37;var v0=a1i;v0+=q91;var O8=e7P;O8+=J$P;O8+=h7O;var J2=p0h;J2+=y37;var q3=v3O;q3+=s9Q;q3+=w5z;var Q2=a$H;Q2+=O0h;Q2+=q91;var A9=H3u;A9+=q64;var u9=w0M;u9+=L_i;var h1=K8l;h1+=Q5g;h1+=c$7;h1+=Z8q;var E8=w4d;E8+=q$J;var w3=a$H;w3+=P5d;var v2=J4M;v2+=D8G;v2+=X3t;var namespace=_this[v2](opts);var ret=_this[I2E](w3);if(!ret){return _this;}$(window)[E8](d5h + namespace + h1 + namespace,function(){var T13="ubblePos";var Q_=a$H;T6H.J_Y();Q_+=T13;Q_+=Q5O;Q_+=o9f;_this[Q_]();});var nodes=[];_this[j2w][s_K]=nodes[u9][B3g](nodes,pluck(editFields,A9));var classes=_this[O2I][Q2];var backgroundNode=$(P2B + classes[I$r] + q3);var container=$(P2B + classes[N_r] + J2 + P2B + classes[O8] + K2e + P2B + classes[v0] + d2 + r8 + classes[g1] + v9$ + _this[d5][L0k] + q15 + q2v + p7 + V6U + X5 + classes[H2] + q15 + V6U);if(showIn){var M2=y9P;M2+=D0z;M2+=d99;M2+=w4d;container[M2](U5H);backgroundNode[T41](U5H);}var liner=container[G2s]()[U7](B$r);var tableNode=liner[C6]();var closeNode=tableNode[G2s]();liner[b6](_this[w3d][w$]);tableNode[W9l](_this[s6][Z6]);if(opts[C9J]){var K_=S0Z;K_+=h7O;K_+=J3g;K_+=w4d;var N2=C5Mnx[440425];N2+=w4d;N2+=Y6s;liner[W9l](_this[N2][K_]);}if(opts[t5E]){liner[W9l](_this[w3d][v$6]);}if(opts[U9]){var B5=Y2B;B5+=Y6s;tableNode[B4G](_this[B5][b_U]);}var finish=function(){var T$o="_cle";var q9C="bub";var m2E="arDynamic";var h8=q9C;h8+=a$H;h8+=Q_$;var u_=C5Mnx.i36;u_+=q1W;u_+=K4m;T6H.T5V();u_+=C5Mnx[440425];var D1=p5f;D1+=C8D;D1+=U7V;var S_=T$o;S_+=m2E;S_+=B0b;_this[S_]();_this[D1](u_,[h8]);};var pair=$()[X$I](container)[X$I](backgroundNode);_this[W9](function(submitComplete){var p7C="nimate";var y2=x1g;y2+=p7C;_this[y2](pair,{opacity:B$r},function(){var S_7=' scroll.';if(this === container[B$r]){var H3=h7O;H3+=D0z;H3+=m7l;H3+=Z8q;pair[H67]();$(window)[v_e](H3 + namespace + S_7 + namespace);finish();}});});backgroundNode[A1](g7m,function(){var v$=a$H;v$+=G7O;_this[v$]();});closeNode[C9S](g7m,function(){var x7=z6v;x7+=w4d;x7+=j2w;x7+=D0z;_this[x7]();});_this[a1]();_this[y$3](S7,S0J);T6H.J_Y();var opened=function(){var u4=a$H;T6H.T5V();u4+=k93;u4+=T7t;u4+=Q_$;var V5=p5f;V5+=q$D;var g5=C5Mnx[611221];g5+=C5Mnx.V1a;g5+=j2w;_this[e6_](_this[j2w][k22],opts[g5]);_this[V5](B1w,[u4,_this[j2w][d6C]]);};_this[U5](pair,{opacity:f$8},function(){if(this === container[B$r]){opened();}});});return this;}function bubblePosition(){var c54="right";var G3l='top';var o6B="low";var C6e='div.DTE_Bubble';var T5b="bubbleBottom";var u9N="Bottom";var L0d="leBottom";var r7F="bottom";var C0C="dClass";var b6V='left';var A0i="siti";var w5X="nne";var u3g="righ";var g1X="outerWidth";var z8n="iv.DTE_Bubble_Liner";var S5t="lef";var t4=U7V;t4+=g4S;var z_=s9Q;z_+=w5X;z_+=j6x;z_+=I0q;var q0=A5S;q0+=w4d;q0+=A0i;q0+=C9S;var B7=a$H;B7+=k93;B7+=k0h;B7+=u9N;T6H.J_Y();var j5=o7C;j5+=D44;j5+=U7V;j5+=L71;var f7=D7p;f7+=h1Z;var H5=S5t;H5+=U7V;var v9=Q_$;v9+=q$J;v9+=q89;var V3=u3g;V3+=U7V;var d3=e7P;d3+=D0z;d3+=C5Mnx[611221];d3+=U7V;var n7=U7V;n7+=w4d;n7+=A5S;var w8=k2T;w8+=C5Mnx.i36;w8+=L71;var c$=C5Mnx[440425];c$+=z8n;var wrapper=$(C6e);var liner=$(c$);var nodes=this[j2w][s_K];var position={bottom:B$r,left:B$r,right:B$r,top:B$r};$[w8](nodes,function(i,nodeIn){var A78="tom";var O3O="offsetHei";var U83="left";var i8=O3O;i8+=y7l;var W6=Y7G;W6+=A5S;var y4=a$H;y4+=v_R;y4+=A78;var n9=e7P;n9+=D0z;n9+=C5Mnx[611221];n9+=U7V;var f3=Y7G;f3+=A5S;var Z$=w4d;Z$+=e7C;Z$+=D0z;Z$+=U7V;var pos=$(nodeIn)[Z$]();nodeIn=$(nodeIn)[C29](B$r);position[f3]+=pos[V88];position[U83]+=pos[U83];position[c54]+=pos[n9] + nodeIn[i6M];position[y4]+=pos[W6] + nodeIn[i8];});position[n7]/=nodes[A56];position[d3]/=nodes[A56];position[V3]/=nodes[v9];position[r7F]/=nodes[A56];var top=position[V88];var left=(position[H5] + position[c54]) / N3o;var width=liner[g1X]();var height=liner[f7]();var visLeft=left - width / N3o;var visRight=visLeft + width;var docWidth=$(window)[j5]();var viewportTop=$(window)[j0f]();var padding=i0h;wrapper[w8E]({left:left,top:this[j2w][B7]?position[r7F]:top});if(this[j2w][T5b]){var d_=a$H;d_+=D0z;d_+=q1W;d_+=o7C;var a9=q6O;a9+=C0C;wrapper[a9](d_);}var curPosition=wrapper[q0]();if(liner[A56] && curPosition[V88] + height > viewportTop + window[z_]){var J3=P1R;J3+=o6B;var p0=C5Mnx.i36;p0+=j2w;p0+=j2w;wrapper[p0](G3l,top)[h3P](J3);this[j2w][T5b]=S0J;}else if(liner[A56] && curPosition[t4] - height < viewportTop){var I6=a$H;I6+=O0h;I6+=a$H;I6+=L0d;var f9=a$H;f9+=D0z;f9+=o6B;var I1=C5Mnx.i36;I1+=j2w;I1+=j2w;wrapper[I1](G3l,position[r7F])[A5Z](f9);this[j2w][I6]=P4T;}if(visRight + padding > docWidth){var diff=visRight - docWidth;liner[w8E](b6V,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var o8=C5Mnx.i36;o8+=j2w;o8+=j2w;liner[o8](b6V,visLeft < padding?-(visLeft - padding):B$r);}return this;}function buttons(buttonsIn){var E7=D0z;E7+=Y6s;E7+=A5S;E7+=z60;var r7=a$H;r7+=y22;r7+=Y7G;r7+=X3t;var j2=C5Mnx[440425];j2+=w4d;j2+=Y6s;var _this=this;if(buttonsIn === I9w){var k4=s_Z;k4+=Y6s;k4+=s9Q;k4+=U7V;buttonsIn=[{action:function(){var v_=j2w;T6H.T5V();v_+=Q$z;v_+=U7V;this[v_]();},text:this[u9Q][this[j2w][d6C]][k4]}];}else if(!Array[r99](buttonsIn)){buttonsIn=[buttonsIn];}$(this[j2][r7])[E7]();$[f9H](buttonsIn,function(i,btn){var C5m="sNa";var J$h="dex";var B$0="uttons";var n9f='keyup';var K9V='keypress';var m7Z="tabIndex";var F8F="></button>";var v8E="abind";var E$a="cti";var S8w="sName";var C7=a$H;C7+=B$0;var y1=m3m;y1+=C4R;var e9=w4d;e9+=q$J;var o5=w4d;o5+=q$J;var O4=w4d;O4+=q$J;var K2=I$e;K2+=U7V;K2+=h7O;var V1=U7V;V1+=v1w;V1+=M0t;V1+=J$h;var G8=U7V;G8+=v8E;G8+=X4F;var J6=C5Mnx[574232];J6+=U7V;J6+=p9i;var q5=S6b;q5+=U7V;q5+=F9f;q5+=q$J;var a6=L71;a6+=U7V;a6+=Y6s;a6+=e7P;var F2=C5Mnx.i36;F2+=N5U;F2+=C5m;F2+=C5Mnx.U3r;var T1=M$I;T1+=S8w;var n3=f82;n3+=O2f;var l2=k7Y;l2+=a$H;l2+=T4$;l2+=F8F;var s2=C5Mnx[574232];s2+=P06;var e1=C5Mnx[611221];e1+=q$J;var B$=C5Mnx[574232];B$+=E$a;B$+=C9S;if(typeof btn === Z4A){btn={action:function(){this[q0I]();},text:btn};}var text=btn[K55] || btn[n13];var action=btn[B$] || btn[e1];var attr=btn[s2] || ({});$(l2,{class:_this[n3][z6_][f7o] + (btn[T1]?e5L + btn[F2]:s93)})[a6](typeof text === q5?text(_this):text || s93)[J6](G8,btn[m7Z] !== undefined?btn[V1]:B$r)[K2](attr)[O4](n9f,function(e){var Y5=H21;Y5+=s9Q;Y5+=C5Mnx.i36;Y5+=L71;if(e[Y5] === g3h && action){action[j0y](_this);}})[o5](K9V,function(e){var P0l="whi";var f_W="rev";var z$X="entD";T6H.T5V();var G2=P0l;G2+=s1f;if(e[G2] === g3h){var x9=A5S;x9+=f_W;x9+=z$X;x9+=V73;e[x9]();}})[e9](y1,function(e){var P_M="entDef";T6H.J_Y();var Y6=Y7v;Y6+=P_M;Y6+=D5d;e[Y6]();if(action){var w2=m1n;w2+=e7P;action[w2](_this,e);}})[T41](_this[w3d][C7]);});return this;}function clear(fieldName){var a_B="dest";var N6E="eldNa";var h6S="cludeFields";var m9I="spli";var d4M="rder";var G4=c5j;G4+=P4f;var e$=d9a;e$+=e7P;T6H.J_Y();e$+=x4N;var that=this;var sFields=this[j2w][e$];if(typeof fieldName === G4){var i0=R6e;i0+=A93;var W4=m9I;W4+=W_8;var L$=w4d;L$+=d4M;var S9=w4d;S9+=h7O;S9+=C5Mnx[440425];S9+=k2c;var A$=a_B;A$+=h7O;A$+=w4d;A$+=E_v;that[e$p](fieldName)[A$]();delete sFields[fieldName];var orderIdx=$[k0v](fieldName,this[j2w][S9]);this[j2w][L$][W4](orderIdx,f$8);var includeIdx=$[i0](fieldName,this[j2w][k22]);if(includeIdx !== -f$8){var Q5=b8f;Q5+=h6S;this[j2w][Q5][k8V](includeIdx,f$8);}}else {var m5=n1L;m5+=N6E;m5+=v$U;$[f9H](this[m5](fieldName),function(i,name){that[d5R](name);});}return this;}function close(){var l3=s$x;l3+=m3m;l3+=R8Z;l3+=D0z;this[l3](S0J);return this;}function create(arg1,arg2,arg3,arg4){var d4E="_displ";var U8u="gs";var p3T="lock";var V4A='initCreate';var k78="mber";var z0l="_cr";var m0g="isplay";var W9o="actionC";var N9=D0z;N9+=q64;var o7=d4E;o7+=x8a;T6H.J_Y();o7+=T69;o7+=t8W;var A3=s$x;A3+=W9o;A3+=e5s;var x4=a$H;x4+=p3T;var o3=C5Mnx[440425];o3+=m0g;var x_=j2w;x_+=U7V;x_+=E_v;x_+=Q_$;var D6=S0Z;D6+=g6T;var F0=C5Mnx[440425];F0+=w4d;F0+=Y6s;var F$=C5Mnx[574232];F$+=C5Mnx.i36;F$+=s2C;var U4=z0l;U4+=d95;U4+=J86;U4+=U8u;var t1=y5c;t1+=k78;var b$=n_8;b$+=q_c;b$+=x4N;var _this=this;var that=this;var sFields=this[j2w][b$];var count=f$8;if(this[F0a](function(){var Z7s="eate";var J1=Q5g;J1+=Z7s;that[J1](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === t1){count=arg1;arg1=arg2;arg2=arg3;}this[j2w][X9T]={};for(var i=B$r;i < count;i++){this[j2w][X9T][i]={fields:this[j2w][o9B]};}var argOpts=this[U4](arg1,arg2,arg3,arg4);this[j2w][Z22]=j8$;this[j2w][F$]=g2e;this[j2w][p1P]=d4j;this[F0][D6][x_][o3]=x4;this[A3]();this[o7](this[o9B]());$[N9](sFields,function(name,fieldIn){var S1j="ef";var m5p="Reset";var c0=C5Mnx[440425];c0+=S1j;var R4=Y6s;R4+=P$v;R4+=s9Q;R4+=m5p;fieldIn[R4]();for(var i=B$r;i < count;i++){fieldIn[g1I](i,fieldIn[P$l]());}fieldIn[C7p](fieldIn[c0]());});this[K0R](V4A,d4j,function(){var R$a="ormOptions";var J7I="ssembleMain";var C5=w4d;C5+=A5S;C5+=U7V;C5+=j2w;var V$=S1u;V$+=R$a;var m2=s$x;m2+=C5Mnx[574232];m2+=J7I;_this[m2]();_this[V$](argOpts[C5]);argOpts[t98]();});return this;}function undependent(parent){var m9a="endent";var Y5c='.edep';var R_=w4d;R_+=C3R;var G1=q$J;G1+=w4d;T6H.T5V();G1+=C5Mnx[440425];G1+=D0z;var w5=n_8;w5+=z7r;var V7=L81;V7+=J86;V7+=h7O;V7+=x8a;if(Array[V7](parent)){for(var i=B$r,ien=parent[A56];i < ien;i++){var V4=c6G;V4+=i_o;V4+=A5S;V4+=m9a;this[V4](parent[i]);}return this;}$(this[w5](parent)[G1]())[R_](Y5c);return this;}function dependent(parent,url,optsIn){var X$v="enden";var t35="dep";var d1P=".ed";var x2X="ep";T6H.J_Y();var Z_=d1P;Z_+=x2X;var w0=y8x;w0+=D0z;w0+=q$J;w0+=U7V;var _this=this;if(Array[r99](parent)){for(var i=B$r,ien=parent[A56];i < ien;i++){var H4=t35;H4+=X$v;H4+=U7V;this[H4](parent[i],url,optsIn);}return this;}var that=this;var parentField=this[e$p](parent);var ajaxOpts={dataType:e9m,type:f_F};var opts=$[q5Y]({},{data:d4j,event:H5K,postUpdate:d4j,preUpdate:d4j},optsIn);var update=function(json){var f7f='message';var m3c="eUpda";var R8F="postUpdate";var r2i="preUpdate";var z2P='hide';var p1T="Up";var H4B="post";var g9L='val';var U$V="nable";var K7R='error';var S8=Z$s;S8+=P4X;var A4=H4B;A4+=p1T;A4+=m4v;var D3=D0z;D3+=U$V;var g0=j2w;g0+=g3u;g0+=o7C;var i2=s79;i2+=L71;var m0=c5M;m0+=m4v;var c2=L$N;c2+=D0z;c2+=e7P;var s3=D0z;s3+=C5Mnx[574232];s3+=C5Mnx.i36;s3+=L71;if(opts[r2i]){var K6=s1y;K6+=m3c;K6+=K_g;opts[K6](json);}$[s3]({errors:K7R,labels:c2,messages:f7f,options:m0,values:g9L},function(jsonProp,fieldFn){if(json[jsonProp]){var I5=D0z;I5+=q64;$[I5](json[jsonProp],function(fieldIn,valIn){T6H.T5V();that[e$p](fieldIn)[fieldFn](valIn);});}});$[i2]([z2P,g0,D3,v4z],function(i,key){T6H.J_Y();if(json[key]){var K8=O_e;K8+=Y6s;K8+=C5Mnx[574232];K8+=K_g;that[key](json[key],json[K8]);}});if(opts[A4]){opts[R8F](json);}parentField[S8](S0J);};$(parentField[J1r]())[C9S](opts[w0] + Z_,function(e){var A6L="obje";T6H.J_Y();var d4q="values";var e8F="then";var l_X="isPl";var E2C="Obj";var I05="arg";var c$B="the";var a7=N86;a7+=o9f;var P_=o1v;P_+=C5Mnx[574232];P_+=e7P;var p9=h7O;p9+=I38;p9+=j2w;var Q4=h7O;Q4+=w4d;Q4+=o7C;Q4+=j2w;var d4=h7O;d4+=w4d;d4+=o7C;var y6=t_c;y6+=Z3N;y6+=i_g;var b9=U7V;b9+=I05;b9+=S$C;var w_=c8h;w_+=C5Mnx[440425];w_+=D0z;if($(parentField[w_]())[C21](e[b9])[y6] === B$r){return;}parentField[P_s](P4T);var data={};data[M7H]=_this[j2w][X9T]?pluck(_this[j2w][X9T],n5U):d4j;data[d4]=data[Q4]?data[p9][B$r]:d4j;data[d4q]=_this[P_]();if(opts[z3B]){var ret=opts[z3B](data);if(ret){data=ret;}}if(typeof url === a7){var H$=Y0b;H$+=e7P;var o=url[j0y](_this,parentField[H$](),data,update,e);if(o){var b4=C5Mnx[611221];b4+=c6G;b4+=C5Mnx.i36;b4+=s2C;var G3=c$B;G3+=q$J;var d8=A6L;d8+=l$H;if(typeof o === d8 && typeof o[G3] === b4){o[e8F](function(resolved){T6H.J_Y();if(resolved){update(resolved);}});}else {update(o);}}}else {var F5=j7N;F5+=A$a;var d$=l_X;d$+=x8m;d$+=E2C;d$+=w4G;if($[d$](url)){$[q5Y](ajaxOpts,url);}else {ajaxOpts[O$C]=url;}$[F5]($[q5Y](ajaxOpts,{data:data,success:update}));}});return this;}function destroy(){var i1W="tro";var Y1z=".d";var o6M="appen";var L8Q="emp";var E$=Y2B;E$+=Y6s;var x6=Y1z;x6+=K_g;var J5=w4d;J5+=C5Mnx[611221];J5+=C5Mnx[611221];var b2=i_o;b2+=j2w;b2+=i1W;b2+=E_v;var l1=U7V;l1+=L8Q;l1+=O40;l1+=D0z;if(this[j2w][Q1t]){var l6=C5Mnx.i36;l6+=e7P;l6+=R8Z;l6+=D0z;this[l6]();}this[d5R]();if(this[j2w][l1]){var T$=T2d;T$+=A5S;T$+=K5Z;var m6=o6M;m6+=C5Mnx[440425];$(U5H)[m6](this[j2w][T$]);}var controller=this[j2w][z3X];if(controller[b2]){controller[X54](this);}$(document)[J5](x6 + this[j2w][W9C]);this[E$]=d4j;this[j2w]=d4j;}function disable(name){var U9w="ieldNa";var H6R=S1u;H6R+=U9w;H6R+=v$U;var f8=D0z;f8+=E_X;f8+=L71;var that=this;$[f8](this[H6R](name),function(i,n){that[e$p](n)[D6H]();});return this;}function display(showIn){var g_O=C5Mnx.i36;g_O+=P5E;if(showIn === undefined){return this[j2w][Q1t];}return this[showIn?L7w:g_O]();}function displayed(){var v0w=C5Mnx[611221];v0w+=r$N;return $[w2q](this[j2w][v0w],function(fieldIn,name){T6H.J_Y();return fieldIn[Q1t]()?name:d4j;});}function displayNode(){return this[j2w][z3X][J1r](this);}function edit(items,arg1,arg2,arg3,arg4){var V2s="ai";var D15="dArgs";var H1m=Y6s;H1m+=V2s;H1m+=q$J;var f_S=e$p;f_S+=j2w;T6H.J_Y();var G$c=E7J;G$c+=h7O;G$c+=k93;G$c+=D15;var _this=this;var that=this;if(this[F0a](function(){that[s9J](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[G$c](arg1,arg2,arg3,arg4);this[s4d](items,this[O8J](f_S,items),H1m,argOpts[A$C],function(){var R5Y="_assem";var Y6a="maybeOpe";T6H.J_Y();var n4E="bleMain";var p8c=Y6a;p8c+=q$J;var b5U=w4d;b5U+=x0H;var X_N=R5Y;X_N+=n4E;_this[X_N]();_this[d9A](argOpts[b5U]);argOpts[p8c]();});return this;}function enable(name){var K0Y="eldName";var r32=n1L;r32+=K0Y;r32+=j2w;var d7N=D0z;d7N+=C5Mnx[574232];d7N+=C5Mnx.i36;d7N+=L71;var that=this;$[d7N](this[r32](name),function(i,n){T6H.J_Y();that[e$p](n)[O8x]();});return this;}function error$1(name,msg){var K6J="mErro";var x5G="balEr";var j__=C5Mnx[440425];j__+=w4d;j__+=Y6s;var wrapper=$(this[j__][N_r]);if(msg === undefined){var N5y=Z3N;N5y+=q1W;N5y+=x5G;N5y+=A4Q;var c8A=i53;c8A+=K6J;c8A+=h7O;var K3j=C5Mnx[440425];K3j+=w4d;K3j+=Y6s;var H8l=s$x;H8l+=Y6s;H8l+=D2p;this[H8l](this[K3j][c8A],name,P4T,function(){var F$m="toggl";var q$1="eClass";var H85='inFormError';var s71=F$m;s71+=q$1;wrapper[s71](H85,name !== undefined && name !== s93);});this[j2w][N5y]=name;}else {var s$R=W3X;s$R+=w4d;s$R+=h7O;var I2q=O8a;I2q+=C5Mnx[440425];this[I2q](name)[s$R](msg);}return this;}function field(name){var a_F="Unknown f";var r7g="ield name - ";var z3o=e$p;z3o+=j2w;T6H.J_Y();var sFields=this[j2w][z3o];if(!sFields[name]){var c8t=a_F;c8t+=r7g;throw new Error(c8t + name);}return sFields[name];}function fields(){return $[w2q](this[j2w][o9B],function(fieldIn,name){T6H.J_Y();return name;});}function file(name,id){var K6h="e id ";var Y3L="kno";var M4I=' in table ';var q5t="wn fil";var A_K="Un";var s1c=D0B;s1c+=j2w;var tableFromFile=this[s1c](name);var fileFromTable=tableFromFile[id];if(!fileFromTable){var H3z=A_K;H3z+=Y3L;H3z+=q5t;H3z+=K6h;throw new Error(H3z + id + M4I + name);}return tableFromFile[id];}function files(name){var D$u="les";var p29="Unknown file table name";var T90=": ";var B2Y=C5Mnx[611221];B2Y+=K19;B2Y+=D0z;B2Y+=j2w;if(!name){var h3e=C5Mnx[611221];h3e+=s9Q;h3e+=D$u;return Editor[h3e];}var editorTable=Editor[B2Y][name];if(!editorTable){var w7Q=p29;w7Q+=T90;throw new Error(w7Q + name);}return editorTable;}function get(name){var f$v="sA";var Q$E=s9Q;Q$E+=f$v;Q$E+=A93;var that=this;if(!name){var i$F=C5Mnx[611221];i$F+=s9Q;i$F+=z7r;i$F+=j2w;name=this[i$F]();}if(Array[Q$E](name)){var e1Q=D0z;e1Q+=C5Mnx[574232];e1Q+=C5Mnx.i36;e1Q+=L71;var out_1={};$[e1Q](name,function(i,n){var O04=n_8;T6H.T5V();O04+=q_c;O04+=C5Mnx[440425];out_1[n]=that[O04](n)[C29]();});return out_1;}return this[e$p](name)[C29]();}function hide(names,animate){var e6k="Names";var b_X=n1L;b_X+=z7r;b_X+=e6k;var c8p=D0z;c8p+=C5Mnx[574232];c8p+=C5Mnx.i36;c8p+=L71;var that=this;$[c8p](this[b_X](names),function(i,n){var e4M=L71;e4M+=s9Q;e4M+=i_o;T6H.T5V();that[e$p](n)[e4M](animate);});return this;}function ids(includeHash){var g1d=Y6s;g1d+=C5Mnx[574232];g1d+=A5S;if(includeHash === void B$r){includeHash=S0J;}return $[g1d](this[j2w][X9T],function(editIn,idSrc){return includeHash === P4T?W1e + idSrc:idSrc;});}function inError(inNames){var n7L="globalError";var H9c=t_c;H9c+=P4v;H9c+=L71;var v6I=i53;T6H.T5V();v6I+=Y6s;v6I+=c3K;v6I+=h7O;var g74=C5Mnx[440425];g74+=w4d;g74+=Y6s;$(this[g74][v6I]);if(this[j2w][n7L]){return P4T;}var names=this[t03](inNames);for(var i=B$r,ien=names[H9c];i < ien;i++){if(this[e$p](names[i])[U2J]()){return P4T;}}return S0J;}function inline(cell,fieldName,opts){var L21="div.";var F2z="inli";var r4C="dividual";var i1g='Cannot edit more than one row inline at a time';var C7R=s9Q;C7R+=Y9X;C7R+=s9Q;C7R+=Z7F;var k7n=s$x;k7n+=t6O;k7n+=m5$;var w5Z=L21;w5Z+=G8z;w5Z+=C5Mnx[440425];var t0$=I$e;t0$+=U7V;T6H.J_Y();t0$+=q64;var d3X=Q_$;d3X+=H1N;d3X+=i_g;var O7J=b8f;O7J+=r4C;var K7s=F2z;K7s+=Z7F;var K8j=D0z;K8j+=F9b;K8j+=D0z;K8j+=Y54;var _this=this;var that=this;if($[t1A](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[K8j]({},this[j2w][r9G][K7s],opts);var editFields=this[O8J](O7J,cell,fieldName);var keys=Object[l7W](editFields);if(keys[d3X] > f$8){throw new Error(i1g);}var editRow=editFields[keys[B$r]];var hosts=[];for(var _i=B$r,_a=editRow[t0$];_i < _a[A56];_i++){var row=_a[_i];hosts[z_$](row);}if($(w5Z,hosts)[A56]){return this;}if(this[k7n](function(){that[H2I](cell,fieldName,opts);})){return this;}this[s4d](cell,editFields,C7R,opts,function(){T6H.J_Y();_this[v1M](editFields,opts);});return this;}function inlineCreate(insertPoint,opts){var t_h="akeRow";var X40="ditFields";var x7Y="Source";var h7z="tidy";var X10="initCre";var n3n=X10;n3n+=u2y;var g$f=p5f;g$f+=q$D;var d2Q=b8f;d2Q+=v1R;d2Q+=q$J;d2Q+=D0z;var i5K=D0z;i5K+=F9b;i5K+=D0z;i5K+=Y54;var Z8r=C5Mnx[611221];Z8r+=t_h;var j_z=T3S;j_z+=a1i;j_z+=x7Y;var e1b=D0z;e1b+=X40;var P_c=Y6s;P_c+=w4d;P_c+=C5Mnx[440425];P_c+=D0z;var t1x=s79;t1x+=L71;var Z1l=s$x;Z1l+=h7z;var _this=this;if($[t1A](insertPoint)){opts=insertPoint;insertPoint=d4j;}if(this[Z1l](function(){var b_F=N4h;T6H.J_Y();b_F+=f7M;_this[b_F](insertPoint,opts);})){return this;}T6H.T5V();$[t1x](this[j2w][o9B],function(name,fieldIn){var D0F="tiR";var l90=Y6s;l90+=E2n;l90+=D0F;l90+=w8D;fieldIn[l90]();fieldIn[g1I](B$r,fieldIn[P$l]());fieldIn[C7p](fieldIn[P$l]());});this[j2w][P_c]=j8$;this[j2w][d6C]=g2e;this[j2w][p1P]=d4j;this[j2w][e1b]=this[j_z](Z8r,insertPoint);opts=$[i5K]({},this[j2w][r9G][d2Q],opts);this[V0t]();this[v1M](this[j2w][X9T],opts,function(){var l6j='fakeRowEnd';var f5K=F7L;f5K+=C5Mnx[574232];f5K+=A8U;f5K+=Q$C;_this[f5K](l6j);});this[g$f](n3n,d4j);return this;}function message(name,msg){var u0Z="_message";var s$C="formInfo";if(msg === undefined){var j79=C5Mnx[440425];j79+=w4d;j79+=Y6s;this[u0Z](this[j79][s$C],name);}else {this[e$p](name)[C9J](msg);}T6H.J_Y();return this;}function mode(modeIn){var g6_='Changing from create mode is not supported';var U_w="ctio";var o0b="Not currently in an editing mo";var X42=K9D;X42+=C9S;var a1S=K9D;a1S+=w4d;a1S+=q$J;if(!modeIn){var L2C=C5Mnx[574232];L2C+=U_w;L2C+=q$J;return this[j2w][L2C];}if(!this[j2w][a1S]){var l6h=o0b;l6h+=i_o;throw new Error(l6h);}else if(this[j2w][X42] === g2e && modeIn !== g2e){throw new Error(g6_);}T6H.T5V();this[j2w][d6C]=modeIn;return this;}function modifier(){T6H.J_Y();return this[j2w][p1P];}function multiGet(fieldNames){var U_c=C5Mnx[611221];U_c+=s9Q;U_c+=D0z;U_c+=Q29;var that=this;if(fieldNames === undefined){var C_6=d9a;C_6+=D8r;fieldNames=this[C_6]();}if(Array[r99](fieldNames)){var D5N=D0z;D5N+=C5Mnx[574232];D5N+=C5Mnx.i36;D5N+=L71;var out_2={};$[D5N](fieldNames,function(i,name){var P7E=C5Mnx[611221];P7E+=u7F;out_2[name]=that[P7E](name)[v_w]();});return out_2;}return this[U_c](fieldNames)[v_w]();}function multiSet(fieldNames,valIn){var m0B="isPlainOb";var B5H=m0B;B5H+=v55;T6H.J_Y();B5H+=D0z;B5H+=l$H;var that=this;if($[B5H](fieldNames) && valIn === undefined){$[f9H](fieldNames,function(name,value){T6H.T5V();that[e$p](name)[g1I](value);});}else {this[e$p](fieldNames)[g1I](valIn);}return this;}function node(name){var t6J=c8h;t6J+=i_o;var u2h=C5Mnx[611221];u2h+=u7F;T6H.J_Y();var that=this;if(!name){name=this[t8W]();}return Array[r99](name)?$[w2q](name,function(n){var j_o=c8h;j_o+=C5Mnx[440425];j_o+=D0z;var p9o=C5Mnx[611221];p9o+=M5u;p9o+=C5Mnx[440425];return that[p9o](n)[j_o]();}):this[u2h](name)[t6J]();}function off(name,fn){T6H.J_Y();var h8r="ventNa";var G4u=U87;G4u+=h8r;G4u+=C5Mnx.U3r;$(this)[v_e](this[G4u](name),fn);return this;}function on(name,fn){var p3u="ventName";var a_h=U87;a_h+=p3u;$(this)[C9S](this[a_h](name),fn);return this;}function one(name,fn){T6H.T5V();var p0n="Na";var T1G=K0R;T1G+=p0n;T1G+=C5Mnx.U3r;var e$e=w4d;e$e+=q$J;e$e+=D0z;$(this)[e$e](this[T1G](name),fn);return this;}function open(){var G_d="ose";T6H.T5V();var Z2H="Reg";var I1T="nest";var g_b=s$x;g_b+=m3m;g_b+=G_d;g_b+=Z2H;var _this=this;this[J9J]();this[g_b](function(){var M2r="_nestedCl";var B4j=M2r;B4j+=G_d;_this[B4j](function(){var P4r="sed";var m_i=Y6s;m_i+=C5Mnx[574232];m_i+=s9Q;m_i+=q$J;var x5I=C5Mnx.i36;x5I+=e7P;x5I+=w4d;x5I+=P4r;var n04=s$x;T6H.J_Y();n04+=D0z;n04+=y0Y;n04+=C5Mnx.n6y;_this[Y_H]();_this[n04](x5I,[m_i]);});});var ret=this[I2E](j8$);if(!ret){return this;}this[b0o](function(){var E4q="foc";var R7M="editO";var d3f="even";var J6B=C5Mnx[574232];J6B+=l$H;J6B+=o9f;var R15=Y6s;R15+=C5Mnx[574232];R15+=s9Q;R15+=q$J;var K_a=s$x;K_a+=d3f;K_a+=U7V;var X7R=R7M;X7R+=A5S;X7R+=X1W;var u$5=X8f;T6H.T5V();u$5+=i_o;u$5+=h7O;var q23=s$x;q23+=E4q;q23+=k93;q23+=j2w;_this[q23]($[w2q](_this[j2w][u$5],function(name){var s9n=C5Mnx[611221];T6H.J_Y();s9n+=r$N;return _this[j2w][s9n][name];}),_this[j2w][X7R][o9Q]);_this[K_a](B1w,[R15,_this[j2w][J6B]]);},this[j2w][L5q][I1T]);this[y$3](j8$,S0J);return this;}function order(setIn){var Q_e="s, and no additional fields, mu";var y9g=" field";var A7T="so";var m42="sort";var Y_m="st be provided for ordering.";var w2J="_displayReo";var H4f="All";var W1b=w2J;W1b+=Q1m;W1b+=h7O;var F$9=w4d;F$9+=Q1m;F$9+=h7O;var q8k=X4F;T6H.T5V();q8k+=K_g;q8k+=q$J;q8k+=C5Mnx[440425];var o0q=v55;o0q+=a2m;o0q+=q$J;var c7F=A7T;c7F+=h7O;c7F+=U7V;var k2I=j2w;k2I+=e7P;k2I+=W7J;k2I+=D0z;var f_A=e7P;f_A+=T0q;if(!setIn){return this[j2w][t8W];}if(arguments[f_A] && !Array[r99](setIn)){var q35=O3h;q35+=W_8;setIn=Array[Z3T][q35][j0y](arguments);}if(this[j2w][t8W][k2I]()[m42]()[c3u](e91) !== setIn[P8k]()[c7F]()[o0q](e91)){var F81=H4f;F81+=y9g;F81+=Q_e;F81+=Y_m;throw new Error(F81);}$[q8k](this[j2w][F$9],setIn);this[W1b]();return this;}function remove(items,arg1,arg2,arg3,arg4){var T6C='initRemove';var q9u='node';var n_F="_ti";var Y7K="Args";var b3q=O2S;b3q+=C5Mnx[574232];var R1F=p5f;R1F+=q$D;var m2O=q$J;m2O+=w4d;m2O+=Z7F;var Y3m=C5Mnx[611221];Y3m+=w4d;Y3m+=g6T;var p8H=E_X;p8H+=U7V;p8H+=F9f;p8H+=q$J;var A$w=C5Mnx[611221];A$w+=u7F;A$w+=j2w;var o9P=E7J;o9P+=h7O;o9P+=d95;T6H.T5V();o9P+=Y7K;var K73=M7r;K73+=L71;var p_C=U7V;p_C+=C5Mnx[574232];p_C+=a$H;p_C+=Q_$;var j2p=n_F;j2p+=m5$;var _this=this;var that=this;if(this[j2p](function(){T6H.J_Y();that[Q4$](items,arg1,arg2,arg3,arg4);})){return this;}if(!items && !this[j2w][p_C]){items=X3W;}if(items[K73] === undefined){items=[items];}var argOpts=this[o9P](arg1,arg2,arg3,arg4);var editFields=this[O8J](A$w,items);this[j2w][p8H]=f5l;this[j2w][p1P]=items;this[j2w][X9T]=editFields;this[w3d][Y3m][n7w][v4C]=m2O;this[V0t]();this[R1F](T6C,[pluck(editFields,q9u),pluck(editFields,b3q),items],function(){var u_q="MultiRemo";var D74=E5F;D74+=u_q;D74+=y0Y;var T8j=f58;T8j+=q$J;T8j+=U7V;_this[T8j](D74,[editFields,items],function(){_this[Q5Q]();T6H.J_Y();_this[d9A](argOpts[A$C]);argOpts[t98]();var opts=_this[j2w][L5q];if(opts[o9Q] !== d4j){var u3b=S0Z;u3b+=p3i;u3b+=j2w;var H1W=D0z;H1W+=Y2j;var S6z=b_M;S6z+=X3t;$(z6U,_this[w3d][S6z])[H1W](opts[u3b])[o9Q]();}});});return this;}function set(setIn,valIn){T6H.J_Y();var d3R=D0z;d3R+=C5Mnx[574232];d3R+=C5Mnx.i36;d3R+=L71;var F2Z=C6N;F2Z+=U$0;var that=this;if(!$[F2Z](setIn)){var o={};o[setIn]=valIn;setIn=o;}$[d3R](setIn,function(n,v){var p74=j2w;T6H.J_Y();p74+=D0z;p74+=U7V;that[e$p](n)[p74](v);});return this;}function show(names,animate){var C72=k2T;T6H.J_Y();C72+=s1f;var that=this;$[C72](this[t03](names),function(i,n){var p$z=d9a;p$z+=Q29;that[p$z](n)[e9i](animate);});return this;}function submit(successCallback,errorCallback,formatdata,hideIn){var z1O='div.DTE_Field';var H_D="tiveE";var l87="osest";var J4d="lement";var y5p=m3m;y5p+=l87;var t_f=C5Mnx[574232];t_f+=C5Mnx.i36;t_f+=H_D;t_f+=J4d;var J6L=d9a;J6L+=e7P;J6L+=C5Mnx[440425];J6L+=j2w;var _this=this;var fields=this[j2w][J6L];var errorFields=[];var errorReady=B$r;var sent=S0J;if(this[j2w][P_s] || !this[j2w][d6C]){return this;}this[Q8N](P4T);var send=function(){var R2g='initSubmit';T6H.T5V();if(errorFields[A56] !== errorReady || sent){return;}_this[K0R](R2g,[_this[j2w][d6C]],function(result){var o9J=w3n;o9J+=l2K;T6H.T5V();o9J+=U7V;if(result === S0J){_this[Q8N](S0J);return;}sent=P4T;_this[o9J](successCallback,errorCallback,formatdata,hideIn);});};var active=document[t_f];if($(active)[y5p](z1O)[A56] !== B$r){var C8y=a$H;C8y+=e7P;C8y+=k93;C8y+=h7O;active[C8y]();}this[y$B]();$[f9H](fields,function(name,fieldIn){var d0L="rro";var v15=b8f;v15+=R1u;v15+=d0L;v15+=h7O;if(fieldIn[v15]()){var i26=s$T;i26+=L71;errorFields[i26](name);}});$[f9H](errorFields,function(i,name){var Y5k=k2c;Y5k+=P12;Y5k+=h7O;fields[name][Y5k](s93,function(){T6H.J_Y();errorReady++;send();});});send();T6H.T5V();return this;}function table(setIn){if(setIn === undefined){var O7v=I8s;O7v+=Q_$;return this[j2w][O7v];}this[j2w][N1O]=setIn;return this;}function template(setIn){if(setIn === undefined){var I6R=Y3c;I6R+=O40;I6R+=D0z;return this[j2w][I6R];}this[j2w][L7R]=setIn === d4j?d4j:$(setIn);return this;}function title(titleIn){var r1O="tag";var b2z="tm";var y4E="unction";var P4C="></";var R_L=L71;R_L+=b2z;R_L+=e7P;var S2o=L71;S2o+=U7V;S2o+=Y6s;S2o+=e7P;var Q2a=U7V;Q2a+=C5Mnx[574232];Q2a+=Z3N;var A1t=C5Mnx[611221];A1t+=y4E;T6H.J_Y();var t8j=L71;t8j+=D0z;t8j+=q6O;t8j+=k2c;var r0u=C5Mnx.i36;r0u+=e7P;r0u+=j$q;var v$m=C5Mnx[440425];v$m+=s9Q;v$m+=o1v;v$m+=Z8q;var header=$(this[w3d][v$6])[G2s](v$m + this[r0u][t8j][n2i]);var titleClass=this[O2I][v$6][t5E];if(titleIn === undefined){var J81=C5Mnx[440425];J81+=C5Mnx[574232];J81+=U7V;J81+=C5Mnx[574232];return header[J81](E4H);}if(typeof titleIn === A1t){titleIn=titleIn(this,new DataTable$5[b4z](this[j2w][N1O]));}var set=titleClass[r1O]?$(k7Y + titleClass[Q2a] + P4C + titleClass[r1O])[A5Z](titleClass[f82])[S2o](titleIn):titleIn;header[R_L](set)[z3B](E4H,titleIn);return this;}function val(fieldIn,value){var Q2q=Z3N;Q2q+=S$C;if(value !== undefined || $[t1A](fieldIn)){var G2P=j2w;G2P+=D0z;G2P+=U7V;return this[G2P](fieldIn,value);}T6H.T5V();return this[Q2q](fieldIn);;}function error(msg,tn,thro){var P7P=' For more information, please refer to https://datatables.net/tn/';if(thro === void B$r){thro=P4T;}var display=tn?msg + P7P + tn:msg;if(thro){throw display;}else {var R_0=o7C;R_0+=q31;R_0+=q$J;console[R_0](display);}}function pairs(data,props,fn){var c4u="isA";var f12="lu";var F07=c4u;F07+=A93;var b8I=o1v;b8I+=C5Mnx[574232];b8I+=f12;b8I+=D0z;var f4z=B0n;T6H.T5V();f4z+=Y54;var i;var ien;var dataPoint;props=$[f4z]({label:V8f,value:b8I},props);if(Array[F07](data)){for((i=B$r,ien=data[A56]);i < ien;i++){var L0e=C6N;L0e+=U$0;dataPoint=data[i];if($[L0e](dataPoint)){var U6x=e7P;U6x+=C5Mnx[574232];U6x+=a$H;U6x+=q_c;var N1m=T7r;N1m+=a$H;N1m+=D0z;N1m+=e7P;fn(dataPoint[props[i06]] === undefined?dataPoint[props[N1m]]:dataPoint[props[i06]],dataPoint[props[U6x]],i,dataPoint[X5e]);}else {fn(dataPoint,dataPoint,i);}}}else {i=B$r;$[f9H](data,function(key,val){fn(val,key,i);i++;});}}function upload$1(editor,conf,files,progressCallback,completeCallback){var G_7="erver error occurred while uploading th";var b0p="errors";var l_L="_limitLeft";var Q44="ja";var K7l='<i>Uploading file</i>';var w_x="e file";var l4l="onload";var f21="leReadT";var P8M="nctio";var P9J="readAsDataURL";var v90="A s";var w07=Y6s;w07+=R73;var d00=n_8;d00+=f21;d00+=X4F;d00+=U7V;var y9V=I3a;y9V+=P8M;y9V+=q$J;var z8z=C5Mnx[574232];z8z+=Q44;z8z+=f8K;var S3r=q$J;S3r+=C5Mnx[187046];S3r+=D0z;var p4H=v90;p4H+=G_7;p4H+=w_x;var reader=new FileReader();var counter=B$r;var ids=[];var generalError=conf[b0p] && conf[b0p][s$x]?conf[b0p][s$x]:p4H;editor[y$B](conf[S3r],s93);if(typeof conf[z8z] === y9V){var b2x=j7N;b2x+=A$a;conf[b2x](files,function(idsIn){var Y$q=C5Mnx.i36;Y$q+=C5Mnx[574232];Y$q+=e7P;Y$q+=e7P;completeCallback[Y$q](editor,idsIn);});return;}progressCallback(conf,conf[d00] || K7l);reader[l4l]=function(e){var a7v='No Ajax option specified for upload plug-in';var F8W="xDa";var B44='Upload feature cannot use `ajax.data` with an object. Please use it as a function instead.';var r$D="ajaxDat";var v2H='uploadField';var b15='preUpload';var k9D="ainObject";var R9h="aja";var D9o='upload';var G$9=C6N;G$9+=U$0;var A1D=I3a;A1D+=l8l;A1D+=w4d;A1D+=q$J;var y3x=f5U;y3x+=Y$v;var U0E=C5Mnx[574232];U0E+=u1J;var o1f=C6N;o1f+=e7P;o1f+=k9D;var X7z=R9h;X7z+=f8K;var p_J=r$D;p_J+=C5Mnx[574232];var r9_=R73;r9_+=a$n;r9_+=C5Mnx[440425];var data=new FormData();var ajax;data[r9_](Z9M,D9o);data[B4G](v2H,conf[D4T]);data[B4G](D9o,files[counter]);if(conf[p_J]){var c4Y=j7N;c4Y+=C5Mnx[574232];c4Y+=F8W;c4Y+=a1i;conf[c4Y](data,files[counter],counter);}if(conf[X7z]){ajax=conf[X0m];}else if($[o1f](editor[j2w][X0m])){var V7i=C5Mnx[574232];V7i+=u1J;var a2i=M4X;a2i+=C5Mnx[440425];ajax=editor[j2w][X0m][E35]?editor[j2w][X0m][a2i]:editor[j2w][V7i];}else if(typeof editor[j2w][U0E] === y3x){var n0j=C5Mnx[574232];n0j+=v55;n0j+=A$a;ajax=editor[j2w][n0j];}if(!ajax){throw new Error(a7v);}if(typeof ajax === Z4A){ajax={url:ajax};}if(typeof ajax[z3B] === A1D){var K97=s79;K97+=L71;var B_8=C5Mnx[440425];B_8+=C5Mnx[574232];B_8+=U7V;B_8+=C5Mnx[574232];var d={};var ret=ajax[B_8](d);if(ret !== undefined && typeof ret !== Z4A){d=ret;}$[K97](d,function(key,value){var o8d=C5Mnx[574232];T6H.J_Y();o8d+=A5S;o8d+=d3c;o8d+=Y54;data[o8d](key,value);});}else if($[G$9](ajax[z3B])){throw new Error(B44);}editor[K0R](b15,[conf[D4T],files[counter],data],function(preRet){var t4g='post';T6H.T5V();var X7Y="uplo";var Z21="preS";var T0C="mit.DTE_Upload";var R6I=Z21;R6I+=O0h;R6I+=T0C;if(preRet === S0J){var A92=e7P;A92+=T0q;if(counter < files[A92] - f$8){counter++;reader[P9J](files[counter]);}else {var k4Y=C5Mnx.i36;k4Y+=C5Mnx[574232];k4Y+=e7P;k4Y+=e7P;completeCallback[k4Y](editor,ids);}return;}var submit=S0J;editor[C9S](R6I,function(){submit=P4T;return S0J;});$[X0m]($[q5Y]({},ajax,{contentType:S0J,data:data,dataType:e9m,error:function(xhr){var g0A="preSubmi";var T6s="atu";var O$A="adXhrError";var A2j="t.DTE_Upload";var t9M=X7Y;t9M+=O$A;var R$1=j2w;R$1+=U7V;R$1+=T6s;R$1+=j2w;var t3T=g0A;t3T+=A2j;var B1$=w4d;B1$+=C3R;var errors=conf[b0p];editor[B1$](t3T);editor[y$B](conf[D4T],errors && errors[xhr[x0w]]?errors[xhr[R$1]]:generalError);editor[K0R](t9M,[conf[D4T],xhr]);progressCallback(conf);},processData:S0J,success:function(json){var R8j='uploadXhrSuccess';var T$J='preSubmit.DTE_Upload';T6H.J_Y();var P64=s9Q;P64+=C5Mnx[440425];var M4t=D0z;M4t+=h7O;M4t+=A4Q;var g8L=e7P;g8L+=c9b;g8L+=U7V;g8L+=L71;var s2B=e$p;s2B+=x5V;var k_o=p5f;k_o+=C8D;k_o+=U7V;editor[v_e](T$J);editor[k_o](R8j,[conf[D4T],json]);if(json[s2B] && json[Y0Y][g8L]){var Z9c=t_c;Z9c+=q89;var errors=json[Y0Y];for(var i=B$r,ien=errors[Z9c];i < ien;i++){var g00=N8F;g00+=C5Mnx.U3r;editor[y$B](errors[i][g00],errors[i][x0w]);}completeCallback[j0y](editor,ids,P4T);}else if(json[M4t]){var y2u=C5Mnx.i36;y2u+=C5Mnx[574232];y2u+=e7P;y2u+=e7P;var T$5=D0z;T$5+=j3o;var r8t=D0z;r8t+=b2q;r8t+=w4d;r8t+=h7O;editor[r8t](json[T$5]);completeCallback[y2u](editor,ids,P4T);}else if(!json[E35] || !json[E35][P64]){var a4S=C5Mnx.i36;a4S+=C5Mnx[574232];a4S+=e7P;a4S+=e7P;editor[y$B](conf[D4T],generalError);completeCallback[a4S](editor,ids,P4T);}else {var g$Y=e7P;g$Y+=C8D;g$Y+=P4v;g$Y+=L71;var P05=s9Q;P05+=C5Mnx[440425];if(json[N6t]){var w6c=n_8;w6c+=e7P;w6c+=D0z;w6c+=j2w;$[f9H](json[w6c],function(table,filesIn){var m8j=C5Mnx[611221];m8j+=K19;T6H.J_Y();m8j+=D0z;m8j+=j2w;if(!Editor[N6t][table]){Editor[N6t][table]={};}$[q5Y](Editor[m8j][table],filesIn);});}ids[z_$](json[E35][P05]);if(counter < files[g$Y] - f$8){counter++;reader[P9J](files[counter]);}else {completeCallback[j0y](editor,ids);if(submit){var J5m=I70;J5m+=Q4N;editor[J5m]();}}}progressCallback(conf);},type:t4g,xhr:function(){var W0T="ploa";var l5A="onloadend";var o4j="onprogress";var r_1="Settin";var c4I=X0m;c4I+=r_1;c4I+=Z3N;c4I+=j2w;var xhr=$[c4I][E06]();if(xhr[E35]){var U7Z=k93;U7Z+=W0T;U7Z+=C5Mnx[440425];var v8Y=X7Y;v8Y+=C5Mnx[574232];v8Y+=C5Mnx[440425];xhr[v8Y][o4j]=function(e){var O6v="lengthC";var V8C="omputable";var Z_v=100;var A1O=':';var A6d='%';var k7G="loaded";var u$b="ixed";var P$3=O6v;P$3+=V8C;if(e[P$3]){var J5Q=e7P;J5Q+=C8D;J5Q+=Z3N;J5Q+=i_g;var V0s=Y7G;V0s+=j6g;V0s+=u$b;var K5H=Y7G;K5H+=U7V;K5H+=C5Mnx[574232];K5H+=e7P;var percent=(e[k7G] / e[K5H] * Z_v)[V0s](B$r) + A6d;progressCallback(conf,files[J5Q] === f$8?percent:counter + A1O + files[A56] + e5L + percent);}};xhr[U7Z][l5A]=function(){var j$Y="ngText";var S3N='Processing';var h9U=r7_;h9U+=j$Y;progressCallback(conf,conf[h9U] || S3N);};}return xhr;}}));});};files=$[w07](files,function(val){return val;});if(conf[l_L] !== undefined){var T5Q=s$x;T5Q+=r5Y;T5Q+=E1n;var Z9s=j2w;Z9s+=A5S;Z9s+=v1R;Z9s+=W_8;files[Z9s](conf[T5Q],files[A56]);}reader[P9J](files[B$r]);}function factory(root,jq){var m2G="jquery";var e5Q=C5Mnx[611221];e5Q+=q$J;var e$w=C5Mnx[611221];e$w+=q$J;var is=S0J;T6H.J_Y();if(root && root[C5Mnx.Y$4]){window=root;document=root[C5Mnx.Y$4];}if(jq && jq[e$w] && jq[e5Q][m2G]){$=jq;is=P4T;}return is;}var DataTable$4=$[C46][C5Mnx.h0r];var _inlineCounter=B$r;function _actionClass(){var k1w="actions";var N6C=D0z;N6C+=C5Mnx[440425];N6C+=s9Q;N6C+=U7V;T6H.J_Y();var p4l=J9h;p4l+=D0z;var U6U=l8p;U6U+=S7_;U6U+=o1v;U6U+=D0z;var l4N=T9t;l4N+=Q5O;var X_l=C5Mnx[440425];X_l+=w4d;X_l+=Y6s;var e7$=C5Mnx.i36;e7$+=e7P;e7$+=e15;e7$+=O2f;var classesActions=this[e7$][k1w];var action=this[j2w][d6C];var wrapper=$(this[X_l][N_r]);wrapper[h3P]([classesActions[Z1c],classesActions[l4N],classesActions[U6U]][c3u](e5L));if(action === p4l){wrapper[A5Z](classesActions[Z1c]);}else if(action === N6C){wrapper[A5Z](classesActions[s9J]);}else if(action === f5l){wrapper[A5Z](classesActions[Q4$]);}}function _ajax(data,success,error,submitParams){var q9o="eleteBod";var A7t="oin";var n5M="sP";var P$n="lain";var R2G="DE";var f4q="placement";var Z06="LET";var u5u="uns";var u1D="Bod";T6H.J_Y();var u11="com";var z6l="complete";var B8Y="idSr";var K_0='?';var l_y="ditF";var Y0H="nction";var C7x="replacements";var g1i=/_id_/;var i_Z=/{id}/;var D4h="unshif";var g1f=C5Mnx[574232];g1f+=v55;g1f+=C5Mnx[574232];g1f+=f8K;var u6J=C5Mnx[440425];u6J+=q9o;u6J+=E_v;var X7k=i_o;X7k+=t90;X7k+=u1D;X7k+=E_v;var K2p=R2G;K2p+=Z06;K2p+=R1u;var U4v=U7V;U4v+=y1R;var X_o=C5Mnx[440425];X_o+=C5Mnx[574232];X_o+=a1i;var s9u=l8p;s9u+=A5S;s9u+=e7P;s9u+=Q99;var M7O=k93;M7O+=h7O;M7O+=e7P;var o7U=S6b;o7U+=U7V;o7U+=s9Q;o7U+=C9S;var u8F=s9Q;u8F+=n5M;u8F+=P$n;u8F+=h$4;var r3t=v55;r3t+=A7t;var s65=B8Y;s65+=C5Mnx.i36;var W7M=D0z;W7M+=l_y;W7M+=r$N;var n5k=a2U;n5k+=x2T;n5k+=D0z;var action=this[j2w][d6C];var thrown;var opts={complete:[function(xhr,text){var F7x=204;var r3n="Text";var k9m="eJSON";var X$D=400;var Q_X="onseJSON";var m34='null';var G1Z="responseText";var m3T="resp";var s8m="response";var G3O="parse";var i$I=J2M;i$I+=E_v;var V81=C6N;V81+=T7r;V81+=b8f;V81+=h$4;var c$t=f5U;c$t+=C5Mnx[574232];c$t+=U7V;c$t+=h$L;var json=d4j;if(xhr[c$t] === F7x || xhr[G1Z] === m34){json={};}else {try{var V_d=s8m;V_d+=r3n;var M_6=m3T;M_6+=Q_X;var S0r=H8y;S0r+=A5S;S0r+=v2A;S0r+=k9m;json=xhr[S0r]?xhr[M_6]:JSON[G3O](xhr[V_d]);}catch(e){}}if($[V81](json) || Array[i$I](json)){success(json,xhr[x0w] >= X$D,xhr);}else {error(xhr,text,thrown);}}],data:d4j,dataType:e9m,error:[function(xhr,text,err){thrown=err;}],success:[],type:f_F};var a;var ajaxSrc=this[j2w][X0m];var id=action === S49 || action === n5k?pluck(this[j2w][W7M],s65)[r3t](K67):d4j;if($[u8F](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === o7U){ajaxSrc[j0y](this,d4j,d4j,data,success,error);return;}else if(typeof ajaxSrc === Z4A){if(ajaxSrc[k6X](e5L) !== -f$8){var T5I=j2w;T5I+=A5S;T5I+=w1V;a=ajaxSrc[T5I](e5L);opts[F1c]=a[B$r];opts[O$C]=a[f$8];}else {opts[O$C]=ajaxSrc;}}else {var w58=D0z;w58+=h7O;w58+=P12;w58+=h7O;var optsCopy=$[q5Y]({},ajaxSrc || ({}));if(optsCopy[z6l]){var t3F=u11;t3F+=A5S;t3F+=Q_$;t3F+=K_g;var Q8v=u5u;Q8v+=X8g;Q8v+=z7M;opts[z6l][Q8v](optsCopy[t3F]);delete optsCopy[z6l];}if(optsCopy[w58]){var a1W=D4h;a1W+=U7V;var x2y=k2c;x2y+=h7O;x2y+=w4d;x2y+=h7O;opts[x2y][a1W](optsCopy[y$B]);delete optsCopy[y$B];}opts=$[q5Y]({},opts,optsCopy);}if(opts[C7x]){var r6L=l8p;r6L+=f4q;r6L+=j2w;var G17=D0z;G17+=C5Mnx[574232];G17+=C5Mnx.i36;G17+=L71;$[G17](opts[r6L],function(key,repl){var v6g='{';var w$d='}';var v$4=m6D;v$4+=Q0X;var e7W=e08;e7W+=Q99;var a7G=k93;a7G+=h7O;a7G+=e7P;T6H.T5V();var q6E=i6L;q6E+=e7P;opts[q6E]=opts[a7G][e7W](v6g + key + w$d,repl[v$4](this,key,id,action,data));});}opts[O$C]=opts[M7O][P3K](g1i,id)[s9u](i_Z,id);if(opts[z3B]){var z8x=D0z;z8x+=F9b;z8x+=C8D;z8x+=C5Mnx[440425];var r0a=I3a;r0a+=Y0H;var B1v=C5Mnx[440425];B1v+=e00;var isFn=typeof opts[B1v] === r0a;var newData=isFn?opts[z3B](data):opts[z3B];data=isFn && newData?newData:$[z8x](P4T,data,newData);}opts[X_o]=data;if(opts[U4v] === K2p && (opts[X7k] === undefined || opts[u6J] === P4T)){var G$J=k93;G$J+=h7O;G$J+=e7P;var B1S=i6L;B1S+=e7P;var r8a=C5Mnx[440425];r8a+=C5Mnx[574232];r8a+=U7V;r8a+=C5Mnx[574232];var R64=A5S;R64+=q31;R64+=C5Mnx[187046];var params=$[R64](opts[r8a]);opts[B1S]+=opts[G$J][k6X](K_0) === -f$8?K_0 + params:S3E + params;delete opts[z3B];}$[g1f](opts);}function _animate(target,style,time,callback){var m_D="stop";T6H.J_Y();if($[C5Mnx.E0X][C$x]){target[m_D]()[C$x](style,time,callback);}else {var R_r=I3a;R_r+=l8l;R_r+=w4d;R_r+=q$J;var h6B=e7P;h6B+=T0q;var W6N=C5Mnx.i36;W6N+=j2w;W6N+=j2w;target[W6N](style);var scope=target[h6B] && target[A56] > f$8?target[B$r]:target;if(typeof time === R_r){time[j0y](scope);}else if(callback){var y8Z=m6D;y8Z+=Q0X;callback[y8Z](scope);}}}function _assembleMain(){var h$I="bodyContent";var U3b="appe";var D3Z="formError";var O0c="formIn";var e62=U3b;e62+=Y54;var r6S=O0c;r6S+=S0Z;var U_p=R73;U_p+=a$n;U_p+=C5Mnx[440425];var l9u=J_m;l9u+=C9S;l9u+=j2w;var dom=this[w3d];$(dom[N_r])[W9l](dom[v$6]);$(dom[I66])[B4G](dom[D3Z])[B4G](dom[l9u]);$(dom[h$I])[U_p](dom[r6S])[e62](dom[z6_]);}function _blur(){var P6x="Blu";var T6S=C5Mnx.i36;T6S+=b6v;T6S+=D0z;var d$1=U_h;d$1+=P6x;d$1+=h7O;var r0A=C9S;r0A+=P6x;r0A+=h7O;var opts=this[j2w][L5q];var onBlur=opts[r0A];if(this[K0R](d$1) === S0J){return;}if(typeof onBlur === C5Mnx[604463]){onBlur(this);}else if(onBlur === b1u){this[q0I]();}else if(onBlur === T6S){var N8_=i2g;N8_+=j2w;N8_+=D0z;this[N8_]();}}function _clearDynamicInfo(errorsOnly){var P2j=D0z;P2j+=j3o;var C0q=D0z;C0q+=C5Mnx[574232];C0q+=C5Mnx.i36;C0q+=L71;var X8M=C5Mnx[440425];X8M+=w4d;X8M+=Y6s;var M58=k2c;M58+=A4Q;var P8W=O8a;P8W+=C5Mnx[440425];var c8q=C5Mnx.i36;c8q+=N5U;c8q+=M7D;if(errorsOnly === void B$r){errorsOnly=S0J;}if(!this[j2w]){return;}var errorClass=this[c8q][P8W][M58];var fields=this[j2w][o9B];$(L6A + errorClass,this[X8M][N_r])[h3P](errorClass);$[C0q](fields,function(name,field){field[y$B](s93);T6H.T5V();if(!errorsOnly){field[C9J](s93);}});this[P2j](s93);if(!errorsOnly){var P69=C5Mnx.U3r;P69+=j2w;P69+=j2w;P69+=S09;this[P69](s93);}}function _close(submitComplete,mode){T6H.T5V();var a2G="Cb";var t0l="or-focus";var l_n="loseC";var q70='closed';var A9o='preClose';var u97="focus.edit";var K8r=C5Mnx.i36;K8r+=b6v;K8r+=D0z;var x$G=u97;x$G+=t0l;var h3a=D_3;h3a+=C5Mnx[611221];var Q7B=a$H;Q7B+=w4d;Q7B+=C5Mnx[440425];Q7B+=E_v;var f6x=L0k;f6x+=x5D;f6x+=C5Mnx.i36;f6x+=a$H;var W4P=C5Mnx.i36;W4P+=l_n;W4P+=a$H;var j7u=s$x;j7u+=D0z;j7u+=y1x;j7u+=U7V;var closed;if(this[j7u](A9o) === S0J){return;}if(this[j2w][W4P]){var S_R=L0k;S_R+=a2G;closed=this[j2w][Y$G](submitComplete,mode);this[j2w][S_R]=d4j;}if(this[j2w][f6x]){this[j2w][N4J]();this[j2w][N4J]=d4j;}$(Q7B)[h3a](x$G);this[j2w][Q1t]=S0J;this[K0R](K8r);if(closed){var E1Y=U87;E1Y+=L87;this[E1Y](q70,[closed]);}}function _closeReg(fn){T6H.J_Y();this[j2w][Y$G]=fn;}function _crudArgs(arg1,arg2,arg3,arg4){var R7r="sPlainObject";var y4X="main";var m4m="formOptio";var D$f=m4m;D$f+=X3t;var l8Q=s9Q;l8Q+=R7r;var that=this;var title;var buttons;var show;var opts;if($[l8Q](arg1)){opts=arg1;}else if(typeof arg1 === w4W){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=P4T;}if(title){that[t5E](title);}T6H.T5V();if(buttons){var G9Z=c2r;G9Z+=U7V;G9Z+=w4d;G9Z+=X3t;that[G9Z](buttons);}return {maybeOpen:function(){T6H.J_Y();if(show){var n4W=w4d;n4W+=A5S;n4W+=D0z;n4W+=q$J;that[n4W]();}},opts:$[q5Y]({},this[j2w][D$f][y4X],opts)};}function _dataSource(name){var v$7="rces";var Q3I="dataSou";var F$Z="Sourc";var h7d=L71;h7d+=U7V;h7d+=Y6s;h7d+=e7P;var e3$=Y2S;e3$+=a1i;e3$+=F$Z;e3$+=O2f;var h4k=O2S;h4k+=C5Mnx[574232];h4k+=Y$B;h4k+=c0b;var t1u=Q3I;t1u+=v$7;var a_9=U7V;a_9+=F2S;a_9+=D0z;var Q09=M7r;Q09+=L71;var args=[];for(var _i=f$8;_i < arguments[Q09];_i++){args[_i - f$8]=arguments[_i];}var dataSource=this[j2w][a_9]?Editor[t1u][h4k]:Editor[e3$][h7d];var fn=dataSource[name];if(fn){var k3b=C5Mnx[574232];k3b+=u1d;k3b+=d7D;return fn[k3b](this,args);}}function _displayReorder(includeFields){var u2A="formContent";var E0h="udeFiel";var H9O="udeFie";var S6v="deta";var Z6i="layOrde";var J3z="ncl";var Z$x="tio";var Q3y=E_X;Q3y+=Z$x;Q3y+=q$J;var J61=j1_;J61+=A5S;J61+=Z6i;J61+=h7O;var F6L=U87;F6L+=y1x;F6L+=U7V;var N2j=z5s;N2j+=b8f;var x3E=k2T;x3E+=C5Mnx.i36;x3E+=L71;var Z7r=S6v;Z7r+=s1f;var A_3=Y6s;A_3+=C5Mnx[574232];A_3+=b8f;var z44=w4d;z44+=Q1m;z44+=h7O;var q6H=C5Mnx[611221];q6H+=y$u;q6H+=Q29;q6H+=j2w;var _this=this;var formContent=$(this[w3d][u2A]);var fields=this[j2w][q6H];var order=this[j2w][z44];var template=this[j2w][L7R];var mode=this[j2w][Z22] || A_3;if(includeFields){var j6G=s9Q;j6G+=J3z;j6G+=H9O;j6G+=D8r;this[j2w][j6G]=includeFields;}else {var Q3s=s9Q;Q3s+=J3z;Q3s+=E0h;Q3s+=x4N;includeFields=this[j2w][Q3s];}formContent[G2s]()[Z7r]();$[x3E](order,function(i,name){var A$4="te=";var e20="[data-editor-templa";var T1z='editor-field[name="';var H26="_weakIn";var d$G=H26;d$G+=o3f;if(_this[d$G](name,includeFields) !== -f$8){if(template && mode === j8$){var y7V=p0h;y7V+=V2K;var x4s=e20;x4s+=A$4;x4s+=p0h;var g6M=C5Mnx[574232];g6M+=C5Mnx[611221];g6M+=U7V;g6M+=k2c;var b1H=p0h;b1H+=V2K;var W8h=j$h;W8h+=C5Mnx[440425];template[W8h](T1z + name + b1H)[g6M](fields[name][J1r]());template[C21](x4s + name + y7V)[B4G](fields[name][J1r]());}else {var N28=q$J;N28+=w4d;N28+=C5Mnx[440425];N28+=D0z;formContent[B4G](fields[name][N28]());}}});if(template && mode === N2j){template[T41](formContent);}this[F6L](J61,[this[j2w][Q1t],this[j2w][Q3y],formContent]);}function _edit(items,editFields,type,formOptions,setupDone){var F23="itF";var E7r="toS";var c7i="Arra";var m1v='initEdit';var e6y="tD";var L3j="ifier";var f6o="actionClass";var Q$J="styl";var H8F="sl";var M1d=c8h;M1d+=C5Mnx[440425];M1d+=D0z;var U$9=H8F;U$9+=W7J;U$9+=D0z;var P6Y=X8f;P6Y+=V0H;var G9n=s$x;G9n+=f6o;var i62=Y6s;i62+=k7d;var W6u=j1_;W6u+=z6N;W6u+=C5Mnx[574232];W6u+=E_v;var A5l=Q$J;A5l+=D0z;var z_e=C5Mnx[611221];z_e+=w4d;z_e+=g6T;var v8z=D0z;v8z+=C5Mnx[440425];v8z+=s9Q;v8z+=U7V;var D_s=S7_;D_s+=C5Mnx[440425];D_s+=L3j;var r3Q=T9t;r3Q+=s9Q;r3Q+=e6y;r3Q+=e00;var Z91=T9t;Z91+=F23;Z91+=y$u;Z91+=D8r;var _this=this;var fields=this[j2w][o9B];var usedFields=[];var includeInOrder;var editData={};this[j2w][Z91]=editFields;this[j2w][r3Q]=editData;this[j2w][D_s]=items;this[j2w][d6C]=v8z;this[w3d][z_e][A5l][W6u]=c7l;this[j2w][i62]=type;this[G9n]();$[f9H](fields,function(name,field){var Q03="R";var H6V="ValueChe";var B56=B_$;T6H.J_Y();B56+=Q8Q;var F_X=N8N;F_X+=t6O;F_X+=H6V;F_X+=a9u;var k59=B_$;k59+=Q03;k59+=w8D;field[k59]();includeInOrder=S0J;editData[name]={};$[f9H](editFields,function(idSrc,edit){var D7l="Fro";var Y7P="displayF";var W76="scope";var m6M="nullDefault";var m5X="displayFi";var N1b="sArray";var H1k="mData";T6H.T5V();var v85=C5Mnx[611221];v85+=y$u;v85+=Q29;v85+=j2w;if(edit[v85][name]){var b3_=j2w;b3_+=v1R;b3_+=C5Mnx.i36;b3_+=D0z;var B7v=s9Q;B7v+=N1b;var J$1=O2S;J$1+=C5Mnx[574232];var a0l=Y0b;a0l+=e7P;a0l+=D7l;a0l+=H1k;var val=field[a0l](edit[J$1]);var nullDefault=field[m6M]();editData[name][idSrc]=val === d4j?s93:Array[B7v](val)?val[b3_]():val;if(!formOptions || formOptions[W76] === Q$w){var y9N=Y7P;y9N+=r$N;var l04=i_o;l04+=C5Mnx[611221];field[g1I](idSrc,val === undefined || nullDefault && val === d4j?field[l04]():val,S0J);if(!edit[o9k] || edit[y9N][name]){includeInOrder=P4T;}}else {var l5x=m5X;l5x+=R0N;if(!edit[o9k] || edit[l5x][name]){var S0D=P6M;S0D+=E6Y;S0D+=o$C;field[S0D](idSrc,val === undefined || nullDefault && val === d4j?field[P$l]():val,S0J);includeInOrder=P4T;}}}});field[F_X]();if(field[B56]()[A56] !== B$r && includeInOrder){usedFields[z_$](name);}});var currOrder=this[P6Y]()[U$9]();for(var i=currOrder[A56] - f$8;i >= B$r;i--){var K2I=E7r;K2I+=U7V;K2I+=Y$v;var t7Z=b8f;t7Z+=c7i;t7Z+=E_v;if($[t7Z](currOrder[i][K2I](),usedFields) === -f$8){var P0t=Z2E;P0t+=h4h;currOrder[P0t](i,f$8);}}this[J9J](currOrder);this[K0R](m1v,[pluck(editFields,M1d)[B$r],pluck(editFields,n5U)[B$r],items,type],function(){T6H.J_Y();var c_7="iEdit";var I17="initMult";var d57=I17;d57+=c_7;_this[K0R](d57,[editFields,items,type],function(){setupDone();});});}function _event(trigger,args,promiseComplete){var T$n="triggerHandler";var R5b="Event";T6H.J_Y();var c3$="Handler";var y04='pre';var w$n="result";var z4t="obj";var u63='Cancelled';var H_o="hen";var p6Z="indexO";if(args === void B$r){args=[];}if(promiseComplete === void B$r){promiseComplete=undefined;}if(Array[r99](trigger)){var N3W=Q_$;N3W+=q$J;N3W+=P4v;N3W+=L71;for(var i=B$r,ien=trigger[N3W];i < ien;i++){this[K0R](trigger[i],args);}}else {var d3x=p6Z;d3x+=C5Mnx[611221];var e=$[R5b](trigger);$(this)[T$n](e,args);var result=e[w$n];if(trigger[d3x](y04) === B$r && result === S0J){var Q$V=R1u;Q$V+=y1x;Q$V+=U7V;var d9f=Z3r;d9f+=c3$;$(this)[d9f]($[Q$V](trigger + u63),args);}if(promiseComplete){var H$V=U7V;H$V+=H_o;var N6_=z4t;N6_+=w4G;if(result && typeof result === N6_ && result[H$V]){var J8K=U7V;J8K+=L71;J8K+=D0z;J8K+=q$J;result[J8K](promiseComplete);}else {promiseComplete(result);}}return result;}}function _eventName(input){T6H.T5V();var t3t="substring";var B6I=3;var Q80="atc";var l43="werCase";var s7b=/^on([A-Z])/;var P2N="Lo";var t1Q=v55;t1Q+=w4d;t1Q+=s9Q;t1Q+=q$J;var C$k=t_c;C$k+=q89;var L4$=J6X;L4$+=w1V;var name;var names=input[L4$](e5L);for(var i=B$r,ien=names[C$k];i < ien;i++){var B9W=Y6s;B9W+=Q80;B9W+=L71;name=names[i];var onStyle=name[B9W](s7b);if(onStyle){var D3e=Y7G;D3e+=P2N;D3e+=l43;name=onStyle[f$8][D3e]() + name[t3t](B6I);}names[i]=name;}return names[t1Q](e5L);}function _fieldFromNode(node){var h5h=D0z;h5h+=q64;var foundField=d4j;$[h5h](this[j2w][o9B],function(name,field){var O_T=e7P;T6H.J_Y();O_T+=c9b;O_T+=U7V;O_T+=L71;var c1w=C5Mnx[611221];c1w+=b8f;c1w+=C5Mnx[440425];var s2J=q$J;s2J+=w4d;s2J+=C5Mnx[440425];s2J+=D0z;if($(field[s2J]())[c1w](node)[O_T]){foundField=field;}});T6H.T5V();return foundField;}function _fieldNames(fieldNames){if(fieldNames === undefined){var l9x=C5Mnx[611221];l9x+=y$u;l9x+=e7P;l9x+=x4N;return this[l9x]();}else if(!Array[r99](fieldNames)){return [fieldNames];}return fieldNames;}function _focus(fieldsIn,focus){var X2$=/^jq:/;var M98="activeEle";var M_J="rep";var z5x="actio";var B43='div.DTE ';var U0y="cus";var g9R="etFo";var i3q=j2w;i3q+=g9R;i3q+=U0y;var n0F=z5s;n0F+=A5S;var P62=l8p;P62+=Q3K;var P_v=z5x;P_v+=q$J;var _this=this;if(this[j2w][P_v] === P62){return;}var field;var fields=$[n0F](fieldsIn,function(fieldOrName){var l8O=e$p;l8O+=j2w;return typeof fieldOrName === Z4A?_this[j2w][l8O][fieldOrName]:fieldOrName;});if(typeof focus === U7h){field=fields[focus];}else if(focus){var F7u=v55;F7u+=Y2j;F7u+=V85;if(focus[k6X](F7u) === B$r){var k$j=M_J;k$j+=e7P;k$j+=Q99;field=$(B43 + focus[k$j](X2$,s93));}else {var U3Z=C5Mnx[611221];U3Z+=y$u;U3Z+=Q29;U3Z+=j2w;field=this[j2w][U3Z][focus];}}else {var C8T=M98;C8T+=Y6s;C8T+=q$D;document[C8T][v1l]();}this[j2w][i3q]=field;if(field){field[o9Q]();}}function _formOptions(opts){var o9H="essa";var z3I="which";var T_b="canReturnSubmit";var o0W="ditCou";var R74="boole";var k0b=".dteIn";var P1S="Opts";var m4b=g7V;m4b+=k93;m4b+=A5S;var J_7=w4d;J_7+=q$J;var B$R=R74;B$R+=C5Mnx[574232];B$R+=q$J;var M6Z=r4z;M6Z+=U7V;M6Z+=U7V;M6Z+=v2A;var y2c=Y6s;y2c+=o9H;y2c+=V4H;var Y3K=j2w;Y3K+=p9i;Y3K+=b8f;Y3K+=Z3N;var l92=j2w;l92+=U7V;l92+=J2l;l92+=H1N;var o9u=D0z;o9u+=o0W;o9u+=q$J;o9u+=U7V;var A2G=D0z;A2G+=k$o;A2G+=U7V;A2G+=P1S;var e7h=k0b;e7h+=e7P;e7h+=J$P;var _this=this;var that=this;var inlineCount=_inlineCounter++;var namespace=e7h + inlineCount;this[j2w][A2G]=opts;this[j2w][o9u]=inlineCount;if(typeof opts[t5E] === l92 || typeof opts[t5E] === C5Mnx[604463]){var Y9M=U7V;Y9M+=Q5O;Y9M+=Q_$;var q0N=t6O;q0N+=U7V;q0N+=e7P;q0N+=D0z;this[q0N](opts[t5E]);opts[Y9M]=P4T;}if(typeof opts[C9J] === Y3K || typeof opts[y2c] === C5Mnx[604463]){var v2M=v$U;v2M+=P$4;v2M+=V4H;var p_Z=Y6s;p_Z+=D0z;p_Z+=j2w;p_Z+=t3V;this[C9J](opts[p_Z]);opts[v2M]=P4T;}if(typeof opts[M6Z] !== B$R){var Y9_=c2r;Y9_+=a5v;Y9_+=j2w;var K2B=c2r;K2B+=a5v;K2B+=j2w;this[K2B](opts[b_U]);opts[Y9_]=P4T;}$(document)[J_7](p1c + namespace,function(e){var U6t="ntD";if(e[z3I] === g3h && _this[j2w][Q1t]){var el=$(document[N1G]);if(el){var field=_this[t51](el);if(field && typeof field[T_b] === C5Mnx[604463] && field[T_b](el)){var Q4r=Y7v;Q4r+=D0z;Q4r+=U6t;Q4r+=V73;e[Q4r]();}}}});$(document)[C9S](m4b + namespace,function(e){var R5V="nts";var R4z="onE";var V7l="nEsc";var a4Y="functi";var Y6o="onReturn";var t3Z="rn";var c17="next";var u9i="ayed";var I$a="onEsc";var R3y='.DTE_Form_Buttons';var W$_=39;var o3n=37;var d4Y="ich";var e0W=27;var I4o="turnSu";var F$F="canRe";var P9R="sc";var S3n=e7P;S3n+=D0z;S3n+=H1N;S3n+=i_g;var K9g=A5S;K9g+=q31;K9g+=D0z;K9g+=R5V;var x9Q=o7C;x9Q+=L71;x9Q+=d4Y;var o2z=k_p;o2z+=u9i;var t0g=H21;t0g+=d4Y;var el=$(document[N1G]);if(e[t0g] === g3h && _this[j2w][o2z]){var K7U=F$F;K7U+=I4o;K7U+=Q4N;var k7x=S6b;k7x+=U7V;k7x+=o9f;var field=_this[t51](el);if(field && typeof field[T_b] === k7x && field[K7U](el)){var L7$=a4Y;L7$+=C9S;var J70=C9S;J70+=T69;J70+=j_H;J70+=t3Z;if(opts[Y6o] === b1u){var B$2=I70;B$2+=a$H;B$2+=Y6s;B$2+=Q5O;e[d2j]();_this[B$2]();}else if(typeof opts[J70] === L7$){e[d2j]();opts[Y6o](_this,e);}}}else if(e[x9Q] === e0W){var n7r=C9S;n7r+=R1u;n7r+=j2w;n7r+=C5Mnx.i36;var w1r=w4d;w1r+=V7l;var m4I=y$N;m4I+=k93;m4I+=h7O;var h6e=s1y;h6e+=y8x;h6e+=I9t;e[h6e]();if(typeof opts[I$a] === C5Mnx[604463]){var A0Y=R4z;A0Y+=P9R;opts[A0Y](that,e);}else if(opts[I$a] === m4I){that[v1l]();}else if(opts[w1r] === k5_){var d78=Z9Q;d78+=j2w;d78+=D0z;that[d78]();}else if(opts[n7r] === b1u){that[q0I]();}}else if(el[K9g](R3y)[S3n]){var Y_L=H21;Y_L+=s9Q;Y_L+=s1f;if(e[z3I] === o3n){var j6X=b_M;j6X+=q$J;var T1O=U_h;T1O+=o1v;el[T1O](j6X)[Z3r](s22);}else if(e[Y_L] === W$_){var r$H=S0Z;r$H+=C5Mnx.i36;r$H+=h$L;el[c17](z6U)[Z3r](r$H);}}});this[j2w][N4J]=function(){var T4C="eyup";var r$0=D2e;r$0+=T4C;var z2I=w4d;z2I+=C5Mnx[611221];z2I+=C5Mnx[611221];var K40=w4d;K40+=C5Mnx[611221];T6H.T5V();K40+=C5Mnx[611221];$(document)[K40](p1c + namespace);$(document)[z2I](r$0 + namespace);};return namespace;}function _inline(editFields,opts,closeCb){var N5_="oseReg";var p2_='px"';var n9s="liner";var o3T=" class=\"";var H4X="<div class=";var w0c='<div class="DTE_Processing_Indicator"><span></span></div>';var d_A="attachFields";var T1p="eys";var F4E="det";var x4Y="_inputTrigger";var g1u=" c";var q8e="ren";var K_h="userAgent";var f7s="wid";var l7s="dge";var O$t='.';var H4w="epla";var e1c="style=\"w";var A4X="idth:";var y$D=z6v;y$D+=N5_;var h$K=U5L;h$K+=J2l;T6H.J_Y();h$K+=n7K;var q8O=e7P;q8O+=C8D;q8O+=q89;var t9H=M6s;t9H+=D0z;t9H+=w4d;t9H+=a$n;var b4B=D2e;b4B+=T1p;var _this=this;if(closeCb === void B$r){closeCb=d4j;}var closed=S0J;var classes=this[O2I][H2I];var keys=Object[b4B](editFields);var editRow=editFields[keys[B$r]];var lastAttachPoint;var elements=[];for(var i=B$r;i < editRow[O_k][A56];i++){var name_1=editRow[d_A][i][B$r];elements[z_$]({field:this[j2w][o9B][name_1],name:name_1,node:$(editRow[O_k][i])});}var namespace=this[d9A](opts);var ret=this[t9H](m__);if(!ret){return this;}for(var _i=B$r,elements_1=elements;_i < elements_1[q8O];_i++){var Z_i=c8h;Z_i+=C5Mnx[440425];Z_i+=D0z;var u9E=C5Mnx[611221];u9E+=u7F;var Y$6=S0Z;Y$6+=g6T;Y$6+=R1u;Y$6+=j3o;var e6e=C5Mnx[574232];e6e+=H00;e6e+=Y54;var G$O=c8h;G$O+=C5Mnx[440425];G$O+=D0z;var u8q=C5Mnx[611221];u8q+=s9Q;u8q+=q_c;u8q+=C5Mnx[440425];var e7m=h7O;e7m+=H4w;e7m+=W_8;var r2E=C5Mnx[440425];r2E+=s9Q;r2E+=o1v;r2E+=Z8q;var t7u=C5Mnx[611221];t7u+=s9Q;t7u+=q$J;t7u+=C5Mnx[440425];var P_h=a1_;P_h+=o1v;P_h+=y37;var U2T=w7z;U2T+=s3F;U2T+=Z0k;U2T+=y37;var W9b=f60;W9b+=g1u;W9b+=e5s;W9b+=A50;var s6U=k7Y;s6U+=H6o;s6U+=Z0k;s6U+=y37;var e4f=p0h;e4f+=M35;var g6J=H4X;g6J+=p0h;var c3q=k7Y;c3q+=k$o;c3q+=o1v;c3q+=o3T;var J7l=f7s;J7l+=U7V;J7l+=L71;var h68=e1c;h68+=A4X;var K3w=R1u;K3w+=l7s;K3w+=H6o;var U1N=F4E;U1N+=q64;var y4O=w0M;y4O+=C5Mnx.n6y;y4O+=q$D;y4O+=j2w;var V8d=s1f;V8d+=k72;V8d+=q8e;var x$n=q$J;x$n+=i3R;x$n+=D0z;var el=elements_1[_i];var node=el[x$n];el[V8d]=node[y4O]()[U1N]();var style=navigator[K_h][k6X](K3w) !== -f$8?h68 + node[J7l]() + p2_:s93;node[B4G]($(c3q + classes[N_r] + K2e + g6J + classes[n9s] + e4f + style + y0b + w0c + s6U + W9b + classes[b_U] + U2T + P_h));node[t7u](r2E + classes[n9s][e7m](/ /g,O$t))[B4G](el[u8q][G$O]())[e6e](this[w3d][Y$6]);lastAttachPoint=el[u9E][Z_i]();if(opts[b_U]){var f48=f7o;f48+=j2w;var c1_=C5Mnx[440425];c1_+=w4d;c1_+=Y6s;var j74=y9P;j74+=C8D;j74+=C5Mnx[440425];var Q3L=J_m;Q3L+=v2A;node[C21](L6A + classes[Q3L][P3K](/ /g,O$t))[j74](this[c1_][f48]);}}var submitClose=this[x4Y](b1u,opts,lastAttachPoint);var cancelClose=this[h$K](r9K,opts,lastAttachPoint);this[y$D](function(submitComplete,action){var o10="rEa";var q5E=N4h;q5E+=b8f;q5E+=D0z;var A_S=T9t;A_S+=s9Q;A_S+=U7V;var T8R=w4d;T8R+=C5Mnx[611221];T8R+=C5Mnx[611221];closed=P4T;$(document)[T8R](g7m + namespace);if(!submitComplete || action !== A_S){var L6t=S0Z;L6t+=o10;L6t+=C5Mnx.i36;L6t+=L71;elements[L6t](function(el){var C90="conten";var V5g="hildren";var X9A=C5Mnx.i36;X9A+=V5g;var Z6Z=R73;Z6Z+=A5S;Z6Z+=i$7;var l8E=C90;l8E+=X1W;el[J1r][l8E]()[H67]();el[J1r][Z6Z](el[X9A]);});}submitClose();cancelClose();_this[Y_H]();if(closeCb){closeCb();}return q5E;;});setTimeout(function(){var k47="addB";var l2J="own";var r2b='andSelf';var F7A="target";var m3v="used";var Q9j=m3m;Q9j+=C4R;T6H.T5V();var G6r=w4d;G6r+=q$J;var P6P=S7_;P6P+=m3v;P6P+=l2J;var q1a=w4d;q1a+=q$J;var e$q=k47;e$q+=C5Mnx[574232];e$q+=a9u;var P8a=C5Mnx[611221];P8a+=q$J;if(closed){return;}var back=$[P8a][k4b]?e$q:r2b;var target;$(document)[q1a](P6P + namespace,function(e){target=e[F7A];})[C9S](p1c + namespace,function(e){T6H.T5V();target=e[F7A];})[G6r](Q9j + namespace,function(e){var Z_Z="_typ";var S_T=M7r;S_T+=L71;T6H.J_Y();var isIn=S0J;for(var _i=B$r,elements_2=elements;_i < elements_2[S_T];_i++){var q2F=o5r;q2F+=q8e;q2F+=X1W;var X6P=q$J;X6P+=k7d;var X$W=I38;X$W+=q$J;X$W+=j2w;var C$j=Z_Z;C$j+=K$K;var h$A=C5Mnx[611221];h$A+=s9Q;h$A+=D0z;h$A+=Q29;var el=elements_2[_i];if(el[h$A][C$j](X$W,target) || $[k0v](el[X6P][B$r],$(target)[q2F]()[back]()) !== -f$8){isIn=P4T;}}if(!isIn){var r5v=a$H;r5v+=e7P;r5v+=k93;r5v+=h7O;_this[r5v]();}});},B$r);this[e6_]($[w2q](elements,function(el){T6H.J_Y();return el[e$p];}),opts[o9Q]);this[y$3](m__,P4T);}function _inputTrigger(type,opts,insertPoint){var p35='click.dte-';var b5J='Trigger';var l0u="dren";var A4W='Html';var W6j="ildNode";var P4U="closest";var u2w='tr';var L46=C5Mnx[574232];L46+=A5S;L46+=a$n;L46+=C5Mnx[440425];var q0v=w4d;q0v+=q$J;var l7f=s1f;l7f+=W6j;l7f+=j2w;var L_C=O3h;L_C+=C5Mnx.i36;L_C+=D0z;var f97=Q_$;f97+=q$J;f97+=Z3N;f97+=i_g;var _this=this;var trigger=opts[type + b5J];T6H.J_Y();var html=opts[type + A4W];var event=p35 + type;var tr=$(insertPoint)[P4U](u2w);if(trigger === undefined){return function(){};}if(typeof trigger === U7h){var h3H=e7P;h3H+=T0q;var i3w=C5Mnx.i36;i3w+=u2p;i3w+=l0u;var kids=tr[i3w]();trigger=trigger < B$r?kids[kids[h3H] + trigger]:kids[trigger];}var children=$(trigger,tr)[f97]?Array[Z3T][L_C][j0y]($(trigger,tr)[B$r][l7f]):[];$(children)[H67]();var triggerEl=$(trigger,tr)[q0v](event,function(e){var d3V="stopImmediatePropagation";e[d3V]();T6H.J_Y();if(type === r9K){var j$W=C5Mnx.i36;j$W+=q1W;j$W+=j2w;j$W+=D0z;_this[j$W]();}else {_this[q0I]();}})[L46](html);return function(){T6H.J_Y();var Y_2=g3g;Y_2+=A5S;Y_2+=z60;var O_b=D_3;O_b+=C5Mnx[611221];triggerEl[O_b](event)[Y_2]()[B4G](children);};}function _optionsUpdate(json){var that=this;if(json && json[j_O]){var j_3=n_8;j_3+=D0z;j_3+=D8r;$[f9H](this[j2w][j_3],function(name,field){var t69="upd";T6H.J_Y();if(json[j_O][name] !== undefined){var H$M=c5M;H$M+=m4v;var c6z=n_8;c6z+=q_c;c6z+=C5Mnx[440425];var fieldInst=that[c6z](name);if(fieldInst && fieldInst[H$M]){var G$Q=t69;G$Q+=u2y;fieldInst[G$Q](json[j_O][name]);}}});}}function _message(el,msg,title,fn){var g$J="removeAttr";var I6W="fadeO";var B_9="isplaye";var o8h="fadeIn";var v3w=C5Mnx[574232];v3w+=q$J;v3w+=Z2_;v3w+=D0z;var canAnimate=$[C5Mnx.E0X][v3w]?P4T:S0J;if(title === undefined){title=S0J;}if(!fn){fn=function(){};}if(typeof msg === C5Mnx[604463]){var V2f=U7V;V2f+=v1w;V2f+=e7P;V2f+=D0z;var Z3F=y_O;Z3F+=A5S;Z3F+=s9Q;msg=msg(this,new DataTable$4[Z3F](this[j2w][V2f]));}el=$(el);if(canAnimate){var W0N=j2w;W0N+=U7V;W0N+=g4S;el[W0N]();}if(!msg){var a3x=C5Mnx[440425];a3x+=B_9;a3x+=C5Mnx[440425];if(this[j2w][a3x] && canAnimate){var h4A=I6W;h4A+=y22;el[h4A](function(){T6H.J_Y();el[i3e](s93);fn();});}else {var e4y=C5Mnx[440425];e4y+=g_z;e4y+=T7r;e4y+=E_v;var M2z=C5Mnx.i36;M2z+=j2w;M2z+=j2w;var a74=L71;a74+=U7V;a74+=Y6s;a74+=e7P;el[a74](s93)[M2z](e4y,G5s);fn();}if(title){el[g$J](E4H);}}else {fn();if(this[j2w][Q1t] && canAnimate){el[i3e](msg)[o8h]();}else {var P98=a$H;P98+=e7P;P98+=f8Z;var j6p=V8J;j6p+=j2w;el[i3e](msg)[j6p](M$U,P98);}if(title){var E9M=U7V;E9M+=s9Q;E9M+=p52;var s6g=C5Mnx[574232];s6g+=U7V;s6g+=U7V;s6g+=h7O;el[s6g](E9M,msg);}}}function _multiInfo(){var e5l="multiInfoShown";var V4L="sMultiV";var n$P="multiEdi";var c8z=O8a;c8z+=C5Mnx[440425];c8z+=j2w;var fields=this[j2w][c8z];var include=this[j2w][k22];var show=P4T;var state;if(!include){return;}for(var i=B$r,ien=include[A56];i < ien;i++){var m9D=s9Q;m9D+=V4L;m9D+=o2n;var p02=n$P;p02+=I8s;p02+=Q_$;var field=fields[include[i]];var multiEditable=field[p02]();if(field[c2y]() && multiEditable && show){state=P4T;show=S0J;}else if(field[m9D]() && !multiEditable){state=P4T;}else {state=S0J;}fields[include[i]][e5l](state);}}function _nestedClose(cb){var c0Z="oller";T6H.J_Y();var U$m="displayContr";var R9c="callback";var v12="ntroller";var U9K="playController";var Y1M="Co";var E8z=t_c;E8z+=q89;var J2$=t_c;J2$+=q89;var h8Y=j1_;h8Y+=U9K;var disCtrl=this[j2w][h8Y];var show=disCtrl[n1w];if(!show || !show[J2$]){if(cb){cb();}}else if(show[E8z] > f$8){var U5U=R73;U5U+=T_F;var z_L=C5Mnx[440425];z_L+=U7V;z_L+=D0z;var u$2=w4d;u$2+=a$n;var q5F=k_p;q5F+=x8a;q5F+=Y1M;q5F+=v12;var j8K=t_c;j8K+=Z3N;j8K+=U7V;j8K+=L71;var n8Q=A5S;n8Q+=w4d;n8Q+=A5S;show[n8Q]();var last=show[show[j8K] - f$8];if(cb){cb();}this[j2w][q5F][u$2](last[z_L],last[U5U],last[R9c]);}else {var b80=Z9Q;b80+=j2w;b80+=D0z;var C6B=U$m;C6B+=c0Z;this[j2w][C6B][b80](this,cb);show[A56]=B$r;}}function _nestedOpen(cb,nest){var x7q="displayControl";var Z9U="how";var p2w="_s";var v9Y=o7C;v9Y+=L9a;v9Y+=H00;v9Y+=h7O;var j7i=C5Mnx[440425];j7i+=w4d;j7i+=Y6s;var y4L=g4S;y4L+=D0z;y4L+=q$J;var W7d=x7q;W7d+=R2p;var Q$S=u0I;Q$S+=t0U;var Y$1=A5S;Y$1+=k93;Y$1+=j2w;Y$1+=L71;var D$N=p2w;D$N+=Z9U;T6H.T5V();var disCtrl=this[j2w][z3X];if(!disCtrl[n1w]){var q4e=s$x;q4e+=e9i;disCtrl[q4e]=[];}if(!nest){var F5c=R0v;F5c+=w4d;F5c+=o7C;disCtrl[F5c][A56]=B$r;}disCtrl[D$N][Y$1]({append:this[w3d][Q$S],callback:cb,dte:this});this[j2w][W7d][y4L](this,this[j7i][v9Y],cb);}function _postopen(type,immediate){var R$s="_multiInfo";var O_l="captureFocus";var Y2P="cus.editor-focus";var d73='submit.editor-internal';var p5A=".editor-internal";var E5E=w4d;E5E+=q$J;var K0c=j2w;K0c+=D08;K0c+=p5A;var H5O=w4d;H5O+=C3R;var G7c=C5Mnx[611221];G7c+=w4d;G7c+=h7O;G7c+=Y6s;var _this=this;var focusCapture=this[j2w][z3X][O_l];if(focusCapture === undefined){focusCapture=P4T;}$(this[w3d][G7c])[H5O](K0c)[E5E](d73,function(e){var w9m=Y7v;w9m+=I9t;e[w9m]();});if(focusCapture && (type === j8$ || type === Y_x)){var s4q=S0Z;s4q+=Y2P;$(U5H)[C9S](s4q,function(){var e_E="etFocus";var l7c="setFocus";var P_n='.DTE';var Y7i="are";var e7S='.DTED';var U4t="engt";var P4R="tiveElem";var w28=e7P;w28+=U4t;w28+=L71;var f6i=A5S;f6i+=Y7i;f6i+=q$J;f6i+=X1W;var R4w=C5Mnx[574232];R4w+=C5Mnx.i36;R4w+=P4R;T6H.J_Y();R4w+=q$D;if($(document[R4w])[f6i](P_n)[w28] === B$r && $(document[N1G])[K8O](e7S)[A56] === B$r){if(_this[j2w][l7c]){var S_G=j2w;S_G+=e_E;_this[j2w][S_G][o9Q]();}}});}this[R$s]();this[K0R](L7w,[type,this[j2w][d6C]]);if(immediate){this[K0R](B1w,[type,this[j2w][d6C]]);}return P4T;}function _preopen(type){var L4R="elOpen";var X$4="cInfo";var o$9="_clearDynami";var W8p="oseIcb";var d5m="seI";var j$F="canc";var u0G="bubb";var X96="cb";if(this[K0R](g37,[type,this[j2w][d6C]]) === S0J){var A2o=C5Mnx.i36;A2o+=b6v;A2o+=Z0m;A2o+=X96;var G3y=C5Mnx.i36;G3y+=e7P;G3y+=W8p;var J$V=u0G;J$V+=e7P;J$V+=D0z;var m1_=b8f;m1_+=k4$;var E7n=Y6s;E7n+=w4d;E7n+=C5Mnx[440425];E7n+=D0z;var m3q=j$F;m3q+=L4R;var B6x=o$9;B6x+=X$4;this[B6x]();this[K0R](m3q,[type,this[j2w][d6C]]);if((this[j2w][E7n] === m1_ || this[j2w][Z22] === J$V) && this[j2w][G3y]){var q6n=Z9Q;q6n+=d5m;q6n+=X96;this[j2w][q6n]();}this[j2w][A2o]=d4j;return S0J;}this[Y_H](P4T);this[j2w][Q1t]=type;return P4T;}function _processing(processing){var T37="eCl";var W0r="ggl";var h41='div.DTE';var e2T="active";var T96="wrapp";var g1H="event";var P9B=L75;P9B+=j2w;P9B+=w1d;P9B+=H1N;var i8D=s$x;i8D+=g1H;var S6B=s1y;S6B+=w4d;S6B+=b_j;var w32=Y7G;w32+=W0r;w32+=T37;w32+=e15;var f8H=T96;f8H+=k2c;var D6N=C5Mnx.i36;D6N+=e7P;D6N+=j$q;var procClass=this[D6N][P_s][e2T];$([h41,this[w3d][f8H]])[w32](procClass,processing);this[j2w][S6B]=processing;this[i8D](P9B,[processing]);}function _noProcessing(args){var t99=k2T;t99+=C5Mnx.i36;t99+=L71;var processing=S0J;$[t99](this[j2w][o9B],function(name,field){T6H.J_Y();if(field[P_s]()){processing=P4T;}});if(processing){this[P4A](f4u,function(){var G0$="noProcessing";var f90="ppl";var C9n=s$x;T6H.J_Y();C9n+=G0$;if(this[C9n](args) === P4T){var e$E=C5Mnx[574232];e$E+=f90;e$E+=E_v;var Z0t=w3n;Z0t+=S0e;Z0t+=s9Q;Z0t+=U7V;this[Z0t][e$E](this,args);}});}return !processing;}function _submit(successCallback,errorCallback,formatdata,hide){T6H.T5V();var A3E="rocess";var o0F='allIfChanged';var I5T="editCount";var x53="editData";var e2k=16;var j$r="eS";var x4m="itComplete";var f3x="_noProce";var e7Y="onComplete";var w$H="nComplete";var z3b="Field";var n2z=" is still p";var C1z=s1y;C1z+=j$r;C1z+=k93;C1z+=Q4N;var q_p=U87;q_p+=y1x;q_p+=U7V;var g93=D0z;g93+=C5Mnx[440425];g93+=Q5O;var f$m=C5Mnx[574232];f$m+=C5Mnx.i36;f$m+=t6O;f$m+=C9S;var L06=f3x;L06+=J6H;L06+=P4f;var y20=I70;y20+=S0e;y20+=s9Q;y20+=U7V;var n9Y=n_8;n9Y+=D0z;n9Y+=Q29;n9Y+=j2w;var _this=this;var changed=S0J;var allData={};var changedData={};var setBuilder=dataSet;var fields=this[j2w][n9Y];var editCount=this[j2w][I5T];var editFields=this[j2w][X9T];var editData=this[j2w][x53];var opts=this[j2w][L5q];var changedSubmit=opts[y20];var submitParamsLocal;if(this[L06](arguments) === S0J){var d_m=z3b;d_m+=n2z;d_m+=A3E;d_m+=P4f;var d7M=k2c;d7M+=A4Q;Editor[d7M](d_m,e2k,S0J);return;}var action=this[j2w][f$m];var submitParams={data:{}};submitParams[this[j2w][K4z]]=action;if(action === g2e || action === g93){var x7d=t_G;x7d+=e7P;var C_H=D0z;C_H+=C5Mnx[574232];C_H+=C5Mnx.i36;C_H+=L71;$[C_H](editFields,function(idSrc,edit){var N5d="isEmptyObje";var y$M=N5d;y$M+=l$H;var allRowData={};var changedRowData={};$[f9H](fields,function(name,field){var a6_="Get";var J5x=/\[.*$/;var z3s="mpare";var Q8V="xOf";var U_1="valFromData";var z87='[]';var S8n="any-c";var U2u="submittabl";var J$s="ount";var T8w="sAr";var X2A=U2u;X2A+=D0z;var Z0P=C5Mnx[611221];Z0P+=s9Q;Z0P+=D0z;Z0P+=D8r;if(edit[Z0P][name] && field[X2A]()){var A14=w0M;A14+=z3s;var z6V=D0z;z6V+=C5Mnx[440425];z6V+=s9Q;z6V+=U7V;var J0M=k0Y;J0M+=Y6s;J0M+=S8n;J0M+=J$s;var W3p=h7O;W3p+=y_K;W3p+=E_X;W3p+=D0z;var l0P=b8f;l0P+=i_o;l0P+=Q8V;var e9d=j2w;e9d+=p9i;e9d+=P4f;var b7Y=s9Q;b7Y+=T8w;b7Y+=I9c;var K3P=Y6s;K3P+=E65;K3P+=a6_;var multiGet=field[K3P]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var originalVal=field[U_1](edit[z3B]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=Array[b7Y](value) && typeof name === e9d && name[l0P](z87) !== -f$8?setBuilder(name[W3p](J5x,s93) + J0M):d4j;builder(allRowData,value);if(manyBuilder){var J19=t_c;J19+=q89;manyBuilder(allRowData,value[J19]);}if(action === z6V && (!editData[name] || !field[A14](value,editData[name][idSrc]))){builder(changedRowData,value);changed=P4T;if(manyBuilder){var R9n=Q_$;R9n+=f5k;R9n+=L71;manyBuilder(changedRowData,value[R9n]);}}}});if(!$[P$I](allRowData)){allData[idSrc]=allRowData;}if(!$[y$M](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === g2e || changedSubmit === x7d || changedSubmit === o0F && changed){submitParams[z3B]=allData;}else if(changedSubmit === v3X && changed){submitParams[z3B]=changedData;}else {var a6K=I70;a6K+=S0e;a6K+=x4m;var d1$=w4d;d1$+=w$H;var I9n=Z9Q;I9n+=K4m;var x9T=C5Mnx[574232];x9T+=l$H;x9T+=o9f;this[j2w][x9T]=d4j;if(opts[e7Y] === I9n && (hide === undefined || hide)){var j$x=i2g;j$x+=K4m;this[j$x](S0J);}else if(typeof opts[d1$] === C5Mnx[604463]){opts[e7Y](this);}if(successCallback){var w42=C5Mnx.i36;w42+=b0l;successCallback[w42](this);}this[Q8N](S0J);this[K0R](a6K);return;}}else if(action === f5l){$[f9H](editFields,function(idSrc,edit){T6H.J_Y();submitParams[z3B][idSrc]=edit[z3B];});}submitParamsLocal=$[q5Y](P4T,{},submitParams);if(formatdata){formatdata(submitParams);}this[q_p](C1z,[submitParams,action],function(result){var v3Z="_pro";if(result === S0J){var G93=v3Z;G93+=b_j;_this[G93](S0J);}else {var m3b=C5Mnx.i36;m3b+=C5Mnx[574232];m3b+=e7P;m3b+=e7P;var submitWire=_this[j2w][X0m]?_this[m2t]:_this[O2F];submitWire[m3b](_this,submitParams,function(json,notGood,xhr){T6H.J_Y();_this[I4c](json,notGood,submitParams,submitParamsLocal,_this[j2w][d6C],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var p0X="_submitError";var h7n=C5Mnx[574232];h7n+=l$H;h7n+=s9Q;T6H.J_Y();h7n+=C9S;_this[p0X](xhr,err,thrown,errorCallback,submitParams,_this[j2w][h7n]);},submitParams);}});}function _submitTable(data,success,error,submitParams){var N8B="idual";var E08='fields';var a6d="remo";var A4b="indiv";var V8j="modi";var V$V=a6d;V$V+=o1v;V$V+=D0z;var Z6F=s9Q;Z6F+=G$s;Z6F+=Y2_;var M12=C5Mnx[574232];M12+=C5Mnx.i36;M12+=t6O;M12+=C9S;T6H.J_Y();var action=data[M12];var out={data:[]};var idGet=dataGet(this[j2w][e9L]);var idSet=dataSet(this[j2w][Z6F]);if(action !== V$V){var r4Z=C5Mnx[440425];r4Z+=e00;var D$U=V8j;D$U+=n_8;D$U+=k2c;var e6P=A4b;e6P+=N8B;var q9c=s$x;q9c+=z3B;q9c+=O_W;q9c+=Q$C;var s9K=z5s;s9K+=b8f;var G4b=C_5;G4b+=D0z;var originalData_1=this[j2w][G4b] === s9K?this[q9c](E08,this[p1P]()):this[O8J](e6P,this[D$U]());$[f9H](data[r4Z],function(key,vals){var i_0="St";var K06=T9t;K06+=s9Q;K06+=U7V;var toSave;var extender=extend;if(action === K06){var rowData=originalData_1[key][z3B];toSave=extender({},rowData,P4T);toSave=extender(toSave,vals,P4T);}else {toSave=extender({},vals,P4T);}var overrideId=idGet(toSave);if(action === g2e && overrideId === undefined){var M28=U7V;M28+=w4d;M28+=i_0;M28+=Y$v;idSet(toSave,+new Date() + key[M28]());}else {idSet(toSave,overrideId);}out[z3B][z_$](toSave);});}success(out);}function _submitSuccess(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var x97="ocessing";var o2L='preEdit';var a5C='prep';var R6E="itSuccess";var l$O="mplet";var W5L="_dataS";var M9R="ors";var R2x="ldE";var W43="Data";var G9g="subm";var j3w="br>";var k_x="So";var O9D="_dataSou";var a4g="rrors";var h4O='submitUnsuccessful';var O5a='postEdit';var T$h="onCompl";var l8k="Creat";var Z1L="rce";var r6I="modifi";var L3f="cre";var u9I='commit';var D1H='postSubmit';var j7e="nCo";var t_L='postRemove';var C1u="onComp";var x1Z="mov";var n3x="stCre";var E4g="eve";var R39="fieldEr";var V2k="tCount";var Z5n="reRe";var g3s=s$x;g3s+=s1y;g3s+=x97;var X4$=X27;X4$+=i_g;var e8Z=R39;e8Z+=h7O;e8Z+=M9R;var R$B=D0z;R$B+=h7O;R$B+=P12;R$B+=h7O;var p4G=d9a;p4G+=e7P;p4G+=C5Mnx[440425];p4G+=x5V;var W1Z=r6I;W1Z+=k2c;var b1a=n_8;b1a+=z7r;b1a+=j2w;var _this=this;var that=this;var setData;var fields=this[j2w][b1a];var opts=this[j2w][L5q];var modifier=this[j2w][W1Z];this[K0R](D1H,[json,submitParams,action,xhr]);if(!json[y$B]){json[y$B]=s93;}if(!json[p4G]){json[Y0Y]=[];}if(notGood || json[R$B] || json[e8Z][X4$]){var q3b=s$x;q3b+=D0z;q3b+=y0Y;q3b+=C5Mnx.n6y;var o6p=k7Y;o6p+=j3w;var r1b=D0z;r1b+=j3o;var b4X=d9a;b4X+=R2x;b4X+=a4g;var K1j=D0z;K1j+=b2q;K1j+=w4d;K1j+=h7O;var globalError_1=[];if(json[K1j]){var I$1=s$T;I$1+=L71;globalError_1[I$1](json[y$B]);}$[f9H](json[b4X],function(i,err){var G94="tatus";var g3V="played";var Y6r="nFieldError";var A_u='Unknown field: ';var m6j="onFieldError";var y6a="ntent";var C_L='Error';var f4c="posi";var P2p="bodyC";var r9Z=C5Mnx[440425];r9Z+=L81;r9Z+=g3V;var P9F=q$J;P9F+=o$H;var field=fields[err[P9F]];if(!field){throw new Error(A_u + err[D4T]);}else if(field[r9Z]()){var y8l=E2g;y8l+=X8f;var U7s=j2w;U7s+=G94;field[y$B](err[U7s] || y8l);if(i === B$r){var D0O=N86;D0O+=s9Q;D0O+=w4d;D0O+=q$J;var Y8o=w4d;Y8o+=Y6r;if(opts[m6j] === s22){var A8C=C5Mnx[611221];A8C+=w4d;A8C+=p3i;A8C+=j2w;var i0D=U7V;i0D+=w4d;i0D+=A5S;var o8B=f4c;o8B+=s2C;var q$Z=c8h;q$Z+=i_o;var c6c=P2p;c6c+=w4d;c6c+=y6a;var v30=C5Mnx[440425];v30+=w4d;v30+=Y6s;_this[A4d]($(_this[v30][c6c]),{scrollTop:$(field[q$Z]())[o8B]()[i0D]},n$c);field[A8C]();}else if(typeof opts[Y8o] === D0O){opts[m6j](_this,err);}}}else {var D9D=j2w;D9D+=G94;var O$O=V85;O$O+=M35;var a8d=s$T;a8d+=L71;globalError_1[a8d](field[D4T]() + O$O + (err[D9D] || C_L));}});this[r1b](globalError_1[c3u](o6p));this[q3b](h4O,[json]);if(errorCallback){errorCallback[j0y](that,json);}}else {var R4Q=G9g;R4Q+=R6E;var H9m=x_i;H9m+=V2k;var store={};if(json[z3B] && (action === g2e || action === S49)){var s4R=O9D;s4R+=Z1L;var m4A=e7P;m4A+=D0z;m4A+=n0X;var u5b=T3S;u5b+=a1i;u5b+=O_W;u5b+=Q$C;this[u5b](a5C,action,modifier,submitParamsLocal,json,store);for(var _i=B$r,_a=json[z3B];_i < _a[m4A];_i++){var X_T=L3f;X_T+=u2y;var o7Z=K4m;o7Z+=U7V;o7Z+=W43;var I9u=F7L;I9u+=e00;I9u+=k_x;I9u+=U7G;var data=_a[_i];setData=data;var id=this[I9u](k5y,data);this[K0R](o7Z,[json,data,action]);if(action === X_T){var D$O=A5S;D$O+=w4d;D$O+=n3x;D$O+=u2y;var D1z=s$x;D1z+=D0z;D1z+=y0Y;D1z+=C5Mnx.n6y;var n0w=W5L;n0w+=c1Z;n0w+=Z1L;var j4b=U_h;j4b+=l8k;j4b+=D0z;var T9r=U87;T9r+=L87;this[T9r](j4b,[json,data,id]);this[n0w](g2e,fields,data,store);this[D1z]([g2e,D$O],[json,data,id]);}else if(action === S49){var p32=T9t;p32+=Q5O;var D7P=W5L;D7P+=c1Z;D7P+=h7O;D7P+=W_8;this[K0R](o2L,[json,data,id]);this[D7P](S49,modifier,fields,data,store);this[K0R]([p32,O5a],[json,data,id]);}}this[s4R](u9I,action,modifier,json[z3B],store);}else if(action === f5l){var x57=C5Mnx[440425];x57+=e00;var G_S=b9s;G_S+=E2M;var Y8W=l8p;Y8W+=x1Z;Y8W+=D0z;var E54=s$x;E54+=E4g;E54+=q$J;E54+=U7V;var v9p=h7O;v9p+=D0z;v9p+=Q3K;var s1k=A5S;s1k+=Z5n;s1k+=x1Z;s1k+=D0z;var Z1T=A5S;Z1T+=l8p;Z1T+=A5S;this[O8J](Z1T,action,modifier,submitParamsLocal,json,store);this[K0R](s1k,[json,this[g_9]()]);this[O8J](v9p,modifier,fields,store);this[E54]([Y8W,t_L],[json,this[g_9]()]);this[G_S](u9I,action,modifier,json[x57],store);}if(editCount === this[j2w][H9m]){var L41=C5Mnx[611221];L41+=k93;L41+=l8l;L41+=C9S;var R1N=T$h;R1N+=b6S;var K44=m3m;K44+=w4d;K44+=j2w;K44+=D0z;var Z1m=w4d;Z1m+=j7e;Z1m+=l$O;Z1m+=D0z;var w7s=K9D;w7s+=w4d;w7s+=q$J;var sAction=this[j2w][d6C];this[j2w][w7s]=d4j;if(opts[Z1m] === K44 && (hide === undefined || hide)){this[x23](json[z3B]?P4T:S0J,sAction);}else if(typeof opts[R1N] === L41){var L7D=C1u;L7D+=t90;opts[L7D](this);}}if(successCallback){successCallback[j0y](that,json);}this[K0R](R4Q,[json,setData,action]);}this[g3s](S0J);this[K0R](u3u,[json,setData,action]);}function _submitError(xhr,err,thrown,errorCallback,submitParams,action){var P$B="stSub";var D1Y='submitError';var D3P="_even";var A_4="system";var z8U=f58;z8U+=C5Mnx.n6y;var f17=D0z;f17+=b2q;f17+=w4d;f17+=h7O;var i3c=A5S;i3c+=w4d;i3c+=P$B;i3c+=D0W;var N9O=D3P;T6H.T5V();N9O+=U7V;this[N9O](i3c,[d4j,submitParams,action,xhr]);this[y$B](this[u9Q][f17][A_4]);this[Q8N](S0J);if(errorCallback){errorCallback[j0y](this,xhr,err,thrown);}this[z8U]([D1Y,u3u],[xhr,err,thrown,submitParams]);}function _tidy(fn){var W0Y="submitComple";var F4K="ubbl";var C8A="ServerSide";var A6O=a$H;A6O+=F4K;A6O+=D0z;var P_8=W75;P_8+=e7P;P_8+=x8a;var x2c=A5S;x2c+=g2Q;var s4X=U7V;s4X+=v1w;s4X+=e7P;T6H.T5V();s4X+=D0z;var U_g=y_O;U_g+=A5S;U_g+=s9Q;var q5y=z3B;q5y+=r1Q;var _this=this;var dt=this[j2w][N1O]?new $[C5Mnx.E0X][q5y][U_g](this[j2w][s4X]):d4j;var ssp=S0J;if(dt){var f2S=a$H;f2S+=C8A;ssp=dt[V5t]()[B$r][D8S][f2S];}if(this[j2w][x2c]){var h5_=W0Y;h5_+=K_g;this[P4A](h5_,function(){var n4q="dra";if(ssp){var G5p=n4q;G5p+=o7C;dt[P4A](G5p,fn);}else {setTimeout(function(){T6H.T5V();fn();},K9H);}});return P4T;}else if(this[v4C]() === m__ || this[P_8]() === A6O){var n9e=a$H;n9e+=G7O;this[P4A](k5_,function(){var L7y="cess";var C1N=s1y;C1N+=w4d;C1N+=L7y;C1N+=P4f;if(!_this[j2w][C1N]){setTimeout(function(){T6H.T5V();if(_this[j2w]){fn();}},K9H);}else {var C8r=w4d;C8r+=q$J;C8r+=D0z;_this[C8r](u3u,function(e,json){T6H.J_Y();var n1$='draw';if(ssp && json){dt[P4A](n1$,fn);}else {setTimeout(function(){if(_this[j2w]){fn();}},K9H);}});}})[n9e]();return P4T;}return S0J;}function _weakInArray(name,arr){for(var i=B$r,ien=arr[A56];i < ien;i++){if(name == arr[i]){return i;}}T6H.J_Y();return -f$8;}var fieldType={create:function(){},disable:function(){},enable:function(){},get:function(){},set:function(){}};var DataTable$3=$[C5Mnx.E0X][v8L];function _buttonText(conf,textIn){var T4d='Choose file...';var p5c='div.upload button';var k7w="loadText";var w7u=C5Mnx[611221];w7u+=R5_;var s67=s$x;s67+=X19;s67+=y22;if(textIn === d4j || textIn === undefined){var y2B=c5M;y2B+=k7w;textIn=conf[y2B] || T4d;}conf[s67][w7u](p5c)[i3e](textIn);}function _commonUpload(editor,conf,dropCallback,multiple){var d0P='<div class="eu_table">';var r59="<button ";var o01="div c";var G0F="dragD";var V7h="<button";var q29='dragover';var L2j="addClas";var u9t=" cla";var Z_U="Drag and drop a file h";var s6f="utton>";var u5J='dragover.DTE_Upload drop.DTE_Upload';var S4I="le]";var L_E="upload\">";var K2N="lass=\"cell l";var E9t="/i";var Q77="</d";var i6T='<div class="rendered"></div>';var U9i="/b";var Y69="s=\"cell\">";var Q8m='<div class="cell clearValue">';var j6Z='div.drop';var x06='<input type="file" ';var f8T="s=\"";var O7F="lass=\"edit";var Q$9=" clas";var g3Z="<div c";var p8V=" sp";var Y2s="put>";var V8y="ere to upload";var I0a="d\">";var u5$='"></button>';var F$w='<div class="drop"><span></span></div>';var Q3E="dragDropText";var Y4i='over';var z4N="FileReader";var e2r='dragleave dragexit';var L9t='input[type=file]';var J55="or_";var B2Z="div.drop";var S8I="iv.r";var P7y="imitHide\">";var U8M="<div class";var c0U='<div class="row">';var U$J="buttonInternal";var Z7o="Dro";var M_b='div.clearValue button';var C$r='<div class="cell upload limitHide">';var j1A="input[type=fi";var W6C="</div";var R$u="ndered";var n7A="ple";var a$s="=\"row secon";var a9L=b8f;a9L+=A5S;a9L+=k93;a9L+=U7V;var w_u=w4d;w_u+=q$J;var z4G=j1A;z4G+=S4I;var H4y=C5Mnx[611221];H4y+=s9Q;H4y+=q$J;H4y+=C5Mnx[440425];var d6K=G0F;d6K+=s8G;var u8h=s9Q;u8h+=C5Mnx[440425];var n15=s$x;n15+=E2J;var q3s=a1_;q3s+=o1v;q3s+=y37;var l2k=k7Y;l2k+=u34;l2k+=s9Q;l2k+=w5z;var g1Z=Q77;g1Z+=k3W;var W5p=s3F;W5p+=Z0k;W5p+=y37;var N$_=f60;N$_+=u9t;N$_+=j2w;N$_+=Y69;var e66=k7Y;e66+=o01;e66+=K2N;e66+=P7y;var v95=U8M;v95+=a$s;v95+=I0a;var l5d=k7Y;l5d+=H6o;l5d+=q9D;var j8J=W6C;j8J+=y37;var q9r=z5N;q9r+=U9i;q9r+=s6f;var H_B=V7h;H_B+=Q$9;H_B+=f8T;var v4r=k7Y;v4r+=u34;v4r+=k3W;var M5z=E81;M5z+=E9t;M5z+=q$J;M5z+=Y2s;var U_0=K7m;U_0+=t6O;U_0+=n7A;var f9A=r59;f9A+=p0I;var G0S=g3Z;G0S+=O7F;G0S+=J55;G0S+=L_E;var J$D=C5Mnx[611221];J$D+=w4d;J$D+=g6T;var k3x=M$I;k3x+=M7D;if(multiple === void B$r){multiple=S0J;}var btnClass=editor[k3x][J$D][U$J];var container=$(G0S + d0P + c0U + C$r + f9A + btnClass + u5$ + x06 + (multiple?U_0:s93) + M5z + v4r + Q8m + H_B + btnClass + q9r + j8J + l5d + v95 + e66 + F$w + V6U + N$_ + i6T + W5p + g1Z + l2k + q3s);conf[n15]=container;conf[m7A]=P4T;if(conf[u8h]){var K9h=s9Q;K9h+=C5Mnx[440425];var Y8t=C5Mnx[574232];Y8t+=U7V;Y8t+=p9i;container[C21](L9t)[Y8t](k5y,Editor[g3C](conf[K9h]));}if(conf[X5e]){var r5b=C5Mnx[574232];r5b+=P06;container[C21](L9t)[r5b](conf[X5e]);}_buttonText(conf);if(window[z4N] && conf[d6K] !== S0J){var y0x=m3m;y0x+=w4d;y0x+=j2w;y0x+=D0z;var A9H=w4d;A9H+=q$J;var W4f=w4d;W4f+=A5S;W4f+=D0z;W4f+=q$J;var h3Z=w4d;h3Z+=q$J;var V2L=w4d;V2L+=q$J;var Y6I=C5Mnx[440425];Y6I+=s8G;var c20=Z_U;c20+=V8y;var X25=B2Z;X25+=p8V;X25+=r4K;container[C21](X25)[K55](conf[Q3E] || c20);var dragDrop_1=container[C21](j6Z);dragDrop_1[C9S](Y6I,function(e){var w6D="originalEvent";var J69="emoveCla";var U2I="dataTransfer";var R58=s2t;R58+=e7P;R58+=T9t;if(conf[R58]){var w2j=h7O;w2j+=J69;w2j+=J6H;Editor[E35](editor,conf,e[w6D][U2I][N6t],_buttonText,dropCallback);dragDrop_1[w2j](Y4i);}return S0J;})[V2L](e2r,function(e){if(conf[m7A]){dragDrop_1[h3P](Y4i);}return S0J;})[h3Z](q29,function(e){if(conf[m7A]){var Q1p=X$I;Q1p+=f2D;Q1p+=C5Mnx[574232];Q1p+=J6H;dragDrop_1[Q1p](Y4i);}T6H.J_Y();return S0J;});editor[C9S](W4f,function(){var g3X=X83;g3X+=E_v;$(g3X)[C9S](u5J,function(e){T6H.J_Y();return S0J;});})[A9H](y0x,function(){var K5m="ody";var M7Y=a$H;T6H.T5V();M7Y+=K5m;$(M7Y)[v_e](u5J);});}else {var f7n=C5Mnx[440425];f7n+=S8I;f7n+=D0z;f7n+=R$u;var j6v=C5Mnx[611221];j6v+=R5_;var P2P=c8h;P2P+=Z7o;P2P+=A5S;var w52=L2j;w52+=j2w;container[w52](P2P);container[B4G](container[j6v](f7n));}container[H4y](M_b)[C9S](g7m,function(e){var f7A="ventD";var G$m=s2t;G$m+=e7P;G$m+=D0z;G$m+=C5Mnx[440425];var s4Y=U_h;s4Y+=f7A;s4Y+=V73;e[s4Y]();if(conf[G$m]){var e9s=C5Mnx.i36;e9s+=C5Mnx[574232];e9s+=e7P;e9s+=e7P;upload[C7p][e9s](editor,conf,s93);}});container[C21](z4G)[w_u](a9L,function(){var s$9=n_8;s$9+=e7P;s$9+=D0z;T6H.J_Y();s$9+=j2w;var X6M=M4X;X6M+=C5Mnx[440425];Editor[X6M](editor,conf,this[s$9],_buttonText,function(ids,error){var C_G="e=file]";var q3j="[typ";var t1s=b8f;t1s+=G31;t1s+=q3j;t1s+=C_G;var l14=C5Mnx[611221];l14+=b8f;T6H.J_Y();l14+=C5Mnx[440425];if(!error){dropCallback[j0y](editor,ids);}container[l14](t1s)[B$r][i06]=s93;});});return container;}function _triggerChange(input){T6H.T5V();setTimeout(function(){var l1x="gg";T6H.J_Y();var x7R=G8G;x7R+=l1x;x7R+=k2c;input[x7R](H5K,{editor:P4T,editorSet:P4T});;},B$r);}var baseFieldType=$[q5Y](P4T,{},fieldType,{canReturnSubmit:function(conf,node){T6H.T5V();return P4T;},disable:function(conf){var e5A=A5S;e5A+=s8G;conf[r6l][e5A](b4u,P4T);},enable:function(conf){var T8r=C5Mnx[440425];T8r+=z6n;var S9o=s$x;T6H.J_Y();S9o+=E2J;conf[S9o][S1$](T8r,S0J);},get:function(conf){var F91=o1v;F91+=t_G;T6H.T5V();return conf[r6l][F91]();},set:function(conf,val){var t5Y=j$U;t5Y+=q$J;t5Y+=G31;conf[r6l][Z_p](val);T6H.J_Y();_triggerChange(conf[t5Y]);}});var hidden={create:function(conf){var p4R="nput/>";var D5w=Y0b;D5w+=K2T;var b$5=c7p;b$5+=C5Mnx[574232];b$5+=e7P;var Z5B=D7Z;Z5B+=p4R;var P9o=s$x;T6H.T5V();P9o+=s9Q;P9o+=b6T;P9o+=y22;conf[P9o]=$(Z5B);conf[b$5]=conf[D5w];return d4j;},get:function(conf){var o_Y=c7p;o_Y+=t_G;return conf[o_Y];},set:function(conf,val){var O5i=j$U;O5i+=H0z;O5i+=U7V;var d83=s$x;d83+=o1v;d83+=t_G;var A1E=c7p;A1E+=C5Mnx[574232];A1E+=e7P;var oldVal=conf[A1E];conf[d83]=val;conf[O5i][Z_p](val);if(oldVal !== val){_triggerChange(conf[r6l]);}}};var readonly=$[s8h](P4T,{},baseFieldType,{create:function(conf){var t6z="only";var L44="rea";var X$Q="t/>";var E9H="<inpu";var i$5=U7V;i$5+=X4F;i$5+=U7V;var Q1G=L44;Q1G+=C5Mnx[440425];Q1G+=t6z;T6H.T5V();var b$6=s9Q;b$6+=C5Mnx[440425];var e8d=P$4;e8d+=C5Mnx[611221];e8d+=D0z;e8d+=o6I;var m45=I$e;m45+=U7V;m45+=h7O;var A_b=E9H;A_b+=X$Q;conf[r6l]=$(A_b)[m45]($[q5Y]({id:Editor[e8d](conf[b$6]),readonly:Q1G,type:i$5},conf[X5e] || ({})));return conf[r6l][B$r];}});var text=$[q5Y](P4T,{},baseFieldType,{create:function(conf){var J_9="/>";var s6p="feId";var b$2=P$4;b$2+=s6p;var P8t=S3o;P8t+=D0z;P8t+=q$J;P8t+=C5Mnx[440425];var C3U=k7Y;C3U+=E2J;C3U+=J_9;conf[r6l]=$(C3U)[X5e]($[P8t]({id:Editor[b$2](conf[D44]),type:s$$},conf[X5e] || ({})));return conf[r6l][B$r];}});var password=$[i0P](P4T,{},baseFieldType,{create:function(conf){var n_L='<input/>';var p_s="passwor";var w3H=s$x;w3H+=s9Q;w3H+=b6T;w3H+=y22;var R0y=C5Mnx[574232];R0y+=J88;R0y+=h7O;var P2t=p_s;P2t+=C5Mnx[440425];var B1a=s9Q;B1a+=C5Mnx[440425];var W7X=B0n;W7X+=Y54;var H5x=i$L;H5x+=y22;conf[H5x]=$(n_L)[X5e]($[W7X]({id:Editor[g3C](conf[B1a]),type:P2t},conf[R0y] || ({})));return conf[w3H][B$r];}});var textarea=$[q5Y](P4T,{},baseFieldType,{canReturnSubmit:function(conf,node){return S0J;},create:function(conf){var T0R='<textarea></textarea>';var m2v="tend";var O1L=s$x;O1L+=X19;O1L+=k93;T6H.T5V();O1L+=U7V;var C$L=s9Q;C$L+=C5Mnx[440425];var e1$=X4F;e1$+=m2v;var n0h=I$e;n0h+=p9i;conf[r6l]=$(T0R)[n0h]($[e1$]({id:Editor[g3C](conf[C$L])},conf[X5e] || ({})));return conf[O1L][B$r];}});var select=$[q5Y](P4T,{},baseFieldType,{_addOptions:function(conf,opts,append){var A8c="laceholder";var P_x="Value";var s5a="rDis";var F1o="ceh";var Q4b="ehol";var v3M="placeholderValue";var N1X="aceholde";T6H.J_Y();var b71="olderDisabled";var k7$="plac";var S40="hidden";var i17="pla";var K96="abled";if(append === void B$r){append=S0J;}var elOpts=conf[r6l][B$r][j_O];var countOffset=B$r;if(!append){var u39=k7$;u39+=Q4b;u39+=i_o;u39+=h7O;elOpts[A56]=B$r;if(conf[u39] !== undefined){var Y8z=z6N;Y8z+=N1X;Y8z+=s5a;Y8z+=K96;var p3h=i17;p3h+=F1o;p3h+=b71;var Y53=A5S;Y53+=A8c;Y53+=P_x;var placeholderValue=conf[Y53] !== undefined?conf[v3M]:s93;countOffset+=f$8;elOpts[B$r]=new Option(conf[T$E],placeholderValue);var disabled=conf[p3h] !== undefined?conf[Y8z]:P4T;elOpts[B$r][S40]=disabled;elOpts[B$r][l$v]=disabled;elOpts[B$r][g$p]=placeholderValue;}}else {countOffset=elOpts[A56];}if(opts){Editor[e7e](opts,conf[U1n],function(val,label,i,attr){T6H.J_Y();var a5S="ditor_val";var E03=U87;E03+=a5S;var option=new Option(label,val);option[E03]=val;if(attr){$(option)[X5e](attr);}elOpts[i + countOffset]=option;});}},create:function(conf){var H3K='change.dte';var l0A='<select></select>';var D7G="ultip";var j1b=w4d;j1b+=q$J;var S1p=Y6s;T6H.T5V();S1p+=D7G;S1p+=Q_$;var j3s=C5Mnx[574232];j3s+=J88;j3s+=h7O;conf[r6l]=$(l0A)[j3s]($[q5Y]({id:Editor[g3C](conf[D44]),multiple:conf[S1p] === P4T},conf[X5e] || ({})))[j1b](H3K,function(e,d){if(!d || !d[H$l]){var L5x=V4H;L5x+=U7V;conf[e27]=select[L5x](conf);}});select[N7B](conf,conf[j_O] || conf[H07]);return conf[r6l][B$r];},destroy:function(conf){var w_O="hange.dte";var q1M=C5Mnx.i36;q1M+=w_O;var R7y=w4d;R7y+=C5Mnx[611221];R7y+=C5Mnx[611221];var Z_n=s$x;Z_n+=s9Q;Z_n+=S9s;conf[Z_n][R7y](q1M);},get:function(conf){var t4h='option:selected';var J2y=Q_$;J2y+=n0X;var N8g=P6M;N8g+=l$V;N8g+=A5S;N8g+=Q_$;var f5$=C5Mnx[611221];T6H.T5V();f5$+=s9Q;f5$+=q$J;f5$+=C5Mnx[440425];var val=conf[r6l][f5$](t4h)[w2q](function(){var V9_="ditor_";var G2A=U87;G2A+=V9_;G2A+=Y0b;G2A+=e7P;return this[G2A];})[e$D]();if(conf[N8g]){var S1v=r1c;S1v+=h7O;S1v+=I$e;S1v+=X8f;return conf[S1v]?val[c3u](conf[D6J]):val;}return val[J2y]?val[B$r]:d4j;},set:function(conf,val,localUpdate){var j89="separat";var l7A='option';var I3V="Set";var t1P="sel";var b4U="_last";var P9D="tiple";var P$D="separ";var A68="ator";var S88=M7r;S88+=L71;var a9p=C5Mnx[611221];a9p+=s9Q;a9p+=q$J;a9p+=C5Mnx[440425];var Q$0=s$x;Q$0+=X19;Q$0+=k93;Q$0+=U7V;var Q3d=n_8;T6H.T5V();Q3d+=q$J;Q3d+=C5Mnx[440425];var a0_=M7r;a0_+=L71;var T_o=j89;T_o+=w4d;T_o+=h7O;var E1N=K7m;E1N+=P9D;if(!localUpdate){var p8T=b4U;p8T+=I3V;conf[p8T]=val;}if(conf[E1N] && conf[T_o] && !Array[r99](val)){var y3z=P$D;y3z+=A68;var Q_L=J6X;Q_L+=e7P;Q_L+=s9Q;Q_L+=U7V;var a8R=j2w;a8R+=p9i;a8R+=s9Q;a8R+=H1N;val=typeof val === a8R?val[Q_L](conf[y3z]):[];}else if(!Array[r99](val)){val=[val];}var i;var len=val[a0_];var found;var allFound=S0J;var options=conf[r6l][Q3d](l7A);conf[Q$0][a9p](l7A)[f9H](function(){var k4_="selected";found=S0J;for(i=B$r;i < len;i++){if(this[g$p] == val[i]){found=P4T;allFound=P4T;break;}}this[k4_]=found;});if(conf[T$E] && !allFound && !conf[l2o] && options[S88]){var q1_=t1P;q1_+=D0z;q1_+=l$H;q1_+=T9t;options[B$r][q1_]=P4T;}if(!localUpdate){var F8N=s$x;F8N+=E2J;_triggerChange(conf[F8N]);}return allFound;},update:function(conf,options,append){var O5l="_ad";var q_u="dOptions";var S7O=N4d;S7O+=A5S;S7O+=k93;S7O+=U7V;var M4o=O5l;M4o+=q_u;select[M4o](conf,options,append);var lastSet=conf[e27];if(lastSet !== undefined){var o8G=K4m;o8G+=U7V;select[o8G](conf,lastSet,P4T);}_triggerChange(conf[S7O]);}});var checkbox=$[q5Y](P4T,{},baseFieldType,{_addOptions:function(conf,opts,append){if(append === void B$r){append=S0J;}var jqInput=conf[r6l];var offset=B$r;T6H.T5V();if(!append){jqInput[B9y]();}else {var b2B=s9Q;b2B+=H0z;b2B+=U7V;offset=$(b2B,jqInput)[A56];}if(opts){Editor[e7e](opts,conf[U1n],function(val,label,i,attr){var n9F="safeI";var X$C="=";var E2l="<di";var z8s="heckbox\" />";var J17='value';var E3I="d=";var s5r="saf";var G3G=":las";var B1M="put i";var r_G="label>";var A0B="\" type=\"c";var A0q='input:last';var Y$K="l for";var C8o="<in";var o_b=C5Mnx[574232];o_b+=U7V;o_b+=U7V;o_b+=h7O;var y7U=E2J;y7U+=G3G;y7U+=U7V;var V5r=k7Y;V5r+=H6o;V5r+=r_G;var I8J=s9Q;I8J+=C5Mnx[440425];var Q9X=s5r;Q9X+=Z0m;Q9X+=C5Mnx[440425];var T3X=s4l;T3X+=Y$K;T3X+=X$C;T3X+=p0h;var o8w=A0B;o8w+=z8s;var D0S=n9F;D0S+=C5Mnx[440425];var Y5q=C8o;Y5q+=B1M;Y5q+=E3I;Y5q+=p0h;var S6l=E2l;S6l+=o1v;S6l+=y37;jqInput[B4G](S6l + Y5q + Editor[D0S](conf[D44]) + A$u + (i + offset) + o8w + T3X + Editor[Q9X](conf[I8J]) + A$u + (i + offset) + K2e + label + V5r + V6U);$(y7U,jqInput)[o_b](J17,val)[B$r][g$p]=val;if(attr){var W_N=H3u;W_N+=h7O;$(A0q,jqInput)[W_N](attr);}});}},create:function(conf){var f0x="div><";var l7Z=g5L;l7Z+=U7V;var x07=w4d;T6H.T5V();x07+=a2C;x07+=F9f;x07+=X3t;var z8y=k7Y;z8y+=f0x;z8y+=h18;conf[r6l]=$(z8y);checkbox[N7B](conf,conf[x07] || conf[H07]);return conf[l7Z][B$r];},disable:function(conf){var U_e=s9Q;T6H.T5V();U_e+=S9s;var U45=j$h;U45+=C5Mnx[440425];conf[r6l][U45](U_e)[S1$](b4u,P4T);},enable:function(conf){var G1b=C5Mnx[440425];G1b+=L81;G1b+=F2S;T6H.J_Y();G1b+=T9t;var v5A=A5S;v5A+=h7O;v5A+=g4S;var t6U=b8f;t6U+=G31;var p9v=i$L;p9v+=y22;conf[p9v][C21](t6U)[v5A](G1b,S0J);},get:function(conf){var F9N="sep";var U$Y="ara";var K87="ut:check";var c7k="rat";var d4G=r1c;d4G+=c7k;d4G+=X8f;var D4a=v55;D4a+=a2m;D4a+=q$J;var G7h=F9N;G7h+=U$Y;G7h+=U7V;G7h+=X8f;var w7k=X19;w7k+=K87;w7k+=T9t;var z4g=C5Mnx[611221];z4g+=R5_;var out=[];var selected=conf[r6l][z4g](w7k);if(selected[A56]){selected[f9H](function(){var E3S=A5S;E3S+=k93;T6H.J_Y();E3S+=j2w;E3S+=L71;out[E3S](this[g$p]);});}else if(conf[B2G] !== undefined){var a$9=R25;a$9+=j2w;a$9+=L71;out[a$9](conf[B2G]);}return conf[D6J] === undefined || conf[G7h] === d4j?out:out[D4a](conf[d4G]);},set:function(conf,val){var t$V="rra";T6H.T5V();var o27='|';var I2w="split";var c8f=D0z;c8f+=C5Mnx[574232];c8f+=C5Mnx.i36;c8f+=L71;var Y39=e7P;Y39+=D0z;Y39+=n0X;var v7g=L81;v7g+=o3f;var k74=L81;k74+=y_O;k74+=t$V;k74+=E_v;var U7t=s9Q;U7t+=S9s;var Y0N=C5Mnx[611221];Y0N+=s9Q;Y0N+=q$J;Y0N+=C5Mnx[440425];var jqInputs=conf[r6l][Y0N](U7t);if(!Array[k74](val) && typeof val === Z4A){val=val[I2w](conf[D6J] || o27);}else if(!Array[v7g](val)){val=[val];}var i;var len=val[Y39];var found;jqInputs[c8f](function(){T6H.J_Y();var y7r="itor_va";var i4h="_ed";found=S0J;for(i=B$r;i < len;i++){var e97=i4h;e97+=y7r;e97+=e7P;if(this[e97] == val[i]){found=P4T;break;}}this[g_n]=found;});_triggerChange(jqInputs);},update:function(conf,options,append){var v19=K4m;v19+=U7V;var u9j=Z3N;u9j+=S$C;var currVal=checkbox[u9j](conf);checkbox[N7B](conf,options,append);checkbox[v19](conf,currVal);}});var radio=$[V4_](P4T,{},baseFieldType,{_addOptions:function(conf,opts,append){T6H.T5V();var H30=s$x;H30+=s9Q;H30+=S9s;if(append === void B$r){append=S0J;}var jqInput=conf[H30];var offset=B$r;if(!append){jqInput[B9y]();}else {offset=$(r39,jqInput)[A56];}if(opts){var n1l=o5r;n1l+=G1$;n1l+=j2w;Editor[n1l](opts,conf[U1n],function(val,label,i,attr){var g4U=":last";var h3J="eId";var a_L="me=\"";var i1d="nput id=\"";var J6D="for=\"";var k2U="bel ";var c29='<div>';var w11="<la";var w$A="o\" ";var K5o="af";var i37="t:la";var Y9n="\" type=\"radi";var p2i="\" ";var F4S=o1v;F4S+=t_G;F4S+=k93;F4S+=D0z;var g2V=E2J;g2V+=g4U;var F5C=k7Y;F5C+=u34;F5C+=k3W;var b2D=p0h;b2D+=y37;var n$b=s9Q;n$b+=C5Mnx[440425];var a$Q=w11;a$Q+=k2U;a$Q+=J6D;var r0f=p2i;r0f+=H6o;r0f+=y37;var e87=Y9n;e87+=w$A;e87+=N8F;e87+=a_L;var m3y=j2w;m3y+=K5o;m3y+=h3J;var T6U=D7Z;T6U+=i1d;jqInput[B4G](c29 + T6U + Editor[m3y](conf[D44]) + A$u + (i + offset) + e87 + conf[D4T] + r0f + a$Q + Editor[g3C](conf[n$b]) + A$u + (i + offset) + b2D + label + g0r + F5C);$(g2V,jqInput)[X5e](F4S,val)[B$r][g$p]=val;if(attr){var B0N=C5Mnx[574232];B0N+=U7V;B0N+=U7V;B0N+=h7O;var n0N=X19;n0N+=k93;n0N+=i37;n0N+=f5U;$(n0N,jqInput)[B0N](attr);}});}},create:function(conf){var m8Z="div />";var A6$="ipOpt";var t_A=w4d;T6H.T5V();t_A+=d3c;t_A+=q$J;var S58=A6$;S58+=j2w;var S9P=k7Y;S9P+=m8Z;var r8j=g5L;r8j+=U7V;conf[r8j]=$(S9P);radio[N7B](conf,conf[j_O] || conf[S58]);this[C9S](t_A,function(){var q8M=s9Q;q8M+=q$J;q8M+=G31;var C47=n_8;C47+=q$J;C47+=C5Mnx[440425];T6H.T5V();conf[r6l][C47](q8M)[f9H](function(){T6H.T5V();if(this[B8U]){var o8O=s1f;o8O+=D0z;o8O+=G85;o8O+=C5Mnx[440425];this[o8O]=P4T;}});});return conf[r6l][B$r];},disable:function(conf){var L$h=b8f;L$h+=G31;T6H.J_Y();conf[r6l][C21](L$h)[S1$](b4u,P4T);},enable:function(conf){var J52="sabl";var B7q=C5Mnx[440425];B7q+=s9Q;B7q+=J52;B7q+=T9t;T6H.T5V();var e_6=i$L;e_6+=y22;conf[e_6][C21](r39)[S1$](B7q,S0J);},get:function(conf){var K6q="unsele";var R4A="ctedValue";var O_c=K6q;O_c+=R4A;var p_h=Q_$;p_h+=n0X;var el=conf[r6l][C21](V_N);if(el[p_h]){return el[B$r][g$p];}return conf[B2G] !== undefined?conf[O_c]:undefined;},set:function(conf,val){var F5P=s79;F5P+=L71;var s5_=g5L;s5_+=U7V;conf[s5_][C21](r39)[F5P](function(){var l74="reChecked";var z5I="preChecked";var l1G="_editor_v";var o0H=l1G;o0H+=t_G;T6H.T5V();this[B8U]=S0J;if(this[o0H] == val){var z6E=J4c;z6E+=l74;this[g_n]=P4T;this[z6E]=P4T;}else {var Q5p=s$x;Q5p+=z5I;this[g_n]=S0J;this[Q5p]=S0J;}});_triggerChange(conf[r6l][C21](V_N));},update:function(conf,options,append){var S$4="valu";var f2Q="[v";var G6T="dOption";var A$R=S$4;A$R+=D0z;var E8b=C5Mnx[574232];E8b+=U7V;E8b+=p9i;var E56=D0z;E56+=Y2j;var J1V=X27;J1V+=i_g;var s7p=p0h;s7p+=V2K;var M5M=f2Q;M5M+=o2n;M5M+=A50;var V_4=C5Mnx[611221];V_4+=R5_;var u6x=x1g;u6x+=C5Mnx[440425];u6x+=G6T;u6x+=j2w;T6H.J_Y();var currVal=radio[C29](conf);radio[u6x](conf,options,append);var inputs=conf[r6l][V_4](r39);radio[C7p](conf,inputs[S2_](M5M + currVal + s7p)[J1V]?currVal:inputs[E56](B$r)[E8b](A$R));}});var datetime=$[q5Y](P4T,{},baseFieldType,{create:function(conf){var j6n='DateTime library is required';var B9_="locale";var a$z="datetime";var F5x="oseFn";var k34="Time";var R0Y="picker";var f$G="yInp";var v3L="momentLo";var l0f="nput /";var k2V="momentStrict";var Q9T="momen";var W5F="displayFormat";var N_g="tLocale";var U_y=N4d;U_y+=A5S;U_y+=k93;U_y+=U7V;var H_O=s$x;H_O+=m3m;H_O+=F5x;var n4b=C5Mnx.i36;n4b+=P5E;var A47=w4d;A47+=q$J;var e9w=t0H;e9w+=f$G;e9w+=y22;var u2J=E7J;u2J+=e7P;u2J+=F5x;var B21=X4F;B21+=K_g;B21+=Y54;var I9B=s$x;I9B+=R0Y;var u2x=j2w;u2x+=G8G;u2x+=C5Mnx.i36;u2x+=U7V;var A2N=Q9T;A2N+=N_g;var U6_=w2V;U6_+=k34;var W_n=s9Q;W_n+=C5Mnx[440425];var c4m=B0n;c4m+=q$J;c4m+=C5Mnx[440425];var P8r=D7Z;P8r+=l0f;P8r+=y37;var P77=i$L;P77+=y22;conf[P77]=$(P8r)[X5e]($[c4m](P4T,{id:Editor[g3C](conf[W_n]),type:s$$},conf[X5e]));if(!DataTable$3[U6_]){Editor[y$B](j6n,i0h);}if(conf[A2N] && !conf[A$C][B9_]){var L_w=v3L;L_w+=m6D;L_w+=e7P;L_w+=D0z;var E_Z=g4S;E_Z+=X1W;conf[E_Z][B9_]=conf[L_w];}if(conf[k2V] && !conf[A$C][u2x]){var A_T=j2w;A_T+=p9i;A_T+=W7J;A_T+=U7V;conf[A$C][A_T]=conf[k2V];}conf[I9B]=new DataTable$3[Q_S](conf[r6l],$[B21]({format:conf[W5F] || conf[A4w],i18n:this[u9Q][a$z]},conf[A$C]));conf[u2J]=function(){var W4X=s$x;W4X+=T_A;W4X+=k2c;conf[W4X][h9k]();};if(conf[e9w] === S0J){var N8$=w4d;N8$+=q$J;var U$$=i$L;U$$+=k93;U$$+=U7V;conf[U$$][N8$](p1c,function(e){T6H.J_Y();e[d2j]();});}this[A47](n4b,conf[H_O]);return conf[U_y][B$r];},destroy:function(conf){var s0F="_closeFn";var k1u="eydown";var R$q=D2e;R$q+=k1u;var p$L=s$x;p$L+=b8f;p$L+=A5S;p$L+=y22;var y5R=m3m;y5R+=R8Z;T6H.J_Y();y5R+=D0z;this[v_e](y5R,conf[s0F]);conf[p$L][v_e](R$q);conf[V5C][X54]();},errorMessage:function(conf,msg){var j5v="_pic";var K6F="rrorM";var Y3M="ker";var O4V=D0z;O4V+=K6F;O4V+=f6y;var k3q=j5v;k3q+=Y3M;conf[k3q][O4V](msg);},get:function(conf){var J3h="wire";var P$e="For";var Q75="wir";var B7W="orma";var O2$="eFormat";var Y0L=j$U;Y0L+=q$J;Y0L+=R25;Y0L+=U7V;var j4S=Q75;j4S+=O2$;var f1D=Z_p;f1D+=P$e;f1D+=z5s;f1D+=U7V;var w0a=J3h;w0a+=j6g;w0a+=B7W;T6H.J_Y();w0a+=U7V;return conf[w0a]?conf[V5C][f1D](conf[j4S]):conf[Y0L][Z_p]();},maxDate:function(conf,max){var V7r="_pi";var j$A="cker";var T2B=Y6s;T2B+=A$a;var t3o=V7r;t3o+=j$A;conf[t3o][T2B](max);},minDate:function(conf,min){var n05=Y6s;n05+=b8f;conf[V5C][n05](min);},owns:function(conf,node){var h2L=w4d;h2L+=o7C;h2L+=q$J;h2L+=j2w;var S1W=J4c;T6H.T5V();S1W+=s9Q;S1W+=G85;S1W+=h7O;return conf[S1W][h2L](node);},set:function(conf,val){var r6M="mat";var X88="wireFor";var u2N="lF";var X3J="wireFormat";var t5D='--';var O5f=N4d;O5f+=G31;if(typeof val === Z4A && val && val[k6X](t5D) !== B$r && conf[X3J]){var W04=X88;W04+=r6M;var r_R=Y0b;r_R+=u2N;r_R+=d4w;conf[V5C][r_R](conf[W04],val);}else {var Y3x=s$x;Y3x+=T_A;Y3x+=k2c;conf[Y3x][Z_p](val);}_triggerChange(conf[O5f]);}});var upload=$[q5Y](P4T,{},baseFieldType,{canReturnSubmit:function(conf,node){T6H.T5V();return S0J;},create:function(conf){T6H.T5V();var editor=this;var container=_commonUpload(editor,conf,function(val){var n6d="nam";var H3G=n6d;H3G+=D0z;var R5P=m6D;R5P+=e7P;R5P+=e7P;var m6o=j2w;T6H.J_Y();m6o+=D0z;m6o+=U7V;upload[m6o][R5P](editor,conf,val[B$r]);editor[K0R](v1T,[conf[H3G],val[B$r]]);});return container;},disable:function(conf){var K7M="bled";var b8U="_ena";var q53=b8U;q53+=K7M;var G5y=A5S;G5y+=s8G;var p2O=s9Q;p2O+=b6T;p2O+=k93;p2O+=U7V;var m_3=j$h;m_3+=C5Mnx[440425];conf[r6l][m_3](p2O)[G5y](b4u,P4T);conf[q53]=S0J;},enable:function(conf){var f8G=s$x;f8G+=O8x;f8G+=C5Mnx[440425];var e0E=A5S;e0E+=h7O;e0E+=g4S;var k7T=s9Q;k7T+=q$J;k7T+=G31;var i88=C5Mnx[611221];i88+=s9Q;i88+=q$J;i88+=C5Mnx[440425];conf[r6l][i88](k7T)[e0E](b4u,S0J);conf[f8G]=P4T;},get:function(conf){T6H.J_Y();var O0t=s$x;O0t+=o1v;O0t+=t_G;return conf[O0t];},set:function(conf,val){var R6t='noClear';var G7N="Hand";var Q4c="n>";var r2V="No f";var a_r="div.c";var L2F=".e";var V7X="div.rend";var X7j="Value butto";var h_s="lear";var R5d="ered";var J2w="clearText";var a4m="</span";var P1v="spa";var D5j=E35;D5j+=L2F;D5j+=I_K;var e1i=G8G;e1i+=n7K;e1i+=G7N;e1i+=R2p;var L1o=b8f;L1o+=R25;L1o+=U7V;var w0h=j$U;w0h+=q$J;w0h+=R25;w0h+=U7V;var T$T=a_r;T$T+=h_s;T$T+=X7j;T$T+=q$J;var x8e=n_8;x8e+=q$J;x8e+=C5Mnx[440425];var H$Y=k_p;H$Y+=C5Mnx[574232];H$Y+=E_v;var Z78=j$U;T6H.J_Y();Z78+=H0z;Z78+=U7V;var k9Z=s$x;k9Z+=o1v;k9Z+=t_G;conf[k9Z]=val;conf[Z78][Z_p](s93);var container=conf[r6l];if(conf[H$Y]){var G9M=V7X;G9M+=R5d;var rendered=container[C21](G9M);if(conf[H6e]){var C6R=s$x;C6R+=o1v;C6R+=t_G;var R6G=k$o;R6G+=J6X;R6G+=e7P;R6G+=x8a;rendered[i3e](conf[R6G](conf[C6R]));}else {var i$W=a4m;i$W+=y37;var k2L=r2V;k2L+=K19;k2L+=D0z;var v8I=k7Y;v8I+=P1v;v8I+=Q4c;var G1h=R73;G1h+=A5S;G1h+=C8D;G1h+=C5Mnx[440425];rendered[B9y]()[G1h](v8I + (conf[a_1] || k2L) + i$W);}}var button=container[x8e](T$T);if(val && conf[J2w]){button[i3e](conf[J2w]);container[h3P](R6t);}else {container[A5Z](R6t);}conf[w0h][C21](L1o)[e1i](D5j,[conf[H6e]]);}});var uploadMany=$[S9T](P4T,{},baseFieldType,{_showHide:function(conf){var o$w="imit";var K1d="v.l";var X9X="imitHide";var o_T=Q_$;o_T+=q$J;o_T+=q89;var S_O=s$x;S_O+=o1v;S_O+=C5Mnx[574232];S_O+=e7P;var G0r=e7P;G0r+=o$w;var A7x=s$x;A7x+=r5Y;A7x+=E1n;var R3a=v1R;R3a+=Y6s;R3a+=Q5O;var Q_V=Q_$;Q_V+=q$J;Q_V+=Z3N;Q_V+=i_g;var h1s=s$x;T6H.T5V();h1s+=o1v;h1s+=C5Mnx[574232];h1s+=e7P;var D47=k$o;D47+=K1d;D47+=X9X;var S3G=v1R;S3G+=D0W;if(!conf[S3G]){return;}conf[F9r][C21](D47)[w8E](M$U,conf[h1s][Q_V] >= conf[R3a]?G5s:c7l);conf[A7x]=conf[G0r] - conf[S_O][o_T];},canReturnSubmit:function(conf,node){return S0J;},create:function(conf){var h9Z='button.remove';var X7S='multi';var editor=this;var container=_commonUpload(editor,conf,function(val){var F3c="nc";var A_c=s$x;A_c+=o1v;A_c+=C5Mnx[574232];A_c+=e7P;var t9a=U87;t9a+=L87;var Q9B=C5Mnx.i36;T6H.J_Y();Q9B+=t_G;Q9B+=e7P;var O4f=j2w;O4f+=D0z;O4f+=U7V;var y68=w0M;y68+=F3c;y68+=C5Mnx[574232];y68+=U7V;conf[H6e]=conf[H6e][y68](val);uploadMany[O4f][Q9B](editor,conf,conf[H6e]);editor[t9a](v1T,[conf[D4T],conf[A_c]]);},P4T);container[A5Z](X7S)[C9S](g7m,h9Z,function(e){var G0Y='idx';var y67="stopPropagation";e[y67]();if(conf[m7A]){var T3z=C5Mnx.i36;T3z+=C5Mnx[574232];T3z+=e7P;T3z+=e7P;var y3b=j2w;y3b+=D0z;y3b+=U7V;var i8e=s$x;i8e+=o1v;i8e+=C5Mnx[574232];i8e+=e7P;var W6L=O2S;W6L+=C5Mnx[574232];var idx=$(this)[W6L](G0Y);conf[i8e][k8V](idx,f$8);uploadMany[y3b][T3z](editor,conf,conf[H6e]);}});conf[F9r]=container;T6H.J_Y();return container;},disable:function(conf){var S8v="led";var A5x=s2t;A5x+=S8v;var K3U=C5Mnx[611221];K3U+=s9Q;K3U+=q$J;K3U+=C5Mnx[440425];conf[r6l][K3U](r39)[S1$](b4u,P4T);T6H.J_Y();conf[A5x]=S0J;},enable:function(conf){var m4a="enab";var E6J=s$x;T6H.J_Y();E6J+=m4a;E6J+=e7P;E6J+=T9t;var S$U=A5S;S$U+=h7O;S$U+=w4d;S$U+=A5S;conf[r6l][C21](r39)[S$U](b4u,S0J);conf[E6J]=P4T;},get:function(conf){var Q6n="_va";T6H.T5V();var j9c=Q6n;j9c+=e7P;return conf[j9c];},set:function(conf,val){var c9c="/u";var X_D="endTo";var k14="trig";var H5M="isAr";var H9i="oad.editor";var L5Z="erHandler";var B$_='div.rendered';var I0i='<span>';var n5I="l>";var x2r="Upload collections must have an array as a valu";var P6s=" files";var Q3G="upl";var x9L="Hide";var v6x="<ul";var V$z=Q3G;V$z+=H9i;var G1i=k14;G1i+=Z3N;G1i+=L5Z;var Y9J=C5Mnx[611221];Y9J+=s9Q;Y9J+=q$J;Y9J+=C5Mnx[440425];var U4r=j$U;U4r+=S9s;var U6H=R0v;U6H+=w4d;U6H+=o7C;U6H+=x9L;var E1P=k$o;E1P+=h1V;E1P+=E_v;var I5o=o1v;I5o+=C5Mnx[574232];I5o+=e7P;var B6s=j$U;B6s+=b6T;B6s+=k93;B6s+=U7V;var l_2=H5M;l_2+=L9a;l_2+=E_v;if(!val){val=[];}if(!Array[l_2](val)){var B3L=x2r;B3L+=D0z;throw new Error(B3L);}conf[H6e]=val;T6H.J_Y();conf[B6s][I5o](s93);var that=this;var container=conf[r6l];if(conf[E1P]){var X0G=n_8;X0G+=q$J;X0G+=C5Mnx[440425];var rendered=container[X0G](B$_)[B9y]();if(val[A56]){var L$C=k2T;L$C+=s1f;var O9A=y9P;O9A+=X_D;var C88=v6x;C88+=E81;C88+=c9c;C88+=n5I;var list_1=$(C88)[O9A](rendered);$[L$C](val,function(i,file){var C5Q='">&times;</button>';var P0x="button cl";var J_B='<li>';var l8F=" <";var O8n=' remove" data-idx="';var Z0O=k$o;Z0O+=J6X;Z0O+=e7P;Z0O+=x8a;var display=conf[Z0O](file,i);T6H.T5V();if(display !== d4j){var w0O=k7Y;w0O+=H6o;w0O+=v1R;w0O+=y37;var a05=l8F;a05+=P0x;a05+=e15;a05+=A50;list_1[B4G](J_B + display + a05 + that[O2I][z6_][f7o] + O8n + i + C5Q + w0O);}});}else {var C$v=K9O;C$v+=w4d;C$v+=P6s;rendered[B4G](I0i + (conf[a_1] || C$v) + L7Q);}}uploadMany[U6H](conf);conf[U4r][Y9J](r39)[G1i](V$z,[conf[H6e]]);}});var datatable=$[q5Y](P4T,{},baseFieldType,{_addOptions:function(conf,options,append){var y1w=C5Mnx[440425];y1w+=A_0;T6H.T5V();var B7H=P12;B7H+=m1$;var T$B=C5Mnx[440425];T$B+=U7V;if(append === void B$r){append=S0J;}var dt=conf[T$B];if(!append){dt[d5R]();}dt[B7H][X$I](options)[y1w]();},_jumpToFirst:function(conf,editor){var b$3="umber";var s2f="ndexes";var g8d="pplied";var x8w="floor";var T3e='div.dataTables_scrollBody';var X$5="plied";var q4R=i9V;q4R+=g5P;var E2b=A9f;E2b+=g3i;var J0s=A5S;J0s+=C5Mnx[574232];J0s+=V4H;var V19=q$J;V19+=b$3;var y3O=R73;y3O+=X$5;var a87=h7O;a87+=w4d;a87+=o7C;var dt=conf[Y4D];var idx=dt[a87]({order:y3O,selected:P4T})[g$y]();var page=B$r;if(typeof idx === V19){var M22=s9Q;M22+=s2f;var K93=C5Mnx[574232];K93+=g8d;var x8V=t_c;x8V+=q89;var pageLen=dt[M0Y][X2t]()[x8V];var pos=dt[M7H]({order:K93})[M22]()[k6X](idx);page=pageLen > B$r?Math[x8w](pos / pageLen):B$r;}dt[J0s](page)[E2b](S0J);var container=$(T3e,dt[N1O]()[q4R]());var scrollTo=function(){var d10="pli";var z_H=U7V;z_H+=w4d;z_H+=A5S;var X3r=I8Z;X3r+=w1d;X3r+=t6O;X3r+=C9S;var C79=L71;C79+=I0q;var W81=q$J;W81+=w4d;W81+=C5Mnx[440425];W81+=D0z;var z8t=R73;z8t+=d10;z8t+=D0z;z8t+=C5Mnx[440425];var node=dt[y8v]({order:z8t,selected:P4T})[W81]();var height=container[C79]();var top=$(node)[X3r]()[z_H];if(top > height - K9H){container[j0f](top);}};if(container[A56]){var y$t=e7P;y$t+=C8D;y$t+=q89;if(container[K8O](U5H)[y$t]){scrollTo();}else {var C5s=w4d;C5s+=d3c;C5s+=q$J;editor[P4A](C5s,function(){scrollTo();});}}},create:function(conf){var k4G="_add";var n0Q="Option";var Z7T="t.dt";var L65='<tr>';var Y9H="taT";var q_2="tCompl";var f09="0";var J3T="e>";var y56="0%";var N5i="optionsPai";var s0y="config";var U4I='<div class="DTE_Field_Type_datatable_info">';var v2p="L";var G6g="ngl";var q1H="optio";var z5u='fiBtp';var L1f='Search';var c_B="bleCla";var J_o="er-";var W6$="<t";var x$t="tfoot";var h0A="addC";var I0H=q1H;I0H+=X3t;var D8J=k4G;D8J+=n0Q;D8J+=j2w;var A2_=h$L;A2_+=J_o;A2_+=s41;var M9w=w4d;M9w+=q$J;var n1O=w4d;n1O+=q$J;var M5o=j2w;M5o+=s9Q;M5o+=G6g;M5o+=D0z;var p_U=v2p;p_U+=v1w;p_U+=D0z;p_U+=e7P;var m6h=N5i;m6h+=h7O;var x5t=E1s;x5t+=Y9H;x5t+=v1w;x5t+=Q_$;var U$a=Z9D;U$a+=Z7T;var x8t=f9q;x8t+=f09;x8t+=y56;var w48=a1i;w48+=c_B;w48+=j2w;w48+=j2w;var y9h=h0A;y9h+=e7P;y9h+=v4S;y9h+=j2w;var C19=y9P;C19+=C8D;C19+=C5Mnx[440425];var b5k=k7Y;b5k+=C5Mnx[440425];b5k+=W2Y;b5k+=y37;var t89=W6$;t89+=v1w;t89+=e7P;t89+=J3T;var e0s=Y0b;e0s+=e7P;e0s+=a$h;var _this=this;conf[U1n]=$[q5Y]({label:V8f,value:e0s},conf[U1n]);var table=$(t89);var container=$(b5k)[C19](table);var side=$(U4I);if(conf[I66]){var J9y=C5Mnx[611221];J9y+=w4d;J9y+=v_R;J9y+=k2c;var r4v=g_H;r4v+=m8Y;var a4J=Y6s;a4J+=C5Mnx[574232];a4J+=A5S;var a3Q=R73;a3Q+=d3c;a3Q+=Y54;var f6d=J2M;f6d+=E_v;var m8L=C5Mnx[574232];m8L+=A5S;m8L+=T_F;var h6y=k7Y;h6y+=x$t;h6y+=y37;$(h6y)[m8L](Array[f6d](conf[I66])?$(L65)[a3Q]($[a4J](conf[r4v],function(str){var v48='<th>';var N$D=L71;N$D+=U7V;N$D+=Y6s;N$D+=e7P;return $(v48)[N$D](str);})):conf[J9y])[T41](table);}var dt=table[y9h](datatable[w48])[M97](x8t)[C9S](U$a,function(e,settings){var w41="div.dt-bu";var p1_="tons";var m3t="div.dataTa";var M03="es_info";var v7T="s_";var q7E="nit";var b87="iv.data";var E7H="Ta";var q_0=C5Mnx[440425];q_0+=b87;q_0+=F0V;q_0+=M03;var V8Q=w41;V8Q+=U7V;V8Q+=p1_;var D$F=j$h;D$F+=C5Mnx[440425];var k3s=m3t;k3s+=q91;k3s+=v7T;k3s+=S2_;var y6Y=s9Q;y6Y+=q7E;var I2D=i9V;I2D+=g5P;var D1N=Z5w;D1N+=s9Q;var f08=q$J;f08+=E7H;f08+=y$N;f08+=D0z;if(settings[f08] !== table[B$r]){return;}var api=new DataTable$3[D1N](settings);var containerNode=$(api[N1O](undefined)[I2D]());DataTable$3[s41][y6Y](api);side[B4G](containerNode[C21](k3s))[B4G](containerNode[D$F](V8Q))[B4G](containerNode[C21](q_0));})[x5t]($[q5Y]({buttons:[],columns:[{data:conf[m6h][n13],title:p_U}],deferRender:P4T,dom:z5u,language:{paginate:{next:y0b,previous:h7Y},search:s93,searchPlaceholder:L1f},lengthChange:S0J,select:{style:conf[l2o]?t08:M5o}},conf[s0y]));this[n1O](L7w,function(){var B3Y="lumn";var n9M="djus";var r$J="search";var D_y="searc";var x7z=C5Mnx[574232];x7z+=n9M;x7z+=U7V;var P3U=w0M;P3U+=B3Y;P3U+=j2w;if(dt[r$J]()){var d6d=C5Mnx[440425];d6d+=A_0;var Z_$=D_y;Z_$+=L71;dt[Z_$](s93)[d6d]();}dt[P3U][x7z]();});dt[M9w](A2_,function(){var B1j=i9V;B1j+=g5P;var W5J=Z$T;W5J+=D0z;T6H.T5V();var E_5=C5Mnx[440425];E_5+=U7V;_triggerChange($(conf[E_5][W5J]()[B1j]()));});if(conf[H$l]){var o77=j2w;o77+=Q$z;o77+=q_2;o77+=b6S;conf[H$l][N1O](dt);conf[H$l][C9S](o77,function(e,json,data,action){var C03="_jumpToFirst";var D6B="ref";var C8e=D0z;T6H.T5V();C8e+=C5Mnx[440425];C8e+=s9Q;C8e+=U7V;if(action === g2e){var P8N=O2S;P8N+=C5Mnx[574232];var _loop_1=function(dp){dt[M7H](function(idx,d){return d === dp;})[s41]();};for(var _i=B$r,_a=json[P8N];_i < _a[A56];_i++){var dp=_a[_i];_loop_1(dp);}}else if(action === C8e || action === f5l){var L5c=D6B;L5c+=h7O;L5c+=O2f;L5c+=L71;var C$o=F7L;C$o+=C5Mnx[574232];C$o+=U7V;C$o+=E2M;_this[C$o](L5c);}datatable[C03](conf,_this);});}conf[Y4D]=dt;datatable[D8J](conf,conf[I0H] || []);return {input:container,side:side};},disable:function(conf){var G$H="sele";var Q_U=q$J;Q_U+=C9S;Q_U+=D0z;var o7N=b_M;o7N+=X3t;var Q1y=C5Mnx[440425];Q1y+=U7V;var Z7t=C5Mnx[574232];Z7t+=A5S;Z7t+=s9Q;var s$0=G$H;s$0+=C5Mnx.i36;s$0+=U7V;conf[Y4D][s$0][n7w](Z7t);T6H.T5V();conf[Q1y][o7N]()[B6$]()[w8E](M$U,Q_U);},dt:function(conf){return conf[Y4D];},enable:function(conf){var C5L="gle";var W0S="yl";var b3w="sin";var S6C=b_M;S6C+=X3t;var u19=C5Mnx[440425];u19+=U7V;var r$b=b3w;r$b+=C5L;var q$6=j2w;q$6+=U7V;q$6+=W0S;q$6+=D0z;var t3z=C5Mnx[440425];t3z+=U7V;conf[t3z][s41][q$6](conf[l2o]?t08:r$b);conf[u19][S6C]()[B6$]()[w8E](M$U,c7l);},get:function(conf){var k8v="luc";var F$q="rato";var k2l=j2w;k2l+=t0v;k2l+=F$q;k2l+=h7O;var L9Y=U2k;L9Y+=G1$;var y4d=A5S;y4d+=k8v;y4d+=D2e;var H$4=P12;H$4+=m1$;var g9Y=C5Mnx[440425];g9Y+=U7V;var rows=conf[g9Y][H$4]({selected:P4T})[z3B]()[y4d](conf[L9Y][i06])[e$D]();return conf[k2l] || !conf[l2o]?rows[c3u](conf[D6J] || K67):rows;},set:function(conf,val,localUpdate){var C_o="_j";T6H.T5V();var s20="ToF";var N0e="irst";var I92="elec";var T0W="ump";var D4g=C_o;D4g+=T0W;D4g+=s20;D4g+=N0e;var T5z=h7O;T5z+=w4d;T5z+=o7C;T5z+=j2w;var H46=j88;H46+=I92;H46+=U7V;var r7s=Y0b;r7s+=e7P;r7s+=a$h;var g0J=U2k;g0J+=s9Q;g0J+=h7O;if(conf[l2o] && conf[D6J] && !Array[r99](val)){var Z8s=j2w;Z8s+=t0v;Z8s+=L9a;Z8s+=o5R;var i0Z=Z2E;i0Z+=Q5O;val=typeof val === Z4A?val[i0Z](conf[Z8s]):[];}else if(!Array[r99](val)){val=[val];}var valueFn=dataGet(conf[g0J][r7s]);conf[Y4D][M7H]({selected:P4T})[H46]();conf[Y4D][T5z](function(idx,data,node){T6H.J_Y();return val[k6X](valueFn(data)) !== -f$8;})[s41]();datatable[D4g](conf,this);if(!localUpdate){var n4u=U7V;n4u+=c0b;var Y3U=C5Mnx[440425];Y3U+=U7V;_triggerChange($(conf[Y3U][n4u]()[B6$]()));}},tableClass:s93,update:function(conf,options,append){var D2U=C5Mnx[440425];T6H.J_Y();D2U+=U7V;datatable[N7B](conf,options,append);var lastSet=conf[e27];if(lastSet !== undefined){var B5E=j2w;B5E+=D0z;B5E+=U7V;datatable[B5E](conf,lastSet,P4T);}_triggerChange($(conf[D2U][N1O]()[B6$]()));}});var defaults={className:s93,compare:d4j,data:s93,def:s93,entityDecode:P4T,fieldInfo:s93,getFormatter:d4j,id:s93,label:s93,labelInfo:s93,message:s93,multiEditable:P4T,name:d4j,nullDefault:S0J,setFormatter:d4j,submit:P4T,type:f5d};var DataTable$2=$[L4K][C5Mnx.h0r];var Field=(function(){var O5$="iR";var x1Q="rot";var X9k="totyp";var V79="iInf";var b25="slideDown";var J1A="isplayed";var G03="isMultiV";var X7O="multiValue";var k$A="_msg";var S8k="mult";var r5W="ompare";var f23="iEdi";var s3a="prototy";var S9L="tiValueCheck";var s2L="peFn";var l5V="formatte";var O2x="ototyp";var R69="labelInfo";var M8x="yp";var H5J="cla";var H$0="host";var j6l="prot";var z0o="setFormatter";var J0a="rNode";var D4p="rotot";var S73="multiValues";var T9g="Def";var d6h="toty";var a2Y="otype";var T$A="oto";var X59="prototyp";var I3W="ototype";var k$e="oty";var W8B="_typeFn";var z_7="tiIds";var Q_v="ml";var C1L="inputControl";var X_H="multiRestore";var W7u="ht";var D2v="proto";var n_W="ieldInfo";var d7v="update";var j_y="null";var K8A="Shown";var Y2k="totype";var V6o="multiInfo";var t2n="multiIds";var h5T="typ";var q8E="ubmitta";var N87="protot";var c3C="sses";var V5c='input, select, textarea';var w4r="rototype";var B$S="enabled";var Y9i=l5V;Y9i+=h7O;Y9i+=j2w;var M8F=s$x;M8F+=C5Mnx[611221];M8F+=d4w;var C0F=A5S;C0F+=w4r;var r9o=s$x;r9o+=k2c;r9o+=P12;r9o+=J0a;var t6s=D2v;t6s+=h5T;t6s+=D0z;var z$p=N87;z$p+=y1R;var G_e=J67;G_e+=E2n;G_e+=S9L;var h5t=j6l;h5t+=w4d;h5t+=F1c;var Q$8=j2w;Q$8+=q8E;Q$8+=q91;var P7o=A5S;P7o+=x1Q;P7o+=k$e;P7o+=d3c;var W6R=Y6s;W6R+=P$v;W6R+=O5$;W6R+=w8D;var F_W=S8k;F_W+=V79;F_W+=w4d;F_W+=K8A;var Y8e=Y6s;Y8e+=E2n;Y8e+=z_7;var v3j=A5S;v3j+=D4p;v3j+=M8x;v3j+=D0z;var G8Q=K7m;G8Q+=U7V;G8Q+=f23;G8Q+=N1O;var H40=D2v;H40+=F1c;var W2B=D2v;W2B+=h5T;W2B+=D0z;var m6q=Y2S;m6q+=A8U;m6q+=h7O;m6q+=C5Mnx.i36;var q7L=C5Mnx.i36;q7L+=r5W;var w0G=o1v;w0G+=C5Mnx[574232];w0G+=e7P;var Z6N=V5V;Z6N+=X9k;Z6N+=D0z;var s1Q=s1y;s1Q+=O2x;s1Q+=D0z;var H_2=X59;H_2+=D0z;var b6D=j2w;b6D+=D0z;b6D+=U7V;var k0q=s1y;k0q+=T$A;k0q+=F1c;var I41=r7_;I41+=H1N;var A8t=j6l;A8t+=v_R;A8t+=y1R;var o1w=j_y;o1w+=T9g;o1w+=D5d;var Y4F=N87;Y4F+=E_v;Y4F+=d3c;var n1t=q$J;n1t+=i3R;n1t+=D0z;var I1k=s1y;I1k+=w4d;I1k+=d6h;I1k+=d3c;var i$n=A5S;i$n+=P12;i$n+=U7V;i$n+=a2Y;var x_6=A5S;x_6+=h7O;x_6+=O2x;x_6+=D0z;var X84=s1y;X84+=v_R;X84+=a2Y;var j1Z=C5Mnx.U3r;j1Z+=j2w;j1Z+=j2w;j1Z+=S09;var C$1=j6l;C$1+=w4d;C$1+=F1c;var A09=X8g;A09+=C5Mnx[440425];A09+=D0z;var R5G=V5V;R5G+=Y7G;R5G+=U7V;R5G+=y1R;var G_9=A5S;G_9+=h7O;G_9+=I3W;var v5I=C5Mnx[611221];v5I+=w4d;v5I+=p3i;v5I+=j2w;var J6O=b8f;J6O+=G31;var N4S=b8f;N4S+=c3K;N4S+=h7O;var n1M=V5V;n1M+=Y2k;var X5j=G03;X5j+=o2n;var b3p=A5S;b3p+=w4r;var E3E=C5Mnx[611221];E3E+=n_W;var K5z=s3a;K5z+=A5S;K5z+=D0z;var A5t=s1y;A5t+=T$A;A5t+=F1c;var S6K=C5Mnx[440425];S6K+=J1A;var A7B=V5V;A7B+=Y7G;A7B+=U7V;A7B+=y1R;var i0U=A5S;i0U+=w4r;function Field(options,classes,host){var J0T="ms";var w74="fix";var c1d="-info";var T9H="msg-m";var S0s="msg-l";var h65="<div data-dte-e=\"input-contr";var a_W="\"></d";var h_I='<div data-dte-e="msg-message" class="';var X4P="ultiRestore";var D3S='msg-error';var h0o="classNa";var S3K="alFro";var N5u="field-pr";var j8Q='Error adding field - unknown field type ';var o9o='<div data-dte-e="msg-multi" class="';var S8x='" for="';var c$I="ults";var N1T="mDa";var v3k="ta-dte-e=\"mult";var R1P='<div data-dte-e="msg-error" class="';var J4h='msg-info';var X5H="ata-dte-e=\"msg-i";var j9I='"><span></span></div>';var q1p="ol\" class=\"";var U1$="input-c";var j5U="ePre";var C7f="msg";var F$2="/div";var a2y='<div data-dte-e="field-processing" class="';var l1D="trol";var M$b='DTE_Field_';var J0z=" d";var p_W="iValue";var C0H='<div data-dte-e="input" class="';var D2k='<span data-dte-e="multi-info" class="';var U7P="eturn";var L0m="-value\" class=\"";var n9Q="typePrefix";var P34="ieldTypes";var Y7X="<div da";var G7e='msg-message';var p3g="-i";var k_D="l data-dte-e=\"label\" class=\"";var k_l="nfo\" class=\"";var h1_='input-control';var l0M="g-";var d_9="-dte-e=\"msg-label\" class=\"";var N6m=D0z;N6m+=C5Mnx[574232];N6m+=s1f;var o82=w4d;o82+=q$J;var I5p=S8k;I5p+=O5$;I5p+=U7P;var S3e=C5Mnx[440425];S3e+=w4d;S3e+=Y6s;var h2T=C5Mnx[440425];h2T+=A8P;var x0B=N5u;x0B+=w4d;x0B+=b_j;var J9P=T9H;J9P+=E65;var o2_=P6M;o2_+=e7P;o2_+=t6O;o2_+=c1d;var n1r=Y6s;n1r+=E65;n1r+=z5T;var W0n=S0s;W0n+=C5Mnx[574232];W0n+=a$H;W0n+=q_c;var n1P=C5Mnx[574232];n1P+=u1d;n1P+=i$7;var G2X=L$N;G2X+=q_c;var E8W=j2w;E8W+=s9Q;E8W+=i_o;var g2M=J9h;g2M+=D0z;var Z6o=e1z;Z6o+=M8x;Z6o+=D0z;Z6o+=y15;var Q73=k7Y;Q73+=h18;var E5k=k9y;E5k+=P4f;var z1_=s3F;z1_+=C5Mnx[440425];z1_+=W2Y;z1_+=y37;var s_T=d9a;s_T+=Q29;s_T+=B0b;var L$z=p0h;L$z+=y37;var C1a=C7f;C1a+=p3g;C1a+=q$J;C1a+=S0Z;var F8e=f60;F8e+=J0z;F8e+=X5H;F8e+=k_l;var p6c=k7Y;p6c+=F$2;p6c+=y37;var m2Q=Y6s;m2Q+=D0z;m2Q+=J6H;m2Q+=S09;var N8x=p0h;N8x+=y37;var s8d=l8p;s8d+=f5U;s8d+=w4d;s8d+=l8p;var Y2M=p0h;Y2M+=y37;T6H.J_Y();var z8g=Y6s;z8g+=X4P;var M7x=a1_;M7x+=w5z;var x9_=p0h;x9_+=y37;var p$F=h90;p$F+=Q_$;var k$8=p0h;k$8+=y37;var e14=Y6s;e14+=E2n;e14+=U7V;e14+=p_W;var X9H=Y7X;X9H+=v3k;X9H+=s9Q;X9H+=L0m;var l6U=a_W;l6U+=s9Q;l6U+=w5z;var n5j=h65;n5j+=q1p;var A9v=p0h;A9v+=y37;var f_t=p0h;f_t+=y37;var V8O=J0T;V8O+=l0M;V8O+=n13;var s6y=a2g;s6y+=d_9;var q2p=p0h;q2p+=y37;var v2y=s9Q;v2y+=C5Mnx[440425];var n_2=e7P;n_2+=v1w;n_2+=D0z;n_2+=e7P;var p5T=s4l;p5T+=k_D;var x8T=p0h;x8T+=y37;var Y8n=h0o;Y8n+=C5Mnx.U3r;var y8J=q$J;y8J+=C5Mnx[574232];y8J+=Y6s;y8J+=D0z;var x$c=N8F;x$c+=Y6s;x$c+=j5U;x$c+=w74;var m3g=U7V;m3g+=E_v;m3g+=A5S;m3g+=D0z;var X07=I8H;X07+=v2l;var h6U=C5Mnx[440425];h6U+=C5Mnx[574232];h6U+=U7V;h6U+=C5Mnx[574232];var F5L=o1v;F5L+=S3K;F5L+=N1T;F5L+=a1i;var C8h=s9Q;C8h+=C5Mnx[440425];var H4V=C5Mnx[611221];H4V+=P34;var r5k=P$l;r5k+=C5Mnx[574232];r5k+=c$I;var that=this;var multiI18n=host[m5I]()[B_$];var opts=$[q5Y](P4T,{},Field[r5k],options);if(!Editor[H4V][opts[F1c]]){throw new Error(j8Q + opts[F1c]);}this[j2w]={classes:classes,host:host,multiIds:[],multiValue:S0J,multiValues:{},name:opts[D4T],opts:opts,processing:S0J,type:Editor[U73][opts[F1c]]};if(!opts[C8h]){var y9r=q$J;y9r+=C5Mnx[187046];y9r+=D0z;opts[D44]=M$b + opts[y9r];}if(opts[z3B] === s93){var V64=q$J;V64+=C5Mnx[574232];V64+=C5Mnx.U3r;opts[z3B]=opts[V64];}this[F5L]=function(d){var H_v='editor';return dataGet(opts[z3B])(d,H_v);};this[Z1o]=dataSet(opts[h6U]);var template=$(X07 + classes[N_r] + e5L + classes[n9Q] + opts[m3g] + e5L + classes[x$c] + opts[y8J] + e5L + opts[Y8n] + x8T + p5T + classes[n_2] + S8x + Editor[g3C](opts[v2y]) + q2p + opts[n13] + s6y + classes[V8O] + f_t + opts[R69] + V6U + g0r + C0H + classes[E2J] + A9v + n5j + classes[C1L] + l6U + X9H + classes[e14] + k$8 + multiI18n[p$F] + D2k + classes[V6o] + x9_ + multiI18n[X2t] + L7Q + M7x + o9o + classes[z8g] + Y2M + multiI18n[s8d] + V6U + R1P + classes[D3S] + q15 + h_I + classes[G7e] + N8x + opts[m2Q] + p6c + F8e + classes[C1a] + L$z + opts[s_T] + z1_ + V6U + a2y + classes[E5k] + j9I + Q73);var input=this[Z6o](g2M,opts);var side=d4j;if(input && input[E8W]){var N05=j2w;N05+=s9Q;N05+=i_o;side=input[N05];input=input[E2J];}if(input !== d4j){var M06=U1$;M06+=C9S;M06+=l1D;el(M06,template)[W9l](input);}else {var l8A=q$J;l8A+=P4A;var O0V=C5Mnx[440425];O0V+=g_z;O0V+=T7r;O0V+=E_v;var D09=C5Mnx.i36;D09+=j2w;D09+=j2w;template[D09](O0V,l8A);}this[w3d]={container:template,fieldError:el(D3S,template),fieldInfo:el(J4h,template),fieldMessage:el(G7e,template),inputControl:el(h1_,template),label:el(G2X,template)[n1P](side),labelInfo:el(W0n,template),multi:el(n1r,template),multiInfo:el(o2_,template),multiReturn:el(J9P,template),processing:el(x0B,template)};this[h2T][B_$][C9S](g7m,function(){var h0I="hasClass";var P6U="adonly";var w_6="multiEdita";var I5z=h7O;I5z+=D0z;I5z+=P6U;var T3i=U7V;T3i+=E_v;T3i+=A5S;T3i+=D0z;var k4d=w_6;T6H.J_Y();k4d+=q91;if(that[j2w][A$C][k4d] && !template[h0I](classes[l$v]) && opts[T3i] !== I5z){that[Z_p](s93);that[o9Q]();}});this[S3e][I5p][o82](g7m,function(){T6H.J_Y();that[X_H]();});$[N6m](this[j2w][F1c],function(name,fn){var z3L=S6b;z3L+=s2C;if(typeof fn === z3L && that[name] === undefined){that[name]=function(){var n7i="_typeF";var p9K="nshif";var w9_=y9P;w9_+=d7D;var s57=n7i;s57+=q$J;var U3t=k93;U3t+=p9K;U3t+=U7V;var Q4V=j2w;Q4V+=e7P;Q4V+=h4h;var args=Array[Z3T][Q4V][j0y](arguments);args[U3t](name);var ret=that[s57][w9_](that,args);return ret === undefined?that:ret;};}});}Field[i0U][P$l]=function(set){var W5K='default';var m$e=C5Mnx[440425];m$e+=D0z;m$e+=C5Mnx[611221];var opts=this[j2w][A$C];if(set === undefined){var g4e=C5Mnx[440425];g4e+=D0z;g4e+=C5Mnx[611221];var def=opts[W5K] !== undefined?opts[W5K]:opts[g4e];return typeof def === C5Mnx[604463]?def():def;}opts[m$e]=set;return this;};Field[Z3T][D6H]=function(){var I2N="typeF";var Z40="C";var l6A=s$x;l6A+=I2N;l6A+=q$J;var R5H=C5Mnx[440425];R5H+=z6n;var h8K=H5J;h8K+=c3C;var q5H=X$I;q5H+=Z40;q5H+=T7r;q5H+=J6H;this[w3d][B6$][q5H](this[j2w][h8K][R5H]);this[l6A](v4z);return this;};Field[A7B][S6K]=function(){var n$X="tain";var j77="ents";var c0e=q$J;c0e+=w4d;c0e+=q$J;c0e+=D0z;var q0A=j1_;q0A+=A5S;q0A+=M73;var X7l=Q_$;X7l+=q$J;X7l+=P4v;X7l+=L71;var b2_=A5S;b2_+=C5Mnx[574232];b2_+=h7O;b2_+=j77;var P85=w0M;P85+=q$J;P85+=n$X;P85+=k2c;var container=this[w3d][P85];return container[b2_](U5H)[X7l] && container[w8E](q0A) !== c0e?P4T:S0J;};Field[Z3T][O8x]=function(toggle){var P46="ontainer";var O9j=D0z;O9j+=q$J;O9j+=v1w;O9j+=Q_$;var j7U=e1z;j7U+=E_v;T6H.J_Y();j7U+=s2L;var j_6=H5J;j_6+=c3C;var p1O=l8p;p1O+=Q3K;p1O+=f2D;p1O+=e15;var S6T=C5Mnx.i36;S6T+=P46;var U$F=C5Mnx[440425];U$F+=w4d;U$F+=Y6s;if(toggle === void B$r){toggle=P4T;}if(toggle === S0J){return this[D6H]();}this[U$F][S6T][p1O](this[j2w][j_6][l$v]);this[j7U](O9j);return this;};Field[Z3T][B$S]=function(){var d6Q="asse";var a6q="ha";var T0l=m3m;T0l+=d6Q;T0l+=j2w;var A3I=a6q;A3I+=n3q;var d2A=u3P;d2A+=x8m;d2A+=D0z;d2A+=h7O;var x1c=C5Mnx[440425];x1c+=w4d;x1c+=Y6s;return this[x1c][d2A][A3I](this[j2w][T0l][l$v]) === S0J;};Field[A5t][y$B]=function(msg,fn){var U5b='errorMessage';var F46="eldEr";var j0V="ntainer";var v9f="dClas";var W1L=n_8;W1L+=F46;W1L+=h7O;W1L+=X8f;var Z4n=Y2B;Z4n+=Y6s;var d4N=e1z;d4N+=E_v;d4N+=d3c;d4N+=y15;var classes=this[j2w][O2I];T6H.T5V();if(msg){var s2w=C5Mnx[574232];s2w+=C5Mnx[440425];s2w+=v9f;s2w+=j2w;var K6B=i9V;K6B+=g5P;var O69=C5Mnx[440425];O69+=w4d;O69+=Y6s;this[O69][K6B][s2w](classes[y$B]);}else {var i8X=w0M;i8X+=j0V;var o5J=C5Mnx[440425];o5J+=w4d;o5J+=Y6s;this[o5J][i8X][h3P](classes[y$B]);}this[d4N](U5b,msg);return this[k$A](this[Z4n][W1L],msg,fn);};Field[K5z][E3E]=function(msg){var r4s="fieldInfo";return this[k$A](this[w3d][r4s],msg);};Field[b3p][X5j]=function(){var I7K=e7P;I7K+=c9b;I7K+=i_g;T6H.T5V();return this[j2w][X7O] && this[j2w][t2n][I7K] !== f$8;};Field[n1M][N4S]=function(){var B$O="hasClas";var h4b=k2c;h4b+=A4Q;var S5S=B$O;S5S+=j2w;T6H.J_Y();return this[w3d][B6$][S5S](this[j2w][O2I][h4b]);};Field[Z3T][J6O]=function(){var B2A="ontaine";var K_3=C5Mnx.i36;K_3+=B2A;K_3+=h7O;var v3G=C5Mnx[440425];v3G+=w4d;v3G+=Y6s;var W4_=s$x;W4_+=U7V;T6H.J_Y();W4_+=E_v;W4_+=s2L;var O1c=h5T;O1c+=D0z;return this[j2w][O1c][E2J]?this[W4_](r39):$(V5c,this[v3G][K_3]);};Field[Z3T][v5I]=function(){var e4P=C5Mnx[611221];e4P+=w4d;e4P+=C5Mnx.i36;e4P+=h$L;var f3n=h5T;f3n+=D0z;if(this[j2w][f3n][e4P]){this[W8B](s22);}else {var D21=i9V;D21+=g5P;var h_3=C5Mnx[440425];h_3+=A8P;$(V5c,this[h_3][D21])[o9Q]();}return this;};Field[G_9][C29]=function(){var u5i="sMu";var Q3A="getFormatter";var P_9="ltiVa";T6H.T5V();var d54=Z3N;d54+=D0z;d54+=U7V;var S$c=s$x;S$c+=A4w;var c9x=s9Q;c9x+=u5i;c9x+=P_9;c9x+=K2T;if(this[c9x]()){return undefined;}return this[S$c](this[W8B](d54),this[j2w][A$C][Q3A]);};Field[R5G][A09]=function(animate){var e5G="lideUp";T6H.T5V();var c9g="splay";var g2y="slideUp";var L9o=j2w;L9o+=e5G;var v0J=g3u;v0J+=j2w;v0J+=U7V;var B_w=C5Mnx[440425];B_w+=w4d;B_w+=Y6s;var el=this[B_w][B6$];if(animate === undefined){animate=P4T;}if(this[j2w][v0J][v4C]() && animate && $[C5Mnx.E0X][L9o]){el[g2y]();}else {var O1y=k$o;O1y+=c9g;var q$d=C5Mnx.i36;q$d+=J6H;el[q$d](O1y,G5s);}return this;};Field[Z3T][n13]=function(str){var t1C=y9P;t1C+=i$7;var j_0=i_o;j_0+=a1i;j_0+=C5Mnx.i36;j_0+=L71;var r$a=C5Mnx[440425];r$a+=w4d;r$a+=Y6s;var label=this[w3d][n13];var labelInfo=this[r$a][R69][j_0]();if(str === undefined){var a5G=W7u;a5G+=Q_v;return label[a5G]();}label[i3e](str);label[t1C](labelInfo);return this;};Field[C$1][R69]=function(msg){var w94=C5Mnx[440425];w94+=w4d;w94+=Y6s;var y8h=s$x;y8h+=Y6s;T6H.T5V();y8h+=f6y;return this[y8h](this[w94][R69],msg);};Field[Z3T][j1Z]=function(msg,fn){var q6l="fieldMessage";var F1u=C5Mnx[440425];F1u+=w4d;F1u+=Y6s;return this[k$A](this[F1u][q6l],msg,fn);};Field[Z3T][v_w]=function(id){var O9R="iVal";var l8o="ues";var E$B="isMu";var t_U="Valu";var V$s=E$B;V$s+=l$V;V$s+=t_U;V$s+=D0z;var W4u=K7m;W4u+=U7V;W4u+=O9R;W4u+=l8o;var value;var multiValues=this[j2w][W4u];var multiIds=this[j2w][t2n];var isMultiValue=this[V$s]();if(id === undefined){var X4O=e7P;X4O+=c9b;X4O+=i_g;var fieldVal=this[Z_p]();value={};for(var _i=B$r,multiIds_1=multiIds;_i < multiIds_1[X4O];_i++){var multiId=multiIds_1[_i];value[multiId]=isMultiValue?multiValues[multiId]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {value=this[Z_p]();}return value;};Field[X84][X_H]=function(){var G6S="eChec";var G8o="multiVal";var h7E="tiValu";var e9M=N8N;e9M+=h7E;e9M+=G6S;e9M+=D2e;var P$G=G8o;P$G+=a$h;this[j2w][P$G]=P4T;this[e9M]();};Field[x_6][g1I]=function(id,val,recalc){var q9O="multiValueCheck";var G5b="iI";var y$R="sPla";var V8Z=s9Q;V8Z+=y$R;V8Z+=b8f;V8Z+=h$4;var N8G=S8k;N8G+=G5b;N8G+=C5Mnx[440425];N8G+=j2w;if(recalc === void B$r){recalc=P4T;}var that=this;var multiValues=this[j2w][S73];var multiIds=this[j2w][N8G];if(val === undefined){val=id;id=undefined;}var set=function(idSrc,valIn){var y54="opt";var j1j="ush";var u4L="_format";var w6j=y54;w6j+=j2w;if($[k0v](idSrc,multiIds) === -f$8){var y$4=A5S;y$4+=j1j;multiIds[y$4](idSrc);}multiValues[idSrc]=that[u4L](valIn,that[j2w][w6j][z0o]);};if($[V8Z](val) && id === undefined){var h2l=D0z;h2l+=C5Mnx[574232];h2l+=C5Mnx.i36;h2l+=L71;$[h2l](val,function(idSrc,innerVal){set(idSrc,innerVal);});}else if(id === undefined){$[f9H](multiIds,function(i,idSrc){T6H.T5V();set(idSrc,val);});}else {set(id,val);}this[j2w][X7O]=P4T;if(recalc){var C0k=s$x;C0k+=q9O;this[C0k]();}return this;};Field[i$n][D4T]=function(){var c59=w4d;c59+=x0H;T6H.T5V();return this[j2w][c59][D4T];};Field[I1k][n1t]=function(){var O9h="aine";var n4N=L$R;n4N+=U7V;n4N+=O9h;n4N+=h7O;var M$T=Y2B;M$T+=Y6s;return this[M$T][n4N][B$r];};Field[Y4F][o1w]=function(){var H5d="llDefault";var k5c=y5c;k5c+=H5d;return this[j2w][A$C][k5c];};Field[A8t][I41]=function(set){T6H.T5V();var G6h="internalE";var E6A=G6h;E6A+=L87;var C4G=L71;C4G+=w4d;C4G+=j2w;C4G+=U7V;var e1o=c8h;e1o+=Z7F;var d3E=C5Mnx[440425];d3E+=s9Q;d3E+=h1V;d3E+=E_v;var v9m=s1y;v9m+=T5C;v9m+=H1N;var k99=C5Mnx[440425];k99+=w4d;k99+=Y6s;if(set === undefined){return this[j2w][P_s];}this[k99][v9m][w8E](d3E,set?c7l:e1o);this[j2w][P_s]=set;this[j2w][C4G][E6A](f4u,[set]);return this;};Field[k0q][b6D]=function(val,multiCheck){var g0u="entityDecode";var F4L="ueChe";var L1I='set';var S2q="_multiVal";var G02=g4S;G02+=X1W;if(multiCheck === void B$r){multiCheck=P4T;}var decodeFn=function(d){var e2N='£';var C4N='\n';var f_5='\'';var K5q='"';var J31="replac";var T5s=e08;T5s+=Q99;var V3e=h7O;V3e+=y_K;V3e+=C5Mnx[574232];T6H.T5V();V3e+=W_8;var Q0r=J31;Q0r+=D0z;var R4E=l8p;R4E+=z6N;R4E+=E_X;R4E+=D0z;var b$L=f5U;b$L+=J2l;b$L+=q$J;b$L+=Z3N;return typeof d !== b$L?d:d[R4E](/&gt;/g,y0b)[Q0r](/&lt;/g,h7Y)[P3K](/&amp;/g,S3E)[P3K](/&quot;/g,K5q)[P3K](/&#163;/g,e2N)[V3e](/&#0?39;/g,f_5)[T5s](/&#0?10;/g,C4N);};this[j2w][X7O]=S0J;var decode=this[j2w][G02][g0u];if(decode === undefined || decode === P4T){if(Array[r99](val)){for(var i=B$r,ien=val[A56];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}if(multiCheck === P4T){var A12=S2q;A12+=F4L;A12+=a9u;var a02=K4m;a02+=U7V;var g6f=s$x;g6f+=U7V;g6f+=M8x;g6f+=K$K;var K7e=g4S;K7e+=X1W;var n4A=s$x;n4A+=A4w;val=this[n4A](val,this[j2w][K7e][z0o]);this[g6f](a02,val);this[A12]();}else {this[W8B](L1I,val);}return this;};Field[H_2][e9i]=function(animate,toggle){var T5X="eDow";var O0$=O3h;O0$+=C5Mnx[440425];O0$+=T5X;O0$+=q$J;var w59=k$o;w59+=J6X;w59+=T7r;w59+=E_v;var f5M=L71;f5M+=w4d;f5M+=f5U;var W0P=C5Mnx[440425];W0P+=w4d;W0P+=Y6s;if(animate === void B$r){animate=P4T;}if(toggle === void B$r){toggle=P4T;}if(toggle === S0J){return this[h9k](animate);}var el=this[W0P][B6$];if(this[j2w][f5M][w59]() && animate && $[C5Mnx.E0X][O0$]){el[b25]();}else {var T9c=V8J;T9c+=j2w;el[T9c](M$U,s93);;}return this;};Field[s1Q][d7v]=function(options,append){if(append === void B$r){append=S0J;}if(this[j2w][F1c][d7v]){var n6w=k93;n6w+=P4O;n6w+=C5Mnx[574232];n6w+=K_g;this[W8B](n6w,options,append);}return this;};Field[Z6N][w0G]=function(val){var k1T=j2w;k1T+=D0z;k1T+=U7V;return val === undefined?this[C29]():this[k1T](val);};Field[Z3T][q7L]=function(value,original){var y9L="compare";var m$N=w4d;m$N+=a2C;m$N+=j2w;var compare=this[j2w][m$N][y9L] || deepCompare;return compare(value,original);};Field[Z3T][m6q]=function(){return this[j2w][A$C][z3B];};Field[W2B][X54]=function(){var X6g="oy";var p$7=j88;p$7+=p9i;p$7+=X6g;var W1n=i9V;W1n+=g5P;T6H.T5V();var q6z=C5Mnx[440425];q6z+=A8P;this[q6z][W1n][Q4$]();this[W8B](p$7);return this;};Field[H40][G8Q]=function(){var x7s="itab";var h_4="ultiEd";var K_s=Y6s;T6H.T5V();K_s+=h_4;K_s+=x7s;K_s+=Q_$;return this[j2w][A$C][K_s];};Field[v3j][Y8e]=function(){T6H.J_Y();return this[j2w][t2n];};Field[Z3T][F_W]=function(show){var o64=y$N;o64+=f8Z;var b6B=C5Mnx.i36;b6B+=j2w;b6B+=j2w;var x0n=K7m;x0n+=t6O;x0n+=B0b;T6H.T5V();var M3I=C5Mnx[440425];M3I+=w4d;M3I+=Y6s;this[M3I][x0n][b6B]({display:show?o64:G5s});};Field[Z3T][W6R]=function(){var b0a="V";var N7W="multiI";var U9A=B_$;U9A+=b0a;U9A+=p0Q;var y_X=N7W;y_X+=C5Mnx[440425];y_X+=j2w;this[j2w][y_X]=[];this[j2w][U9A]={};};Field[P7o][Q$8]=function(){return this[j2w][A$C][q0I];};Field[Z3T][k$A]=function(el,msg,fn){var j5V="isib";var G2_="internalSettings";var N51="deUp";T6H.T5V();var b8_="parent";var B8P="uncti";var Q9_=O_e;Q9_+=Y6s;Q9_+=u2y;var a2z=C5Mnx[611221];a2z+=q$J;var j9A=U0_;j9A+=j5V;j9A+=e7P;j9A+=D0z;var C0s=s9Q;C0s+=j2w;var I7n=C5Mnx[611221];I7n+=B8P;I7n+=C9S;if(msg === undefined){var D$p=W7u;D$p+=Q_v;return el[D$p]();}if(typeof msg === I7n){var editor=this[j2w][H$0];msg=msg(editor,new DataTable$2[b4z](editor[G2_]()[N1O]));}if(el[b8_]()[C0s](j9A) && $[a2z][Q9_]){var q$_=L71;q$_+=U7V;q$_+=Q_v;el[q$_](msg);if(msg){el[b25](fn);;}else {var Y8C=O3h;Y8C+=N51;el[Y8C](fn);}}else {var A4L=C5Mnx.i36;A4L+=j2w;A4L+=j2w;var Y6Q=W7u;Y6Q+=Y6s;Y6Q+=e7P;el[Y6Q](msg || s93)[A4L](M$U,msg?c7l:G5s);if(fn){fn();}}return this;};Field[h5t][G_e]=function(){var b2o="bloc";var L4t="internalI";var t8u="oEdit";var h7T="lMultiInfo";var G2o="ol";var l5W="toggleClass";var S50="multiEditable";var X3S="multiN";var v$H="tContr";var k6M="nterna";var a2p="multiReturn";var u2S="multiValu";var p78="oM";var L5S=s9Q;L5S+=k6M;L5S+=h7T;var s8Y=L71;s8Y+=R8Z;s8Y+=U7V;var l4H=X3S;l4H+=t8u;var V4n=f82;V4n+=O2f;var G70=C5Mnx[440425];G70+=w4d;G70+=Y6s;var Y$8=q$J;Y$8+=p78;Y$8+=P$v;Y$8+=s9Q;var M9S=Y2B;M9S+=Y6s;var N1o=L4t;N1o+=R4t;var V9O=L71;V9O+=w4d;V9O+=j2w;V9O+=U7V;var e6b=q$J;e6b+=w4d;e6b+=Z7F;var d0Y=a$H;d0Y+=q1W;d0Y+=C5Mnx.i36;d0Y+=D2e;var X0w=u2S;X0w+=D0z;var last;var ids=this[j2w][t2n];var values=this[j2w][S73];var isMultiValue=this[j2w][X0w];var isMultiEditable=this[j2w][A$C][S50];var val;var different=S0J;if(ids){var l5O=Q_$;l5O+=H1N;l5O+=U7V;l5O+=L71;for(var i=B$r;i < ids[l5O];i++){val=values[ids[i]];if(i > B$r && !deepCompare(val,last)){different=P4T;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[c2y]()){var N_8=b2o;N_8+=D2e;var u8l=Y2B;u8l+=Y6s;var r9i=X19;r9i+=k93;r9i+=v$H;r9i+=G2o;var y4Y=C5Mnx[440425];y4Y+=w4d;y4Y+=Y6s;this[y4Y][r9i][w8E]({display:G5s});this[u8l][B_$][w8E]({display:N_8});}else {var g2z=C5Mnx.i36;g2z+=j2w;g2z+=j2w;var V2b=a$H;V2b+=e7P;V2b+=w4d;V2b+=a9u;var h0b=C5Mnx[440425];h0b+=w4d;h0b+=Y6s;this[h0b][C1L][w8E]({display:V2b});this[w3d][B_$][g2z]({display:G5s});if(isMultiValue && !different){var Y7a=K4m;Y7a+=U7V;this[Y7a](last,S0J);}}this[w3d][a2p][w8E]({display:ids && ids[A56] > f$8 && different && !isMultiValue?d0Y:e6b});var i18n=this[j2w][V9O][N1o]()[B_$];this[M9S][V6o][i3e](isMultiEditable?i18n[X2t]:i18n[Y$8]);this[G70][B_$][l5W](this[j2w][V4n][l4H],!isMultiEditable);this[j2w][s8Y][L5S]();return P4T;};Field[z$p][W8B]=function(name){var T4u=w4d;T4u+=a2C;T4u+=j2w;T6H.J_Y();var s$s=e7P;s$s+=T0q;var args=[];for(var _i=f$8;_i < arguments[s$s];_i++){args[_i - f$8]=arguments[_i];}args[m6E](this[j2w][T4u]);var fn=this[j2w][F1c][name];if(fn){return fn[B3g](this[j2w][H$0],args);}};Field[t6s][r9o]=function(){T6H.J_Y();var J3s="fieldError";var Z37=Y2B;Z37+=Y6s;return this[Z37][J3s];};Field[C0F][M8F]=function(val,formatter){var w1f="atte";if(formatter){var a8G=L71;a8G+=w4d;a8G+=f5U;var G1c=m1n;G1c+=e7P;if(Array[r99](formatter)){var j3b=z6_;j3b+=w1f;j3b+=h7O;j3b+=j2w;var h1u=E33;h1u+=s9Q;h1u+=z7M;var args=formatter[P8k]();var name_1=args[h1u]();formatter=Field[j3b][name_1][B3g](this,args);}return formatter[G1c](this[j2w][a8G],val,this);}return val;};Field[C59]=defaults;Field[Y9i]={};return Field;})();var button={action:d4j,className:d4j,tabIndex:B$r,text:d4j};var displayController={close:function(){},init:function(){},node:function(){},open:function(){}};var DataTable$1=$[g9b][d8I];var apiRegister=DataTable$1[L_D][A1Z];function _getInst(api){var h4U="oI";var z2H="_editor";var r3w=D0z;r3w+=k$o;r3w+=U7V;r3w+=X8f;var k$J=h4U;k$J+=q$J;k$J+=Q5O;var f7W=C5Mnx.i36;f7W+=w4d;f7W+=q$J;f7W+=K55;var ctx=api[f7W][B$r];return ctx[k$J][r3w] || ctx[z2H];}function _setBasic(inst,opts,type,plural){var P3J=/%d/;var U8S="ssa";var D3t=C5Mnx.U3r;D3t+=U8S;D3t+=V4H;var O7d=r4z;O7d+=J88;O7d+=v2A;if(!opts){opts={};}if(opts[O7d] === undefined){var N46=f7o;N46+=j2w;opts[N46]=I9w;}if(opts[t5E] === undefined){opts[t5E]=inst[u9Q][type][t5E];}if(opts[D3t] === undefined){if(type === f5l){var E9o=Y6s;E9o+=D2p;var confirm_1=inst[u9Q][type][q_l];opts[E9o]=plural !== f$8?confirm_1[s$x][P3K](P3J,plural):confirm_1[i_4];}else {opts[C9J]=s93;}}return opts;}apiRegister(Z$X,function(){return _getInst(this);});apiRegister(X1f,function(opts){var inst=_getInst(this);inst[Z1c](_setBasic(inst,opts,g2e));return this;});apiRegister(Y4E,function(opts){var inst=_getInst(this);inst[s9J](this[B$r][B$r],_setBasic(inst,opts,S49));return this;});apiRegister(f3Y,function(opts){var M0J=D0z;M0J+=C5Mnx[440425];M0J+=s9Q;M0J+=U7V;var u9A=D0z;u9A+=k$o;T6H.J_Y();u9A+=U7V;var inst=_getInst(this);inst[u9A](this[B$r],_setBasic(inst,opts,M0J));return this;});apiRegister(U6v,function(opts){var k7C=h7O;k7C+=Q60;k7C+=y0Y;var inst=_getInst(this);inst[k7C](this[B$r][B$r],_setBasic(inst,opts,f5l,f$8));return this;});apiRegister(o5u,function(opts){var F0K=h7O;T6H.T5V();F0K+=D0z;F0K+=Q3K;var inst=_getInst(this);inst[Q4$](this[B$r],_setBasic(inst,opts,F0K,this[B$r][A56]));return this;});apiRegister(m1Y,function(type,opts){if(!type){var a8Y=b8f;a8Y+=v1R;a8Y+=q$J;a8Y+=D0z;type=a8Y;}else if($[t1A](type)){var I15=s9Q;I15+=Y9X;I15+=b8f;I15+=D0z;opts=type;type=I15;}_getInst(this)[type](this[B$r][B$r],opts);return this;});apiRegister(P45,function(opts){_getInst(this)[N2U](this[B$r],opts);return this;});apiRegister(O5V,file);apiRegister(U2X,files);$(document)[z5A](V__,function(e,ctx,json){var q5U='dt';var v4u="mespace";var y8t=N8F;y8t+=v4u;if(e[y8t] !== q5U){return;}if(json && json[N6t]){$[f9H](json[N6t],function(name,filesIn){var W2l=C5Mnx[611221];W2l+=K19;W2l+=D0z;W2l+=j2w;var Z7l=D0z;Z7l+=f8K;Z7l+=K_g;Z7l+=Y54;var l$3=D0B;l$3+=j2w;if(!Editor[l$3][name]){var C9U=C5Mnx[611221];C9U+=s9Q;C9U+=e7P;C9U+=O2f;Editor[C9U][name]={};}$[Z7l](Editor[W2l][name],filesIn);});}});var _buttons=$[E6E][C5Mnx.h0r][S3o][k5G];$[q5Y](_buttons,{create:{action:function(e,dt,node,config){var e37="titl";var n9u=e37;n9u+=D0z;var t3l=C5Mnx.U3r;t3l+=j2w;t3l+=t3V;var b8C=C5Mnx.i36;b8C+=h7O;b8C+=k2T;b8C+=K_g;var u8a=U_h;u8a+=G3d;u8a+=a$n;var B17=w4d;B17+=q$J;B17+=D0z;var E0p=k9y;T6H.T5V();E0p+=P4f;var that=this;var editor=config[H$l];this[E0p](P4T);editor[B17](u8a,function(){T6H.T5V();var H1w=A5S;H1w+=g2Q;that[H1w](S0J);})[Z1c]($[q5Y]({buttons:config[n3E],message:config[m79] || editor[u9Q][b8C][t3l],nest:P4T,title:config[s6l] || editor[u9Q][Z1c][n9u]},config[r9G]));},className:k0B,editor:d4j,formButtons:{action:function(e){T6H.J_Y();this[q0I]();},text:function(editor){var g9K=I70;T6H.T5V();g9K+=S0e;g9K+=Q5O;var X_w=Q5g;X_w+=k2T;X_w+=K_g;return editor[u9Q][X_w][g9K];}},formMessage:d4j,formOptions:{},formTitle:d4j,text:function(dt,node,config){var F6m="i18";var y77="tons.crea";var y78=c2r;y78+=Y7G;y78+=q$J;var I9k=s9Q;I9k+=f9q;I9k+=C5Mnx.u$S;I9k+=q$J;var j18=c2r;j18+=y77;j18+=K_g;var q5e=F6m;T6H.T5V();q5e+=q$J;return dt[q5e](j18,config[H$l][I9k][Z1c][y78]);}},createInline:{action:function(e,dt,node,config){var K9P="position";var J$G=s9Q;J$G+=Y9X;J$G+=f7M;config[H$l][J$G](config[K9P],config[r9G]);},className:E5u,editor:d4j,formButtons:{action:function(e){T6H.J_Y();var z$v=I70;z$v+=a$H;z$v+=D0W;this[z$v]();},text:function(editor){var H8r="submi";var H43=H8r;H43+=U7V;return editor[u9Q][Z1c][H43];}},formOptions:{},position:l$S,text:function(dt,node,config){var y47='buttons.create';var f$E=a$H;f$E+=y22;f$E+=a5v;var X0z=D0z;X0z+=I_K;return dt[u9Q](y47,config[X0z][u9Q][Z1c][f$E]);}},edit:{action:function(e,dt,node,config){var K5Y="formMe";var f67="Ti";var G6v="ito";var h$e="orm";var X3X="mB";var J_h=D0z;J_h+=C5Mnx[440425];J_h+=s9Q;J_h+=U7V;var H2H=C5Mnx[611221];H2H+=h$e;H2H+=f67;H2H+=p52;var z07=Y6s;z07+=D2p;var S3y=s9Q;S3y+=R4t;var o$o=K5Y;o$o+=J6H;o$o+=n0k;o$o+=D0z;var d9c=i53;d9c+=X3X;d9c+=T4$;d9c+=j2w;var v9T=x_i;v9T+=U7V;var A6t=U_h;A6t+=G3d;A6t+=a$n;var O$R=t_c;O$R+=q89;var y0X=M7r;y0X+=L71;var v_8=R5_;v_8+=B5$;var x8E=R5_;x8E+=X4F;x8E+=O2f;var b4e=y8v;b4e+=j2w;T6H.J_Y();var j4m=T9t;j4m+=G6v;j4m+=h7O;var that=this;var editor=config[j4m];var rows=dt[b4e]({selected:P4T})[x8E]();var columns=dt[y5k]({selected:P4T})[v_8]();var cells=dt[H4F]({selected:P4T})[Z8G]();var items=columns[y0X] || cells[O$R]?{cells:cells,columns:columns,rows:rows}:rows;this[P_s](P4T);editor[P4A](A6t,function(){var T4v="ssing";var n56=L75;n56+=T4v;that[n56](S0J);})[v9T](items,$[q5Y]({buttons:config[d9c],message:config[o$o] || editor[S3y][s9J][z07],nest:P4T,title:config[H2H] || editor[u9Q][J_h][t5E]},config[r9G]));},className:Z6r,editor:d4j,extend:V_z,formButtons:{action:function(e){var o_D=I70;T6H.J_Y();o_D+=a$H;o_D+=Y6s;o_D+=Q5O;this[o_D]();},text:function(editor){var b7z=j2w;b7z+=D08;T6H.T5V();var R5F=D0z;R5F+=C5Mnx[440425];R5F+=s9Q;R5F+=U7V;return editor[u9Q][R5F][b7z];}},formMessage:d4j,formOptions:{},formTitle:d4j,text:function(dt,node,config){var C4t='buttons.edit';var P2Y=J_m;P2Y+=w4d;P2Y+=q$J;T6H.T5V();var K1$=D0z;K1$+=C5Mnx[440425];K1$+=s9Q;K1$+=U7V;var I6T=s9Q;I6T+=f9q;I6T+=C5Mnx.u$S;I6T+=q$J;return dt[I6T](C4t,config[H$l][u9Q][K1$][P2Y]);}},remove:{action:function(e,dt,node,config){var T5U=s9Q;T5U+=f9q;T5U+=C5Mnx.u$S;T5U+=q$J;var o8M=D0z;o8M+=g0Q;o8M+=Y54;var Z5F=h7O;Z5F+=I38;Z5F+=j2w;var o2F=h7O;o2F+=Q60;o2F+=o1v;o2F+=D0z;var B24=w4d;B24+=q$J;B24+=D0z;var Y$f=s1y;Y$f+=T5C;Y$f+=H1N;var that=this;var editor=config[H$l];this[Y$f](P4T);editor[B24](g37,function(){var N1d="essing";var j$k=V5V;j$k+=C5Mnx.i36;j$k+=N1d;that[j$k](S0J);})[o2F](dt[Z5F]({selected:P4T})[Z8G](),$[o8M]({buttons:config[n3E],message:config[m79],nest:P4T,title:config[s6l] || editor[T5U][Q4$][t5E]},config[r9G]));},className:g44,editor:d4j,extend:w5r,formButtons:{action:function(e){var u6R=s_Z;T6H.J_Y();u6R+=Y6s;u6R+=s9Q;u6R+=U7V;this[u6R]();},text:function(editor){var h0S="emove";var W96=h7O;W96+=h0S;var l_T=h1F;l_T+=w7W;return editor[l_T][W96][q0I];}},formMessage:function(editor,dt){var X0O="irm";var L$5=L$R;L$5+=C5Mnx[611221];L$5+=s9Q;T6H.J_Y();L$5+=g6T;var G83=j1H;G83+=X0O;var w2L=C5Mnx.i36;w2L+=C9S;w2L+=n_8;w2L+=g6T;var l5Y=h7O;l5Y+=g3g;l5Y+=w4d;l5Y+=y0Y;var rows=dt[M7H]({selected:P4T})[Z8G]();var i18n=editor[u9Q][l5Y];var question=typeof i18n[q_l] === Z4A?i18n[w2L]:i18n[G83][rows[A56]]?i18n[q_l][rows[A56]]:i18n[L$5][s$x];return question[P3K](/%d/g,rows[A56]);},formOptions:{},formTitle:d4j,limitTo:[j30],text:function(dt,node,config){T6H.T5V();var M6u="utt";var A_M='buttons.remove';var V_2=a$H;V_2+=M6u;V_2+=C9S;var G6y=h7O;G6y+=Q60;G6y+=o1v;G6y+=D0z;var o_n=D0z;o_n+=k$o;o_n+=U7V;o_n+=X8f;return dt[u9Q](A_M,config[o_n][u9Q][G6y][V_2]);}}});_buttons[n5W]=$[q5Y]({},_buttons[s9J]);_buttons[R4Z][q5Y]=X44;_buttons[n8b]=$[h5u]({},_buttons[Q4$]);_buttons[C5W][q5Y]=z5j;if(!DataTable || !DataTable[n22] || !DataTable[R$7](X$A)){throw new Error(b7p);}var Editor=(function(){var r6E="air";var X72="fe";var K0e="oad";var F3x="models";var g$A="ourc";var s0u="factory";var C48="alSett";var r2U="2.1";var h2W="ile";var N67="version";var h6d="int";T6H.T5V();var p6g="intern";var K8s="rnalEven";var S3x="tiI";var J_U=".2";var t3y="ernalMul";var y6F=P$4;y6F+=X72;y6F+=o6I;var D9I=O2S;D9I+=a7$;D9I+=g$A;D9I+=O2f;var e6v=k93;e6v+=z6N;e6v+=K0e;var q93=A5S;q93+=r6E;q93+=j2w;var g38=w2V;g38+=Y$B;g38+=s9Q;g38+=C5Mnx.U3r;var q_x=j6g;q_x+=y$u;q_x+=Q29;var d2p=M$I;d2p+=M7D;var w8t=r2U;w8t+=J_U;var a1G=C5Mnx[611221];a1G+=h2W;a1G+=j2w;var S4Y=p6g;S4Y+=C48;S4Y+=P4f;S4Y+=j2w;var j_$=h6d;j_$+=t3y;j_$+=S3x;j_$+=i2a;var G2F=s9Q;G2F+=w_i;G2F+=K8s;G2F+=U7V;function Editor(init,cjsJq){var c2f="eCrea";var e61="fac";var c9C="wr";var G8h="instance";var E_M="_cru";var y5j="_weakInArray";var y3t='</form>';var C49='initEditor';var H56="t.dte";T6H.J_Y();var I1z=" be initiali";var V23="_closeReg";var R1k="<div data-dte-e=\"head\" cl";var i63="_submi";var c0B="dAr";var M61="plate";var B53='<div data-dte-e="processing" class="';var r31='<div data-dte-e="body_content" class="';var M2a='Cannot find display controller ';var j_5="ead";var o6Q="iti";var B$X="ory";var R7t="<div data-d";var l2I="te-e=\"form_error\" class=\"";var K0N="></di";var E8a="bubbl";var N4c='<div data-dte-e="form_buttons" class="';var y$L="_nestedClose";var j9e="<div dat";var B2T="-dte-e=\"body\" ";var f3f="_acti";var W3V='xhr.dt.dte';var g1U="tE";var U32="ess";var D$h="ePos";var A9l='<form data-dte-e="form" class="';var S1S="dent";var R_g="events";var A_l="indicator";var o90='initComplete';var x_4="nTable";var M1V="_displayReorde";var k$U="\"><span><";var z4A="_noProcessing";var i1P="/span>";var y4q="\"><div cla";var o4X="/div></di";var L7r="_optionsUpda";var Y3b="ss=";var N7q="sed as a \'new\' ";var j0H="dependent";var J6h="multiSe";var i$l="undepen";var n2T="ass=";var O2j='foot';var F7U="ord";var W9U="ultiInfo";var a7w="DataTables Editor must";var R4s="cle";var b$y="idy";var a_g="ces";var H7Z="a-dte-e=\"form";var v6V="_content\" class=\"";var V9n="rigger";var O4l="uni";var U3M="topen";var Z3H="eldNames";var o$c='<div data-dte-e="foot" class="';var S9f="Node";var G12='form_content';var E77='<div data-dte-e="form_info" class="';var W$s='i18n.dt.dte';var k8F="onC";var x0f="body_c";var G7q="_eventName";var I8_="tl";var p6j="arDynamicInfo";var T1r="_po";var w1t="play";var j$i="_dataSour";var p4t="apper";var m8D="t.d";var s86="isplayController";var L6X="que";var I3t=C5Mnx[440425];I3t+=s86;var N7t=k_p;N7t+=x8a;var g6x=w4d;g6x+=q$J;var W9a=O4l;W9a+=L6X;var F3Z=Z9D;F3Z+=m8D;F3Z+=H56;var m1Q=d9a;m1Q+=D8r;var x0R=D0z;x0R+=C5Mnx[574232];x0R+=C5Mnx.i36;x0R+=L71;var t54=Z$s;t54+=P4X;var S8C=z5N;S8C+=o4X;S8C+=w5z;var q6A=w0M;q6A+=C5Mnx.n6y;q6A+=C8D;q6A+=U7V;var k4t=L71;k4t+=j_5;k4t+=k2c;var k7r=y4q;k7r+=Y3b;k7r+=p0h;var L5Q=u0I;L5Q+=t0U;var B65=L71;B65+=k2T;B65+=i_o;B65+=h7O;var D7z=R1k;D7z+=n2T;D7z+=p0h;var O$9=p0h;O$9+=E81;O$9+=u34;O$9+=k3W;var J5t=p0h;J5t+=K0N;J5t+=w5z;var o2M=D0z;o2M+=b2q;o2M+=w4d;o2M+=h7O;var j3j=i53;j3j+=Y6s;var Q5I=R7t;Q5I+=l2I;var Q1U=w7z;Q1U+=k7Y;Q1U+=H6o;Q1U+=q9D;var f0B=x0f;f0B+=t9L;var Z_J=C5Mnx.i36;Z_J+=C9S;Z_J+=b8g;var d7x=j9e;d7x+=H7Z;d7x+=v6V;var F2m=p0h;F2m+=y37;var e7l=U7V;e7l+=n0k;var L5U=C5Mnx[611221];L5U+=w4d;L5U+=g6T;var U35=k7Y;U35+=u34;U35+=k3W;var g4C=z5N;g4C+=h18;var y4r=g_H;y4r+=K_g;y4r+=h7O;var Y8Q=p0h;Y8Q+=y37;var t8m=c9C;t8m+=p4t;var Y7Q=w7z;Y7Q+=a1_;Y7Q+=w5z;var S2$=C5Mnx.i36;S2$+=w0I;S2$+=C5Mnx.n6y;var Z7g=a$H;Z7g+=w4d;Z7g+=C5Mnx[440425];Z7g+=E_v;var Y2e=p0h;Y2e+=y37;var u1s=X83;u1s+=E_v;var c4C=a2g;c4C+=B2T;c4C+=p0I;var K$6=k$U;K$6+=i1P;K$6+=a1_;K$6+=w5z;var E6T=V5V;E6T+=a_g;E6T+=j2w;E6T+=P4f;var C41=I8H;C41+=v2l;var P33=M$I;P33+=j2w;P33+=D0z;P33+=j2w;var E09=B23;E09+=H1N;E09+=j2w;var d8$=C_5;d8$+=D0z;d8$+=e7P;d8$+=j2w;var o80=h1F;o80+=w7W;var r9M=h1F;r9M+=w7W;var u9c=S3o;u9c+=D0z;u9c+=q$J;u9c+=C5Mnx[440425];var J4v=Y3c;J4v+=T7r;J4v+=U7V;J4v+=D0z;var I0h=T2d;I0h+=A5S;I0h+=K5Z;var Z7m=U7V;Z7m+=c0b;var Y$0=w3d;Y$0+=Y$B;Y$0+=F2S;Y$0+=D0z;var Z_w=s9Q;Z_w+=G$s;Z_w+=h7O;Z_w+=C5Mnx.i36;var T08=D0z;T08+=g0Q;T08+=q$J;T08+=C5Mnx[440425];var U2g=e61;U2g+=U7V;U2g+=B$X;var Q8x=e1z;Q8x+=b$y;var U6n=i63;U6n+=g1U;U6n+=b2q;U6n+=X8f;var X9m=s$x;X9m+=j2w;X9m+=k93;X9m+=Q4N;var y8F=M6s;y8F+=T5C;y8F+=q$J;y8F+=Z3N;var P7$=T1r;P7$+=j2w;P7$+=U3M;var Z3Q=J67;Z3Q+=W9U;var U2j=s$x;U2j+=C9J;var i0T=L7r;i0T+=K_g;var f2$=U5L;f2$+=V9n;var d3J=N4d;d3J+=v1R;d3J+=q$J;d3J+=D0z;var j9d=s$x;j9d+=o9Q;var y1A=s$x;y1A+=C5Mnx[611221];y1A+=s9Q;y1A+=Z3H;var s2E=p5f;s2E+=q$D;var r24=M1V;r24+=h7O;var n0R=j$i;n0R+=W_8;var e9H=E_M;e9H+=c0B;e9H+=Z3N;e9H+=j2w;var n8B=E7J;n8B+=Q_$;n8B+=p6j;var b5M=U$f;b5M+=e7P;b5M+=i6L;var I6s=f3f;I6s+=k8F;I6s+=e7P;I6s+=e15;var U1i=U7V;U1i+=s9Q;U1i+=I8_;U1i+=D0z;var v4L=U7V;v4L+=g3g;v4L+=M61;var X1d=a1i;X1d+=a$H;X1d+=Q_$;var T5h=I70;T5h+=l2K;T5h+=U7V;var G45=j2w;G45+=S$C;var w22=F7U;w22+=k2c;var X5f=w4d;X5f+=d3c;X5f+=q$J;var W7P=w4d;W7P+=C5Mnx[611221];W7P+=C5Mnx[611221];var i$N=c8h;i$N+=i_o;var n3k=J6h;n3k+=U7V;var f9i=C_5;f9i+=D0z;var c6v=Y6s;c6v+=U32;c6v+=n0k;c6v+=D0z;var J4O=N4h;J4O+=b8f;J4O+=c2f;J4O+=K_g;var m39=b8f;m39+=k4$;var b6u=n_8;b6u+=q_c;b6u+=C5Mnx[440425];var t8r=D0z;t8r+=C5Mnx[440425];t8r+=s9Q;t8r+=U7V;var Y0M=k$o;Y0M+=j2w;Y0M+=w1t;Y0M+=S9f;var z0X=v06;z0X+=E_v;var f5g=i$l;f5g+=S1S;var y0n=C5Mnx.i36;y0n+=e7P;y0n+=w4d;y0n+=K4m;var C10=R4s;C10+=q31;var O4U=E8a;O4U+=D$h;O4U+=o6Q;O4U+=C9S;var i5f=r4z;i5f+=a$H;i5f+=q91;var i0u=C5Mnx[574232];i0u+=v55;i0u+=C5Mnx[574232];i0u+=f8K;var o_l=C5Mnx[574232];o_l+=C5Mnx[440425];o_l+=C5Mnx[440425];var _this=this;this[o_l]=add;this[i0u]=ajax;this[n9O]=background;this[v1l]=blur;this[i5f]=bubble;this[O4U]=bubblePosition;this[b_U]=buttons;this[C10]=clear;this[y0n]=close;this[Z1c]=create;this[f5g]=undependent;this[j0H]=dependent;this[X54]=destroy;this[D6H]=disable;this[z0X]=display;this[Q1t]=displayed;this[Y0M]=displayNode;this[t8r]=edit;this[O8x]=enable;this[y$B]=error$1;this[b6u]=field;this[o9B]=fields;this[D0B]=file;this[N6t]=files;this[C29]=get;this[h9k]=hide;this[g_9]=ids;this[U2J]=inError;this[m39]=inline;this[J4O]=inlineCreate;this[c6v]=message;this[f9i]=mode;this[p1P]=modifier;this[v_w]=multiGet;this[n3k]=multiSet;this[i$N]=node;this[W7P]=off;this[C9S]=on;this[P4A]=one;this[X5f]=open;this[w22]=order;this[Q4$]=remove;this[G45]=set;this[e9i]=show;this[T5h]=submit;this[X1d]=table;this[v4L]=template;this[U1i]=title;this[Z_p]=val;this[I6s]=_actionClass;this[m2t]=_ajax;this[A4d]=_animate;this[Q5Q]=_assembleMain;this[b5M]=_blur;this[n8B]=_clearDynamicInfo;this[x23]=_close;this[V23]=_closeReg;this[e9H]=_crudArgs;this[n0R]=_dataSource;this[r24]=_displayReorder;this[s4d]=_edit;this[s2E]=_event;this[G7q]=_eventName;this[t51]=_fieldFromNode;this[y1A]=_fieldNames;this[j9d]=_focus;this[d9A]=_formOptions;this[d3J]=_inline;this[f2$]=_inputTrigger;this[i0T]=_optionsUpdate;this[U2j]=_message;this[Z3Q]=_multiInfo;this[y$L]=_nestedClose;this[b0o]=_nestedOpen;this[P7$]=_postopen;this[I2E]=_preopen;this[y8F]=_processing;this[z4A]=_noProcessing;this[X9m]=_submit;this[O2F]=_submitTable;this[I4c]=_submitSuccess;this[U6n]=_submitError;this[Q8x]=_tidy;this[y5j]=_weakInArray;if(Editor[U2g](init,cjsJq)){return Editor;}if(!(this instanceof Editor)){var l_H=a7w;l_H+=I1z;l_H+=N7q;l_H+=G8h;alert(l_H);}init=$[q5Y](P4T,{},Editor[C59],init);this[C5Mnx.i36]=init;this[j2w]=$[T08](P4T,{},Editor[F3x][V5t],{actionName:init[K4z],ajax:init[X0m],formOptions:init[r9G],idSrc:init[Z_w],table:init[Y$0] || init[Z7m],template:init[I0h]?$(init[J4v])[H67]():d4j});this[O2I]=$[u9c](P4T,{},Editor[O2I]);this[r9M]=init[o80];Editor[d8$][E09][W9C]++;var that=this;var classes=this[P33];var wrapper=$(C41 + classes[N_r] + K2e + B53 + classes[E6T][A_l] + K$6 + c4C + classes[u1s][N_r] + Y2e + r31 + classes[Z7g][S2$] + Y7Q + V6U + o$c + classes[I66][t8m] + Y8Q + P2B + classes[y4r][n2i] + g4C + U35 + V6U);var form=$(A9l + classes[L5U][e7l] + F2m + d7x + classes[z6_][Z_J] + q15 + y3t);this[w3d]={body:el(U5H,wrapper)[B$r],bodyContent:el(f0B,wrapper)[B$r],buttons:$(N4c + classes[z6_][b_U] + Q1U)[B$r],footer:el(O2j,wrapper)[B$r],form:form[B$r],formContent:el(G12,form)[B$r],formError:$(Q5I + classes[j3j][o2M] + J5t)[B$r],formInfo:$(E77 + classes[z6_][X2t] + O$9)[B$r],header:$(D7z + classes[B65][L5Q] + k7r + classes[k4t][q6A] + S8C)[B$r],processing:el(t54,wrapper)[B$r],wrapper:wrapper[B$r]};$[x0R](init[R_g],function(evt,fn){var M1F=w4d;M1F+=q$J;that[M1F](evt,function(){var argsIn=[];for(var _i=B$r;_i < arguments[A56];_i++){argsIn[_i]=arguments[_i];}fn[B3g](that,argsIn);});});this[w3d];if(init[m1Q]){var q$w=C5Mnx[611221];q$w+=M5u;q$w+=C5Mnx[440425];q$w+=j2w;this[X$I](init[q$w]);}$(document)[C9S](F3Z + this[j2w][W9C],function(e,settings,json){T6H.J_Y();var table=_this[j2w][N1O];if(table){var b8T=q$J;b8T+=w4d;b8T+=C5Mnx[440425];b8T+=D0z;var j3L=a1i;j3L+=a$H;j3L+=Q_$;var dtApi=new DataTable[b4z](table);if(settings[x_4] === dtApi[j3L]()[b8T]()){var I4f=s$x;I4f+=T9t;I4f+=s9Q;I4f+=o5R;settings[I4f]=_this;}}})[C9S](W$s + this[j2w][W9a],function(e,settings){var p1z="oLanguage";var c_p=Z$T;c_p+=D0z;var table=_this[j2w][c_p];if(table){var dtApi=new DataTable[b4z](table);if(settings[x_4] === dtApi[N1O]()[J1r]()){if(settings[p1z][H$l]){var V1x=s9Q;V1x+=W7Z;V1x+=q$J;$[q5Y](P4T,_this[V1x],settings[p1z][H$l]);}}}})[g6x](W3V + this[j2w][W9C],function(e,settings,json){var L3$="tionsUpda";var k3o="_op";var table=_this[j2w][N1O];if(table){var X2O=c8h;X2O+=C5Mnx[440425];X2O+=D0z;var q19=q$J;q19+=r1Q;var dtApi=new DataTable[b4z](table);if(settings[q19] === dtApi[N1O]()[X2O]()){var U4W=k3o;U4W+=L3$;U4W+=K_g;_this[U4W](json);}}});if(!Editor[N7t][init[v4C]]){throw new Error(M2a + init[v4C]);}this[j2w][I3t]=Editor[v4C][init[v4C]][E5F](this);this[K0R](o90,[]);$(document)[Z3r](C49,[this]);}Editor[Z3T][G2F]=function(name,args){var Y7F=U87;T6H.T5V();Y7F+=y0Y;Y7F+=q$J;Y7F+=U7V;this[Y7F](name,args);};Editor[Z3T][m5I]=function(){T6H.T5V();return this[u9Q];};Editor[Z3T][j_$]=function(){var m0I="Inf";var t8Z="_multi";var o3_=t8Z;o3_+=m0I;o3_+=w4d;return this[o3_]();};Editor[Z3T][S4Y]=function(){T6H.J_Y();return this[j2w];};Editor[U73]={checkbox:checkbox,datatable:datatable,datetime:datetime,hidden:hidden,password:password,radio:radio,readonly:readonly,select:select,text:text,textarea:textarea,upload:upload,uploadMany:uploadMany};Editor[a1G]={};Editor[N67]=w8t;Editor[d2p]=classNames;Editor[q_x]=Field;Editor[g38]=d4j;Editor[y$B]=error;Editor[q93]=pairs;Editor[s0u]=factory;Editor[e6v]=upload$1;Editor[C59]=defaults$1;Editor[F3x]={button:button,displayController:displayController,fieldType:fieldType,formOptions:formOptions,settings:settings};Editor[D9I]={dataTable:dataSource$1,html:dataSource};Editor[v4C]={envelope:envelope,lightbox:self};Editor[y6F]=function(id){T6H.J_Y();return safeDomId(id,s93);};return Editor;})();DataTable[R35]=Editor;$[C5Mnx.E0X][U64][A2O]=Editor;if(DataTable[h7o]){Editor[Q_S]=DataTable[Q_S];}if(DataTable[S3o][P9j]){var b_1=D0z;b_1+=N2n;b_1+=C5Mnx[440425];$[b_1](Editor[U73],DataTable[S3o][u0o]);}DataTable[o34][z9A]=Editor[f8z];return Editor;});})();

/*! DataTables styling integration for DataTables' Editor
 * ©SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-dt')(root, $);
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


var Editor = DataTable.Editor;


return Editor;
}));


/*! Buttons for DataTables 2.3.6
 * ©2016-2023 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;



// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = DataTable.ext.buttons;

// Allow for jQuery slim
function _fadeIn(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeIn( duration, fn );

	}
	else {
		el.css('display', 'block');

		if (fn) {
			fn.call(el);
		}
	}
}

function _fadeOut(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeOut( duration, fn );
	}
	else {
		el.css('display', 'none');
		
		if (fn) {
			fn.call(el);
		}
	}
}

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function( dt, config )
{
	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if ( !(this instanceof Buttons) ) {
		return function (settings) {
			return new Buttons( settings, dt ).container();
		};
	}

	// If there is no config set it to an empty object
	if ( typeof( config ) === 'undefined' ) {
		config = {};	
	}
	
	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if ( Array.isArray( config ) ) {
		config = { buttons: config };
	}

	this.c = $.extend( true, {}, Buttons.defaults, config );

	// Don't want a deep copy for the buttons
	if ( config.buttons ) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new DataTable.Api( dt ),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb'+(_instCounter++)
	};

	this.dom = {
		container: $('<'+this.c.dom.container.tag+'/>')
			.addClass( this.c.dom.container.className )
	};

	this._constructor();
};


$.extend( Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 *//**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function ( node, action )
	{
		var button = this._nodeToButton( node );

		if ( action === undefined ) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function ( node, flag ) {
		var button = this._nodeToButton( node );
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if ( flag === undefined ) {
			return jqNode.hasClass( klass );
		}

		jqNode.toggleClass( klass, flag === undefined ? true : flag );

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @param {boolean} [draw=true] Trigger a draw. Set a false when adding
	 *   lots of buttons, until the last button.
	 * @return {Buttons} Self for chaining
	 */
	add: function ( config, idx, draw )
	{
		var buttons = this.s.buttons;

		if ( typeof idx === 'string' ) {
			var split = idx.split('-');
			var base = this.s;

			for ( var i=0, ien=split.length-1 ; i<ien ; i++ ) {
				base = base.buttons[ split[i]*1 ];
			}

			buttons = base.buttons;
			idx = split[ split.length-1 ]*1;
		}

		this._expandButton(
			buttons,
			config,
			config !== undefined ? config.split : undefined,
			(config === undefined || config.split === undefined || config.split.length === 0) && base !== undefined,
			false,
			idx
		);

		if (draw === undefined || draw === true) {
			this._draw();
		}
	
		return this;
	},

	/**
	 * Clear buttons from a collection and then insert new buttons
	 */
	collectionRebuild: function ( node, newButtons )
	{
		var button = this._nodeToButton( node );
		
		if(newButtons !== undefined) {
			var i;
			// Need to reverse the array
			for (i=button.buttons.length-1; i>=0; i--) {
				this.remove(button.buttons[i].node);
			}

			// If the collection has prefix and / or postfix buttons we need to add them in
			if (button.conf.prefixButtons) {
				newButtons.unshift.apply(newButtons, button.conf.prefixButtons);
			}

			if (button.conf.postfixButtons) {
				newButtons.push.apply(newButtons, button.conf.postfixButtons);
			}

			for (i=0; i<newButtons.length; i++) {
				var newBtn = newButtons[i];

				this._expandButton(
					button.buttons,
					newBtn,
					newBtn !== undefined && newBtn.config !== undefined && newBtn.config.split !== undefined,
					true,
					newBtn.parentConf !== undefined && newBtn.parentConf.split !== undefined,
					null,
					newBtn.parentConf
				);
			}
		}

		this._draw(button.collection, button.buttons);
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function ()
	{
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function ( node ) {
		var button = this._nodeToButton( node );

		$(button.node)
			.addClass( this.c.dom.button.disabled )
			.prop('disabled', true);

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function ()
	{
		// Key event listener
		$('body').off( 'keyup.'+this.s.namespace );

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;
		
		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.remove( buttons[i].node );
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for ( i=0, ien=buttonInsts.length ; i<ien ; i++ ) {
			if ( buttonInsts.inst === this ) {
				buttonInsts.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function ( node, flag )
	{
		if ( flag === false ) {
			return this.disable( node );
		}

		var button = this._nodeToButton( node );
		$(button.node)
			.removeClass( this.c.dom.button.disabled )
			.prop('disabled', false);

		return this;
	},

	/**
	 * Get a button's index
	 * 
	 * This is internally recursive
	 * @param {element} node Button to get the index of
	 * @return {string} Button index
	 */
	index: function ( node, nested, buttons )
	{
		if ( ! nested ) {
			nested = '';
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var inner = buttons[i].buttons;

			if (buttons[i].node === node) {
				return nested + i;
			}

			if ( inner && inner.length ) {
				var match = this.index(node, i + '-', inner);

				if (match !== null) {
					return match;
				}
			}
		}

		return null;
	},


	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function ()
	{
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function ( node )
	{
		if ( ! node ) {
			return this.dom.container;
		}

		var button = this._nodeToButton( node );
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function ( node, flag )
	{
		var dt = this.s.dt;
		var button = this._nodeToButton( node );

		if ( flag === undefined ) {
			return $(button.node).hasClass( 'processing' );
		}

		$(button.node).toggleClass( 'processing', flag );

		$(dt.table().node()).triggerHandler( 'buttons-processing.dt', [
			flag, dt.button( node ), dt, $(node), button.conf
		] );

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function ( node )
	{
		var button = this._nodeToButton( node );
		var host = this._nodeToHost( node );
		var dt = this.s.dt;

		// Remove any child buttons first
		if ( button.buttons.length ) {
			for ( var i=button.buttons.length-1 ; i>=0 ; i-- ) {
				this.remove( button.buttons[i].node );
			}
		}

		button.conf.destroying = true;

		// Allow the button to remove event handlers, etc
		if ( button.conf.destroy ) {
			button.conf.destroy.call( dt.button(node), dt, $(node), button.conf );
		}

		this._removeKey( button.conf );

		$(button.node).remove();

		var idx = $.inArray( button, host );
		host.splice( idx, 1 );

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 *//**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function ( node, label )
	{
		var button = this._nodeToButton( node );
		var buttonLiner = this.c.dom.collection.buttonLiner;
		var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
			buttonLiner.tag :
			this.c.dom.buttonLiner.tag;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, jqNode, button.conf ) :
				opt;
		};

		if ( label === undefined ) {
			return text( button.conf.text );
		}

		button.conf.text = label;

		if ( linerTag ) {
			jqNode
				.children( linerTag )
				.eq(0)
				.filter(':not(.dt-down-arrow)')
				.html( text(label) );
		}
		else {
			jqNode.html( text(label) );
		}

		return this;
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons =  this.c.buttons;

		if ( ! dtSettings._buttons ) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push( {
			inst: this,
			name: this.c.name
		} );

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.add( buttons[i] );
		}

		dt.on( 'destroy', function ( e, settings ) {
			if ( settings === dtSettings ) {
				that.destroy();
			}
		} );

		// Global key event binding to listen for button keys
		$('body').on( 'keyup.'+this.s.namespace, function ( e ) {
			if ( ! document.activeElement || document.activeElement === document.body ) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if ( that.s.listenKeys.toLowerCase().indexOf( character ) !== -1 ) {
					that._keypress( character, e );
				}
			}
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function ( conf )
	{
		if ( conf.key ) {
			this.s.listenKeys += $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function ( container, buttons )
	{
		if ( ! container ) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			container.append( buttons[i].inserter );
			container.append( ' ' );

			if ( buttons[i].buttons && buttons[i].buttons.length ) {
				this._draw( buttons[i].collection, buttons[i].buttons );
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function ( attachTo, button, split, inCollection, inSplit, attachPoint, parentConf )
	{
		var dt = this.s.dt;
		var buttonCounter = 0;
		var isSplit = false;
		var buttons = ! Array.isArray( button ) ?
			[ button ] :
			button;
		
		if(button === undefined ) {
			buttons = !Array.isArray(split) ?
				[ split ] :
				split;
		}

		if (button !== undefined && button.split !== undefined) {
			isSplit = true;
		}
			
		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var conf = this._resolveExtends( buttons[i] );

			if ( ! conf ) {
				continue;
			}

			if( conf.config !== undefined && conf.config.split) {
				isSplit = true;
			}
			else {
				isSplit = false;
			}
			
			// If the configuration is an array, then expand the buttons at this
			// point
			if ( Array.isArray( conf ) ) {
				this._expandButton( attachTo, conf, built !== undefined && built.conf !== undefined ? built.conf.split : undefined, inCollection, parentConf !== undefined && parentConf.split !== undefined, attachPoint, parentConf );
				continue;
			}

			var built = this._buildButton( conf, inCollection, conf.split !== undefined || (conf.config !== undefined && conf.config.split !== undefined), inSplit );
			if ( ! built ) {
				continue;
			}

			if ( attachPoint !== undefined && attachPoint !== null ) {
				attachTo.splice( attachPoint, 0, built );
				attachPoint++;
			}
			else {
				attachTo.push( built );
			}

			
			if ( built.conf.buttons || built.conf.split ) {
				built.collection = $('<'+(isSplit ? this.c.dom.splitCollection.tag : this.c.dom.collection.tag)+'/>');

				built.conf._collection = built.collection;

				if(built.conf.split) {
					for(var j = 0; j < built.conf.split.length; j++) {
						if(typeof built.conf.split[j] === "object") {
							built.conf.split[j].parent = parentConf;
							if(built.conf.split[j].collectionLayout === undefined) {
								built.conf.split[j].collectionLayout = built.conf.collectionLayout;
							}
							if(built.conf.split[j].dropup === undefined) {
								built.conf.split[j].dropup = built.conf.dropup;
							}
							if(built.conf.split[j].fade === undefined) {
								built.conf.split[j].fade = built.conf.fade;
							}
						}
					}
				}
				else {
					$(built.node).append($('<span class="dt-down-arrow">'+this.c.dom.splitDropdown.text+'</span>'))
				}

				this._expandButton( built.buttons, built.conf.buttons, built.conf.split, !isSplit, isSplit, attachPoint, built.conf );
			}
			built.conf.parent = parentConf;

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if ( conf.init ) {
				conf.init.call( dt.button( built.node ), dt, $(built.node), conf );
			}

			buttonCounter++;
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {jQuery} Created button node (jQuery)
	 * @private
	 */
	_buildButton: function ( config, inCollection, isSplit, inSplit )
	{
		var buttonDom = this.c.dom.button;
		var linerDom = this.c.dom.buttonLiner;
		var collectionDom = this.c.dom.collection;
		var splitDom = this.c.dom.split;
		var splitCollectionDom = this.c.dom.splitCollection;
		var splitDropdownButton = this.c.dom.splitDropdownButton;
		var dt = this.s.dt;
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, button, config ) :
				opt;
		};

		// Spacers don't do much other than insert an element into the DOM
		if (config.spacer) {
			var spacer = $('<span></span>')
				.addClass('dt-button-spacer ' + config.style + ' ' + buttonDom.spacerClass)
				.html(text(config.text));

			return {
				conf:         config,
				node:         spacer,
				inserter:     spacer,
				buttons:      [],
				inCollection: inCollection,
				isSplit:	  isSplit,
				inSplit:	  inSplit,
				collection:   null
			};
		}

		if ( !isSplit && inSplit && splitCollectionDom ) {
			buttonDom = splitDropdownButton;
		}
		else if ( !isSplit && inCollection && collectionDom.button ) {
			buttonDom = collectionDom.button;
		} 

		if ( !isSplit && inSplit && splitCollectionDom.buttonLiner ) {
			linerDom = splitCollectionDom.buttonLiner
		}
		else if ( !isSplit && inCollection && collectionDom.buttonLiner ) {
			linerDom = collectionDom.buttonLiner;
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, PDF button require pdfmake
		if ( config.available && ! config.available( dt, config ) && !config.hasOwnProperty('html') ) {
			return false;
		}

		var button;
		if(!config.hasOwnProperty('html')) {
			var action = function ( e, dt, button, config ) {
				config.action.call( dt.button( button ), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
			};

			var tag = config.tag || buttonDom.tag;
			var clickBlurs = config.clickBlurs === undefined
				? true :
				config.clickBlurs;

			button = $('<'+tag+'/>')
				.addClass( buttonDom.className )
				.addClass( inSplit ? this.c.dom.splitDropdownButton.className : '')
				.attr( 'tabindex', this.s.dt.settings()[0].iTabIndex )
				.attr( 'aria-controls', this.s.dt.table().node().id )
				.on( 'click.dtb', function (e) {
					e.preventDefault();
	
					if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
						action( e, dt, button, config );
					}
					if( clickBlurs ) {
						button.trigger('blur');
					}
				} )
				.on( 'keypress.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						e.preventDefault();

						if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
							action( e, dt, button, config );
						}
					}
				} );
	
			// Make `a` tags act like a link
			if ( tag.toLowerCase() === 'a' ) {
				button.attr( 'href', '#' );
			}
	
			// Button tags should have `type=button` so they don't have any default behaviour
			if ( tag.toLowerCase() === 'button' ) {
				button.attr( 'type', 'button' );
			}
	
			if ( linerDom.tag ) {
				var liner = $('<'+linerDom.tag+'/>')
					.html( text( config.text ) )
					.addClass( linerDom.className );
	
				if ( linerDom.tag.toLowerCase() === 'a' ) {
					liner.attr( 'href', '#' );
				}
	
				button.append( liner );
			}
			else {
				button.html( text( config.text ) );
			}
	
			if ( config.enabled === false ) {
				button.addClass( buttonDom.disabled );
			}
	
			if ( config.className ) {
				button.addClass( config.className );
			}
	
			if ( config.titleAttr ) {
				button.attr( 'title', text( config.titleAttr ) );
			}
	
			if ( config.attr ) {
				button.attr( config.attr );
			}
	
			if ( ! config.namespace ) {
				config.namespace = '.dt-button-'+(_buttonCounter++);
			}

			if  ( config.config !== undefined && config.config.split ) {
				config.split = config.config.split;
			}
		}
		else {
			button = $(config.html)
		}
	
		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if ( buttonContainer && buttonContainer.tag ) {
			inserter = $('<'+buttonContainer.tag+'/>')
				.addClass( buttonContainer.className )
				.append( button );
		}
		else {
			inserter = button;
		}

		this._addKey( config );

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if( this.c.buttonCreated ) {
			inserter = this.c.buttonCreated( config, inserter );
		}

		var splitDiv;
		if(isSplit) {
			splitDiv = $('<div/>').addClass(this.c.dom.splitWrapper.className)
			splitDiv.append(button);
			var dropButtonConfig = $.extend(config, {
				text: this.c.dom.splitDropdown.text,
				className: this.c.dom.splitDropdown.className,
				closeButton: false,
				attr: {
					'aria-haspopup': 'dialog',
					'aria-expanded': false
				},
				align: this.c.dom.splitDropdown.align,
				splitAlignClass: this.c.dom.splitDropdown.splitAlignClass
				
			})

			this._addKey(dropButtonConfig);

			var splitAction = function ( e, dt, button, config ) {
				_dtButtons.split.action.call( dt.button(splitDiv), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
				button.attr('aria-expanded', true)
			};
			
			var dropButton = $('<button class="' + this.c.dom.splitDropdown.className + ' dt-button"><span class="dt-btn-split-drop-arrow">'+this.c.dom.splitDropdown.text+'</span></button>')
				.on( 'click.dtb', function (e) {
					e.preventDefault();
					e.stopPropagation();

					if ( ! dropButton.hasClass( buttonDom.disabled )) {
						splitAction( e, dt, dropButton, dropButtonConfig );
					}
					if ( clickBlurs ) {
						dropButton.trigger('blur');
					}
				} )
				.on( 'keypress.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						e.preventDefault();

						if ( ! dropButton.hasClass( buttonDom.disabled ) ) {
							splitAction( e, dt, dropButton, dropButtonConfig );
						}
					}
				} );

			if(config.split.length === 0) {
				dropButton.addClass('dtb-hide-drop');
			}

			splitDiv.append(dropButton).attr(dropButtonConfig.attr);
		}

		return {
			conf:         config,
			node:         isSplit ? splitDiv.get(0) : button.get(0),
			inserter:     isSplit ? splitDiv : inserter,
			buttons:      [],
			inCollection: inCollection,
			isSplit:	  isSplit,
			inSplit:	  inSplit,
			collection:   null
		};
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons[i];
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToButton( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons;
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToHost( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function ( character, e )
	{
		// Check if this button press already activated on another instance of Buttons
		if ( e._buttonsHandled ) {
			return;
		}

		var run = function ( conf, node ) {
			if ( ! conf.key ) {
				return;
			}

			if ( conf.key === character ) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ( $.isPlainObject( conf.key ) ) {
				if ( conf.key.key !== character ) {
					return;
				}

				if ( conf.key.shiftKey && ! e.shiftKey ) {
					return;
				}

				if ( conf.key.altKey && ! e.altKey ) {
					return;
				}

				if ( conf.key.ctrlKey && ! e.ctrlKey ) {
					return;
				}

				if ( conf.key.metaKey && ! e.metaKey ) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function ( a ) {
			for ( var i=0, ien=a.length ; i<ien ; i++ ) {
				run( a[i].conf, a[i].node );

				if ( a[i].buttons.length ) {
					recurse( a[i].buttons );
				}
			}
		};

		recurse( this.s.buttons );
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function ( conf )
	{
		if ( conf.key ) {
			var character = $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray( character, a );
			a.splice( idx, 1 );
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function ( conf )
	{
		var that = this;
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function ( base ) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while ( ! $.isPlainObject(base) && ! Array.isArray(base) ) {
				if ( base === undefined ) {
					return;
				}

				if ( typeof base === 'function' ) {
					base = base.call( that, dt, conf );

					if ( ! base ) {
						return false;
					}
				}
				else if ( typeof base === 'string' ) {
					if ( ! _dtButtons[ base ] ) {
						return {html: base}
					}

					base = _dtButtons[ base ];
				}

				loop++;
				if ( loop > 30 ) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return Array.isArray( base ) ?
				base :
				$.extend( {}, base );
		};

		conf = toConfObject( conf );

		while ( conf && conf.extend ) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if ( ! _dtButtons[ conf.extend ] ) {
				throw 'Cannot extend unknown button type: '+conf.extend;
			}

			var objArray = toConfObject( _dtButtons[ conf.extend ] );
			if ( Array.isArray( objArray ) ) {
				return objArray;
			}
			else if ( ! objArray ) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			if (conf.config !== undefined && objArray.config !== undefined) {
				conf.config = $.extend({}, objArray.config, conf.config)
			}

			conf = $.extend( {}, objArray, conf );

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if ( originalClassName && conf.className !== originalClassName ) {
				conf.className = originalClassName+' '+conf.className;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		// Buttons to be added to a collection  -gives the ability to define
		// if buttons should be added to the start or end of a collection
		var postfixButtons = conf.postfixButtons;
		if ( postfixButtons ) {
			if ( ! conf.buttons ) {
				conf.buttons = [];
			}

			for ( i=0, ien=postfixButtons.length ; i<ien ; i++ ) {
				conf.buttons.push( postfixButtons[i] );
			}
		}

		var prefixButtons = conf.prefixButtons;
		if ( prefixButtons ) {
			if ( ! conf.buttons ) {
				conf.buttons = [];
			}

			for ( i=0, ien=prefixButtons.length ; i<ien ; i++ ) {
				conf.buttons.splice( i, 0, prefixButtons[i] );
			}
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function ( content, hostButton, inOpts, e ) {
		var dt = hostButton;
		var buttonsSettings = this.c;
		var closed = false;
		var options = $.extend( {
			align: 'button-left', // button-right, dt-container, split-left, split-right
			autoClose: false,
			background: true,
			backgroundClassName: 'dt-button-background',
			closeButton: true,
			contentClassName: buttonsSettings.dom.collection.className,
			collectionLayout: '',
			collectionTitle: '',
			dropup: false,
			fade: 400,
			popoverTitle: '',
			rightAlignClassName: 'dt-button-right',
			tag: buttonsSettings.dom.collection.tag
		}, inOpts );

		var hostNode = hostButton.node();

		var close = function () {
			closed = true;

			_fadeOut(
				$('.dt-button-collection'),
				options.fade,
				function () {
					$(this).detach();
				}
			);

			$(dt.buttons( '[aria-haspopup="dialog"][aria-expanded="true"]' ).nodes())
				.attr('aria-expanded', 'false');

			$('div.dt-button-background').off( 'click.dtb-collection' );
			Buttons.background( false, options.backgroundClassName, options.fade, hostNode );

			$(window).off('resize.resize.dtb-collection');
			$('body').off( '.dtb-collection' );
			dt.off( 'buttons-action.b-internal' );
			dt.off( 'destroy' );
		};

		if (content === false) {
			close();
			return;
		}

		var existingExpanded = $(dt.buttons( '[aria-haspopup="dialog"][aria-expanded="true"]' ).nodes());
		if ( existingExpanded.length ) {
			// Reuse the current position if the button that was triggered is inside an existing collection
			if (hostNode.closest('div.dt-button-collection').length) {
				hostNode = existingExpanded.eq(0);
			}

			close();
		}

		// Try to be smart about the layout
		var cnt = $('.dt-button', content).length;
		var mod = '';

		if (cnt === 3) {
			mod = 'dtb-b3';
		}
		else if (cnt === 2) {
			mod = 'dtb-b2';
		}
		else if (cnt === 1) {
			mod = 'dtb-b1';
		}

		var display = $('<div/>')
			.addClass('dt-button-collection')
			.addClass(options.collectionLayout)
			.addClass(options.splitAlignClass)
			.addClass(mod)
			.css('display', 'none')
			.attr({
				'aria-modal': true,
				role: 'dialog'
			});

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostNode.attr( 'aria-expanded', 'true' );

		if ( hostNode.parents('body')[0] !== document.body ) {
			hostNode = document.body.lastChild;
		}

		if ( options.popoverTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.popoverTitle+'</div>');
		}
		else if ( options.collectionTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');
		}

		if (options.closeButton) {
			display.prepend('<div class="dtb-popover-close">x</div>').addClass('dtb-collection-closeable')
		}

		_fadeIn( display.insertAfter( hostNode ), options.fade );

		var tableContainer = $( hostButton.table().container() );
		var position = display.css( 'position' );

		if ( options.span === 'container' || options.align === 'dt-container' ) {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		// Align the popover relative to the DataTables container
		// Useful for wide popovers such as SearchPanes
		if (position === 'absolute') {
			// Align relative to the host button
			var offsetParent = $(hostNode[0].offsetParent);
			var buttonPosition = hostNode.position();
			var buttonOffset = hostNode.offset();
			var tableSizes = offsetParent.offset();
			var containerPosition = offsetParent.position();
			var computed = window.getComputedStyle(offsetParent[0]);

			tableSizes.height = offsetParent.outerHeight();
			tableSizes.width = offsetParent.width() + parseFloat(computed.paddingLeft);
			tableSizes.right = tableSizes.left + tableSizes.width;
			tableSizes.bottom = tableSizes.top + tableSizes.height;

			// Set the initial position so we can read height / width
			var top = buttonPosition.top + hostNode.outerHeight();
			var left = buttonPosition.left;

			display.css( {
				top: top,
				left: left
			} );

			// Get the popover position
			computed = window.getComputedStyle(display[0]);
			var popoverSizes = display.offset();

			popoverSizes.height = display.outerHeight();
			popoverSizes.width = display.outerWidth();
			popoverSizes.right = popoverSizes.left + popoverSizes.width;
			popoverSizes.bottom = popoverSizes.top + popoverSizes.height;
			popoverSizes.marginTop = parseFloat(computed.marginTop);
			popoverSizes.marginBottom = parseFloat(computed.marginBottom);

			// First position per the class requirements - pop up and right align
			if (options.dropup) {
				top = buttonPosition.top - popoverSizes.height - popoverSizes.marginTop - popoverSizes.marginBottom;
			}

			if (options.align === 'button-right' || display.hasClass( options.rightAlignClassName )) {
				left = buttonPosition.left - popoverSizes.width + hostNode.outerWidth(); 
			}

			// Container alignment - make sure it doesn't overflow the table container
			if (options.align === 'dt-container' || options.align === 'container') {
				if (left < buttonPosition.left) {
					left = -buttonPosition.left;
				}

				if (left + popoverSizes.width > tableSizes.width) {
					left = tableSizes.width - popoverSizes.width;
				}
			}

			// Window adjustment
			if (containerPosition.left + left + popoverSizes.width > $(window).width()) {
				// Overflowing the document to the right
				left = $(window).width() - popoverSizes.width - containerPosition.left;
			}

			if (buttonOffset.left + left < 0) {
				// Off to the left of the document
				left = -buttonOffset.left;
			}

			if (containerPosition.top + top + popoverSizes.height > $(window).height() + $(window).scrollTop()) {
				// Pop up if otherwise we'd need the user to scroll down
				top = buttonPosition.top - popoverSizes.height - popoverSizes.marginTop - popoverSizes.marginBottom;
			}

			if (containerPosition.top + top < $(window).scrollTop()) {
				// Correction for when the top is beyond the top of the page
				top = buttonPosition.top + hostNode.outerHeight();
			}

			// Calculations all done - now set it
			display.css( {
				top: top,
				left: left
			} );
		}
		else {
			// Fix position - centre on screen
			var position = function () {
				var half = $(window).height() / 2;

				var top = display.height() / 2;
				if ( top > half ) {
					top = half;
				}

				display.css( 'marginTop', top*-1 );
			};

			position();

			$(window).on('resize.dtb-collection', function () {
				position();
			});
		}

		if ( options.background ) {
			Buttons.background(
				true,
				options.backgroundClassName,
				options.fade,
				options.backgroundHost || hostNode
			);
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on( 'click.dtb-collection', function () {} );

		if ( options.autoClose ) {
			setTimeout( function () {
				dt.on( 'buttons-action.b-internal', function (e, btn, dt, node) {
					if ( node[0] === hostNode[0] ) {
						return;
					}
					close();
				} );
			}, 0);
		}
		
		$(display).trigger('buttons-popover.dt');


		dt.on('destroy', close);

		setTimeout(function() {
			closed = false;
			$('body')
				.on( 'click.dtb-collection', function (e) {
					if (closed) {
						return;
					}

					// andSelf is deprecated in jQ1.8, but we want 1.7 compat
					var back = $.fn.addBack ? 'addBack' : 'andSelf';
					var parent = $(e.target).parent()[0];
	
					if (( ! $(e.target).parents()[back]().filter( content ).length  && !$(parent).hasClass('dt-buttons')) || $(e.target).hasClass('dt-button-background')) {
						close();
					}
				} )
				.on( 'keyup.dtb-collection', function (e) {
					if ( e.keyCode === 27 ) {
						close();
					}
				} )
				.on( 'keydown.dtb-collection', function (e) {
					// Focus trap for tab key
					var elements = $('a, button', content);
					var active = document.activeElement;

					if (e.keyCode !== 9) { // tab
						return;
					}

					if (elements.index(active) === -1) {
						// If current focus is not inside the popover
						elements.first().focus();
						e.preventDefault();
					}
					else if (e.shiftKey) {
						// Reverse tabbing order when shift key is pressed
						if (active === elements[0]) {
							elements.last().focus();
							e.preventDefault();
						}
					}
					else {
						if (active === elements.last()[0]) {
							elements.first().focus();
							e.preventDefault();
						}
					}
				} );
		}, 0);
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden 
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function ( show, className, fade, insertPoint ) {
	if ( fade === undefined ) {
		fade = 400;
	}
	if ( ! insertPoint ) {
		insertPoint = document.body;
	}

	if ( show ) {
		_fadeIn(
			$('<div/>')
				.addClass( className )
				.css( 'display', 'none' )
				.insertAfter( insertPoint ),
			fade
		);
	}
	else {
		_fadeOut(
			$('div.'+className),
			fade,
			function () {
				$(this)
					.removeClass( className )
					.remove();
			}
		);
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function ( group, buttons )
{
	if ( group === undefined || group === null ) {
		return $.map( buttons, function ( v ) {
			return v.inst;
		} );
	}

	var ret = [];
	var names = $.map( buttons, function ( v ) {
		return v.name;
	} );

	// Flatten the group selector into an array of single options
	var process = function ( input ) {
		if ( Array.isArray( input ) ) {
			for ( var i=0, ien=input.length ; i<ien ; i++ ) {
				process( input[i] );
			}
			return;
		}

		if ( typeof input === 'string' ) {
			if ( input.indexOf( ',' ) !== -1 ) {
				// String selector, list of names
				process( input.split(',') );
			}
			else {
				// String selector individual name
				var idx = $.inArray( input.trim(), names );

				if ( idx !== -1 ) {
					ret.push( buttons[ idx ].inst );
				}
			}
		}
		else if ( typeof input === 'number' ) {
			// Index selector
			ret.push( buttons[ input ].inst );
		}
		else if ( typeof input === 'object' ) {
			// Actual instance selector
			ret.push( input );
		}
	};
	
	process( group );

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function ( insts, selector )
{
	var ret = [];
	var nodeBuilder = function ( a, buttons, baseIdx ) {
		var button;
		var idx;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( button ) {
				idx = baseIdx !== undefined ?
					baseIdx+i :
					i+'';

				a.push( {
					node: button.node,
					name: button.conf.name,
					idx:  idx
				} );

				if ( button.buttons ) {
					nodeBuilder( a, button.buttons, idx+'-' );
				}
			}
		}
	};

	var run = function ( selector, inst ) {
		var i, ien;
		var buttons = [];
		nodeBuilder( buttons, inst.s.buttons );

		var nodes = $.map( buttons, function (v) {
			return v.node;
		} );

		if ( Array.isArray( selector ) || selector instanceof $ ) {
			for ( i=0, ien=selector.length ; i<ien ; i++ ) {
				run( selector[i], inst );
			}
			return;
		}

		if ( selector === null || selector === undefined || selector === '*' ) {
			// Select all
			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				ret.push( {
					inst: inst,
					node: buttons[i].node
				} );
			}
		}
		else if ( typeof selector === 'number' ) {
			// Main button index selector
			if (inst.s.buttons[ selector ]) {
				ret.push( {
					inst: inst,
					node: inst.s.buttons[ selector ].node
				} );
			}
		}
		else if ( typeof selector === 'string' ) {
			if ( selector.indexOf( ',' ) !== -1 ) {
				// Split
				var a = selector.split(',');

				for ( i=0, ien=a.length ; i<ien ; i++ ) {
					run( a[i].trim(), inst );
				}
			}
			else if ( selector.match( /^\d+(\-\d+)*$/ ) ) {
				// Sub-button index selector
				var indexes = $.map( buttons, function (v) {
					return v.idx;
				} );

				ret.push( {
					inst: inst,
					node: buttons[ $.inArray( selector, indexes ) ].node
				} );
			}
			else if ( selector.indexOf( ':name' ) !== -1 ) {
				// Button name selector
				var name = selector.replace( ':name', '' );

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					if ( buttons[i].name === name ) {
						ret.push( {
							inst: inst,
							node: buttons[i].node
						} );
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$( nodes ).filter( selector ).each( function () {
					ret.push( {
						inst: inst,
						node: this
					} );
				} );
			}
		}
		else if ( typeof selector === 'object' && selector.nodeName ) {
			// Node selector
			var idx = $.inArray( selector, nodes );

			if ( idx !== -1 ) {
				ret.push( {
					inst: inst,
					node: nodes[ idx ]
				} );
			}
		}
	};


	for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
		var inst = insts[i];

		run( selector, inst );
	}

	return ret;
};

/**
 * Default function used for formatting output data.
 * @param {*} str Data to strip
 */
Buttons.stripData = function ( str, config ) {
	if ( typeof str !== 'string' ) {
		return str;
	}

	// Always remove script tags
	str = str.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

	// Always remove comments
	str = str.replace( /<!\-\-.*?\-\->/g, '' );

	if ( ! config || config.stripHtml ) {
		str = str.replace( /<[^>]*>/g, '' );
	}

	if ( ! config || config.trim ) {
		str = str.replace( /^\s+|\s+$/g, '' );
	}

	if ( ! config || config.stripNewlines ) {
		str = str.replace( /\n/g, ' ' );
	}

	if ( ! config || config.decodeEntities ) {
		_exportTextarea.innerHTML = str;
		str = _exportTextarea.value;
	}

	return str;
};


/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: ''
		},
		button: {
			tag: 'button',
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled',
			spacerClass: ''
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		},
		split: {
			tag: 'div',
			className: 'dt-button-split',
		},
		splitWrapper: {
			tag: 'div',
			className: 'dt-btn-split-wrapper',
		},
		splitDropdown: {
			tag: 'button',
			text: '&#x25BC;',
			className: 'dt-btn-split-drop',
			align: 'split-right',
			splitAlignClass: 'dt-button-split-left'
		},
		splitDropdownButton: {
			tag: 'button',
			className: 'dt-btn-split-drop-button dt-button',
		},
		splitCollection: {
			tag: 'div',
			className: 'dt-button-split-collection',
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '2.3.6';


$.extend( _dtButtons, {
	collection: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.collection', 'Collection' );
		},
		className: 'buttons-collection',
		closeButton: false,
		init: function ( dt, button, config ) {
			button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			if ( config._collection.parents('body').length ) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}

			// When activated using a key - auto focus on the
			// first item in the popover
			if (e.type === 'keypress') {
				$('a, button', config._collection).eq(0).focus();
			}
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	split: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.split', 'Split' );
		},
		className: 'buttons-split',
		closeButton: false,
		init: function ( dt, button, config ) {
			return button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			this.popover(config._collection, config);
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function ( dt, conf ) {
		if ( _dtButtons.copyHtml5 ) {
			return 'copyHtml5';
		}
	},
	csv: function ( dt, conf ) {
		if ( _dtButtons.csvHtml5 && _dtButtons.csvHtml5.available( dt, conf ) ) {
			return 'csvHtml5';
		}
	},
	excel: function ( dt, conf ) {
		if ( _dtButtons.excelHtml5 && _dtButtons.excelHtml5.available( dt, conf ) ) {
			return 'excelHtml5';
		}
	},
	pdf: function ( dt, conf ) {
		if ( _dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available( dt, conf ) ) {
			return 'pdfHtml5';
		}
	},
	pageLength: function ( dt ) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = [];
		var lang = [];
		var text = function ( dt ) {
			return dt.i18n( 'buttons.pageLength', {
				"-1": 'Show all rows',
				_:    'Show %d rows'
			}, dt.page.len() );
		};

		// Support for DataTables 1.x 2D array
		if (Array.isArray( lengthMenu[0] )) {
			vals = lengthMenu[0];
			lang = lengthMenu[1];
		}
		else {
			for (var i=0 ; i<lengthMenu.length ; i++) {
				var option = lengthMenu[i];

				// Support for DataTables 2 object in the array
				if ($.isPlainObject(option)) {
					vals.push(option.value);
					lang.push(option.label);
				}
				else {
					vals.push(option);
					lang.push(option);
				}
			}
		}

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map( vals, function ( val, i ) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function ( e, dt ) {
						dt.page.len( val ).draw();
					},
					init: function ( dt, node, conf ) {
						var that = this;
						var fn = function () {
							that.active( dt.page.len() === val );
						};

						dt.on( 'length.dt'+conf.namespace, fn );
						fn();
					},
					destroy: function ( dt, node, conf ) {
						dt.off( 'length.dt'+conf.namespace );
					}
				};
			} ),
			init: function ( dt, node, conf ) {
				var that = this;
				dt.on( 'length.dt'+conf.namespace, function () {
					that.text( conf.text );
				} );
			},
			destroy: function ( dt, node, conf ) {
				dt.off( 'length.dt'+conf.namespace );
			}
		};
	},
	spacer: {
		style: 'empty',
		spacer: true,
		text: function ( dt ) {
			return dt.i18n( 'buttons.spacer', '' );
		}
	}
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
DataTable.Api.register( 'buttons()', function ( group, selector ) {
	// Argument shifting
	if ( selector === undefined ) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			return Buttons.buttonSelector(
				Buttons.instanceSelector( group, ctx._buttons ),
				selector
			);
		}
	}, true );

	res._groupSelector = group;
	return res;
} );

// Individual button selector
DataTable.Api.register( 'button()', function ( group, selector ) {
	// just run buttons() and truncate
	var buttons = this.buttons( group, selector );

	if ( buttons.length > 1 ) {
		buttons.splice( 1, buttons.length );
	}

	return buttons;
} );

// Active buttons
DataTable.Api.registerPlural( 'buttons().active()', 'button().active()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.active( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.active( set.node, flag );
	} );
} );

// Get / set button action
DataTable.Api.registerPlural( 'buttons().action()', 'button().action()', function ( action ) {
	if ( action === undefined ) {
		return this.map( function ( set ) {
			return set.inst.action( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.action( set.node, action );
	} );
} );

// Collection control
DataTable.Api.registerPlural( 'buttons().collectionRebuild()', 'button().collectionRebuild()', function ( buttons ) {
	return this.each( function ( set ) {
		for(var i = 0; i < buttons.length; i++) {
			if(typeof buttons[i] === 'object') {
				buttons[i].parentConf = set;
			}
		}
		set.inst.collectionRebuild( set.node, buttons );
	} );
} );

// Enable / disable buttons
DataTable.Api.register( ['buttons().enable()', 'button().enable()'], function ( flag ) {
	return this.each( function ( set ) {
		set.inst.enable( set.node, flag );
	} );
} );

// Disable buttons
DataTable.Api.register( ['buttons().disable()', 'button().disable()'], function () {
	return this.each( function ( set ) {
		set.inst.disable( set.node );
	} );
} );

// Button index
DataTable.Api.register( 'button().index()', function () {
	var idx = null;

	this.each( function ( set ) {
		var res = set.inst.index( set.node );

		if (res !== null) {
			idx = res;
		}
	} );

	return idx;
} );

// Get button nodes
DataTable.Api.registerPlural( 'buttons().nodes()', 'button().node()', function () {
	var jq = $();

	// jQuery will automatically reduce duplicates to a single entry
	$( this.each( function ( set ) {
		jq = jq.add( set.inst.node( set.node ) );
	} ) );

	return jq;
} );

// Get / set button processing state
DataTable.Api.registerPlural( 'buttons().processing()', 'button().processing()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.processing( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.processing( set.node, flag );
	} );
} );

// Get / set button text (i.e. the button labels)
DataTable.Api.registerPlural( 'buttons().text()', 'button().text()', function ( label ) {
	if ( label === undefined ) {
		return this.map( function ( set ) {
			return set.inst.text( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.text( set.node, label );
	} );
} );

// Trigger a button's action
DataTable.Api.registerPlural( 'buttons().trigger()', 'button().trigger()', function () {
	return this.each( function ( set ) {
		set.inst.node( set.node ).trigger( 'click' );
	} );
} );

// Button resolver to the popover
DataTable.Api.register( 'button().popover()', function (content, options) {
	return this.map( function ( set ) {
		return set.inst._popover( content, this.button(this[0].node), options );
	} );
} );

// Get the container elements
DataTable.Api.register( 'buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			var insts = Buttons.instanceSelector( groupSelector, ctx._buttons );

			for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
				jq = jq.add( insts[i].container() );
			}
		}
	} );

	return jq;
} );

DataTable.Api.register( 'buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
} );

// Add a new button
DataTable.Api.register( 'button().add()', function ( idx, conf, draw ) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if ( ctx.length ) {
		var inst = Buttons.instanceSelector( this._groupSelector, ctx[0]._buttons );

		if ( inst.length ) {
			inst[0].add( conf, idx , draw);
		}
	}

	return this.button( this._groupSelector, idx );
} );

// Destroy the button sets selected
DataTable.Api.register( 'buttons().destroy()', function () {
	this.pluck( 'inst' ).unique().each( function ( inst ) {
		inst.destroy();
	} );

	return this;
} );

// Remove a button
DataTable.Api.registerPlural( 'buttons().remove()', 'buttons().remove()', function () {
	this.each( function ( set ) {
		set.inst.remove( set.node );
	} );

	return this;
} );

// Information box that can be used by buttons
var _infoTimer;
DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
	var that = this;

	if ( title === false ) {
		this.off('destroy.btn-info');
		_fadeOut(
			$('#datatables_buttons_info'),
			400,
			function () {
				$(this).remove();
			}
		);
		clearTimeout( _infoTimer );
		_infoTimer = null;

		return this;
	}

	if ( _infoTimer ) {
		clearTimeout( _infoTimer );
	}

	if ( $('#datatables_buttons_info').length ) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>'+title+'</h2>' : '';

	_fadeIn(
		$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html( title )
			.append( $('<div/>')[ typeof message === 'string' ? 'html' : 'append' ]( message ) )
			.css( 'display', 'none' )
			.appendTo( 'body' )
	);

	if ( time !== undefined && time !== 0 ) {
		_infoTimer = setTimeout( function () {
			that.buttons.info( false );
		}, time );
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
} );

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
DataTable.Api.register( 'buttons.exportData()', function ( options ) {
	if ( this.context.length ) {
		return _exportData( new DataTable.Api( this.context[0] ), options );
	}
} );

// Get information about the export that is common to many of the export data
// types (DRY)
DataTable.Api.register( 'buttons.exportInfo()', function ( conf ) {
	if ( ! conf ) {
		conf = {};
	}

	return {
		filename: _filename( conf ),
		title: _title( conf ),
		messageTop: _message(this, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf.messageBottom, 'bottom')
	};
} );



/**
 * Get the file name for an exported file.
 *
 * @param {object}	config Button configuration
 * @param {boolean} incExtension Include the file name extension
 */
var _filename = function ( config )
{
	// Backwards compatibility
	var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
		config.title :
		config.filename;

	if ( typeof filename === 'function' ) {
		filename = filename();
	}

	if ( filename === undefined || filename === null ) {
		return null;
	}

	if ( filename.indexOf( '*' ) !== -1 ) {
		filename = filename.replace( '*', $('head > title').text() ).trim();
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

	var extension = _stringOrFunction( config.extension );
	if ( ! extension ) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function ( option )
{
	if ( option === null || option === undefined ) {
		return null;
	}
	else if ( typeof option === 'function' ) {
		return option();
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function ( config )
{
	var title = _stringOrFunction( config.title );

	return title === null ?
		null : title.indexOf( '*' ) !== -1 ?
			title.replace( '*', $('head > title').text() || 'Exported data' ) :
			title;
};

var _message = function ( dt, option, position )
{
	var message = _stringOrFunction( option );
	if ( message === null ) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if ( message === '*' ) {
		var side = caption.css( 'caption-side' );
		if ( side !== position ) {
			return null;
		}

		return caption.length ?
			caption.text() :
			'';
	}

	return message;
};




var _exportTextarea = $('<textarea/>')[0];
var _exportData = function ( dt, inOpts )
{
	var config = $.extend( true, {}, {
		rows:           null,
		columns:        '',
		modifier:       {
			search: 'applied',
			order:  'applied'
		},
		orthogonal:     'display',
		stripHtml:      true,
		stripNewlines:  true,
		decodeEntities: true,
		trim:           true,
		format:         {
			header: function ( d ) {
				return Buttons.stripData( d, config );
			},
			footer: function ( d ) {
				return Buttons.stripData( d, config );
			},
			body: function ( d ) {
				return Buttons.stripData( d, config );
			}
		},
		customizeData: null
	}, inOpts );

	var header = dt.columns( config.columns ).indexes().map( function (idx) {
		var el = dt.column( idx ).header();
		return config.format.header( el.innerHTML, idx, el );
	} ).toArray();

	var footer = dt.table().footer() ?
		dt.columns( config.columns ).indexes().map( function (idx) {
			var el = dt.column( idx ).footer();
			return config.format.footer( el ? el.innerHTML : '', idx, el );
		} ).toArray() :
		null;
	
	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend( {}, config.modifier );
	if ( dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined ) {
		if ( dt.rows( config.rows, $.extend( { selected: true }, modifier ) ).any() ) {
			$.extend( modifier, { selected: true } )
		}
	}

	var rowIndexes = dt.rows( config.rows, modifier ).indexes().toArray();
	var selectedCells = dt.cells( rowIndexes, config.columns );
	var cells = selectedCells
		.render( config.orthogonal )
		.toArray();
	var cellNodes = selectedCells
		.nodes()
		.toArray();

	var columns = header.length;
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for ( var i=0, ien=rows ; i<ien ; i++ ) {
		var row = [ columns ];

		for ( var j=0 ; j<columns ; j++ ) {
			row[j] = config.format.body( cells[ cellCounter ], i, j, cellNodes[ cellCounter ] );
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		footer: footer,
		body:   body
	};

	if ( config.customizeData ) {
		config.customizeData( data );
	}

	return data;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;



// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on( 'init.dt plugin-init.dt', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.buttons || DataTable.defaults.buttons;

	if ( opts && ! settings._buttons ) {
		new Buttons( settings, opts ).container();
	}
} );

function _init ( settings, options ) {
	var api = new DataTable.Api( settings );
	var opts = options
		? options
		: api.init().buttons || DataTable.defaults.buttons;

	return new Buttons( api, opts ).container();
}

// DataTables `dom` feature option
DataTable.ext.feature.push( {
	fnInit: _init,
	cFeature: "B"
} );

// DataTables 2 layout feature
if ( DataTable.ext.features ) {
	DataTable.ext.features.register( 'buttons', _init );
}


return DataTable;
}));


/*! DataTables styling wrapper for Buttons
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-dt')(root, $);
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;



(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));

return DataTable;
}));


/*! Select for DataTables 1.6.2
 * © SpryMedia Ltd - datatables.net/license/mit
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;



// Version information for debugger
DataTable.select = {};

DataTable.select.version = '1.6.2';

DataTable.select.init = function ( dt ) {
	var ctx = dt.settings()[0];

	if (ctx._select) {
		return;
	}

	var savedSelected = dt.state.loaded();

	var selectAndSave = function(e, settings, data) {
		if(data === null || data.select === undefined) {
			return;
		}

		// Clear any currently selected rows, before restoring state
		// None will be selected on first initialisation
		if (dt.rows({selected: true}).any()) {
			dt.rows().deselect();
		}
		if (data.select.rows !== undefined) {
			dt.rows(data.select.rows).select();
		}

		if (dt.columns({selected: true}).any()) {
			dt.columns().deselect();
		}
		if (data.select.columns !== undefined) {
			dt.columns(data.select.columns).select();
		}

		if (dt.cells({selected: true}).any()) {
			dt.cells().deselect();
		}
		if (data.select.cells !== undefined) {
			for(var i = 0; i < data.select.cells.length; i++) {
				dt.cell(data.select.cells[i].row, data.select.cells[i].column).select();
			}
		}

		dt.state.save();
	}
	
	dt
		.on('stateSaveParams', function(e, settings, data) {
			data.select = {};
			data.select.rows = dt.rows({selected:true}).ids(true).toArray();
			data.select.columns = dt.columns({selected:true})[0];
			data.select.cells = dt.cells({selected:true})[0].map(function(coords) {
				return {row: dt.row(coords.row).id(true), column: coords.column}
			});
		})
		.on('stateLoadParams', selectAndSave)
		.one('init', function() {
			selectAndSave(undefined, undefined, savedSelected);
		});

	var init = ctx.oInit.select;
	var defaults = DataTable.defaults.select;
	var opts = init === undefined ?
		defaults :
		init;

	// Set defaults
	var items = 'row';
	var style = 'api';
	var blurable = false;
	var toggleable = true;
	var info = true;
	var selector = 'td, th';
	var className = 'selected';
	var setStyle = false;

	ctx._select = {};

	// Initialisation customisations
	if ( opts === true ) {
		style = 'os';
		setStyle = true;
	}
	else if ( typeof opts === 'string' ) {
		style = opts;
		setStyle = true;
	}
	else if ( $.isPlainObject( opts ) ) {
		if ( opts.blurable !== undefined ) {
			blurable = opts.blurable;
		}
		
		if ( opts.toggleable !== undefined ) {
			toggleable = opts.toggleable;
		}

		if ( opts.info !== undefined ) {
			info = opts.info;
		}

		if ( opts.items !== undefined ) {
			items = opts.items;
		}

		if ( opts.style !== undefined ) {
			style = opts.style;
			setStyle = true;
		}
		else {
			style = 'os';
			setStyle = true;
		}

		if ( opts.selector !== undefined ) {
			selector = opts.selector;
		}

		if ( opts.className !== undefined ) {
			className = opts.className;
		}
	}

	dt.select.selector( selector );
	dt.select.items( items );
	dt.select.style( style );
	dt.select.blurable( blurable );
	dt.select.toggleable( toggleable );
	dt.select.info( info );
	ctx._select.className = className;


	// Sort table based on selected rows. Requires Select Datatables extension
	$.fn.dataTable.ext.order['select-checkbox'] = function ( settings, col ) {
		return this.api().column( col, {order: 'index'} ).nodes().map( function ( td ) {
			if ( settings._select.items === 'row' ) {
				return $( td ).parent().hasClass( settings._select.className );
			} else if ( settings._select.items === 'cell' ) {
				return $( td ).hasClass( settings._select.className );
			}
			return false;
		});
	};

	// If the init options haven't enabled select, but there is a selectable
	// class name, then enable
	if ( ! setStyle && $( dt.table().node() ).hasClass( 'selectable' ) ) {
		dt.select.style( 'os' );
	}
};

/*

Select is a collection of API methods, event handlers, event emitters and
buttons (for the `Buttons` extension) for DataTables. It provides the following
features, with an overview of how they are implemented:

## Selection of rows, columns and cells. Whether an item is selected or not is
   stored in:

* rows: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoData` object for each row
* columns: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoColumns` object for each column
* cells: a `_selected_cells` property which contains an array of boolean values
  of the `aoData` object for each row. The array is the same length as the
  columns array, with each element of it representing a cell.

This method of using boolean flags allows Select to operate when nodes have not
been created for rows / cells (DataTables' defer rendering feature).

## API methods

A range of API methods are available for triggering selection and de-selection
of rows. Methods are also available to configure the selection events that can
be triggered by an end user (such as which items are to be selected). To a large
extent, these of API methods *is* Select. It is basically a collection of helper
functions that can be used to select items in a DataTable.

Configuration of select is held in the object `_select` which is attached to the
DataTables settings object on initialisation. Select being available on a table
is not optional when Select is loaded, but its default is for selection only to
be available via the API - so the end user wouldn't be able to select rows
without additional configuration.

The `_select` object contains the following properties:

```
{
	items:string       - Can be `rows`, `columns` or `cells`. Defines what item 
	                     will be selected if the user is allowed to activate row
	                     selection using the mouse.
	style:string       - Can be `none`, `single`, `multi` or `os`. Defines the
	                     interaction style when selecting items
	blurable:boolean   - If row selection can be cleared by clicking outside of
	                     the table
	toggleable:boolean - If row selection can be cancelled by repeated clicking
	                     on the row
	info:boolean       - If the selection summary should be shown in the table
	                     information elements
}
```

In addition to the API methods, Select also extends the DataTables selector
options for rows, columns and cells adding a `selected` option to the selector
options object, allowing the developer to select only selected items or
unselected items.

## Mouse selection of items

Clicking on items can be used to select items. This is done by a simple event
handler that will select the items using the API methods.

 */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */

/**
 * Add one or more cells to the selection when shift clicking in OS selection
 * style cell selection.
 *
 * Cell range is more complicated than row and column as we want to select
 * in the visible grid rather than by index in sequence. For example, if you
 * click first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1
 * should also be selected (and not 1-3, 1-4. etc)
 * 
 * @param  {DataTable.Api} dt   DataTable
 * @param  {object}        idx  Cell index to select to
 * @param  {object}        last Cell index to select from
 * @private
 */
function cellRange( dt, idx, last )
{
	var indexes;
	var columnIndexes;
	var rowIndexes;
	var selectColumns = function ( start, end ) {
		if ( start > end ) {
			var tmp = end;
			end = start;
			start = tmp;
		}
		
		var record = false;
		return dt.columns( ':visible' ).indexes().filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) { // not else if, as start might === end
				record = false;
				return true;
			}

			return record;
		} );
	};

	var selectRows = function ( start, end ) {
		var indexes = dt.rows( { search: 'applied' } ).indexes();

		// Which comes first - might need to swap
		if ( indexes.indexOf( start ) > indexes.indexOf( end ) ) {
			var tmp = end;
			end = start;
			start = tmp;
		}

		var record = false;
		return indexes.filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) {
				record = false;
				return true;
			}

			return record;
		} );
	};

	if ( ! dt.cells( { selected: true } ).any() && ! last ) {
		// select from the top left cell to this one
		columnIndexes = selectColumns( 0, idx.column );
		rowIndexes = selectRows( 0 , idx.row );
	}
	else {
		// Get column indexes between old and new
		columnIndexes = selectColumns( last.column, idx.column );
		rowIndexes = selectRows( last.row , idx.row );
	}

	indexes = dt.cells( rowIndexes, columnIndexes ).flatten();

	if ( ! dt.cells( idx, { selected: true } ).any() ) {
		// Select range
		dt.cells( indexes ).select();
	}
	else {
		// Deselect range
		dt.cells( indexes ).deselect();
	}
}

/**
 * Disable mouse selection by removing the selectors
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */
function disableMouseSelection( dt )
{
	var ctx = dt.settings()[0];
	var selector = ctx._select.selector;

	$( dt.table().container() )
		.off( 'mousedown.dtSelect', selector )
		.off( 'mouseup.dtSelect', selector )
		.off( 'click.dtSelect', selector );

	$('body').off( 'click.dtSelect' + _safeId(dt.table().node()) );
}

/**
 * Attach mouse listeners to the table to allow mouse selection of items
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */
function enableMouseSelection ( dt )
{
	var container = $( dt.table().container() );
	var ctx = dt.settings()[0];
	var selector = ctx._select.selector;
	var matchSelection;

	container
		.on( 'mousedown.dtSelect', selector, function(e) {
			// Disallow text selection for shift clicking on the table so multi
			// element selection doesn't look terrible!
			if ( e.shiftKey || e.metaKey || e.ctrlKey ) {
				container
					.css( '-moz-user-select', 'none' )
					.one('selectstart.dtSelect', selector, function () {
						return false;
					} );
			}

			if ( window.getSelection ) {
				matchSelection = window.getSelection();
			}
		} )
		.on( 'mouseup.dtSelect', selector, function() {
			// Allow text selection to occur again, Mozilla style (tested in FF
			// 35.0.1 - still required)
			container.css( '-moz-user-select', '' );
		} )
		.on( 'click.dtSelect', selector, function ( e ) {
			var items = dt.select.items();
			var idx;

			// If text was selected (click and drag), then we shouldn't change
			// the row's selected state
			if ( matchSelection ) {
				var selection = window.getSelection();

				// If the element that contains the selection is not in the table, we can ignore it
				// This can happen if the developer selects text from the click event
				if ( ! selection.anchorNode || $(selection.anchorNode).closest('table')[0] === dt.table().node() ) {
					if ( selection !== matchSelection ) {
						return;
					}
				}
			}

			var ctx = dt.settings()[0];
			var wrapperClass = dt.settings()[0].oClasses.sWrapper.trim().replace(/ +/g, '.');

			// Ignore clicks inside a sub-table
			if ( $(e.target).closest('div.'+wrapperClass)[0] != dt.table().container() ) {
				return;
			}

			var cell = dt.cell( $(e.target).closest('td, th') );

			// Check the cell actually belongs to the host DataTable (so child
			// rows, etc, are ignored)
			if ( ! cell.any() ) {
				return;
			}

			var event = $.Event('user-select.dt');
			eventTrigger( dt, event, [ items, cell, e ] );

			if ( event.isDefaultPrevented() ) {
				return;
			}

			var cellIndex = cell.index();
			if ( items === 'row' ) {
				idx = cellIndex.row;
				typeSelect( e, dt, ctx, 'row', idx );
			}
			else if ( items === 'column' ) {
				idx = cell.index().column;
				typeSelect( e, dt, ctx, 'column', idx );
			}
			else if ( items === 'cell' ) {
				idx = cell.index();
				typeSelect( e, dt, ctx, 'cell', idx );
			}

			ctx._select_lastCell = cellIndex;
		} );

	// Blurable
	$('body').on( 'click.dtSelect' + _safeId(dt.table().node()), function ( e ) {
		if ( ctx._select.blurable ) {
			// If the click was inside the DataTables container, don't blur
			if ( $(e.target).parents().filter( dt.table().container() ).length ) {
				return;
			}

			// Ignore elements which have been removed from the DOM (i.e. paging
			// buttons)
			if ( $(e.target).parents('html').length === 0 ) {
			 	return;
			}

			// Don't blur in Editor form
			if ( $(e.target).parents('div.DTE').length ) {
				return;
			}

			var event = $.Event('select-blur.dt');
			eventTrigger( dt, event, [ e.target, e ] );

			if ( event.isDefaultPrevented() ) {
				return;
			}

			clear( ctx, true );
		}
	} );
}

/**
 * Trigger an event on a DataTable
 *
 * @param {DataTable.Api} api      DataTable to trigger events on
 * @param  {boolean}      selected true if selected, false if deselected
 * @param  {string}       type     Item type acting on
 * @param  {boolean}      any      Require that there are values before
 *     triggering
 * @private
 */
function eventTrigger ( api, type, args, any )
{
	if ( any && ! api.flatten().length ) {
		return;
	}

	if ( typeof type === 'string' ) {
		type = type +'.dt';
	}

	args.unshift( api );

	$(api.table().node()).trigger( type, args );
}

/**
 * Update the information element of the DataTable showing information about the
 * items selected. This is done by adding tags to the existing text
 * 
 * @param {DataTable.Api} api DataTable to update
 * @private
 */
function info ( api )
{
	var ctx = api.settings()[0];

	if ( ! ctx._select.info || ! ctx.aanFeatures.i ) {
		return;
	}

	if ( api.select.style() === 'api' ) {
		return;
	}

	var rows    = api.rows( { selected: true } ).flatten().length;
	var columns = api.columns( { selected: true } ).flatten().length;
	var cells   = api.cells( { selected: true } ).flatten().length;

	var add = function ( el, name, num ) {
		el.append( $('<span class="select-item"/>').append( api.i18n(
			'select.'+name+'s',
			{ _: '%d '+name+'s selected', 0: '', 1: '1 '+name+' selected' },
			num
		) ) );
	};

	// Internal knowledge of DataTables to loop over all information elements
	$.each( ctx.aanFeatures.i, function ( i, el ) {
		el = $(el);

		var output  = $('<span class="select-info"/>');
		add( output, 'row', rows );
		add( output, 'column', columns );
		add( output, 'cell', cells  );

		var exisiting = el.children('span.select-info');
		if ( exisiting.length ) {
			exisiting.remove();
		}

		if ( output.text() !== '' ) {
			el.append( output );
		}
	} );
}

/**
 * Initialisation of a new table. Attach event handlers and callbacks to allow
 * Select to operate correctly.
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered, if there is ajax data
 *
 * @param  {DataTable.settings} ctx Settings object to operate on
 * @private
 */
function init ( ctx ) {
	var api = new DataTable.Api( ctx );
	ctx._select_init = true;

	// Row callback so that classes can be added to rows and cells if the item
	// was selected before the element was created. This will happen with the
	// `deferRender` option enabled.
	// 
	// This method of attaching to `aoRowCreatedCallback` is a hack until
	// DataTables has proper events for row manipulation If you are reviewing
	// this code to create your own plug-ins, please do not do this!
	ctx.aoRowCreatedCallback.push( {
		fn: function ( row, data, index ) {
			var i, ien;
			var d = ctx.aoData[ index ];

			// Row
			if ( d._select_selected ) {
				$( row ).addClass( ctx._select.className );
			}

			// Cells and columns - if separated out, we would need to do two
			// loops, so it makes sense to combine them into a single one
			for ( i=0, ien=ctx.aoColumns.length ; i<ien ; i++ ) {
				if ( ctx.aoColumns[i]._select_selected || (d._selected_cells && d._selected_cells[i]) ) {
					$(d.anCells[i]).addClass( ctx._select.className );
				}
			}
		},
		sName: 'select-deferRender'
	} );

	// On Ajax reload we want to reselect all rows which are currently selected,
	// if there is an rowId (i.e. a unique value to identify each row with)
	api.on( 'preXhr.dt.dtSelect', function (e, settings) {
		if (settings !== api.settings()[0]) {
			// Not triggered by our DataTable!
			return;
		}

		// note that column selection doesn't need to be cached and then
		// reselected, as they are already selected
		var rows = api.rows( { selected: true } ).ids( true ).filter( function ( d ) {
			return d !== undefined;
		} );

		var cells = api.cells( { selected: true } ).eq(0).map( function ( cellIdx ) {
			var id = api.row( cellIdx.row ).id( true );
			return id ?
				{ row: id, column: cellIdx.column } :
				undefined;
		} ).filter( function ( d ) {
			return d !== undefined;
		} );

		// On the next draw, reselect the currently selected items
		api.one( 'draw.dt.dtSelect', function () {
			api.rows( rows ).select();

			// `cells` is not a cell index selector, so it needs a loop
			if ( cells.any() ) {
				cells.each( function ( id ) {
					api.cells( id.row, id.column ).select();
				} );
			}
		} );
	} );

	// Update the table information element with selected item summary
	api.on( 'draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt', function () {
		info( api );
		api.state.save();
	} );

	// Clean up and release
	api.on( 'destroy.dtSelect', function () {
		// Remove class directly rather than calling deselect - which would trigger events
		$(api.rows({selected: true}).nodes()).removeClass(api.settings()[0]._select.className);

		disableMouseSelection( api );
		api.off( '.dtSelect' );
		$('body').off('.dtSelect' + _safeId(api.table().node()));
	} );
}

/**
 * Add one or more items (rows or columns) to the selection when shift clicking
 * in OS selection style
 *
 * @param  {DataTable.Api} dt   DataTable
 * @param  {string}        type Row or column range selector
 * @param  {object}        idx  Item index to select to
 * @param  {object}        last Item index to select from
 * @private
 */
function rowColumnRange( dt, type, idx, last )
{
	// Add a range of rows from the last selected row to this one
	var indexes = dt[type+'s']( { search: 'applied' } ).indexes();
	var idx1 = $.inArray( last, indexes );
	var idx2 = $.inArray( idx, indexes );

	if ( ! dt[type+'s']( { selected: true } ).any() && idx1 === -1 ) {
		// select from top to here - slightly odd, but both Windows and Mac OS
		// do this
		indexes.splice( $.inArray( idx, indexes )+1, indexes.length );
	}
	else {
		// reverse so we can shift click 'up' as well as down
		if ( idx1 > idx2 ) {
			var tmp = idx2;
			idx2 = idx1;
			idx1 = tmp;
		}

		indexes.splice( idx2+1, indexes.length );
		indexes.splice( 0, idx1 );
	}

	if ( ! dt[type]( idx, { selected: true } ).any() ) {
		// Select range
		dt[type+'s']( indexes ).select();
	}
	else {
		// Deselect range - need to keep the clicked on row selected
		indexes.splice( $.inArray( idx, indexes ), 1 );
		dt[type+'s']( indexes ).deselect();
	}
}

/**
 * Clear all selected items
 *
 * @param  {DataTable.settings} ctx Settings object of the host DataTable
 * @param  {boolean} [force=false] Force the de-selection to happen, regardless
 *     of selection style
 * @private
 */
function clear( ctx, force )
{
	if ( force || ctx._select.style === 'single' ) {
		var api = new DataTable.Api( ctx );
		
		api.rows( { selected: true } ).deselect();
		api.columns( { selected: true } ).deselect();
		api.cells( { selected: true } ).deselect();
	}
}

/**
 * Select items based on the current configuration for style and items.
 *
 * @param  {object}             e    Mouse event object
 * @param  {DataTables.Api}     dt   DataTable
 * @param  {DataTable.settings} ctx  Settings object of the host DataTable
 * @param  {string}             type Items to select
 * @param  {int|object}         idx  Index of the item to select
 * @private
 */
function typeSelect ( e, dt, ctx, type, idx )
{
	var style = dt.select.style();
	var toggleable = dt.select.toggleable();
	var isSelected = dt[type]( idx, { selected: true } ).any();
	
	if ( isSelected && ! toggleable ) {
		return;
	}

	if ( style === 'os' ) {
		if ( e.ctrlKey || e.metaKey ) {
			// Add or remove from the selection
			dt[type]( idx ).select( ! isSelected );
		}
		else if ( e.shiftKey ) {
			if ( type === 'cell' ) {
				cellRange( dt, idx, ctx._select_lastCell || null );
			}
			else {
				rowColumnRange( dt, type, idx, ctx._select_lastCell ?
					ctx._select_lastCell[type] :
					null
				);
			}
		}
		else {
			// No cmd or shift click - deselect if selected, or select
			// this row only
			var selected = dt[type+'s']( { selected: true } );

			if ( isSelected && selected.flatten().length === 1 ) {
				dt[type]( idx ).deselect();
			}
			else {
				selected.deselect();
				dt[type]( idx ).select();
			}
		}
	} else if ( style == 'multi+shift' ) {
		if ( e.shiftKey ) {
			if ( type === 'cell' ) {
				cellRange( dt, idx, ctx._select_lastCell || null );
			}
			else {
				rowColumnRange( dt, type, idx, ctx._select_lastCell ?
					ctx._select_lastCell[type] :
					null
				);
			}
		}
		else {
			dt[ type ]( idx ).select( ! isSelected );
		}
	}
	else {
		dt[ type ]( idx ).select( ! isSelected );
	}
}

function _safeId( node ) {
	return node.id.replace(/[^a-zA-Z0-9\-\_]/g, '-');
}



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables selectors
 */

// row and column are basically identical just assigned to different properties
// and checking a different array, so we can dynamically create the functions to
// reduce the code size
$.each( [
	{ type: 'row', prop: 'aoData' },
	{ type: 'column', prop: 'aoColumns' }
], function ( i, o ) {
	DataTable.ext.selector[ o.type ].push( function ( settings, opts, indexes ) {
		var selected = opts.selected;
		var data;
		var out = [];

		if ( selected !== true && selected !== false ) {
			return indexes;
		}

		for ( var i=0, ien=indexes.length ; i<ien ; i++ ) {
			data = settings[ o.prop ][ indexes[i] ];

			if ( (selected === true && data._select_selected === true) ||
			     (selected === false && ! data._select_selected )
			) {
				out.push( indexes[i] );
			}
		}

		return out;
	} );
} );

DataTable.ext.selector.cell.push( function ( settings, opts, cells ) {
	var selected = opts.selected;
	var rowData;
	var out = [];

	if ( selected === undefined ) {
		return cells;
	}

	for ( var i=0, ien=cells.length ; i<ien ; i++ ) {
		rowData = settings.aoData[ cells[i].row ];

		if ( (selected === true && rowData._selected_cells && rowData._selected_cells[ cells[i].column ] === true) ||
		     (selected === false && ( ! rowData._selected_cells || ! rowData._selected_cells[ cells[i].column ] ) )
		) {
			out.push( cells[i] );
		}
	}

	return out;
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;
var apiRegisterPlural = DataTable.Api.registerPlural;

apiRegister( 'select()', function () {
	return this.iterator( 'table', function ( ctx ) {
		DataTable.select.init( new DataTable.Api( ctx ) );
	} );
} );

apiRegister( 'select.blurable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.blurable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.blurable = flag;
	} );
} );

apiRegister( 'select.toggleable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.toggleable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.toggleable = flag;
	} );
} );

apiRegister( 'select.info()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.info;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.info = flag;
	} );
} );

apiRegister( 'select.items()', function ( items ) {
	if ( items === undefined ) {
		return this.context[0]._select.items;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.items = items;

		eventTrigger( new DataTable.Api( ctx ), 'selectItems', [ items ] );
	} );
} );

// Takes effect from the _next_ selection. None disables future selection, but
// does not clear the current selection. Use the `deselect` methods for that
apiRegister( 'select.style()', function ( style ) {
	if ( style === undefined ) {
		return this.context[0]._select.style;
	}

	return this.iterator( 'table', function ( ctx ) {
		if ( ! ctx._select ) {
			DataTable.select.init( new DataTable.Api(ctx) );
		}

		if ( ! ctx._select_init ) {
			init(ctx);
		}

		ctx._select.style = style;

		// Add / remove mouse event handlers. They aren't required when only
		// API selection is available
		var dt = new DataTable.Api( ctx );
		disableMouseSelection( dt );
		
		if ( style !== 'api' ) {
			enableMouseSelection( dt );
		}

		eventTrigger( new DataTable.Api( ctx ), 'selectStyle', [ style ] );
	} );
} );

apiRegister( 'select.selector()', function ( selector ) {
	if ( selector === undefined ) {
		return this.context[0]._select.selector;
	}

	return this.iterator( 'table', function ( ctx ) {
		disableMouseSelection( new DataTable.Api( ctx ) );

		ctx._select.selector = selector;

		if ( ctx._select.style !== 'api' ) {
			enableMouseSelection( new DataTable.Api( ctx ) );
		}
	} );
} );



apiRegisterPlural( 'rows().select()', 'row().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'row', function ( ctx, idx ) {
		clear( ctx );

		ctx.aoData[ idx ]._select_selected = true;
		$( ctx.aoData[ idx ].nTr ).addClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'row', api[i] ], true );
	} );

	return this;
} );

apiRegister( 'row().selected()', function () {
	var ctx = this.context[0];

	if (
		ctx &&
		this.length &&
		ctx.aoData[this[0]] &&
		ctx.aoData[this[0]]._select_selected
	) {
		return true;
	}

	return false;
} );

apiRegisterPlural( 'columns().select()', 'column().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'column', function ( ctx, idx ) {
		clear( ctx );

		ctx.aoColumns[ idx ]._select_selected = true;

		var column = new DataTable.Api( ctx ).column( idx );

		$( column.header() ).addClass( ctx._select.className );
		$( column.footer() ).addClass( ctx._select.className );

		column.nodes().to$().addClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'column', api[i] ], true );
	} );

	return this;
} );

apiRegister( 'column().selected()', function () {
	var ctx = this.context[0];

	if (
		ctx &&
		this.length &&
		ctx.aoColumns[this[0]] &&
		ctx.aoColumns[this[0]]._select_selected
	) {
		return true;
	}

	return false;
} );

apiRegisterPlural( 'cells().select()', 'cell().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		clear( ctx );

		var data = ctx.aoData[ rowIdx ];

		if ( data._selected_cells === undefined ) {
			data._selected_cells = [];
		}

		data._selected_cells[ colIdx ] = true;

		if ( data.anCells ) {
			$( data.anCells[ colIdx ] ).addClass( ctx._select.className );
		}
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'cell', api.cells(api[i]).indexes().toArray() ], true );
	} );

	return this;
} );

apiRegister( 'cell().selected()', function () {
	var ctx = this.context[0];

	if (ctx && this.length) {
		var row = ctx.aoData[this[0][0].row];

		if (row && row._selected_cells && row._selected_cells[this[0][0].column]) {
			return true;
		}
	}

	return false;
} );


apiRegisterPlural( 'rows().deselect()', 'row().deselect()', function () {
	var api = this;

	this.iterator( 'row', function ( ctx, idx ) {
		ctx.aoData[ idx ]._select_selected = false;
		ctx._select_lastCell = null;
		$( ctx.aoData[ idx ].nTr ).removeClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'row', api[i] ], true );
	} );

	return this;
} );

apiRegisterPlural( 'columns().deselect()', 'column().deselect()', function () {
	var api = this;

	this.iterator( 'column', function ( ctx, idx ) {
		ctx.aoColumns[ idx ]._select_selected = false;

		var api = new DataTable.Api( ctx );
		var column = api.column( idx );

		$( column.header() ).removeClass( ctx._select.className );
		$( column.footer() ).removeClass( ctx._select.className );

		// Need to loop over each cell, rather than just using
		// `column().nodes()` as cells which are individually selected should
		// not have the `selected` class removed from them
		api.cells( null, idx ).indexes().each( function (cellIdx) {
			var data = ctx.aoData[ cellIdx.row ];
			var cellSelected = data._selected_cells;

			if ( data.anCells && (! cellSelected || ! cellSelected[ cellIdx.column ]) ) {
				$( data.anCells[ cellIdx.column  ] ).removeClass( ctx._select.className );
			}
		} );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'column', api[i] ], true );
	} );

	return this;
} );

apiRegisterPlural( 'cells().deselect()', 'cell().deselect()', function () {
	var api = this;

	this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		var data = ctx.aoData[ rowIdx ];

		if(data._selected_cells !== undefined) {
			data._selected_cells[ colIdx ] = false;
		}

		// Remove class only if the cells exist, and the cell is not column
		// selected, in which case the class should remain (since it is selected
		// in the column)
		if ( data.anCells && ! ctx.aoColumns[ colIdx ]._select_selected ) {
			$( data.anCells[ colIdx ] ).removeClass( ctx._select.className );
		}
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'cell', api[i] ], true );
	} );

	return this;
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */
function i18n( label, def ) {
	return function (dt) {
		return dt.i18n( 'buttons.'+label, def );
	};
}

// Common events with suitable namespaces
function namespacedEvents ( config ) {
	var unique = config._eventNamespace;

	return 'draw.dt.DT'+unique+' select.dt.DT'+unique+' deselect.dt.DT'+unique;
}

function enabled ( dt, config ) {
	if ( $.inArray( 'rows', config.limitTo ) !== -1 && dt.rows( { selected: true } ).any() ) {
		return true;
	}

	if ( $.inArray( 'columns', config.limitTo ) !== -1 && dt.columns( { selected: true } ).any() ) {
		return true;
	}

	if ( $.inArray( 'cells', config.limitTo ) !== -1 && dt.cells( { selected: true } ).any() ) {
		return true;
	}

	return false;
}

var _buttonNamespace = 0;

$.extend( DataTable.ext.buttons, {
	selected: {
		text: i18n( 'selected', 'Selected' ),
		className: 'buttons-selected',
		limitTo: [ 'rows', 'columns', 'cells' ],
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			// .DT namespace listeners are removed by DataTables automatically
			// on table destroy
			dt.on( namespacedEvents(config), function () {
				that.enable( enabled(dt, config) );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	},
	selectedSingle: {
		text: i18n( 'selectedSingle', 'Selected single' ),
		className: 'buttons-selected-single',
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			dt.on( namespacedEvents(config), function () {
				var count = dt.rows( { selected: true } ).flatten().length +
				            dt.columns( { selected: true } ).flatten().length +
				            dt.cells( { selected: true } ).flatten().length;

				that.enable( count === 1 );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	},
	selectAll: {
		text: i18n( 'selectAll', 'Select all' ),
		className: 'buttons-select-all',
		action: function () {
			var items = this.select.items();
			this[ items+'s' ]().select();
		}
	},
	selectNone: {
		text: i18n( 'selectNone', 'Deselect all' ),
		className: 'buttons-select-none',
		action: function () {
			clear( this.settings()[0], true );
		},
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			dt.on( namespacedEvents(config), function () {
				var count = dt.rows( { selected: true } ).flatten().length +
				            dt.columns( { selected: true } ).flatten().length +
				            dt.cells( { selected: true } ).flatten().length;

				that.enable( count > 0 );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	},
	showSelected: {
		text: i18n( 'showSelected', 'Show only selected' ),
		className: 'buttons-show-selected',
		action: function (e, dt, node, conf) {
			// Works by having a filtering function which will reduce to the selected
			// items only. So we can re-reference the function it gets stored in the
			// `conf` object
			if (conf._filter) {
				var idx = DataTable.ext.search.indexOf(conf._filter);

				if (idx !== -1) {
					DataTable.ext.search.splice(idx, 1);
					conf._filter = null;
				}

				this.active(false);
			}
			else {
				var fn = function (s, data, idx) {
					// Need to be sure we are operating on our table!
					if (s !== dt.settings()[0]) {
						return true;
					}

					let row = s.aoData[idx];

					return row._select_selected;
				}

				conf._filter = fn;
				DataTable.ext.search.push(fn);

				this.active(true);
			}

			dt.draw();
		}
	}
} );

$.each( [ 'Row', 'Column', 'Cell' ], function ( i, item ) {
	var lc = item.toLowerCase();

	DataTable.ext.buttons[ 'select'+item+'s' ] = {
		text: i18n( 'select'+item+'s', 'Select '+lc+'s' ),
		className: 'buttons-select-'+lc+'s',
		action: function () {
			this.select.items( lc );
		},
		init: function ( dt ) {
			var that = this;

			dt.on( 'selectItems.dt.DT', function ( e, ctx, items ) {
				that.active( items === lc );
			} );
		}
	};
} );


$.fn.DataTable.select = DataTable.select;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'preInit.dt.dtSelect', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	DataTable.select.init( new DataTable.Api( ctx ) );
} );


return DataTable;
}));


