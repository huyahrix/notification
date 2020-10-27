/**
 * @copyright 2020 © DigiNet
 * @author dinh nhat
 * @create 2020/03/18 13:24
 * @update 2020/03/18 13:24
 */
'use strict';

const regularErrors = {
    DIVISION_ID_REQUIRED:               {code: 'RGE001', message: 'The DivisionID is required'},
    TRANS_ID_REQUIRED:                  {code: 'RGE002', message: 'The TransID is required'},
    ADD_NOT_SUCCESSFUL:                 {code: 'RGE003', message: 'Add not successful'},
    EDIT_NOT_SUCCESSFUL:                {code: 'RGE004', message: 'Edit not successful'},
    TRAN_MONTH_REQUIRED:                {code: 'REG005', message: 'The TranMonth is required'},
    TRAN_YEAR_REQUIRED:                 {code: 'REG006', message: 'The TranYear is required'},
    EMPLOYEE_ID_REQUIRED:               {code: 'REG007', message: 'The EmployeeID is required'},
    DEL_NOT_SUCCESSFUL:                 {code: 'REG008', message: 'Delete not successful'},
    SAVE_NOT_SUCCESSFUL:                {code: 'REG009', message: 'Save not successful'},
    PATHS_IS_REQUIRED:                  {code: 'REG010', message: 'The paths is required, in case add attachments'},
    FILE_SIZE_IS_REQUIRED:              {code: 'REG010', message: 'The fileSize is required'},
    FILE_NAME_IS_REQUIRED:              {code: 'REG011', message: 'The fileName is required'},
    FILE_EXT_IS_REQUIRED:               {code: 'REG012', message: 'The fileExt is required'},
    FILE_URL_IS_REQUIRED:               {code: 'REG013', message: 'The url is required'},
    FILE_EXT_IS_INVALID:                {code: 'REG014', message: 'The fileExt is invalid'},
    SAVE_ATTACHMENTS_NOT_SUCCESSFUL:    {code: 'REG015', message: 'Save attachments not successful'},
    ATTACHMENTS_INVALID_TYPE:           {code: 'REG016', message: 'Attachments type invalid'},
    ATTACHMENTS_NOT_EMPTY_IN_CASE_ADD:  {code: 'REG017', message: 'Attachments not empty in case add new leave schedule'}
};

module.exports = regularErrors;
