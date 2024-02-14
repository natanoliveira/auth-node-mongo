const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const mongodb_user = process.env.mongodb_user
const mongodb_password = process.env.mongodb_password
const mongodb_database = process.env.mongodb_database
const mongodb_cluster = process.env.mongodb_cluster

const uri = `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_cluster}.qgv32c4.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }
// const clientOptions = {}

async function run() {

    // // Array de caracteres para a animação de loading
    // const loadingChars = ['|', '/', '-', '\\'];
    // let i = 0;

    // console.log("🔌 Conectando ao MongoDB...🚀");

    // primeiro tipo
    // Intervalo para atualizar o console com a animação de loading
    // const loadingInterval = setInterval(() => {
    //     process.stdout.write('\r' + loadingChars[i % loadingChars.length]);
    //     i++;
    // }, 100);

    // segundo tipo
    // let progressBar = "[";
    // const loadingInterval = setInterval(() => {
    //     progressBar += ".";
    //     process.stdout.clearLine();
    //     process.stdout.cursorTo(0);
    //     process.stdout.write(progressBar);
    // }, 100);

    // terceiro tipo
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress++;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("⏳ Conectando ao MongoDB: " + progress + "%");
        if (progress === 100) {
            clearInterval(loadingInterval);
            console.log("\n🔌 Conexão bem-sucedida com o MongoDB!");
        }
    }, 100);

    try {

        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions)
        mongoose.set('debug', true)
        await mongoose.connection.db.admin().command({ ping: 1 })
        console.log("🎲 Pingou sua implantação. Você se conectou com sucesso ao MongoDB! 🛢️")

        clearInterval(loadingInterval);
    } finally {
        // Ensures that the client will close when you finish/error
        clearInterval(loadingInterval);
        // await mongoose.disconnect()
    }
}
run().catch(console.dir)

module.exports = mongoose
