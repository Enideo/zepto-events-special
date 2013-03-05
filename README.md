zepto-special-events
====================

Enable jQuery Special Events API on Zepto

## Usage
Place the javascript file before defining any Special Events, but after Zepto

## Caveats
* native events not writeable, so some Special Events may need rewriting if handlers modify the event object
* context (this) on event callback is document, not the event element
* cannot handle teardowns

## About Special Events
See http://benalman.com/news/2010/03/jquery-special-events/
