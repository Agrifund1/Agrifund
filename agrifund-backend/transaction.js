app.post('/transactions', async (req, res) => {
    const { user_id, loan_pool_id, transaction_hash, type, amount } = req.body;

    if (!user_id || !transaction_hash || !type || !amount) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const { data, error } = await supabase
            .from('transactions')
            .insert([{ user_id, loan_pool_id, transaction_hash, type, amount, status: 'pending' }])
            .single();

        if (error) throw error;
        res.status(201).json({ message: 'Transaction recorded successfully', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
