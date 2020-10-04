module.exports = function(target, map) {
    let replace = target;
    
    for(let key of Object.keys(map)) {
        replace = replace.replace(new RegExp("%" + key + "%", "gmi"), map[key]);
    }

    return replace;
}