'use strict';

/* eslint-env node, browser */

/* [ONCE CALLING CODE IS UPDATED AND TESTED, REMOVE THIS COMMENT + ALL LINES CONTAINING "Formerly..."]
 * This module rectangular.js differs from predecessor fin-rectangle.js as follows:
 * 1. Instead of creating Polymer component `fin-rectangles`, now does one of following:
 *  a. If object `exports` exists: Adds object as new property `exports.rectangular`
 *     thus supporting Node as well as file bundling by Browserify.
 *  b. If object `exports` does not exist: Adds object as new property
 *     `window.fin.rectangular` (first creating object `window.fin` if necessary)
 *     thus supporting client-side inclusion via <script> tag.
 * 2. File was reorganized to use prototypal inheritance so:
 *  a. change 'rectangles.point.create(' to 'new rectangular.Point('
 *  b. change 'rectangles.rectangle.create(' to 'new rectangular.Rectangle('
 * 3. Change all instances of 'ThanEqualTo' to 'ThanOrEqualTo'
 * 4. Change all invocations of Rectangle.top, .left, .bottom, .right, .width,
 *    .height, and .area to getter references by removing the invocation operator
 *    (i.e., the parentheses).
 */

(function() {

    /**
     * @summary Reference to module interface (namespace to hold the new objects).
     *
     * @desc The objects defined elsewhere in this file, {@link Point} and {@link Rectangle},
     * are added to this `namespace` object, which is defined as follows:
     *
     * * Node.js support: If the `exports` object exists, these objects are added to it.
     * * Browser support: If loaded directly by the browser with a &lt;script&gt; tag,
     *   these objects are added to `window.fin` (which is created as needed).
     *
     * *Caveat:* Do not remove enclosing IIFE which supplies local scope in the latter cases.
     *
     * See bottom of file for public interface.
     *
     * @name namespace
     * @type {object}
     * @private
     */
    var namespace = typeof exports === 'object' && exports ||
        ((window.fin = window.fin || {}).rectangular = {});


    /**
     * Creates a new read-only property and attaches it to the provided context.
     * @param {string} name - Name for new property.
     * @param {*} [value] - Value of new property.
     */
    function addReadOnlyProperty(name, value) {
        Object.defineProperty(this, name, {
            value: value || 0,
            writable: false,
            enumerable: true,
            configurable: false
        });
    }

    /**
     * @constructor Point
     * @param {number} x - the new point's `x` property
     * @param {number} y - the new point's `y` property
     */
    function Point(x, y) {
        addReadOnlyProperty.call(this, 'x', x || 0);
        addReadOnlyProperty.call(this, 'y', y || 0);
    }

    Point.prototype = {

        /**
         * @name x
         * @abstract
         * @type {number}
         * @summary This point's horizontal coordinate.
         * @desc Created upon instantiation by the {@link Point|constructor}.
         * @memberOf Point.prototype
         */

        /**
         * @name y
         * @abstract
         * @type {number}
         * @summary This point's vertical coordinate.
         * @desc Created upon instantiation by the {@link Point|constructor}.
         * @memberOf Point.prototype
         */

        /**
         * @returns {Point} A new point which is this point's position increased by coordinates of given `point`.
         * @param {Point} Offset - Horizontal and vertical values to add to this point's coordinates.
         * @memberOf Point.prototype
         */
        plus: function(offset) {
            return new Point(
                this.x + offset.x,
                this.y + offset.y
            );
        },

        /**
         * @returns {Point} A new point which is this point's position increased by given offsets.
         * @param {number} [offsetX=0] - Value to add to this point's horizontal coordinate.
         * @param {number} [offsetY=0] - Value to add to this point's horizontal coordinate.
         * @memberOf Point.prototype
         */
        plusXY: function(offsetX, offsetY) {
            return new Point(
                this.x + (offsetX || 0),
                this.y + (offsetY || 0)
            );
        },

        /**
         * @returns {Point} A new point which is this point's position decreased by coordinates of given `point`.
         * @param {Point} offset - Horizontal and vertical values to subtract from this point's coordinates.
         * @memberOf Point.prototype
         */
        minus: function(offset) {
            return new Point(
                this.x - offset.x,
                this.y - offset.y
            );
        },

        /**
         * @returns {Point} A new point positioned to lowest x and least y of this point and given `point`.
         * @param {Point} point - A point to compare to this point.
         * @memberOf Point.prototype
         */
        min: function(point) {
            return new Point(
                Math.min(this.x, point.x),
                Math.min(this.y, point.y)
            );
        },


        /**
         * @returns {Point} A new `Point` each coordinate of which is the higher of the same coordinate of
         * this point and given `point`.
         * @param {Point} point - A point to compare to this point.
         * @memberOf Point.prototype
         */
        max: function(point) {
            return new Point(
                Math.max(this.x, point.x),
                Math.max(this.y, point.y)
            );
        },

        /**
         * @returns {number} Distance between given `point` and this point using Pythagorean Theorem formula.
         * @param {Point} point - A point from which to compute the distance to this point.
         * @memberOf Point.prototype
         */
        distance: function(point) {
            var deltaX = point.x - this.x,
                deltaY = point.y - this.y;

            return Math.sqrt(
                deltaX * deltaX +
                deltaY * deltaY
            );
        },
        /**
         * _(Formerly: `equal`.)_
         * @returns {boolean} `true` iff _both_ coordinates of this point are exactly equal to those of given `point`.
         * @param {Point} point - A point to compare to this point.
         * @memberOf Point.prototype
         */
        equals: function(point) {
            var result = false;

            if (point) {
                result =
                    this.x === point.x &&
                    this.y === point.y;
            }

            return result;
        },

        /**
         * @returns {boolean} `true` iff _both_ coordinates of this point are greater than those of given `point`.
         * @param {Point} point - A point to compare to this point
         * @memberOf Point.prototype
         */
        greaterThan: function(point) {
            return (
                this.x > point.x &&
                this.y > point.y
            );
        },

        /**
         * @returns {boolean} `true` iff _both_ coordinates of this point are less than those of given `point`.
         * @param {Point} point - A point to compare to this point
         * @memberOf Point.prototype
         */
        lessThan: function(point) {
            return (
                this.x < point.x &&
                this.y < point.y
            );
        },

        /**
         * _(Formerly `greaterThanEqualTo`.)_
         * @returns {boolean} `true` iff _both_ coordinates of this point are greater than or equal to those of given `point`.
         * @param {Point} point - A point to compare to this point
         * @memberOf Point.prototype
         */
        greaterThanOrEqualTo: function(point) {
            return (
                this.x >= point.x &&
                this.y >= point.y
            );
        },

        /**
         * _(Formerly `lessThanEqualTo`.)_
         * @returns {boolean} `true` iff _both_ coordinates of this point are less than or equal to those of given `point`.
         * @param {Point} point - A point to compare to this point.
         * @memberOf Point.prototype
         */
        lessThanOrEqualTo: function(point) {
            return (
                this.x <= point.x &&
                this.y <= point.y
            );
        },

        /**
         * _(Formerly `isContainedWithinRectangle`.)_
         * @param rect {Rectangle} - Rectangle to test this point against.
         * @returns {boolean} `true` iff this point is within given `rect`.
         * @memberOf Point.prototype
         */
        within: function(rect) {
            var minX = rect.origin.x,
                maxX = minX + rect.extent.x;
            var minY = rect.origin.y,
                maxY = minY + rect.extent.y;

            if (rect.extent.x < 0) {
                minX = maxX;
                maxX = rect.origin.x;
            }

            if (rect.extent.y < 0) {
                minY = maxY;
                maxY = rect.origin.y;
            }

            return (
                minX <= this.x && this.x < maxX &&
                minY <= this.y && this.y < maxY
            );
        }
    };

    Point.prototype.EQ = Point.prototype.equals;
    Point.prototype.GT = Point.prototype.greaterThan;
    Point.prototype.LT = Point.prototype.lessThan;
    Point.prototype.GE = Point.prototype.greaterThanOrEqualTo;
    Point.prototype.LE = Point.prototype.lessThanOrEqualTo;

    /**
     * @constructor Rectangle
     * @desc The unit of measure is typically pixels.
     * Vertical coordinates are typically measured downwards from the top of the window.
     *
     * Normally, the `x` and `y` parameters to the constructor describe the upper left corner of the rect.
     * However, negative values of `width` and `height` will be added to the given `x` and `y`. That is,
     * a negative value of the `width` parameter will extend the rect to the left of the given `x` and
     * a negative value of the `height` parameter will extend the rect above the given `y`.
     * In any case, after instantiation the following are guaranteed to always be true:
     * * The `extent`, `width`, and `height` properties _always_ give positive values.
     * * The `origin`, `top`, and `left` properties _always_ reflect the upper left corner.
     * * The `corner`, `bottom`, and `right` properties _always_ reflect the lower right corner.
     *
     * @param {number} [x=0] - Horizontal coordinate of some corner of the rect.
     * @param {number} [y=0] - Vertical coordinate of some corner of the rect.
     * @param {number} [width=0] - Width of the new rect. May be negative (see above).
     * @param {number} [height=0] - Height of the new rect. May be negative (see above).
     */
    function Rectangle(x, y, width, height) {

        if (width < 0) {
            x += width;
            width = -width;
        }

        if (height < 0) {
            y += height;
            height = -height;
        }

        addReadOnlyProperty.call(this, 'origin', new Point(x, y));
        addReadOnlyProperty.call(this, 'extent', new Point(width, height));
        addReadOnlyProperty.call(this, 'corner', new Point(x + width, y + height));
        addReadOnlyProperty.call(this, 'center', new Point(x + (width / 2), y + (height / 2)));
    }

    Rectangle.prototype = {

        /**
         * @name origin
         * @abstract
         * @type {Point}
         * @summary Upper left corner of this rect.
         * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
         * @memberOf Rectangle.prototype
         */

        /**
         * @name extent
         * @abstract
         * @type {Point}
         * @summary this rect's width and height.
         * @desc Unlike the other `Point` properties, `extent` is not a global coordinate pair; rather it consists of a _width_ (`x`, always positive) and a _height_ (`y`, always positive).
         *
         * This object might be more legitimately typed as something like `Area` with properties `width` and `height`; however we wanted it to be able to use it efficiently with a point's `plus` and `minus` methods (that is, without those methods having to check and branch on the type of its parameter).
         *
         * Created upon instantiation by the {@linkplain Rectangle|constructor}.
         * @see The {@link Rectangle#corner|corner} method.
         * @memberOf Rectangle.prototype
         */

        /**
         * @name corner
         * @abstract
         * @type {Point}
         * @summary Lower right corner of this rect.
         * @desc This is a calculated value created upon instantiation by the {@linkplain Rectangle|constructor}. It is `origin` offset by `extent`.
         *
         * **Note:** These coordinates actually point to the pixel one below and one to the right of the rect's actual lower right pixel.
         * @memberOf Rectangle.prototype
         */

        /**
         * @name center
         * @abstract
         * @type {Point}
         * @summary Center of this rect.
         * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
         * @memberOf Rectangle.prototype
         */

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Minimum vertical coordinate of this rect.
         * @memberOf Rectangle.prototype
         */
        get top() {
            return this.origin.y;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Minimum horizontal coordinate of this rect.
         * @memberOf Rectangle.prototype
         */
        get left() {
            return this.origin.x;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Maximum vertical coordinate of this rect + 1.
         * @memberOf Rectangle.prototype
         */
        get bottom() {
            return this.corner.y;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Maximum horizontal coordinate of this rect + 1.
         * @memberOf Rectangle.prototype
         */
        get right() {
            return this.corner.x;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Width of this rect (always positive).
         * @memberOf Rectangle.prototype
         */
        get width() {
            return this.extent.x;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Height of this rect (always positive).
         * @memberOf Rectangle.prototype
         */
        get height() {
            return this.extent.y;
        },

        /**
         * @type {number}
         * @desc _(Formerly a function; now a getter.)_
         * @summary Area of this rect.
         * @memberOf Rectangle.prototype
         */
        get area() {
            return this.width * this.height;
        },

        /**
         * @returns {Rectangle} A copy of this rect but with horizontal position reset to given `x` and no width.
         * @param {number} x - Horizontal coordinate of the new rect.
         * @memberOf Rectangle.prototype
         */
        flattenXAt: function(x) {
            return new Rectangle(x, this.origin.y, 0, this.extent.y);
        },

        /**
         * @returns {Rectangle} A copy of this rect but with vertical position reset to given `y` and no height.
         * @param {number} y - Vertical coordinate of the new rect.
         * @memberOf Rectangle.prototype
         */
        flattenYAt: function(y) {
            return new Rectangle(this.origin.x, y, this.extent.x, 0);
        },

        /**
         * @returns {boolean} `true` iff given `point` entirely contained within this rect.
         * @param {Point} pointOrRect - The point or rect to test for containment.
         * @memberOf Rectangle.prototype
         */
        contains: function(pointOrRect) {
            return pointOrRect.within(this);
        },

        /**
         * _(Formerly `isContainedWithinRectangle`.)_
         * @returns {boolean} `true` iff this `rect` is entirely contained within given `rect`.
         * @param {Rectangle} rect - Rectangle to test against this rect.
         * @memberOf Rectangle.prototype
         */
        within: function(rect) {
            return (
                rect.origin.lessThanOrEqualTo(this.origin) &&
                rect.corner.greaterThanOrEqualTo(this.corner)
            );
        },

        /**
         * _(Formerly: `insetBy`.)_
         * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
         * @param {number} padding - Amount by which to increase (+) or decrease (-) this rect
         * @see The {@link Rectangle#shrinkBy|shrinkBy} method.
         * @memberOf Rectangle.prototype
         */
        growBy: function(padding) {
            return new Rectangle(
                this.origin.x + padding,
                this.origin.y + padding,
                this.extent.x - padding - padding,
                this.extent.y - padding - padding);
        },

        /**
         * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
         * @param {number} padding - Amount by which to decrease (+) or increase (-) this rect.
         * @see The {@link Rectangle#growBy|growBy} method.
         * @memberOf Rectangle.prototype
         */
        shrinkBy: function(padding) {
            return this.growBy(-padding);
        },

        /**
         * @returns {Rectangle} Bounding rect that contains both this rect and the given `rect`.
         * @param {Rectangle} rect - The rectangle to union with this rect.
         * @memberOf Rectangle.prototype
         */
        union: function(rect) {
            var origin = this.origin.min(rect.origin),
                corner = this.corner.max(rect.corner);

            return new Rectangle(
                origin.x,
                origin.y,
                corner.x - origin.x,
                corner.y - origin.y);
        },

        /**
         * iterate over all points within this rect, invoking `iteratee` for each.
         * @param {function(number,number)} iteratee - Function to call for each point.
         * Bound to `context` when given; otherwise it is bound to this rect.
         * Each invocation of `iteratee` is called with two arguments:
         * the horizontal and vertical coordinates of the point.
         * @param {object} [context=this] - Context to bind to `iteratee` (when not `this`).
         * @memberOf Rectangle.prototype
         */
        forEach: function(iteratee, context) {
            context = context || this;
            for (var x = this.origin.x, x2 = this.corner.x; x < x2; x++) {
                for (var y = this.origin.y, y2 = this.corner.y; y < y2; y++) {
                    iteratee.call(context, x, y);
                }
            }
        },

        /**
         * @returns {Rectangle} One of:
         * * _If this rect intersects with the given `rect`:_
         *      a new rect representing that intersection.
         * * _If it doesn't intersect and `ifNoneAction` defined:_
         *      result of calling `ifNoneAction`.
         * * _If it doesn't intersect and `ifNoneAction` undefined:_
         *      `null`.
         * @param {Rectangle} rect - The rectangle to intersect with this rect.
         * @param {function(Rectangle)} [ifNoneAction] - When no intersection, invoke and return result.
         * Bound to `context` when given; otherwise bound to this rect.
         * Invoked with `rect` as sole parameter.
         * @param {object} [context=this] - Context to bind to `ifNoneAction` (when not `this`).
         * @memberOf Rectangle.prototype
         */
        intersect: function(rect, ifNoneAction, context) {
            var result = null,
                originX = Math.max(rect.origin.x, this.origin.x),
                originY = Math.max(rect.origin.y, this.origin.y),
                cornerX = Math.min(rect.corner.x, this.corner.x),
                cornerY = Math.min(rect.corner.y, this.corner.y),
                width = cornerX - originX,
                height = cornerY - originY;

            if (width > 0 && height > 0) {
                result = new Rectangle(originX, originY, width, height);
            } else if (typeof ifNoneAction === 'function') {
                result = ifNoneAction.call(context || this, rect);
            }

            return result;
        },

        /**
         * @returns {boolean} `true` iff this rect overlaps with given `rect`.
         * @param {Rectangle} rect - The rectangle to intersect with this rect.
         * @memberOf Rectangle.prototype
         */
        intersects: function(rect) {
            return (
                rect.corner.x > this.origin.x &&
                rect.corner.y > this.origin.y &&
                rect.origin.x < this.corner.x &&
                rect.origin.y < this.corner.y
            );
        }
    };

    // Interface
    namespace.Point = Point;
    namespace.Rectangle = Rectangle;

})();
namespace
