
const { app, Notification } = require('electron');
const commons = require('../commons');
class NotificationService {


    showNotification(messageTitle, messageBody) {
        const notificationPayload = {
            title: messageTitle,
            body: messageBody,
            icon: __dirname + '/../assets/icons/app.ico',
            subtitle: 'app notification'
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