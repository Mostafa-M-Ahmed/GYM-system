import db_connection from '../../../DB/connection.js';



// ================================ Add Trainer ================================

export const addTrainer = async (req, res, next) => {
  const { name, duration_from, duration_to } = req.body;
  const duration = JSON.stringify({ from: duration_from, to: duration_to });

  try {
    const insertQuery = `INSERT INTO trainers (name, duration) VALUES ('${name}', '${duration}')`;

    db_connection.query(insertQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (!result.affectedRows) {
        return res.json({ message: 'Trainer was not added' });
      }
      return res.json({ message: 'Trainer added successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================================ Get All Trainers and their members ================================

export const getAllTrainers = async (req, res, next) => {
  try {
    
    const selectQuery = `
    SELECT trainers.id as id, trainers.name as name, duration, members.id as member_id, members.name as member_name, national_id as member_national_id, phone_number as member_phone_number, membership, status as member_status FROM trainers
    LEFT JOIN members
    ON trainers.id = members.trainer_id
    `;


    db_connection.query(selectQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      return res.json(result);
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================================ Get Specific Trainer ================================

export const getTrainerById = async (req, res, next) => {
  const { id } = req.query;

  try {
    const selectQuery = `
    SELECT trainers.id as id, trainers.name as name, duration, members.id as member_id, members.name as member_name, national_id as member_national_id, phone_number as member_phone_number, membership, status as member_status FROM trainers
    LEFT JOIN members
    ON trainers.id = members.trainer_id
    WHERE trainer_id = ${id}
    `;

    db_connection.query(selectQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      return res.json({data: result});
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================================ Update Trainer ================================

export const updateTrainer = async (req, res, next) => {
  const { id } = req.params;
  const { name, duration_from, duration_to } = req.body;
  const duration = JSON.stringify({ from: duration_from, to: duration_to });

  try {
    const updateQuery = `UPDATE trainers SET name = '${name}', duration = '${duration}' WHERE id = '${id}'`;

    db_connection.query(updateQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (!result.affectedRows) {
        return res.json({ message: 'Trainer was not updated' });
      }
      return res.json({ message: 'Trainer updated successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================================ Delete Trainer ================================

export const deleteTrainer = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM trainers WHERE id = '${id}'`;

    db_connection.query(deleteQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (!result.affectedRows) {
        return res.json({ message: 'Trainer was not deleted' });
      }
      return res.json({ message: 'Trainer deleted successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
