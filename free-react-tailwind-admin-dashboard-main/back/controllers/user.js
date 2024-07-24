exports.getUser = async (req, res) => {
    try {
        const user=req.user;
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

