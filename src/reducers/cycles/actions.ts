import { Cycle } from "./reducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
    RESET_ACTIVE_CYCLE_ID = 'RESET_ACTIVE_CYCLE_ID'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle
        }
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE
    }
}

export function resetActiveCycleIdAction() {
    return {
        type: ActionTypes.RESET_ACTIVE_CYCLE_ID
    }
}