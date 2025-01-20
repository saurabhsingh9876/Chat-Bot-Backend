import jwt  from 'jsonwebtoken';

export const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}
export const isAdmin= (req, res, next) => {
    const{role}=req.body
    try {
        
       if(role==1)
        next();
    else{
        res.status(403)
            .json({ message: 'you are not authorized' });
    }
    } catch (err) {
        return res.status(403)
            .json({ message: 'You dont have permission to acces ths api' });
    }
}

