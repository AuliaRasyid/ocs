const { sequelize } = require('../../models');
const db = require('../../models');

const getEmployees = async (req, res) => {
    try {
        const getAll = await db.Employee.findAll()
        return res.status(200).send(getAll)

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'Internal server error'
        })
    }
}

const getEmployeeNik = async (req, res) => {
    try {
        const nik = req.params.nik; // Mengambil NIK dari parameter URL

        if (!nik) {
            return res.status(400).send({
                status: 400,
                message: 'nik required'
            });
        }

        const getNik = await db.Employee.findOne({
            where: {
                Nik : nik
            }
        })
        return res.status(200).send(getNik)
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    }
}


module.exports = {
    getEmployees,
    getEmployeeNik
};
