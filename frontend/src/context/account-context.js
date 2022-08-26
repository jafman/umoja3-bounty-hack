import { createContext, useState } from "react";

export const AccountContext = createContext({
  address: '',
  account: {},
  handleAccountChange: () => {},
  handleAddressChange: () => {}

})

const AccountProvider = ({ children }) => {
  const [ address, setAddress ] = useState('');
  const [ account, setAccount ] = useState({});

  const handleAddressChange = (address) => {
    setAddress(address);
  }

  const handleAccountChange = (account) => {
    setAccount(account);
  }

  let values = {
    account, address, handleAccountChange, handleAddressChange
  }
  return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}

export default AccountProvider;