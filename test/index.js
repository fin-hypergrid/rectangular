'use strict';

/* global describe, it */

var assert = require('assert');

var rectangular = require('../src/');

var Point = rectangular.Point,
    Rectangle = rectangular.Rectangle;

describe('rectangular module', function() {
    describe('Point API', function() {
        it('should have a constructor that sets x and y', function() {
            var p1 = new Point(3, 4);
            var p2 = new Point(3, 4);
            assert.equal(p1.x, p2.x);
            assert.equal(p1.y, p2.y);
        });
        it('has state that cannot be mutated', function() {
            var p1 = new Point(3, 4);
            var isImmutable = false;
            try {
                p1.x = 0;
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);

            isImmutable = false;
            try {
                p1.y = 0;
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);
        });
        it('should have a `plus` function that adds another point', function() {
            var p1 = new Point(3, 4);
            var p2 = new Point(3, 4);
            var p3 = p1.plus(p2);
            assert.equal(p3.x, 6);
            assert.equal(p3.y, 8);
        });
        it('should have a `plusXY` function that adds another point', function() {
            var p1 = new Point(3, 4);
            var p3 = p1.plusXY(10, 20);
            assert.equal(p3.x, 13);
            assert.equal(p3.y, 24);
        });
        it('should have a `minus` function that subtracts another point', function() {
            var p1 = new Point(3, 4);
            var p2 = new Point(3, 4);
            var p3 = p1.minus(p2);
            assert.equal(p3.x, 0);
            assert.equal(p3.y, 0);
        });
        it('should have a `min` function that returns a point this is min of both x and y', function() {
            var p1 = new Point(0, 10);
            var p2 = new Point(10, 0);
            var p3 = p1.min(p2);
            assert.equal(p3.x, 0);
            assert.equal(p3.y, 0);
        });
        it('should have a `max` function that returns a point this is max of both x and y', function() {
            var p1 = new Point(0, 10);
            var p2 = new Point(10, 0);
            var p3 = p1.max(p2);
            assert.equal(p3.x, 10);
            assert.equal(p3.y, 10);
        });
        it('should have a `distance` function that returns the distance between itself and another point via Pythagorean Theorem', function() {
            var p1 = new Point(1, 5);
            var p2 = new Point(-2, 1);
            assert.equal(p1.distance(p2), 5);
        });
        it('should have an `equals` function that returns true when x and y are the same for self and the arguement', function() {
            var p1 = new Point(3, 4);
            var p2 = new Point(3, 4);
            var p3 = new Point(4, 4);
            assert.equal(p1.equals(p2), true);
            assert.equal(p1.equals(p3), false);
        });
        it('should have a `greaterThan` function that returns true if the argument has both larger x and y', function() {
            var p0 = new Point(0, 0);
            var p1 = new Point(-10, 10);
            var p2 = new Point(10, -10);
            var p3 = new Point(-10, -10);
            assert.equal(p0.greaterThan(p0), false);
            assert.equal(p0.greaterThan(p1), false);
            assert.equal(p0.greaterThan(p2), false);
            assert.equal(p0.greaterThan(p3), true);
        });
        it('should have a `greaterThanOrEqualTo` function that returns true if the argument has both larger and equal to x and y', function() {
            var p0 = new Point(0, 0);
            var p1 = new Point(0, 10);
            var p2 = new Point(10, 0);
            var p3 = new Point(-10, -10);
            assert.equal(p0.greaterThanOrEqualTo(p0), true);
            assert.equal(p0.greaterThanOrEqualTo(p1), false);
            assert.equal(p0.greaterThanOrEqualTo(p2), false);
            assert.equal(p0.greaterThanOrEqualTo(p3), true);
        });
        it('should have a `lessThan` function that returns true if the argument has both smaller x and y', function() {
            var p0 = new Point(0, 0);
            var p1 = new Point(-10, 10);
            var p2 = new Point(10, -10);
            var p3 = new Point(10, 10);
            assert.equal(p0.lessThan(p0), false);
            assert.equal(p0.lessThan(p1), false);
            assert.equal(p0.lessThan(p2), false);
            assert.equal(p0.lessThan(p3), true);
        });
        it('should have a `lessThanOrEqualTo` function that returns true if the argument has both smaller and equal to x and y', function() {
            var p0 = new Point(0, 0);
            var p1 = new Point(0, -10);
            var p2 = new Point(-10, 0);
            var p3 = new Point(10, 10);
            assert.equal(p0.lessThanOrEqualTo(p0), true);
            assert.equal(p0.lessThanOrEqualTo(p1), false);
            assert.equal(p0.lessThanOrEqualTo(p2), false);
            assert.equal(p0.lessThanOrEqualTo(p3), true);
        });
        it('should have a `within` function that returns true if this is inside the rectangle argument', function() {
            var p0 = new Point(1, 1);
            var r1 = new Rectangle(0, 0, 10, 10);
            var r2 = new Rectangle(2, 2, 10, 10);
            assert.equal(p0.within(r1), true);
            assert.equal(p0.within(r2), false);
        });
    });
    describe('Rectangle API', function() {
        it('should have a constructor that sets origin and extent', function() {
            var r1 = new Rectangle(0, 0, 3, 4);
            var r2 = new Rectangle(0, 0, 3, 4);
            assert.equal(r1.origin.x, r2.origin.x);
            assert.equal(r1.origin.y, r2.origin.y);
            assert.equal(r1.extent.x, r2.extent.x);
            assert.equal(r1.extent.y, r2.extent.y);
        });
        it('constructor should accept negative extents', function() {
            var r1 = new Rectangle(-3, -4, 3, 4);
            var r2 = new Rectangle(0, 0, -3, -4);
            assert.equal(r1.origin.x, r2.origin.x);
            assert.equal(r1.origin.y, r2.origin.y);
            assert.equal(r1.corner.x, r2.corner.x);
            assert.equal(r1.corner.y, r2.corner.y);
            assert.equal(r1.center.x, r2.center.x);
            assert.equal(r1.center.y, r2.center.y);
            assert.equal(r1.extent.x, r2.extent.x);
            assert.equal(r1.extent.y, r2.extent.y);
        });
        it('has state that cannot be mutated', function() {
            var r1 = new Rectangle(0, 0, 3, 4);
            var isImmutable = false;
            try {
                r1.origin = new Point(10, 10);
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);

            isImmutable = false;
            try {
                r1.extent = new Point(10, 10);
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);

            isImmutable = false;
            try {
                r1.corner = new Point(10, 10);
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);

            isImmutable = false;
            try {
                r1.center = new Point(10, 10);
            } catch (e) {
                isImmutable = true;
            }
            assert.equal(isImmutable, true);
        });
        it('should have an `area` function that computes width * height', function() {
            var r = new Rectangle(0, 0, 8, 9);
            assert.equal(r.area, 8 * 9);
        });
        it('should have a `flattenXAt` function that smashes the rectangle at argument', function() {
            var r = new Rectangle(0, 0, 10, 10);
            var flattend = r.flattenXAt(5);
            assert.equal(flattend.left, 5);
            assert.equal(flattend.right, 5);
            assert.equal(flattend.height, 10);
            assert.equal(flattend.width, 0);
        });
        it('should have a `flattenYAt` function that smashes the rectangle at argument', function() {
            var r = new Rectangle(0, 0, 10, 10);
            var flattend = r.flattenYAt(5);
            assert.equal(flattend.top, 5);
            assert.equal(flattend.bottom, 5);
            assert.equal(flattend.height, 0);
            assert.equal(flattend.width, 10);
        });
        it('should have a `contains` function that determines if a point or rectangle argument is completely within self', function() {
            var rect = new Rectangle(0, 0, 10, 10);
            var rectInside = new Rectangle(2, 2, 5, 5);
            var rectOverlap = new Rectangle(7, 7, 5, 5);
            var rectOutside = new Rectangle(11, 11, 5, 5);
            var pointInside = new Point(5, 5);
            var pointOutside = new Point(15, 15);
            assert.equal(rect.contains(rectInside), true);
            assert.equal(rect.contains(rectOverlap), false);
            assert.equal(rect.contains(rectOutside), false);
            assert.equal(rect.contains(pointInside), true);
            assert.equal(rect.contains(pointOutside), false);
        });
        it('should have a `growBy` function that returns a rectangle enlarged/shrunk by argument', function() {
            var r = new Rectangle(0, 0, 10, 10);
            var enlarged = r.growBy(-2);
            var shrunk = r.growBy(2);
            assert.equal(enlarged.area, 196);
            assert.equal(shrunk.area, 36);
        });
        it('should have a `union` function that returns a rectangle that contains the receiver and the argument', function() {
            var r1 = new Rectangle(0, 0, 5, 5);
            var r2 = new Rectangle(7, 7, 3, 3);
            var union = r1.union(r2);
            assert.equal(union.contains(r1), true);
            assert.equal(union.contains(r2), true);
        });
        it('should have a `forEach` function that iterates over all points within', function() {
            var r = new Rectangle(0, 0, 4, 3);
            var result = [];
            r.forEach(function(x, y) {
                result.push('(' + x + ',' + y + ')');
            });
            result = result.join('');
            assert.equal(result, '(0,0)(0,1)(0,2)(1,0)(1,1)(1,2)(2,0)(2,1)(2,2)(3,0)(3,1)(3,2)');
        });
        it('should have an `intersect` function that returns a Rectangle that is the area in which the receiver overlaps with the argument', function() {
            var r1 = new Rectangle(0, 0, 5, 5);
            var r2 = new Rectangle(3, 3, 5, 5);
            var intersection = r1.intersect(r2);
            assert.equal(intersection.top, 3);
            assert.equal(intersection.left, 3);
            assert.equal(intersection.bottom, 5);
            assert.equal(intersection.right, 5);
        });
        it('should have an `intersects` function that returns true if this overlaps with the argument, false otherwise', function() {
            var r1 = new Rectangle(0, 0, 5, 5);
            var overlaps = new Rectangle(3, 3, 5, 5);
            var outside = new Rectangle(6, 6, 5, 5);
            assert.equal(r1.intersects(overlaps), true);
            assert.equal(r1.intersects(outside), false);
        });
    });
});
