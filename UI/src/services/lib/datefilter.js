import moment from 'moment';



export default function (timeframe, arr, ex) {
    switch (timeframe){
        case 0:
            return arr.filter(d => {
                return moment(ex(d)).unix() >= moment().startOf('day').unix();
            });

        case 1:
            return arr.filter(d => {
                return moment(ex(d)).unix() >= moment().startOf('week').unix();
            }).sort((a, b) => ex(a) > ex(b));

        case 2:
            return arr.filter(d => {
                return moment(ex(d)).unix() >= moment().startOf('month').unix();
            }).sort((a, b) => ex(a) > ex(b));

        case 3:
            return arr.filter(d => {
                return moment(ex(d)).unix() >= moment().startOf('year').unix();
            }).sort((a, b) => ex(a) > ex(b));
        return [];
    }
}
