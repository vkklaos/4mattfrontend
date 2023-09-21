import { Progress, Table, Text } from '@mantine/core'
import classes from './LicenseTable.module.css'
import React from 'react'
import { Context } from '../../../Context'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'


const LicenseTable = () => {
    const { sumFiltered } = React.useContext(Context);

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const total = sumFiltered.reduce((total, obj) => total + obj.spend, 0);

    const rows = sumFiltered.map((row) => {
        const percentage = (row.spend / total) * 100;
    
        return (
          <Table.Tr key={row.application}>
            <Table.Td>
                {row.application}
            </Table.Td>
            <Table.Td>
                {USDollar.format(row.spend)}
            </Table.Td>
             <Table.Td>
                <Text fz="xs">
                  {percentage.toFixed(0)}%
                </Text>
                <Progress.Root>
                    <Progress.Section
                    className={classes.progressSection}
                    value={percentage}
                    />
                </Progress.Root>
            </Table.Td>
          </Table.Tr>
        );
      });
    

  return (
    <div className={classes.container}>
        {sumFiltered && sumFiltered.length !== 0 ?
            <Table.ScrollContainer w={'100%'} >
                <Table verticalSpacing={3}>
                <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            :
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No spend in selected period'} />
            </div>
        }
    </div>
  )
}

export default LicenseTable