import { config} from 'dotenv'

config()

export const PORT = process.env.PORT
export const USER_NAME_DB = process.env.USER_NAME_DB
export const PASS_DB = process.env.PASS_DB
export const NAME_DB = process.env.NAME_DB
export const HOST_DB = process.env.HOST_DB
export const PORT_DB = process.env.PORT_DB
