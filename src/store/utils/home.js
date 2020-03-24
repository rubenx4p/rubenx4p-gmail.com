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
    const start = dayjs(storageAccount.start)
    if (dayjs(start).add('30', 'minutes') > dayjs()) {
      return storageAccount.password
    } else {
      delete storageAccounts[account.id]
      window.localStorage.setItem('accounts-storage', JSON.stringify(storageAccounts))
      return undefined
    }
  }
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
