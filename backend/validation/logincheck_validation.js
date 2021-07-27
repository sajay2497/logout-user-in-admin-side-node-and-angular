module.exports = {
    validatelogin: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            app.post('/logincheck', async (req, res) => {
                try {
                    const resdata = await User.findById(req.body.id).select({ loginstatus: 1, _id: 0 });
                    res.status(200).json({
                        status: 1,
                        data: resdata
                    })
                } catch (error) {
                    res.status(500).json({
                        status: 0,
                        message: error.message
                    })
                }
            })
        } else {
            res.json({
                status: 0,
                message: "Access denied! Unauthorizatin User!!"
            })
        }
    }
}
