export function Cursor(...args) {
    Object.setPrototypeOf(args, Cursor.prototype);
    return args;
}
Cursor.prototype = Object.create(Array.prototype);
Cursor.prototype.constructor = Cursor;
Cursor.prototype.count = function() {
    return this.length;
};
