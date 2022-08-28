import { createContext, useState } from "react";

export const AccountContext = createContext({
  address: '',
  account: {},
  ctc: null,
  handleAccountChange: () => {},
  handleAddressChange: () => {},
  handleCtcChange: () => {}
})

const AccountProvider = ({ children }) => {
  const [ address, setAddress ] = useState('');
  const [ account, setAccount ] = useState({});
  const [ ctc, setCtc ] = useState(null);

  const handleAddressChange = (address) => {
    setAddress(address);
  }

  const handleAccountChange = (account) => {
    setAccount(account);
  }

  const handleCtcChange = (ctc) => {
    setCtc(ctc);
  }

  let values = {
    account, address, ctc, handleAccountChange, handleAddressChange, handleCtcChange
  }
  return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}

export default AccountProvider;