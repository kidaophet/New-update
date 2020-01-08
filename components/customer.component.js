
const validate = require('validate.js');
const database = require('../configs/database');
class Postscustomer {
    //table customer
    
    constructor(valid = validate, db = database.MySqlDatabase) {
        // ใช้งาน Database
        this._database = new db();
        // สร้าง Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
    
            firstname: {
                presence: {
                    allowEmpty: false
                }
            },
            Surname: {
                presence: {
                    allowEmpty: false
                }
            },
            gender: {
                presence: {
                    allowEmpty: false
                }
            },
            Address: {
                presence: {
                    allowEmpty: false
                }
            },
            Contact: {
                presence: {
                    allowEmpty: false
                }
            },
            
            Email: {
                presence: {
                    allowEmpty: false
                }
            },
            evidence: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }
    
    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('SELECT * FROM customer');
    }
    
    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(cus_id) {
        const errors = this._validate({ cus_id }, {cus_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from customer where cus_id=?', [cus_id]);
        return items.length == 0 ? null : items[0];
    }
    
    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into customer value(0, ?, ?, ?, ?, ?, ?, ?)', [
            value['firstname'],
            value['Surname'],
            value['gender'],
            value['Address'],
            value['Contact'],
            value['Email'],
            value['evidence']
            
        ]);
        return await this.selectOne(item.insertId);
    }
     
    // แก้ไขข้อมูล
    async update(cus_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ cus_id }, { cus_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update customer set 
                firstname = ?, 
                Surname = ?,
                gender = ?,
                Address = ?,
                Contact = ?,
                Email=?,
                evidence = ?
               
            where cus_id = ?`, [
                value['firstname'],
                value['Surname'],
                value['gender'],
                value['Address'],
                value['Contact'],
                value['Email'],
                value['evidence'],
                cus_id
            ]);
        return await this.selectOne(cus_id);
    }
    
    // ลบข้อมูล
    async delete(cus_id) {
        const errors = this._validate({ cus_id }, { cus_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from customer where cus_id=?', [cus_id]);
    }
    }
    module.exports=Postscustomer;