// Expired Token
function expire(tokenTime,hours) {
    let dateNow = new Date();
    // Expire Time 
    let tokenLife = hours * 60 * 60 * 1000;
    if (tokenTime + tokenLife < dateNow.getTime()) {
        return true;
    }
    return false;
}
module.exports = expire;
