'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async read(id, options) {
    try{
      //if an id is passed in, find the model by the primary key
      if(id) {
        const result = await this.model.findOne({ where: {id:id}, ...options});
        return result;
      }
      //if there's no id, then return ALL the items in the model
      else {
        return await this.model.findAll(options);
      }
    }
    catch(err){
      console.log('COLLECTION CLASS READ ERR', err.message);
    }
  }

  async create(data) {
    try{
      let result = await this.model.create(data);
      console.log(result);
      return result;
    }catch(err) {
      console.log('COLLECTION CREATE ERR ', err);
    }
  }

  async update(id, data) {
    try{
      let updatedRecord = await this.model.update(
        data,
        {
          where: {
            id: id,
          },
        },
      );
      return updatedRecord;
    }catch(err) {
      console.log('COLLECTION UPDATE ERR', err.message);
    }
  }

  async delete(id) {
    try{
      let result = await this.model.destroy({
        where: {
          id: id,
        },
      });
      return result;
    }catch(err) {
      console.log('COLLECTION DELETE ERR ', err);
    }
  }
}

module.exports = Collection;