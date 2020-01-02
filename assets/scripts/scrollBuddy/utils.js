export function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}

export function getTranslate(el) {
    const translate = {}
    if(!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    if (!transform) return
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    return translate;
}

export function isObject(obj) {
  return obj === Object(obj);
}
