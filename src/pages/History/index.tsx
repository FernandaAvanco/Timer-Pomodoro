import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ColumnWithoutTasks, HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { ListChecks } from "phosphor-react";

export function History() {

    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cycles.length ? (
                            cycles.map(cycle => {
                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                            addSuffix: true,
                                            locale: ptBR
                                        })}</td>
                                        <td>
                                            <Status $statuscolor=
                                                {
                                                    cycle.finishedDate ? 'green' :
                                                        cycle.interruptedDate ? 'red' :
                                                            'yellow'
                                                }>
                                                {
                                                    cycle.finishedDate ? 'Concluído' :
                                                        cycle.interruptedDate ? 'Interrompido' :
                                                            'Em andamento'
                                                }
                                            </Status>
                                        </td>
                                    </tr>
                                )
                            })
                        ) :
                            <tr>
                                <ColumnWithoutTasks colSpan={4}>
                                    <div>
                                        <ListChecks size={68} />
                                        <p>Você ainda não cadastrou nenhuma tarefa </p>
                                        <p>Crie suas tarefas e trabalhe nelas pelo tempo ideal</p>
                                    </div>
                                </ColumnWithoutTasks>
                            </tr>
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
