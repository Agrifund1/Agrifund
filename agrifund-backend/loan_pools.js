app.post('/loan-pools', async (req, res) => {
    const { farmer_id, title, description, goal_amount } = req.body;

    if (!farmer_id || !title || !goal_amount) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const { data, error } = await supabase
            .from('loan_pools')
            .insert([{ farmer_id, title, description, goal_amount, current_amount: 0.00 }])
            .single(); // Use .single() if you expect just one record to be inserted

        if (error) throw error;
        res.status(201).json({ message: 'Loan Pool created successfully', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
