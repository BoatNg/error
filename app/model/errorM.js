/* module.exports = app => {
  const mongoose = app.mongoose;
  const ErrorSchema = new mongoose.Schema({
    msg: { type: String  },
    variable: { type: String },
    file: { type: String  },
    userAgent: { type: String  },
    cookie: { type: String  },
    host: { type: String  },
    ip: { type: String },
    row: { type: Number  },
    col: { type: Number },
    time: { type: Number }
  }); 

  return mongoose.model('ErrorM', ErrorSchema);

} */