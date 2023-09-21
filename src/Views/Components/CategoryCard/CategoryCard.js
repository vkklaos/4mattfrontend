import { Text, Paper, Image, Flex } from '@mantine/core';
import classes from './CategoryCard.module.css';

export function CategoryCard({ category, spend, image }) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

  return (
    <Paper radius={2.5} withBorder className={classes.card} mt={20}>
        <Flex justify={'center'}>
            <Image src={image} w={40} />
        </Flex>
      <Text className={classes.subtitle} ta="center" fz="sm" pt={10}>
        {category}
      </Text>
      <Text ta="center" fw={600} className={classes.title}>
        {USDollar.format(spend)}
      </Text>
    </Paper>
  );
}