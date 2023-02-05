const firebase = require('firebase-admin');
const serviceAccount = require('../../../../config/lafia-app-firebase-adminsdk-wg442-7bb99dd315.json');
const userModel = require('../../../../models/user-model');

const TIME_TO_LIVE = 60 * 60 * 24;

async function sendPushNotification(title, message, order, userId) {

    try {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        })

        const user = await userModel.findById(userId);
        let payload = {
            //notification message display
            notification: {
                title: title,
                body: message,
                click_action: 'FLUTTER_NOTIFICATION_CLICK'
            },

            //charge utile
            data: {
                orderRef: order.orderRef,
                orderDate: order.updateAt
            }
        }

        const options = {
            priority: 'high',
            timeToLive: TIME_TO_LIVE
        }

        firebase.messaging().sendToDevice(user.userDeviceTokens, payload, options);
    }
    catch (e) {
        console.log({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}


module.exports = {
    userSendPushNotification: sendPushNotification
}