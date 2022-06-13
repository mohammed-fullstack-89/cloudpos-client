const { app, Notification } = require('electron');
const app_info = require('../commons');
class NotificationService {

    showNotification(messageTitle, messageBody) {
        const notificationPayload = {
            title: messageTitle,
            body: messageBody,
            icon: app_info.APP_ICON_PATH
        };
        app.whenReady().then(() => new Notification(notificationPayload).show());
    }

}

NotificationService._instance = null;
NotificationService.getInstance = () => {
    if (NotificationService._instance === null) {
        NotificationService._instance = new NotificationService();
    }
    return NotificationService._instance;
};
module.exports = NotificationService.getInstance();