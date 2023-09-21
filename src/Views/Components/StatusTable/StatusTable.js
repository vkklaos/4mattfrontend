import { Flex, Group, Progress, Table, Text } from '@mantine/core'
import classes from './StatusTable.module.css'
import React from 'react'
import { Context } from '../../../Context'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'
import PieChart from '../PieChart/PieChart'


const StatusTable = () => {
    const { sumFiltered } = React.useContext(Context);

    const rows = sumFiltered.map((row) => {
        const totalStatus = row.actives + row.inactives;
        const percentageActives = (row.actives / totalStatus) * 100;
        const percentageInactives = (row.inactives / totalStatus) * 100;
    
        return (
          <Table.Tr key={row.application}>
            <Table.Td>
                {row.application}
            </Table.Td>
            <Table.Td>
            <Group justify="space-between">
                <Text fz="xs" c="#32A636" fw={700}>
                {row.actives}
                </Text>
                <Text fz="xs" c="#A63232" fw={700}>
                {row.inactives}
                </Text>
            </Group>
            <Progress.Root>
                <Progress.Section
                className={classes.progressSection}
                value={percentageActives}
                color="#32A636"
                />

                <Progress.Section
                className={classes.progressSection}
                value={percentageInactives}
                color="#A63232"
                />
            </Progress.Root>
            </Table.Td>
          </Table.Tr>
        );
      });

      const [pieData, setPieData] = React.useState(
        {
            labels: ['Label 1', 'Label 2'],
            datasets: [
              {
                data: [30, 40],
                backgroundColor: ['red', 'blue', 'green'],
              },
            ],
          }
      );

      React.useEffect(() => {
        const totalActives = sumFiltered.reduce((totalActives, obj) => totalActives + obj.actives, 0);
        const totalInactives = sumFiltered.reduce((totalInactives, obj) => totalInactives + obj.inactives, 0);
        const total = totalActives + totalInactives;
        const totalPercentageActives = (totalActives / total) * 100;
        const totalPercentageInactives = (totalInactives / total) * 100;
        setPieData(
            {
                labels: ['Actives', 'Inactives'],
                datasets: [
                  {
                    data: [totalPercentageActives, totalPercentageInactives],
                    backgroundColor: ['#32A636', '#A63232'],
                  },
                ],
              }
        )
      }, [sumFiltered])

  return (
    <div className={classes.container}>
        {sumFiltered && sumFiltered.length !== 0 &&
          <Flex justify={'center'} h={200}>
              <PieChart data={pieData} />
          </Flex>
        }
        {sumFiltered && sumFiltered.length !== 0 ?
            <Table.ScrollContainer w={'100%'}  pr={10} pt={20}>
                <Table verticalSpacing={3}>
                <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            :
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No status in selected period'} />
            </div>
        }
    </div>
  )
}

export default StatusTable