import moment from 'moment'

export const fetchStoredPassword = account => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  const storageAccount = storageAccounts[account.id]
  if (storageAccount) {
    const start = moment(storageAccount.start)
    if (moment(start).add('30', 'minutes') > moment()) {
      return storageAccount.password
    } else {
      delete storageAccounts[account.id]
      window.localStorage.setItem('accounts-storage', JSON.stringify(storageAccounts))
      return null
    }
  }
}

export const storePassword = account => {
  const storageAccounts = JSON.parse(window.localStorage.getItem('accounts-storage')) || {}

  storageAccounts[account.id] = {
    start: moment().format(),
    password: account.password
  }

  window.localStorage.setItem('accounts-storage', JSON.stringify(storageAccounts))
}
