import db_connection from '../../../DB/connection.js';

// =================================== ADD MEMBER ======================================

export const addMember = async (req, res, next) => {
  const { name, national_id, phone_number, membership_from, membership_to, membership_cost, status, trainer_id } = req.body;
  const membership = JSON.stringify({ from: membership_from, to: membership_to, cost: membership_cost });
  try {
    const insertQuery = `INSERT INTO members (name, national_id, phone_number, membership, status, trainer_id) VALUES ('${name}', '${national_id}', '${phone_number}', '${membership}', '${status}', '${trainer_id}')`;

    db_connection.query(insertQuery, (err, result)=>{
      if (err) {
        return res.json({message: 'Query Error', error: err.message})
      }
      if(!result.affectedRows) {
        return res.json({message: 'member was not added'})
      }
      
    return res.json({message: `Member added successfully`})

    })
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// =================================== GET ALL MEMBERS ======================================

export const getAllMembers = async (req, res, next) => {
  try {
    const selectQuery = `SELECT members.id, members.name, national_id, phone_number, membership, status, members.trainer_id, trainers.name as trainer_name, duration as trainer_duration FROM members
    INNER JOIN trainers
    ON members.trainer_id = trainers.id
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



// =================================== GET SPECIFIC MEMBER BY ID ======================================

export const getMemberById = async (req, res, next) => {
  const { id } = req.query;

  try {
    const selectQuery = `SELECT * FROM members WHERE id = ${id}`

    db_connection.query(selectQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Member not found' });
      }
      const membershipStatus = new Date(JSON.parse(result[0].membership).to) < new Date() ? 'This member is not allowed to enter the gym' : 'Active';

      return res.json({ data:result[0], membership_status: membershipStatus });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// =================================== UPDATE MEMBER ======================================

export const updateMember = async (req, res, next) => {
  const { id } = req.params;
  const { name, membership_from, membership_to, membership_cost, trainer_id } = req.body;
  const membership = JSON.stringify({ from: membership_from, to: membership_to, cost: membership_cost });

  try {
    const updateQuery = `UPDATE members SET name = '${name}', membership = '${membership}', trainer_id = '${trainer_id}' WHERE id = '${id}'`;

    db_connection.query(updateQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (!result.affectedRows) {
        return res.json({ message: 'Member was not updated' });
      }
      return res.json({ message: 'Member updated successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// =================================== DELETE MEMBER ======================================

export const deleteMember = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteQuery = `UPDATE members SET status = 'freeze' WHERE id = '${id}'`;

    db_connection.query(deleteQuery, (err, result) => {
      if (err) {
        return res.json({ message: 'Query Error', error: err.message });
      }
      if (!result.affectedRows) {
        return res.json({ message: 'Member was not deleted' });
      }
      return res.json({ message: 'Member deleted (soft delete) successfully' });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};