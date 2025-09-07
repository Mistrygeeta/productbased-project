const ImageKit = require("imagekit");
const {v4:uuidv4} = require("uuid")


const imagekit = new ImageKit({
    publicKey :process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URLENDPOINT
})

async function uploadFile(fileBuffer) {
    const result = imagekit.upload({
        file : fileBuffer,
        fileName: uuidv4(),
        folder : "mern-product"
    })
    return result
}


module.exports = {uploadFile}