const db = require('../../models');
const {sequelize} = require('../../models')


const createNeedApproval = async (req, res) => {
    const t = await sequelize.transaction()

    const {Modul_id, Amount, createdBy, Nik, Name, Position, Level} = req.body

    try {
        
        const bodyTransaction = {
            Modul_id: Modul_id,
            Amount: Amount,
            createdBy : createdBy
        }
        
        const insertTransaction =  await db.Transaction.create(bodyTransaction, {
            returning: true
        })

        const bodyNeedApproval = {
            Modul_id: Modul_id,
            Transaction_id : insertTransaction.id,
            Nik : Nik,
            Name: Name,
            Position: Position, 
            Level: Level
        }

        const insertNeedApproval = await db.NeedApproval.create(bodyNeedApproval)

        await t.commit()
        return res.status(200).send('success')
    } catch (error) {
        await t.rollack()
        console.error('Error creating Need Approval:', error);
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createNeedApproval
} 