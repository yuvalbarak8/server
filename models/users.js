const users = [{id: 1 ,username: 'yuval', password: '1234', nickname: 'y'},
    {id: 2, username: 'reut', password: 'sisma', nickname: 'a'},
    {id: 3, username: 'test', password: 'test test', nickname: 'b'}]

function createUser(username, password, password_again, nickname)
{
    // check if the username is already exists
    for (const user in users) {
        if (users[user].username === username) {
            return "username "+username+" is already exists";
        }
    }
    // Validity check for username
    const usernamePattern = /^[a-zA-Z0-9]{6,10}$/;
    if(!usernamePattern.test(username))
    {
        return "Username must be 6-10 characters without special characters."
    }
    // Validity check for password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
    if(!passwordPattern.test(password)) {
        return "Password must be 8-14 characters with at least " +
            "one uppercase,one lowercase, and one number, without special characters."
    }
    // Checking whether the two passwords are the same
    if(password !== password_again)
    {
        return "The passwords you typed are not the same."
    }
    // Validity check for nickname
    const nicknamePattern = /^[a-zA-Z0-9]{4,8}$/;
    if(!nicknamePattern.test(nickname))
    {
            return "Nickname must be 4-8 characters without special" +
                " characters."

    }
    const users_length = users.length
    let new_user = {id : users_length+1, username: username, password: password, nickname:nickname}
    users.push(new_user)
    return "success";
}
function getUsers()
{
    return users
}
function getUser(id) {
    for (const user in users) {
        if (users[user].id === id) {
            return users[user];
        }
    }
    return null;
}

function login(username, password)
{
    for (const user in users) {
        if (users[user].username === username &&
            users[user].password === password) {
            return true;
        }
    }
    return false;
}


export {createUser, getUsers, getUser, login}