import { Progress, Table, Text } from '@mantine/core'
import classes from './IncreaseTable.module.css'
import React from 'react'
import { Context } from '../../../Context'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'


const IncreaseTable = () => {
    const { increaseArray } = React.useContext(Context);

    const rows = increaseArray.map((row) => {
    
        return (
          <Table.Tr key={row.application}>
            <Table.Td>
                {row.application}
            </Table.Td>
             <Table.Td>
                <Text fz="xs">
                  {row.increase}%
                </Text>
                <Progress.Root>
                    <Progress.Section
                    className={classes.progressSection}
                    value={parseInt(row.increase)}
                    />
                </Progress.Root>
            </Table.Td>
          </Table.Tr>
        );
      });

  return (
    <div className={classes.container}>
        {increaseArray && increaseArray.length !== 0 ?
            <Table.ScrollContainer w={'100%'} h={120} pr={10}>
                <Table verticalSpacing={3}>
                <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            :
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No increase in selected period'} />
            </div>
        }
    </div>
  )
}

export default IncreaseTable