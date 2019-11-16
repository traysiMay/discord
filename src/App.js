import React, { useContext, useState } from 'react';
import { DiscordContext } from './DiscordContext';
import { INVITE_HOST } from './constants';



function App() {
  const [code, setCode] = useState('')
  const { client, hatchery } = useContext(DiscordContext)
  window.client = client
  const makeInviteLink = async () => {
    const hatchery = client.channels.get(process.env.REACT_APP_HATCHERY_ID)
    const code = await hatchery.createInvite({
      maxAge: 0,
      unique: true,
      maxUses: 1
    })
    setCode(code.code)
  }
  return (
    <div className="App">
      {INVITE_HOST}{code}
      <button onClick={makeInviteLink} />
    </div>
  );
}

export default App;
