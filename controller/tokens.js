const jwt = require('jsonwebtoken');
const UserModel = require('../models/tokens');

const process = require('../config/')

class tokens {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findUser(username, password);

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }


            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
