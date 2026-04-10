import generateResponse from "../config/OPENROUTER.js"
import extractJson from "../utils/extractJson.js";



export const getCurrentUser = async(req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ user: null });
        }
        res.status(200).json({ user: req.user });

    } catch (error) {
        res.status(500).json({ message: `get current user error ${error}` });
    }
}