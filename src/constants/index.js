export const DATA_STORAGE_PATH=/^(\/[a-zA-Z]\w*)+(\/)?$/
export const USERNAME_REG_EXP = /^[a-z][-a-z0-9]{1,40}[a-z0-9]$/
export const USERNAME_REG_EXP_OLD = /^[a-z][-a-z0-9_]{1,40}[a-z0-9]$/
export const USERNAME_REG_EXP_NEW = /^[a-z][a-z0-9-]{3,38}[a-z0-9]$/
export const CREATE_SPACE = /^[a-z][a-z0-9-]{3,38}[a-z]$/
export const PASSWORD_MONGODB=/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,12}$/
export const PASSWORD_RDB=/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,12}$/
export const STORAGENAME_REG_EXP = /^[a-z][-a-z0-9_]{2,14}$/
export const EMAIL_REG_EXP = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
export const VERSION_REG_EXP = /\bv\d\.\d\.\d/
export const URL_REG_EXP = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
