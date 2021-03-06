// =============================================================================
/**
 * Cloud Computing Cource Exercises
 * Exercise 1
 *  2 Tasks
 *      1. Accessing VM information using unauthenticated API
 *      2. Service Level Authentication
 * Developed by 'Group 39'
 * Vasiliki Sideri Lampretsa, Gabriela Hernandez, Stefan Su
 */
// =============================================================================
/**
 * BASE SETUP
 * import the packages we need
  */
const express    = require('express');
const app        = express();
const port       = process.env.PORT || 8080; // set our port
/**
 * ROUTES FOR OUR API
 * Create our router
 */
const router = express.Router();
/**
 * Middleware to use for all requests
 */
router.use((req, res, next) => {
    /**
     * Logs can be printed here while accessing any routes
     */
    next();
});
/**
 * Base route of the router : to make sure everything is working check http://localhost:8080/exercises)
 */
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Cloud Computing Exercises API!'});
});
/**
 * Exercise 1: Task 1 Route (Accessing VM information, This is also unauthenticated API)
 */
router.route('/exercise1_task1')
    .get((req, res) => {
        /**
         * Hint : http://nodejs.org/api.html#_child_processes
         */
        const exec = require('child_process').exec;
        // ================================================================================================================
        /**
         * TO DO
         * 1. Get the number of current users login into virtual machine
         * 2. Get the names of those users
         * 3. Get the number of storage disks ((we are here only concerned about the disks and that too Virtual disks (vd)))
         * 4. Get size Information about the above disks (disk: size).
         * 5. save in exercise_1_Message
         */
        // =================================================================================================================
        let exercise_1_Message = {
            message: 'exercise_1',
            numberUsers: 'x',
            userNames:['x','y'],
            numStorageDisks:'xy',
            storageDisksInfo:['size1', 'size2', 'size3']
        };
        var userdata = exec('who && echo 1nextcommand && lsblk -o SIZE', (err, stdout, stderr) => {
            if(err) {
                console.log('exec error: ' + err);
            }
            console.log(stdout);
        });
        
        // attach listener to userdata
        userdata.stdout.on('data', (data) => {
            var numUsers = 0;
            var users = [];
            var numDisks = 0;
            var disksizes = [];

            datarows = data.split('\n');

            var firstCommand = true;

            for (i = 0; i < datarows.length; i++) {
                row = datarows[i].split(' ');
                if (row[0] != '' && firstCommand) {
                    numUsers++;
                    users.push(row[0]);
                }
                if (row[0] == '1nextcommand') firstCommand = false;
                if (row[0] != '' && row[0] != 'SIZE' && !firstCommand ) {
                    numDisks++;
                    disksizes.push(row[0]);
                }
            }

            exercise_1_Message.numberUsers = numUsers;            
            exercise_1_Message.userNames = users;
            exercise_1_Message.numStorageDisks = numDisks;
            exercise_1_Message.storageDisksInfo = disksizes;

            res.json(exercise_1_Message);
        });
    });
/**
 * Exercise 1: Task 2 Route (Service Level Authentication)
 */
router.route('/exercise1_task2')
    .get(function(req, res)
    {
        // ================================================================================================================
        /**
         * TO DO
         * 1. Add the default authentication to username: 'CCS' and password as 'CCS_exercise1_task2'.
         * 2. On success authentication return the response with value 'Successful Authentication'.
         * 3. In case of failure return the response with value 'Unsuccessful Authentication'.
         */
        // =================================================================================================================
        let auth;
        /**
         * check whether an autorization header was send
         */
        if (req.headers.authorization)
        {
            /**
             *  only accepting basic auth, so:
             * cut the starting 'Basic ' from the header
             * decode the base64 encoded username:password
             * split the string at the colon
             * should result in an array
             */
            auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
        }
        /**
         *  checks if:
         * auth array exists
         * first value matches the expected username
         * second value the expected password
         */
        if (false) {
            res.end('Unsuccessful Authentication');
        }
        else {
            /**
             * Processing can be continued here, user was authenticated
             */
            res.send('Successful Authentication');
        }
    });
/**
 * REGISTER OUR ROUTES
 * our router is now pointing to /exercises
 */
app.use('/exercises', router);
/**
 * Start the server
 * our router is now pointing to /exercises
 */
app.listen(port);
console.log('Server started and listening on port ' + port);









