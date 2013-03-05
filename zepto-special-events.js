/**
* Enable special events on Zepto
* @license Copyright 2013 Enideo. Released under dual MIT and GPL licenses.
*/

/// Place this code before defining the Special Events, but after Zepto

/// CAVEATS
/// native events not writeable
/// context (this) on event callback is document, not the event element

$.event.special = $.event.special || {};

$.fn.originalBind = $.fn.bind;

$.fn.bind = function(eventName, data, callback){

  var specialEvent;

  if( callback == null ){
    callback = data;
    data = null;
  }

  /// run special events on Zepto
  if( $.zepto && eventName in $.event.special && $(this)[0] !== document ){

    specialEvent = $.event.special[eventName];

    /// init enable special events on Zepto
    if( !specialEvent._init ) {
      specialEvent._init = true;

      /// replace the special event handler to add functionality
      specialEvent.originalHandler = specialEvent.handler;
      specialEvent.handler = function(){

        /// make event argument writeable, like on jQuery
        var args = Array.prototype.slice.call(arguments);
        args[0] = $.extend({},args[0]);

        /// define the event handle
        $.event.handle = function(event){

          /// make context of trigger the event element
          var args = Array.prototype.slice.call(arguments),
            $this = $(args[0].target);

          $this.trigger.apply($this,args);
        }

        specialEvent.originalHandler.apply(this,args);
      }
    }

    /// run special events on Zepto
    specialEvent.setup.apply( this, [data] );
    $(document).bind.apply( $(document), arguments );

    return this;

  /// run special events on jQuery, and other native events
  }else{

    return this.originalBind.apply(this,arguments);

  }

};
