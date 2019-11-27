import Waterline from "waterline"
import DiskAdapter from "sails-disk"
import MongoAdapter from "sails-mongo"

import user from "./models/user"

const { NODE_ENV, DB_URL = 'db url here' } = process.env

var waterline = new Waterline()

waterline.registerModel(user)
/*waterline.registerModel(routes);
waterline.registerModel(drivers);
waterline.registerModel(buses);
waterline.registerModel(students);
waterline.registerModel(parents);
waterline.registerModel(schedule);
waterline.registerModel(event);
waterline.registerModel(trip);
waterline.registerModel(complaint);
waterline.registerModel(locReport)
waterline.registerModel(OTP)*/

const config = {
  adapters: {
    mongo: MongoAdapter,
    disk: DiskAdapter,
  },
  datastores: {
    default: !['development', "test"].includes(NODE_ENV) ? {
      adapter: 'mongo',
      url: DB_URL
    } : {
      adapter: "disk",
      // filePath: '/tmp'
    }
  }
}

export default new Promise((resolve, reject) => {
  waterline.initialize(config, (err, db) => {
    if (err) {
      console.log(err)
      reject(err)
    }
    resolve(db)
  })
})