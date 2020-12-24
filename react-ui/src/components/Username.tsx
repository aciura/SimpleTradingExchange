type UsernameProps = {
  onChange: (name: string) => void
}

export function Username({ onChange }: UsernameProps) {
  const setUsername = (e: { target: { value: any } }) => {
    const newUsername = e.target.value
    onChange(newUsername)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <span>Username</span>
      <input
        style={{ marginLeft: '1rem' }}
        placeholder={'provide username'}
        onChange={setUsername}></input>
    </div>
  )
}
