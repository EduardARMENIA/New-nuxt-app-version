class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }

  get(id) {
    return this.users.find(user => user.id === id)
  }

  remove(data) {
    const user = this.users
    if (user) {
      this.users = this.users.filter(user => user.id !== data.id)
      this.users = this.users.filter(user => user.name !== data.name)
    }
    return user
  }

  removeALL(id) {

    return  this.users = []
  }

  getByRoom(room) {
    return this.users.filter(user => user.room === room)
  }
}

module.exports = function() {
  return new Users()
}
