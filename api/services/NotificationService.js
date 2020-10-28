/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27 08:48
 * @update 2020/10/27 08:48
 */
'use strict';
const notification = require('../models/notification');
const DeviceService = require('../services/DeviceService');
const FirebaseService = require('../services/FirebaseService');

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
                            await new notification(data).save().catch(e => console.log(e));
                        } catch (error) {
                            console.log('===== NotificationService.create -> error: ', error.message);
                        }
                    }
                }
                if (i < param.length - 1) {
                    consumer.push(pr.consumer);
                }
            }
        } else {
            console.log('===== NotificationService.create -> {data : null}');
        }
    },
    push: async (param) => {
        console.log('===== NotificationService.push =====');
        const device = await DeviceService.find({ user: param.consumer, AppID: param.AppID });
        const badge = await NotificationService.countBadge(param.consumer, param.AppID);

        if (device && _.isArray(device) && device.length > 0) {
            for (let j = 0; j < device.length; j++) {
                const dv = device[j];
                const data = {
                    'to': dv.token,
                    'content_available': true,
                    'priority': 'high',
                    'notification': {
                        'badge': badge,
                        'title': param.title,
                        'body':  param.body,
                        'notification_type': param.type,
                    },
                    'aps':{
                        'badge': badge,
                        'title': param.title,
                        'body':  param.body,
                    },
                    'data': {
                        'badge':   badge,
                        'title':   param.title,
                        'titleE':  param.titleE,
                        'body':    param.body,
                        'bodyE':   param.bodyE,
                        'sender':  param.sender,
                        'consumer':param.consumer,
                        'type':    param.type,
                        'id':      param.id || '',
                        'payload': {
                            'P_form_id':        param.payload.form_id,
                            'voucher_id':       param.payload.voucher_id,
                            'voucher_des':      param.payload.voucher_des,
                            'voucher_desE':     param.payload.voucher_desE,
                            'voucher_no':       param.payload.voucher_no,
                            'url':              param.payload.URL || param.payload.url ? param.payload.URL || param.payload.url : '',
                            'sender_name':      param.payload.sender_name,
                            'action':           param.payload.action,
                        },
                    }
                };
                await FirebaseService.push(data, param.AppID).catch(e => {
                    console.log('===== FirebaseService.push -> error: ', e);
                });
            }
        }
        else {
            console.log('===== PushNotiService.push -> warn: Device not found ', `{user: '${param.consumer}', AppID: '${param.AppID}'}`);
        }
    },
    countBadge: async (owner, AppID) => {
        console.log(`===== NotificationService.countBadge -> {owner: '${owner}', AppID: '${AppID}'}`);
        let badge = await notification.countDocuments({
            consumer: owner,
            AppID: AppID,
            read:'N',
            clearBadge: 0
        });
        return badge;
    },
};

module.exports = NotificationService;
