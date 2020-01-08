const validate = require('validate.js');
const database = require('../configs/database');


class Postsprincipal{

    //table user
    constructor(valid = validate, db = database.MySqlDatabase) {
        // ใช้งาน Database
        this._database = new db();
        // สร้าง Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
           principle: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from principal');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(pri_id) {
        const errors = this._validate({ pri_id }, {pri_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from principal where pri_id=?', [pri_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        // const func_prin = new prin();
        // let princ = func_prin.principal(
        //     value['principle']
        // );
        const item = await this._database.query('insert into principal value(0, ?)', [
            value['principle']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(pri_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ pri_id }, { pri_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update principal set 
                principle = ?
            where pri_id = ?`, [
                value['principle'],
                pri_id
            ]);
        return await this.selectOne(pri_id);
    }

    // ลบข้อมูล
    async delete(pri_id) {
        const errors = this._validate({ pri_id }, { pri_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from principal where pri_id=?', [pri_id]);
    }
}
module.exports=Postsprincipal;