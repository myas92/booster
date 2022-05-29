import * as fs from "fs";
const { v4: uuidv4 } = require('uuid');

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    callback(null, `image-${uuidv4()}`);
};

export const storageImage = (req, file, cb) => {
    const userId = req.user["id"];
    const dir = `../upload/${userId}/`;
    const checkFullPath = fs.existsSync(dir);
    if (!checkFullPath) {
        let result;
        let check = fs.existsSync(`../upload/${userId}`);
        if (!check) {
            result = fs.mkdirSync(`../upload/${userId}`, { recursive: true });
            result = fs.mkdirSync(dir, { recursive: true });
        }
        else {
            result = fs.mkdirSync(dir, { recursive: true });
        }
        return cb(null, result)
    }
    return cb(null, dir)
}
