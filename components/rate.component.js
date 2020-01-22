const validate = require('validate.js');
const database = require('../configs/database');


class Postsrate{

    
    constructor(valid = validate, db = database.MySqlDatabase) {
       
        this._database = new db();
    
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
           normal_rate: {
                presence: {
                    allowEmpty: false
                }
            },
            penalty_rate: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    
    selectAll() {
        return this._database.query('select * from rate');
    }

    async selectOne(rate_id) {
        const errors = this._validate({ rate_id }, {rate_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from rate where rate_id=?', [rate_id]);
        return items.length == 0 ? null : items[0];
    }


    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
  
        const item = await this._database.query('insert into rate value(0, ?, ?)', [
            value['normalInterest'],
            value['penaltyInterest']
        ]);
        return await this.selectOne(item.insertId);
    }

    async update(rate_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ rate_id }, { rate_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update rate set 
                normalInterest = ?,
                penaltInterest=?
            where rate_id = ?`, [
                value['normalInterest'],
                value['penaltyInterest'],
               rate_id
            ]);
        return await this.selectOne(rate_id);
    }

 
    async delete(rate_id) {
        const errors = this._validate({ rate_id }, { rate_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from rate where rate_id=?', [rate_id]);
    }
}
module.exports=Postsrate;