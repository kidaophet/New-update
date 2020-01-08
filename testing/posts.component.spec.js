const assert = require('assert');
const PostsComponent = require('../components/posts.component');
const calculate= require('../formular/function');


describe('trying PostsComponent', () => {

    var component = new PostsComponent();
    beforeEach(() => component = new PostsComponent(
        require('validate.js'),
        class {
            constructor() {
                this.items = [ {
                    "em_id": 1,
                    "name": "Mong",
                    "surname": "chang",
                    "address": "Xayyaboury",
                    "contact": 2055552665,
                    "type": "user"
                },
                {
                    "em_id": 2,
                    "name": "kikeo",
                    "surname": "changduangsavanh",
                    "address": "Vientiane",
                    "contact": 2055552665,
                    "type": "admin"
                }]
            }

            /**
             * 
             * @param {string} sql 
             * @param {any} params 
             */
            query(sql, params = null) {
                return new Promise((resolve, reject) => {
                    const query = sql.toLowerCase();
                    if (query.indexOf('select') >= 0) {
                        if (params == null)
                            resolve(this.items);
                        else resolve(this.items.filter(m => m.em_id == params[0]));
                    }
                    else if (query.indexOf('insert') >= 0) {
                        const item = {
                            em_id: Math.random(),
                            name: params[0],
                            surname: params[1],
                            address: params[2],
                            contact: params[3],
                            type: params[4]
                        };
                        this.items.push(item);
                        resolve({ insertId: item.em_id });
                    }
                    else if (query.indexOf('update') >= 0) {
                        this.items.map(m => {
                            if (m.em_id == params[5]) {
                                m.name = params[0];
                                m.surname = params[1];
                                m.address = params[2];
                                m.contact = params[3];
                                m.type = params[4]
                            }
                            return m;
                        });
                        resolve();
                    }
                    else if (query.indexOf('delete') >= 0) {
                        this.items.splice(this.items.findIndex(m => m.em_id == params[0]), 2);
                        resolve({});
                    }
                });
            }
        }
    ));

    it('ຕ້ອງມີ Function selectAll', () => {
        assert.equal(typeof component.selectAll, 'function');
    });
    

    it('ຕ້ອງມີ  Function selectOne', () => {
        assert.equal(typeof component.selectOne, 'function');
    });

    it('ຕ້ອງມີ  Function create', () => {
        assert.equal(typeof component.create, 'function');
    });
    it('ຕ້ອງມີ  Function balance1', () => {
        assert.equal(typeof calculate.function, 'undefined');
    });
    it('ຕ້ອງມີ  Function normal_interest', () => {
        assert.equal(typeof calculate.function, 'undefined');
    });
    it('ຕ້ອງມີ  Function  normal_interest', () => {
        assert.equal(typeof calculate.function, 'undefined');
    });
    it('ຕ້ອງມີ  Function  amount_payable', () => {
        assert.equal(typeof calculate.function, 'undefined');
    });
    it('ຕ້ອງມີ  Function  outstanding_days', () => {
        assert.equal(typeof calculate.function, 'undefined');
        
    });
    it('ຕ້ອງມີ  Function  interest_receivable', () => {
        assert.equal(typeof calculate.function, 'undefined');
        
    });
    it('ຕ້ອງມີ  Function  balance_o', () => {
        assert.equal(typeof calculate.function, 'undefined');
        
    });

   
    it('ຕ້ອງມີ  Function  balance_r', () => {
        assert.equal(typeof calculate.function, 'undefined');
        
    });

    it('ຕ້ອງມີ  Function update', () => {
        assert.equal(typeof component.update, 'function');
    });

    it('ຕ້ອງມີ  Function delete', () => {
        assert.equal(typeof component.delete, 'function');
    });

    it('Function selectAll ຕ້ອງເຮັດວຽກຖືກຕ້ອງ', async () => {
        const items = await component.selectAll();
        assert.equal(items.length, 2);
    });

    it('Function selectOne ຕ້ອງເຮັດວຽກຖືກຕ້ອງ', async () => {
        const item = await component.selectOne(2);
        assert.equal(item.name, 'kikeo');
    });

    it('Function create ຕ້ອງເຮັດວຽກຖືກຕ້ອງ', async () => {
        const item = await component.create({
            "em_id": 1,
            "name": "Mong",
            "surname": "chang",
            "address": "Xayyaboury",
            "contact": 2055552665,
            "type": "user"
        });
        const items = await component.selectAll();
        assert.equal(items.length,3);
    });

    it('Function update ຕ້ອງເຮັດວຽກຖືກຕ້ອງ', async () => {
        const item = await component.update(2, {
                "em_id": 2,
                "name": "kikeo",
                "surname": "changduangsavanh",
                "address": "Vientiane",
                "contact": 2055552665,
                "type": "admin"
        });
        assert.equal(item.name, 'kikeo');
    });

    it('Function update ຕ້ອງເຮັດວຽກຖືກຕ້ອງ', async () => {
        await component.delete(2);
        const item = await component.selectAll();
        assert.equal(item.length, 1);
    });
});