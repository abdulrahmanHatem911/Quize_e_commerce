const fileSystem = require('fs')
const valid = require('validator');
const path = './users.txt'
if (!fileSystem.existsSync(path)) {
    fileSystem.writeFileSync(path, '[]');
}
openFile = () => {
    return fileSystem.openSync(path, 'r+');
}
module.exports.create = (object) => {
    properties = { 'email': 'required' };
    newItem = {};
    const fd = openFile();
    let content = JSON.parse(fileSystem.readFileSync(fd).toString());
    let found = content.find((item) => {
        return item.email === object.email;
    });

    if (found) {
        console.log('Email already exists');
        return;
    } else {
        Object.keys(properties).forEach((key) => {
            if (properties[key] == 'required' && !object.hasOwnProperty(key))
                throw new Error({ 'error': { 'message': 'object is not found' } })
            if (object.hasOwnProperty(key))
                newItem[key] = object[key];
        });
        if (!valid.isEmail(newItem.email)) {
            console.log("Not a valid e-mail address");
        }
        else {
            content.push(newItem);
            fileSystem.writeFileSync(path, JSON.stringify(content), { encoding: 'utf8', flag: 'w' });
            console.log('User created');
            fileSystem.closeSync(fd);
        }
    }

    return content;
}