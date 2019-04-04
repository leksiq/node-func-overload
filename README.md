# node-func-overload
The package is intended to help to perform functions "overloading" in JavaScript especially when mutual excluding argument sets are used. Also it is applied to options object and so on.

## API
+ **M**(arg [, (condition | type)]) - marks variable `arg` as mandatory. If `condition` function or `type` string are supplied the `arg` is considered as present when `condition(arg)` resolves `true` or `typeof(arg)` resolves `type`.

+ **C**(arg [, (condition | type)]) - marks variable `arg` as conditional. If `condition` function or `type` string are supplied the `arg` is considered as present when `condition(arg)` resolves `true` or `typeof(arg)` resolves `type`.


+ **X**(arg) - marks variable `arg` as absent. The `arg` itself may be used instead of `X(arg)`. It is introduced for more expressiveness.

+ **satisfy**(array) - tests if the array of arguments meets rules.


## Examples

### Function arguments

    'use strict';
    const
        {satisfy, M, C, X} = require('@leksiq/func-overload')
    ;
    
    function test(a, b, c) {
        switch(true) {
            case satisfy([M(a, 'string'), C(b), X(c)]):
                console.log('case 1');
                break;
            case satisfy([M(a, v => v === 1), C(b), c]):
                console.log('case 2');
                break;
            case satisfy([a, C(b), M(c)]):
                console.log('case 3');
                break;
            default:
                throw 'Inconstistent argumets!';
                break;

        }
    }



    test(1);
    test(1, 2);
    test(1, '2');
    test('1', 2);
    test()
    test('1', 2, 3)
    test(undefined, undefined, 3)
    
produces

    case 2
    case 2
    case 2
    case 1
    exception: 'Inconstistent argumets!'
    exception: 'Inconstistent argumets!'
    case 3
    
### Options
    function test(options) {
        let {a, b, c} = options;
        
        //code like in preceding example
        ...
    }


### Some "real life" example

Suppose, we need an Angle class with possible constructors:

    let a1 = new Angle(angle); // angle relative to origin
    let a2 = new Angle(angle0, angle1); // angle0, angle1 - angles of a2's sides relative to origin
    let a3 = new Angle({to: to}); // to - the point {X:..., Y:...} at the plain; a3 - the azimuth from origin to to
    let a4 = new Angle({from: from, to: to}); // from, to - the points {X:..., Y:...} at the plain; a4 - the azimuth from from to to
    let a5 = new Angle({angle: angle}); // angle relative to origin
    let a6 = new Angle({deg: deg}); // angle in degree relative to origin
    let a7 = new Angle({angle0: angle0, angle1: angle1}); // angle0, angle1 - angles of a2's sides relative to origin
    let a8 = new Angle({deg0: deg0, deg1: deg1}); // deg0, deg1 - angles in degree of a2's sides relative to origin
    let a9 = new Angle({angle0: angle0, angle: angle}); // angle0 - angle of a2's first side relative to origin; angle - angle between sides
    let a10 = new Angle({angle1: angle1, angle: angle}); // angle1 - angle of a2's second side relative to origin; angle - angle between sides
    let a11 = new Angle({deg0: deg0, deg: deg}); // deg0 - angle of a2's first side relative to origin; deg - angle between sides - both in degree
    let a12 = new Angle({deg1: deg1, deg: deg}); // deg1 - angle of a2's second side relative to origin; deg - angle between sides - both in degree
    
In this case we would use the following code:

    class Angle {
    constructor({from , to, to0, to1, angle, deg, angle0, angle1, deg0, deg1} = {}) {
        switch(true) {
            case satisfy([from, to, to0, to1, angle, deg, angle0, angle1, deg0, deg1]):
                if(arguments.length === 2) {
                    angle0 = arguments[0];
                    angle1 = arguments[1];
                    angle = angle1 - angle0;
                } else if(arguments.length === 1) {
                    angle0 = 0;
                    angle1 = arguments[0];
                    angle = angle1 - angle0;
                }
                break;
            case satisfy([C(from, Point.is), M(to, Point.is), to0, to1, angle, deg, angle0, angle1, deg0, deg1]):
                angle0 = 0;
                angle1 = calc_azimuth(from, to);
                angle = angle1;
                break;
            case satisfy([C(from, Point.is), to, M(to0, Point.is), M(to1, Point.is), angle, deg, angle0, angle1, deg0, deg1]):
                angle0 = calc_azimuth(from, to0);
                angle1 = calc_azimuth(from, to1);
                angle = angle1 - angle0;
                break;
            case satisfy([from, to, to0, to1, M(angle), deg, angle0, angle1, deg0, deg1]):
                angle0 = 0;
                angle1 = angle;
                break;
            case satisfy([from, to, to0, to1, angle, M(deg), angle0, angle1, deg0, deg1]):
                angle0 = 0;
                angle1 = deg * Math.PI / 180;
                break;
            case satisfy([from, to, to0, to1, angle, deg, M(angle0), M(angle1), deg0, deg1]):
                angle = angle1 - angle0;
                break;
            case satisfy([from, to, to0, to1, angle, deg, angle0, angle1, M(deg0), M(deg1)]):
                angle0 = deg0 * Math.PI / 180;
                angle1 = deg1 * Math.PI / 180;
                angle = angle1 - angle0;
                break;
            case satisfy([from, to, to0, to1, M(angle), deg, M(angle0), angle1, deg0, deg1]):
                angle1 = angle0 + angle;
                break;
            case satisfy([from, to, to0, to1, M(angle), deg, angle0, M(angle1), deg0, deg1]):
                angle0 = angle1 - angle;
                break;
            case satisfy([from, to, to0, to1, angle, M(deg), angle0, angle1, M(deg0), deg1]):
                angle0 = deg0 * Math.PI / 180;
                angle1 = (deg0 + deg) * Math.PI / 180;
                break;
            case satisfy([from, to, to0, to1, angle, M(deg), angle0, angle1, deg0, M(deg1)]):
                angle1 = deg1 * Math.PI / 180;
                angle0 = (deg1 - deg) * Math.PI / 180;
                break;
            default:
                throw `Inconsistent arguments: ${arguments}`;
                break;
        }

        // code independent of arguments
        ...

    }