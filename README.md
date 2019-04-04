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
