import { Group, Image, Text } from '@mantine/core'
import classes from './AppInfoSpend.module.css'
import React from 'react'
import { Context } from '../../../Context'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'


const AppInfoSpend = () => {
    const { maxSpend } = React.useContext(Context);
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const [imageName, setImageName] = React.useState('');
    

    React.useEffect(() => {
        if (maxSpend) {
            if (maxSpend.application) {
                const name = maxSpend.application.replace(/\W+/g, '-').toLowerCase();
                setImageName(name);
            }
        }
    }, [maxSpend])

  return (
    <div>
        {maxSpend && maxSpend.application !== null ?
            <Group wrap="nowrap" className={classes.container}>
                <Image
                    src={`assets/pngs/${imageName}.png`}
                    style={{
                        maxWidth: '80%'
                    }}
                />
                <Text className={classes.subtitle}>
                    {USDollar.format(maxSpend.spend)}
                </Text>
            </Group>
            :
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No app in selected period'} />
            </div>
        }
    </div>
  )
}

export default AppInfoSpend