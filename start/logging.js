const winston = require("winston");
require("winston-mongodb");

module.exports = function(){
    
    winston.add(winston.transports.File, { filename: "logfile.log" });
    winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/gunnar", level: "error" });  
    
    //wyłapywanie exception poza expressem czy tam pipelinem aplikacji (pipeline to przechodzenie od req do res po koleji przez middleware itd. ) dodatkowo dziala tak tylko do synchronicznego kodu. 
    // process.on("uncaughtException", (ex) => {
    //     console.log("ex poza pipeline");
    //     winston.error(ex.message, ex)
    //     // dobra praktyka zamknac apke, i proces manager powinien odpalic ja od nowa z czytym state. exit inne niz 0 to blad
    //     process.exit(1);
    // });
    // to robi to samo co wyzej process on uncaughtException, tylko lapie synchroniczne NIE promisowe bledy, nizej sa promisowe i mozna je albo osobno obslugiwac, albo rzucic tam throw ex i przejdzie na synchro i zzlapie sie tym xd
    winston.handleExceptions(
        new winston.transports.File({filename: "pozaprocesemexceptions.log"}),
        new winston.transports.Console({colorize : true, prettyPrint: true})
        );
    //przykladowy blac
    // throw new Error("XXXAWEASDASDSADASDAS");
    
    process.on("unhandledRejection", (ex) => {
        // console.log("ex promise reject poza pipeline bez then catcha albo try catcha");
        // winston.error(ex.message, ex)
        // // dobra praktyka zamknac apke, i proces manager powinien odpalic ja od nowa z czytym state. exit inne niz 0 to blad
        // process.exit(1);
    
        //
        throw ex;
    });
    //przykladowy blad z promiserejection
    // const p = Promise.reject(new Error(" error z promisa reject"));
    // p.then(() => console.log("then bez catcha z p"));

}