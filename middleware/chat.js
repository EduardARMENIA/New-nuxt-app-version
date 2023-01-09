export default function({ store, redirect }) {
  if (!Object.keys(store.state.room.user).length) {
    redirect('/?message=noUser')
  }
}
