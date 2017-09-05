module.exports = app => {
  const mongoose = app.mongoose;
  const AjaxErrorSchema = new mongoose.Schema({
    status: { type: Number },
    data: { type: String  },
    url: { type: String  },
    method: { type: String  },
    statusText: { type: String },
    time: { type: Date , default: Date.now }
  });

  return mongoose.model('AjaxErrorM', AjaxErrorSchema);

}