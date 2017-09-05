module.exports = app => {
  const mongoose = app.mongoose;
  const Reportchema = new mongoose.Schema({
    times: { type: Number },
    type: { type: String },// scriptError or ajaxError
    date: { type: Date , default: Date.now }
  }); 

  return mongoose.model('ReportM', Reportchema);

}