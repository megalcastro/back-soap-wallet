
function generarToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function generarSessionId() {
    return Math.random().toString(36).substr(2, 9);
}


module.exports = { generarToken,generarSessionId };