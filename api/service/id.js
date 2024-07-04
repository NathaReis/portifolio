const randomId = (ids) => {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let plat_id = letters.charAt(Math.floor(Math.random() * letters.length)) + (Math.random() + 1).toString(36).substr(2, 9);

    let idValid = true;
    if(ids) {
        for(let id of ids) {
            if(id == plat_id) {
                idValid = false;
                break;
            }
        }
    }

    return idValid ? plat_id : randomId(ids);
};

module.exports = {
    randomId
};