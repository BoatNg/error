module.exports = app => {
  const mongoose = app.mongoose;
  const ErrorSchema = new mongoose.Schema({
    msg: { type: String  },
    file: { type: String  },
    row: { type: Number  },
    col: { type: Number },
    time: { type: Number }
  }); 

  return mongoose.model('ErrorM', ErrorSchema);

}