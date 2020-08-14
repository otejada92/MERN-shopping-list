import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth.js';
import config from '../../config/index.js';

const {JWT_SECRET} = config;

const router = express.Router();

// @route  POST api/auth
// @desc   Auth user
// @access Public
router.post('/', (req, res) => {
    
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exists'});

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

                jwt.sign(
                    {id: user.id},
                    JWT_SECRET,
                    { expiresIn : 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user : {
                                id : user.id,
                                name : user.name,
                                email : user.email,
                                password : user.password
                            }
                        });
                    }
                );
            })
    });
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    console.log(req.user.id);
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

export default router;
