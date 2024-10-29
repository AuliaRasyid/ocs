const db = require('../../models');

const createWFA = async (req, res) => {
  
    try {
        const { Modul, dataApproval } = req.body;

        if (!Modul || !dataApproval || !Array.isArray(dataApproval) || dataApproval.length === 0) {
            return res.status(400).json({ error: 'Semua field wajib diisi sesuai ketentuan.' });
        }

        const approvalsToInsert = dataApproval.map(item => ({
            Modul: Modul,
            Nik: item.Nik,
            Name: item.Name,
            Position: item.Position,
            Email: item.Email,
            Type: item.Type,
            Value: item.Value,
            Amount: item.Amount
        }));

        const bulkInsertWFA = await db.WorkflowApproval.bulkCreate(approvalsToInsert);

        return res.status(201).json({ message: 'Workflow Approval created successfully!', data: bulkInsertWFA });

    } catch (error) {
        console.error('Error creating Workflow Approval:', error);
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        });
    }
};

const getAllWFA = async (req,res) => {
    try {
        const getall = await db.WorkflowApproval.findAll()
        return res.status(200).send(getall)
    } catch (error) {
        return res.status(500).send({
            status:500,
            message: 'Internal Server Error'
        })
    }
}


module.exports = {
    createWFA,
    getAllWFA
};
