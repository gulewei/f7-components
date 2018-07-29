import Transition from './Transition'
import { runAndCleanUp, runEnter, runExit } from './run-transition'

Transition.runAndCleanUp = runAndCleanUp
Transition.runEnter = runEnter
Transition.runExit = runExit

export default Transition
