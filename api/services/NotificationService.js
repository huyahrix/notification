/**
 * @copyright 2020 ©DigiNet
 * @author ngochuy
 * @create 2020/10/27 08:48
 * @update 2020/10/27 08:48
 */
'use strict';
const notification = require('../models/notification');

const NotificationService = {
    create: async (param) => {
        console.log('===== NotificationService.create =====');

        if (param && param.length > 0) {
            let consumer = [];
            for (let i = 0; i < param.length; i++) {
                const pr = param[i];

                const appID = pr.appid ? pr.appid : '';
                const notiByApp = appID.trim().split(',');

                for (let j = 0; j < notiByApp.length; j++) {
                    let data = {};
                    if (consumer.indexOf(pr.consumer) === -1) {
                        data = {
                            title:      pr.title,
                            titleE:     pr.titleE ? pr.titleE : '',
                            body:       pr.body,
                            bodyE:      pr.bodyE,
                            sender:     pr.sender,
                            consumer:   pr.consumer,
                            type:       pr.type,
                            AppID:      notiByApp[j] ? notiByApp[j] : '',
                            payload: {
                                form_id:        pr.P_form_id,
                                voucher_id:     pr.P_voucher_id,
                                voucher_des:    pr.P_voucher_des,
                                voucher_desE:   pr.P_voucher_desE,
                                voucher_no:     pr.P_voucher_no,
                                URL:            pr.P_URL,
                                sender_name:    pr.P_sender_name,
                                action:         pr.P_action,
                            },
                        };
                        try {
                            //await Notification.create(data).meta({ fetch: true });
                            console.log(data);
                            await new notification(data).save();
                        } catch (error) {
                            sails.log.error('===== NotificationService.create -> error: ', error.message);
                        }
                    }
                }
                if (i < param.length - 1) {
                    consumer.push(pr.consumer);
                }
            }
        } else {
            sails.log.warn('===== NotificationService.create -> {data : null}');
        }
    }
};

module.exports = NotificationService;
