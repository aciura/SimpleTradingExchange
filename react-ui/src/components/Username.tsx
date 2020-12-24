type UsernameProps = {
  onChange: (name: string) => void
}

export function Username({ onChange }: UsernameProps) {
  const setUsername = (e: { target: { value: any } }) => {
    const newUsername = e.target.value
    onChange(newUsername)
  }

  return (
    <div
      style={{
        padding: '1rem',
        width: '100%',
      }}>
      <div
        style={{
          padding: '1rem',
          border: '1px solid black',
          boxShadow: '2px 2px 4px black',
          width: '18rem',
        }}>
        <span>Username</span>
        <input
          style={{ marginLeft: '1rem' }}
          placeholder={'provide username'}
          onChange={setUsername}
        />
      </div>
    </div>
  )
}
