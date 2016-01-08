import { Stream, StreamsAttribute } from '../../typings/types'
import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublishDash(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/comp-top/publish-dash/publish-dash.html',
        controller: TbPublishDashCtrl,
        controllerAs: 'ctrl',
        bindToController: {
            myStreams: '&'
        }
    };

}

/** @ngInject */
export class TbPublishDashCtrl {
    myStreams: () => Array<Stream>;
    attributes: Array<StreamsAttribute> = [
        {
            name: "Exchange",
            short: "EXC",
            description: '',
            jsonPath: "exchange",
            on: true,
            getIt: (stream: Stream) => {
                return stream.exchange;
            }
        }, {
            name: "Currency Pair",
            jsonPath: "currencyPair",
            short: "CP",
            description: '',
            on: true,
            getIt: (stream: Stream) => {
                return stream.currencyPair;
            }
        },
        {
            name: "Average Monthly Profit (incl. fees)",
            short: "AMPi",
            description: "The average profit per month calculated from first to last signal. Including trading fees.",
            jsonPath: "stats.averageMonthlyProfitIncl",
            on: true,
            getIt: (stream: Stream) => {
                return (stream.stats.averageMonthlyProfitIncl * 100).toFixed(2);
            }
        },
        {
            name: "Profit Factor",
            short: "PF",
            description: '',
            jsonPath: "stats.profitFactor",
            on: true,
            getIt: (stream: Stream) => {
                return (stream.stats.profitFactor * 100).toFixed(2);
            }
        },
        {
            name: "Part Winning Trades",
            short: "PWT",
            description: "Percent closed trades with profit larger then 0",
            jsonPath: "stats.partWinningTrades",
            on: true,
            getIt: (stream: Stream) => {
                return (stream.stats.partWinningTrades * 100).toFixed(2);
            }
        },
        {
            name: "Average Trade",
            short: "AT",
            description: "Average profit on a trade",
            jsonPath: "stats.averageTrade",
            on: true,
            getIt: (stream: Stream) => {
                return (stream.stats.averageTrade * 100).toFixed(2);
            }
        },
        {
            name: "Number of Closed Trads",
            short: "NCT",
            description: '',
            jsonPath: "stats.numberOfClosedTrades",
            on: true,
            getIt: (stream: Stream) => {
                return stream.stats.numberOfClosedTrades;
            }
        }
    ];

    constructor(private authApi: AuthApi, private $mdDialog: angular.material.IDialogService) {
        console.log('my streams: ' + this.myStreams());
    }

    signOut() {
        this.authApi.signOut()
    }

    openNewStreamDialog(ev) {
        this.$mdDialog.show({
            template: '<md-dialog><tb-stream-new-dialog></tb-stream-new-dialog></md-dialog>',
            targetEvent: ev,
            clickOutsideToClose: true
        })
        .then((answer) => {
            console.log('answer: ' + answer);
        },
        () => {
            console.log('cancelled the dialog.');
        });
    };


}