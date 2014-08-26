ReddAPI-CLI
========================

###Prerequisites:

an account on [ReddAPI](https://reddapi.com)

- [node.js](http://nodejs.org/)
- [restler](https://github.com/danwrong/restler)

###Usage:

Add Get-Key and Post-Key to config.js

```
node ReddAPICLI <command> [arguments] [ > logfile.txt]
```

use:
```
node ReddAPICLI help
```
to get started

####Commands:

#####Command: CreateNewUser
- Required arguments: username (String)
- Example: 
```
node ReddAPICLI CreateNewUser foo
```

#####Command: GetUserBalance
- Required arguments: username (String)
- Example: 
```
node ReddAPICLI GetUserBalance foo
```

#####Command: GetUserBalanceDetail
- Required arguments: username (String)
- Example: 
```
node ReddAPICLI GetUserBalanceDetail foo
```

#####Command: GetUserList
- Required arguments: NONE
- Example: 
```
node ReddAPICLI GetUserList
```

#####Command: GetUserList
- Required arguments: username (String
- Example: 
```
node ReddAPICLI GetUserInfo
```

#####Command: MoveToUser
- Required arguments: usernameFrom (String), usernameTo (String), amount (Double)
- Example: 
```
node ReddAPICLI MoveToUser UsernameFrom UsernameTo 100
```

#####Command: SendToAddress
- Required arguments: usernameFrom (String), addressTo (String), amount (Double)
- Example: 
```
node ReddAPICLI SendToAddress UsernameFrom RctBPR4vuQmgDuqABUnrqCWjEDwaqF2FWd 100
```
