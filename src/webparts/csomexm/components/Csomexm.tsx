import * as React from 'react';
//import styles from './Csomexm.module.scss';
import { ICsomexmProps } from './ICsomexmProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class Csomexm extends React.Component<ICsomexmProps, {}> {
  constructor(props:ICsomexmProps){
    super(props);
    sp.setup({
      spfxContext:this.props.context
    })
  }
  private async _loadAsyncData(): Promise<Chart.ChartData> {
    const items: any[] = await sp.web.lists.getByTitle("activeAlertList").items.select("Title", "Sales").get();
    let lblarr: string[] = [];
    let dataarr: number[] = [];
    items.forEach(element => {
      lblarr.push(element.Title);
      dataarr.push(element.Sales);
    });
    let chartdata: Chart.ChartData = {
      labels: lblarr,
      datasets: [{
        label: 'My Sales',
        data: dataarr
      }]
    };
    return chartdata;
  }

  private async _loadAsyncDataPie(): Promise<Chart.ChartData> {
    const items: any[] = await sp.web.lists.getByTitle("activeAlertList").items.select("Title", "Sales").get();
    let lblarr: string[] = [];
    let dataarr: number[] = [];
    items.forEach(element => {
      lblarr.push(element.Title);
      dataarr.push(element.Sales);
    });
    let chartdata: Chart.ChartData = {
      labels: lblarr,
      datasets: [{
        label: 'My Sales',
        data: dataarr
      }]
    };
    return chartdata;
  }
  public render(): React.ReactElement<ICsomexmProps> {
    

    return (
      <ChartControl
        type={ChartType.Bar}
        datapromise={this._loadAsyncData()}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
      
        );

    <ChartControl
    type={ChartType.Pie}
    datapromise={this._loadAsyncDataPie()}
    options={{
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }} />
  
   
  }

}
