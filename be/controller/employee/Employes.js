const sql = require('mssql');

const getEmployee = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM "Employee"`; // Ganti nama tabel sesuai kebutuhan

        // Memastikan result dan recordset ada dan tidak kosong
        if (!result || !result.recordset || result.recordset.length === 0) {
            return res.status(404).send({
                status: 404,
                message: 'Data Employee Not Found'
            });
        }

        // Mengirimkan hasil recordset
        res.status(200).send(result.recordset);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

// Controller untuk mencari employee berdasarkan NIK
const getEmployeeByNik = async (req, res) => {
    const nik = req.params.nik; // Mengambil NIK dari parameter URL
    
    if(!nik){
        return res.status(400).send({
            status: 400,
            message: 'nik required'
        });
    }

    try {
        // Query untuk mencari employee berdasarkan NIK
        const result = await sql.query`SELECT * FROM "Employee" WHERE Nik = ${nik}`;

        // Memastikan hasil query ada
        if (!result || !result.recordset || result.recordset.length === 0) {
            return res.status(404).send({
                status: 404,
                message: 'Employee not found'
            });
        }

        // Mengirimkan hasil recordset
        res.status(200).send(result.recordset[0]); // Mengirimkan satu pegawai
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};


module.exports = {
    getEmployee,
    getEmployeeByNik
};
