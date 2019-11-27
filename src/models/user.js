import Waterline from "waterline"
const identity = "users"

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    username: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
})