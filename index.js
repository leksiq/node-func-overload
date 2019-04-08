'use strict';
(() => {

    function apply_condition(cond, v) {
        if(cond === undefined) {
            return true;
        }
        let res = (typeof(v) === cond.toString() || typeof(cond) === 'function' && cond.prototype && (v instanceof cond));
        if(!res) {
            if(typeof(cond) === 'function' && !/^class\s/.exec(cond.toString())) {
                return cond(v);
            }
        }
        return res;
    }

    function M(v, cond) {
        return (v !== undefined && apply_condition(cond, v) ? undefined : true);
    }
    
    function X(v) {
        return v;
    }
    
    function C(v, cond) {
        return (v === undefined || apply_condition(cond, v)) ? undefined : true;
    }
    
    function satisfy(arr) {
        return arr.every(v => {return v === undefined;});
    }
    
    module.exports = {
        M: M,
        C: C,
        X: X,
        satisfy: satisfy
    };
    

})();
