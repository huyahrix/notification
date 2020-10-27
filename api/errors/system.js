/**
 * @copyright 2019 © DigiNet
 * @author rocachien
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
 */
'use strict';

const MESSAGE = {
    SYSTEM_ERROR:                   {code: 'SYS001', message: 'System error!'},
    SYSTEM_TOKEN_REQUIRE:           {code: 'SYS002', message: 'Authentication token is required'},
    SYSTEM_SECRET_REQUIRE:          {code: 'SYS008', message: 'Authentication secret is required'},
    SYSTEM_TOKEN_WRONG:             {code: 'SYS003', message: 'Authentication token are not matching'},
    SYSTEM_TOKEN_EXPIRED:           {code: 'SYS004', message: 'Authentication token is expired'},
    SYSTEM_REQUEST_TIMEOUT:         {code: 'SYS005', message: 'Authentication error request timeout'},
    SYSTEM_UPDATE_TOKEN_FAIL:       {code: 'SYS006', message: 'Update token fail'},
    SYSTEM_SOCKET_ERROR:            {code: 'SYS007', message: 'Socket error'},

    SYSTEM_JSON_FORMAT_FAIL:        {code: 'SYS008', message: 'The data is not in JSON format'},
    SYSTEM_ENUM_VALUE_FAIL:         {code: 'SYS009', message: 'The data is not in list'},
    SYSTEM_NOT_INTEGER_FAIL:        {code: 'SYS010', message: 'The data is not number'},
    SYSTEM_UNIQUE_FIELD:            {code: 'SYS011', message: 'The data is unique'},
    SYSTEM_DATA_FIELD:              {code: 'SYS012', message: 'The database error'},
    SYSTEM_DATE_INVALID:            {code: 'SYS013', message: 'Invalid value format for Dates type ([\'YYYY-MM-DD\',\'YYYY-MM-DD HH:mm:ss\',\'YYYY-MM-DD HH:mm:ss.SSS\', \'YYYY-MM-DDTHH:mm:ss.SSSZ\'])'},
    SYSTEM_EMAIL_WRONG:             {code: 'SYS014', message: 'The email is not in format'},
    SYSTEM_NUMBER_INVALID:          {code: 'SYS015', message: 'Invalid value format for \'Number\' type' },
    SYSTEM_DATE_WRONG:              {code: 'SYS016', message: 'The date is not in format'},

    SYSTEM_PERMISSION_FAIL:         {code: 'SYS030', message: 'There is not enough permission to access. Please login.'},
    SYSTEM_STATUS_IS_NEW:           {code: 'SYS040', message: 'You are new member. Please active your account.'},
    SYSTEM_STATUS_IS_INACTIVE:      {code: 'SYS041', message: 'Your account is not active. Please active your account.'},
    SYSTEM_STATUS_IS_BANNED:        {code: 'SYS042', message: 'Your account has been banned. Please contact the admin to open it.'},

    SYSTEM_MSSQL_CONNECTION_FAIL:   {code: 'SYS050', message: 'Connection to MSSQL fail.'},
    SYSTEM_MSSQL_QUERY_FAIL:        {code: 'SYS051', message: 'The query to MSSQL fail.'},
    SYSTEM_MSSQL_QUERY_REQUIRED:    {code: 'SYS052', message: 'The query to MSSQL is required.'},
    SYSTEM_DELETE_FOREIGN_KEY:      {code: 'SYS053', message: 'Delete with foreign key is exited.'},
    SYSTEM_BASE_REQUIRE:            {code: 'SYS054', message: 'Authentication base is required'},
    SYSTEM_PERMISSION_REQUIRE:      {code: 'SYS055', message: 'You don\'t have permission to access on this server'},
    SYSTEM_DATA_REQUIRED:           {code: 'SYS056', message: 'The data is required'},
    SYSTEM_APP_VERSION_OUT_DATE:    {code: 'SYS057', message: 'App version out of date. Please upgrade to the latest version'},
};

module.exports = MESSAGE;
