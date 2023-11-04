const saveNewUser = async (newUser) => {
  const result = await newUser.save()
  return result
}

export default {
  saveNewUser
}
