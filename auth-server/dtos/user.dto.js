class UserDTO {
    constructor(user) {
        this.uid = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}

module.exports = UserDTO;