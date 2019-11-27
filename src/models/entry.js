import Waterline from "waterline"
const identity = "entries"

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    type: { type: "string", required: true },
    description: { type: "string", required: true },
    amount: { type: "number", required: true },
    user: { type: "string", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
})