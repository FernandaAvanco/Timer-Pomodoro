import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction, resetActiveCycleIdAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amoutSecondsPassed: number
    totalSecondsActiveCycle: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    resetActiveCycleId: () => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeCycleId: null }, (initialState) => {
        const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if (storageStateAsJSON) {
            return JSON.parse(storageStateAsJSON)
        }

        return initialState
    })

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

    }, [cyclesState])

    const totalSecondsActiveCycle = activeCycle ? activeCycle.minutesAmount * 60 : 0

    function setSecondsPassed(seconds: number) {
        setAmoutSecondsPassed(seconds)
    }

    function resetActiveCycleId() {
        dispatch(resetActiveCycleIdAction())
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(addNewCycleAction(newCycle))
    }

    function interruptCycle() {

        dispatch(interruptCurrentCycleAction())

        setAmoutSecondsPassed(totalSecondsActiveCycle)
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                totalSecondsActiveCycle,
                amoutSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                resetActiveCycleId,
                createNewCycle,
                interruptCycle
            }}>
            {children}
        </CyclesContext.Provider>
    )
}