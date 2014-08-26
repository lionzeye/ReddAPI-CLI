// IMPORTS
var rest = require('restler');
var config = require('./config');

var args = process.argv.slice(2);

// VARIABLES
var apiKeyGET = config.apikeys.get;
var apiKeyPOST = config.apikeys.post;

if(apiKeyGET == "" || apiKeyPOST == "") {
    console.log("Provide API-keys in config.js")
    process.exit(0);
}

var baseURL = 'https://api.reddapi.com/v1/json/';

// ASYNC. FUNCTIONS -> REQUEST-TEMPLATES
var requestGET = function (url, callback) {
    rest.get(url).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000);
        } else {
            callback(result);
        }
    });
};

var requestPOST = function (url, params, callback) {
    rest.post(url, params).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000);
        } else {
            callback(result);
        }
    });
}

// ASYNC. FUNCTIONS -> GET-REQUESTS
var getUserBalance = function (userName) {
    var command = 'GetUserBalance';
    requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserBalanceCallback);
};

var getUserBalanceDetail = function (userName) {
    var command = 'GetUserBalanceDetail';
    requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserBalanceDetailCallback);
};


var getUserInfo = function (userName) {
    var command = 'GetUserInfo';
    requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserInfoCallback);
};

var getUserList = function () {
    var command = 'GetUserList';
    requestGET(baseURL + command + '/' + apiKeyGET, getUserListCallback);
};

// ASYNC. FUNCTIONS -> POST-REQUESTS
var createNewUser = function (userName) {
    var command = 'CreateNewUser';
    obj = {APIKey: apiKeyPOST, Username: userName};
    var json = JSON.stringify(obj);
    var options = {
        data: json,
        headers: {'Content-type': 'application/json'}
    };
    requestPOST(baseURL + command, options, createNewUserCallback);
};

var moveToUser = function (userNameFrom, userNameTo, amount) {
    var command = 'MoveToUser';
    obj = {APIKey: apiKeyPOST, UsernameFrom: userNameFrom, UsernameTo: userNameTo, Amount: amount};
    var json = JSON.stringify(obj);
    var options = {
        data: json,
        headers: {'Content-type': 'application/json'}
    };
    requestPOST(baseURL + command, options, moveToUserCallback);
};

var sendToAddress = function (userNameFrom, addressTo, amount) {
    var command = 'sendToAddress';
    obj = {APIKey: apiKeyPOST, UsernameFrom: userNameFrom, AddressTo: addressTo, Amount: amount};
    var json = JSON.stringify(obj);
    var options = {
        data: json,
        headers: {'Content-type': 'application/json'}
    };
    requestPOST(baseURL + command, options, sendToAddressCallback);
};

// CALLBACK-FUNCTIONS -> GET-REQUESTS
var getUserBalanceCallback = function (data) {
    console.log('---USER-BALANCE---');
    console.log(data);
};

var getUserBalanceDetailCallback = function (data) {
    console.log('---USER-BALANCE-DETAIL---');
    console.log(data);
};

var getUserInfoCallback = function (data) {
    console.log('---USER-INFO------');
    console.log(data);
};

var getUserListCallback = function (data) {
    console.log('---USER-LIST------');
    console.log(data);
};

// CALLBACK-FUNCTIONS -> POST-REQUESTS
var createNewUserCallback = function (data) {
    console.log('---NEW-USER-INFO--');
    console.log(data);
};

var moveToUserCallback = function (data) {
    console.log('---MOVE-INFO------');
    console.log(data);
};

var sendToAddressCallback = function (data) {
    console.log('---TX-INFO--------');
    console.log(data);
};

// CALLING THE FUNCTIONS
if (args.length > 0) {
    if (args[0].toLowerCase() == "createnewuser") {
        if (args.length == 2) {
            createNewUser(args[1]);
        }
        else {
            console.log("Invalid syntax: 2 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "getuserbalance") {
        if (args.length == 2) {
            getUserBalance(args[1]);
        }
        else {
            console.log("Invalid syntax: 2 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "getuserbalancedetail") {
        if (args.length == 2) {
            getUserBalanceDetail(args[1]);
        }
        else {
            console.log("Invalid syntax: 2 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "getuserlist") {
        if (args.length == 1) {
            getUserList();
        }
        else {
            console.log("Invalid syntax: 1 argument needed");
        }
    }
    else if (args[0].toLowerCase() == "getuserinfo") {
        if (args.length == 2) {
            getUserInfo(args[1]);
        }
        else {
            console.log("Invalid syntax: 2 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "movetouser") {
        if (args.length == 4) {
            moveToUser(args[1], args[2], args[3]);
        }
        else {
            console.log("Invalid syntax: 4 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "sendtoaddress") {
        if (args.length == 4) {
            sendToAddress(args[1], args[2], args[3]);
        }
        else {
            console.log("Invalid syntax: 4 arguments needed");
        }
    }
    else if (args[0].toLowerCase() == "help") {
        console.log("Usage: node ReddAPICLI command arguments");
        console.log("ProTip: add ' > logfile.txt' to log the output to a file");
        console.log("----------------------------------------");
        console.log("Command: CreateNewUser");
        console.log("Required arguments: username (String)");
        console.log("Example: node ReddAPICLI CreateNewUser foo");
        console.log("----------------------------------------");
        console.log("Command: GetUserBalance");
        console.log("Required arguments: username (String)");
        console.log("Example: node ReddAPICLI GetUserBalance foo");
        console.log("----------------------------------------");
        console.log("Command: GetUserBalanceDetail");
        console.log("Required arguments: username (String)");
        console.log("Example: node ReddAPICLI GetUserBalanceDetail foo");
        console.log("----------------------------------------");
        console.log("Command: GetUserList");
        console.log("Required arguments: NONE");
        console.log("Example: node ReddAPICLI GetUserList");
        console.log("----------------------------------------");
        console.log("Command: GetUserList");
        console.log("Required arguments: username (String");
        console.log("Example: node ReddAPICLI GetUserInfo");
        console.log("----------------------------------------");
        console.log("Command: MoveToUser");
        console.log("Required arguments: usernameFrom (String), usernameTo (String), amount (Double)");
        console.log("Example: node ReddAPICLI MoveToUser UsernameFrom UsernameTo 100");
        console.log("----------------------------------------");
        console.log("Command: SendToAddress");
        console.log("Required arguments: usernameFrom (String), addressTo (String), amount (Double)");
        console.log("Example: node ReddAPICLI SendToAddress UsernameFrom RctBPR4vuQmgDuqABUnrqCWjEDwaqF2FWd 100");
        console.log("----------------------------------------");
    }
    else {
        console.log("Unknown arguments: use 'node ReddAPICLI help'")
    }
}
else {
    console.log("Invalid syntax: no valid arguments found: use 'node ReddAPICLI help'");
}
