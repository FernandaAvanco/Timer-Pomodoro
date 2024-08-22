import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function Countdown() {
    const {
        activeCycle,
        activeCycleId,
        amoutSecondsPassed,
        totalSecondsActiveCycle,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        resetActiveCycleId
    } = useContext(CyclesContext)

    useEffect(() => {

        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {

                const difference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if (difference >= totalSecondsActiveCycle) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSecondsActiveCycle)
                } else {
                    setSecondsPassed(difference)
                }
            }, 100)

            if (activeCycle.finishedDate) {
                setSecondsPassed(totalSecondsActiveCycle)
                resetActiveCycleId()
            }
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSecondsActiveCycle, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed, resetActiveCycleId])

    const currentSeconds = activeCycle ? totalSecondsActiveCycle - amoutSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const formatedMinutes = String(minutesAmount).padStart(2, '0')
    const formatedSeconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        document.title = activeCycle ? `${formatedMinutes}:${formatedSeconds}` : 'Ignite Timer'
    }, [formatedMinutes, formatedSeconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{formatedMinutes[0]}</span>
            <span>{formatedMinutes[1]}</span>
            <Separator>:</Separator>
            <span>{formatedSeconds[0]}</span>
            <span>{formatedSeconds[1]}</span>
        </CountdownContainer>
    )
} 