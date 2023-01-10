const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id, room) => ({ name, text, id, room })

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Данные некорректны')
    }


    socket.join(data.room)

    if(users.getByRoom(data.room[0]) === true){
        users.add({
        id: socket.id,
        name: data.name,
        room: data.room[0]
    })
    }else {
        users.add({
        id: socket.id,
        name: data.name,
        room: data.room[1]
    })
    }
 
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}.`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Текст не может быть пустым')
    }
    console.log('good idea')
    const user = users.get(data.id)
    if (user) {
        console.log(user.room)
        if(users.getByRoom(user.room[0]) === true){
           io.to(user.room[0]).emit('newMessage', m(user.name, data.text, data.id, data.room))
        }else{
           io.to(user.room).emit('newMessage', m(user.name, data.text, data.id, data.room))
        }
    }
    cb()
  })

  socket.on('userLeft', (id, cb) => {
    console.log("leave")
    console.log(id.room)
    users.remove(socket.id)
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin', `Пользователь ${user.name} вышел.`)
      )
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin', `Пользователь ${user.name} вышел.`)
      )
    }
  })
})

module.exports = {
  app,
  server
}
