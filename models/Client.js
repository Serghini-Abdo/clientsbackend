const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const itemSchema = new mongoose.Schema({
  item: { type: String, default: '' },
  price: { type: Number, default: '' }
});

const factureSchema = new mongoose.Schema({
  fact_id: { type: String, unique: true },
  rest: { type: Number, default: '0' },
  items: { type: [itemSchema], default: [] }
});

factureSchema.pre('save', function(next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'factureId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).then(function(counter) {
    doc.fact_id = counter.seq.toString().padStart(4, '0');
    next();
  }).catch(function(error) {
    return next(error);
  });
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  factures: { type: [factureSchema], default: [] }
});

clientSchema.pre('save', function(next) {
  if (this.factures.length === 0) {
    this.factures.push({
      rest: '0',
      items: []
    });
  }
  next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;