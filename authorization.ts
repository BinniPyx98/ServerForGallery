//////Authorization
type AuthResult = string | { token: string } //string if error

interface UserAuthDBData {
    [email: string]: string;
}
let userAuthDBData: UserAuthDBData = {
    "asergeev@flo.team": 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team'
}


export function checkUserAuthorizationData(authData: any): AuthResult {
    console.log('auth')
    let userDataFromQuery = authData
    let userPasswordFromQuery = userDataFromQuery.password
    let userEmailFromQuery = userDataFromQuery.email

    let emailDbStatus = checkEmailInDB(userEmailFromQuery)
    let passwordDbStatus = checkPasswordInDB(userPasswordFromQuery, userEmailFromQuery)

    let authorizationData = passwordDbStatus && emailDbStatus
    if (authorizationData == true) {
        console.log('successful authorization')
        return {token: "token"}

    } else {
        console.log('authorization error')
        return "authorization error"
    }
}

function checkEmailInDB(userEmailFromQuery: string): boolean {
    return userAuthDBData.hasOwnProperty(userEmailFromQuery)
}

function checkPasswordInDB(userPasswordFromQuery: string, UserEmailFromQuery: string): boolean {
    let passwordInDB = userAuthDBData[UserEmailFromQuery]

    return passwordInDB === userPasswordFromQuery ? true : false
}