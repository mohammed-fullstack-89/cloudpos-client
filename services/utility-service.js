class UtilityService {

    constructor() { }

    playSound(type) { }

    barcode() { }


}
UtilityService._instance = null;
UtilityService.getInstance = () => {
    if (UtilityService._instance == null) {
        UtilityService._instance = new UtilityService();
    }
    return UtilityService._instance;
}
module.exports = UtilityService.getInstance();