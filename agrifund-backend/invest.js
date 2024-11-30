app.post('/invest', async (req, res) => {
    const { loan_pool_id, investor_id, amount } = req.body;

    if (!loan_pool_id || !investor_id || !amount) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const { data, error } = await supabase
            .from('farmer_coins')
            .insert([{ loan_pool_id, investor_id, amount }])
            .single();

        if (error) throw error;

        // Update the loan pool with the new amount invested
        await supabase
            .from('loan_pools')
            .update({
                current_amount: supabase.raw('current_amount + ?', [amount])
            })
            .eq('id', loan_pool_id);

        res.status(201).json({ message: 'Investment made successfully', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
