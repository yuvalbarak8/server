const users = [{id: 1 ,username: 'yuval', password: '1234'},
    {id: 2, username: 'reut', password: 'sisma'},
    {id: 3, username: 'test', password: 'test test'}]

function createUser(username, password)
{
    const  users_lentgh = users.length
    let new_user = {id : users_lentgh+1, username: username, password: password}
    users.push(new_user)
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