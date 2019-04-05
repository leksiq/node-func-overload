'use strict';
(() => {

    function apply_condition(cond, v) {
        if(v === undefined || cond === undefined) {
            return true;
        }
        if(typeof(cond) === 'function') {
            return cond(v);
        }
        return typeof(v) === cond.toString();
    }

    function M(v, cond) {
        return (v !== undefined && apply_condition(cond, v) ? undefined : true);
    }
    
    function X(v) {
        return v;
    }
    
    function C(v, cond) {
        return apply_condition(cond, v) ? undefined : true;
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
