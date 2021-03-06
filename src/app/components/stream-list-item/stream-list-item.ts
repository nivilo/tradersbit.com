import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"

export class StreamListItem implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<",
      inBtcRate: "<"
    }
    this.controller = StreamListItemCtrl
    this.templateUrl = "app/components/stream-list-item/stream-list-item.html"
  }
}

class StreamListItemCtrl {
  inStream: Stream
  partOfTradesConfig: any
  inBtcRate: number

  statsAtributes = {
      "amp":  {
      name: "Average monthly profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "",
      on: true,
      good: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false
        }
        else {
          return AMP > 0
        }
      },
      bad: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false
        }
        else {
          return AMP < 0
        }
      },
      getIt: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return "0%"
        }
        else {
          return AMP.toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return 0
        }
        else {
          return AMP
        }
      }
    },
    "netProfit": {
      name: "Net Profit",
      short: "NP",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100
      }
    },

    "numberOfTRades": {
      name: "Number of Closed Trades",
      short: "NCT",
      description: "",
      jsonPath: "stats.numberOfClosedTrades",
      on: true,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      }
    },

    "timeOfFirstSignal": {
      name: "Time of First Signal",
      short: "TFS",
      description: "",
      jsonPath: "stats.timeOfFirstSignal",
      on: false,
      getIt: (stream: Stream) => {
        if (stream.stats.timeOfFirstSignal === 0) {
          return "-"
        }
        else {
          return StreamAttributes.formatDate(stream.stats.timeOfFirstSignal, true)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfFirstSignal
      }
    },

    "timeOfLastSignal": {
      name: "Time of Last Signal",
      short: "TLS",
      description: "",
      jsonPath: "timeOfLastSignal",
      on: true,
      bad: (stream: Stream) => {
        const secInMonth = 86400000 * 30
        return stream.stats.timeOfLastSignal < Date.now() - secInMonth
      },
      getIt: (stream: Stream) => {
        if (stream.stats.timeOfLastSignal === 0) {
          return "-"
        }
        else {
          return StreamAttributes.formatDate(stream.stats.timeOfLastSignal, true)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfLastSignal
      }
    },

    "numberOfProfitableTrades": {
      name: "Number of Profitable Trades",
      short: "NPT",
      description: "Number of closed trades with profit larger then 0",
      jsonPath: "stats.numberOfProfitableTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades
      }
    },

    "numberOfUnprofitaleTrades": {
      name: "Number of Unprofitable Trades",
      short: "NUT",
      description: "Number of trads with profit equal or smaller then 0",
      jsonPath: "stats.numberOfLoosingTrades",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades)
      },
      getValue: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades)
      }
    },

    "profitFactor": {
      name: "Profit Factor",
      short: "PF",
      description: "",
      jsonPath: "",
      on: true,
      good: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return false
        }
        else {
          return PF > 2
        }
      },
      getValue: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return 0
        }
        else {
          return PF
        }
      },
      getIt: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return "-"
        }
        else {
          return PF.toFixed(2)
        }
      }
    },

    "avarageTrade": {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on trades",
      jsonPath: "",
      on: true,
      bad: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return false
        }
        else {
          return AT < 0
        }
      },
      good: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return false
        }
        else {
          return AT > 0
        }
      },
      getIt: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return "-"
        }
        else {
          return (AT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return 0
        }
        else {
          return AT
        }
      }
    }
  }

  constructor(private $state: any, highcharts: any, private $mdDialog: any, private $mdMedia: any) {
    "ngInject"

    this.partOfTradesConfig = {
      "options": {
        "colors": ["#E57373", "#81C784", "#DDDF00"],

        "chart": {
          "type": "pie"
        },
        "plotOptions": {
          "series": {
            "stacking": ""
          },
          "pie": {
            "allowPointSelect": true,
            "cursor": "pointer",
            "dataLabels": {
              "enabled": false
            }
          }
        }
      },
      "series": [
        {
          "name": "Trades",
          "data": [
            {
              "name": "Loosing",
              "y": this.inStream.stats.numberOfLoosingTrades
            },
            {
              "name": "Winning",
              "y": this.inStream.stats.numberOfProfitableTrades,
              "sliced": true,
              "selected": true
            }

          ],
          "id": "winning-loosing-trades"
        }
      ],
      "title": {
        "text": "Trades",
        "margin": 0,
        "style": {
          "color": "rgba(0,0,0,0.87)",
          "fontSize": "12px",
          "letter-spacing": "0.01em"
        }
      },
      "credits": {
        "enabled": false
      },
      "loading": false,
      "size": {}
    }
  }

  goToStream(streamID: string): void {
    this.$state.go("stream", { "streamId": streamID })
  }

  openSubscriptionDialog(ev: any): void {

    this.$mdDialog.show({
      template: `
                <md-dialog aria-label="Subscribe">
                    <tb-subscription-dialog in-stream="ctrl.stream" in-btc-rate="ctrl.btcRate">
                </tb-subscription-dialog></md-dialog>`,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs"),
      locals: {
        stream: this.inStream,
        btcRate: this.inBtcRate
      },
      controller:
      /** @ngInject */
      class DialogCtrl {
        constructor(public stream: Stream, public btcRate: number) {
        }
      },
      controllerAs: "ctrl"
    })

  }
}