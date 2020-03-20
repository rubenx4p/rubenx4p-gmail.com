import { SingleAccountDialogModes } from '../../constants'

export const titleSelection = mode => {
  const titleObject = {
    [SingleAccountDialogModes.DELETE]: 'Delete Account',
    [SingleAccountDialogModes.UNLOCK]: 'Unlock Account'
  }

  return titleObject[mode]
}
