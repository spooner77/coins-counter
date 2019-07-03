import { ICoin } from '../interfaces';

class CoinsCounterService {
    public getOptimalChangeFor(sum: number, coins: ICoin[]) {
        if (!sum) {
            return [];
        }

        const ballance = sum;
        const result: ICoin[] = [];
        const sortedCoins = coins.sort((prev, next) => {
            if ( prev.value < next.value ) {
                return  -1;
            }

            if ( prev.value > next.value ) {
                return  1;
            }

            return 0;
        })


        while (ballance > 0) {
            if (!sortedCoins.some((coin: ICoin)  => {
                if( ballance - coin.value > 0 ) {

                }
            })) {

            };
        }

        return result;
    }

    public getChangeFor(sum: number, inventory: ICoin[]): null {
        return null;
    }
}
