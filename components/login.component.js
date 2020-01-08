const validate = require('validate.js');
const database = require('../configs/database');

class Postslogin {

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
            password: {
                presence: {
                    allowEmpty: false
                }
            },
            em_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from login');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(lopgin_id) {
        const errors = this._validate({ login_id }, {login_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from login where login_id=?', [login_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into user value(0, ?, ?, ?)', [
            value['name'],
            value['password'],
            value['em_id'],
            
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(login_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ login_id }, { login_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update user set 
                name = ?, 
                password = ?,
                em_id = ?
                
            where login_id = ?`, [
                value['name'],
                value['password'],
                value['em_id'],
                login_id
            ]);
        return await this.selectOne(login_id);
    }

    // ลบข้อมูล
    async delete(login_id) {
        const errors = this._validate({ login_id }, { login_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from login where login_id=?', [login_id]);
    }
}
module.exports=Postslogin;

