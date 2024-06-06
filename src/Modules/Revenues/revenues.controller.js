import db_connection from '../../../DB/connection.js';


// =============================== Get All Revenues ===============================
export const getAllRevenues = async (req, res, next) => {
    try {
      const selectQuery = `SELECT SUM(JSON_EXTRACT(membership, '$.cost')) AS total_revenue FROM members WHERE status = 'active'`;
  
      db_connection.query(selectQuery, (err, result) => {
        if (err) {
          return res.json({ message: 'Query Error', error: err.message });
        }
        return res.json({ total_revenue: result[0].total_revenue });
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // =============================== Get Revenues of a Specific Trainer ===============================
  export const getTrainerRevenues = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const selectQuery = `SELECT SUM(JSON_EXTRACT(membership, '$.cost')) AS total_revenue FROM members WHERE trainer_id = '${id}' AND status = 'active'`;
  
      db_connection.query(selectQuery, (err, result) => {
        if (err) {
          return res.json({ message: 'Query Error', error: err.message });
        }
        if (result[0].total_revenue == null) {
            return res.json({error: "Trainer Not found"})
        }
        return res.json({ total_revenue: result[0].total_revenue });
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  