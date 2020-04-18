import dayjs from 'dayjs'

export const updateStoredPassword = () => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  const newStorageAccounts = Object.entries(storageAccounts).reduce((acc, [key, value]) => {
    const { start } = value
    if (dayjs(start).add('30', 'minutes') > dayjs()) {
      acc[key] = value
    }
    return acc
  }, {})
  window.localStorage.setItem('accounts-storage', JSON.stringify(newStorageAccounts))
}

export const fetchStoredPassword = account => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  const storageAccount = storageAccounts[account.id]
  if (storageAccount) {
    return storageAccount.password
  }
  return undefined
}

export const storePassword = account => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  storageAccounts[account.id] = {
    start: dayjs().format(),
    password: account.password
  }

  window.localStorage.setItem('accounts-storage', JSON.stringify(storageAccounts))
}

export const removePassword = account => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  delete storageAccounts[account.id]

  window.localStorage.setItem('accounts-storage', JSON.stringify(storageAccounts))
}

export const fetchManyStoredPassword = accounts => {
  const accountsObject = accounts.reduce((acc, curr) => {
    const account = { ...curr }

    account.password = fetchStoredPassword(account)

    acc[account.id] = account
    return acc
  }, {})

  return accountsObject
}

export const updateStorageAndState = (accounts, commit) => {
  updateStoredPassword()
  const accountsObject = fetchManyStoredPassword(accounts)
  commit('receiveAccounts', accountsObject)
}
export const accountsStorageJob = (accounts, commit, state) => {
  updateStorageAndState(accounts, commit)
  const intervalId = setInterval(() => {
    const accountList = Object.values(state.accounts)
    updateStorageAndState(accountList, commit)
  }, 5000)

  return intervalId
}

export const deleteAccuontFromStorage = id => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  const newStorageAccounts = Object.entries(storageAccounts).reduce((acc, [key, value]) => {
    if (key !== id) {
      acc[key] = value
    }
    return acc
  }, {})
  window.localStorage.setItem('accounts-storage', JSON.stringify(newStorageAccounts))
}
