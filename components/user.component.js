const validate = require('validate.js');
const database = require('../configs/database');
class Postsuser {
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
            name: {
                presence: {
                    allowEmpty: false
                }
            },
            surname: {
                presence: {
                    allowEmpty: false
                }
            },
            address: {
                presence: {
                    allowEmpty: false
                }
            },
            contact: {
                presence: {
                    allowEmpty:false
                }
            },
            type: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from user');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(em_id) {
        const errors = this._validate({ em_id }, {em_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from user where em_id=?', [em_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules); 
        if (errors) throw { errors };
        const item = await this._database.query('insert into user value(0, ?, ?, ?, ?, ?)', [
            value['name'],
            value['surname'],
            value['address'],
            value['contact'],
            value['type']
        ]);
        return await this.selectOne(item.insertId);
    }
    // แก้ไขข้อมูล
    async update(em_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ em_id }, { em_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update user set 
                name = ?, 
                surname = ?,
                address = ?,
                contact = ?,
                type = ?
            where em_id = ?`, [
                value['name'],
                value['surname'],
                value['address'],
                value['contact'],
                value['type'],
                em_id
            ]);
        return await this.selectOne(em_id);
    }

    // ลบข้อมูล
    async delete(em_id) {
        const errors = this._validate({ em_id }, { em_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from user where em_id=?', [em_id]);
    }  
}
module.exports=Postsuser;

