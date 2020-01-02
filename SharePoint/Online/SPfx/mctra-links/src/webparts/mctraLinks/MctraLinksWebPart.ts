import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MctraLinksWebPart.module.scss';
import * as strings from 'MctraLinksWebPartStrings';

export interface IMctraLinksWebPartProps {
  description: string;
}

export default class MctraLinksWebPart extends BaseClientSideWebPart<IMctraLinksWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.mctraLinks }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <div style="${ styles.center }">
              <font face="Calibri">
                <span class="ms-rteThemeFontFace-1 ms-rteFontSize-3"></span></font>&nbsp; 
                  <map name="FPMap0" id="FPMap0">
                    <area href="/sites/MCTRA/SitePages/Training.aspx" shape="rect" coords="37, 227, 146, 252">
                    <area href="/sites/MCTRA/SitePages/MCTRA%20Access%20Request.aspx" shape="rect" coords="38, 264, 147, 302">
                    <area href="/sites/MCTRA/SitePages/MCTRA%20FAQ%27s.aspx" shape="rect" coords="199, 91, 302, 133">
                    <area href="/sites/MCTRA/Shared%20Documents/MCTRA%20Bulk%20Change%20Request%20Spreadsheet_08152017.xlsm" shape="rect" coords="37, 129, 143, 164">
                    <area href="/sites/MCTRA/Shared%20Documents/Tip%20Sheet%20for%20Requestors.xlsx" shape="rect" coords="38, 176, 144, 216">
                    <area href="https://mmi-bon.clemson.edu/bonita/login.jsp?redirectUrl=/bonita/apps/mctra/translations/" shape="rect" coords="35, 91, 145, 119">
                    <area href="https://mmi-bon.clemson.edu/bonita/login.jsp?_l=en&amp;redirectUrl=portal/homepage" shape="rect" coords="356, 87, 462, 118">
                    <area href="http://cuihhsiutl10.clemson.edu/login.jsp?os_destination=/issues/?filter%3D12416" shape="rect" coords="356, 237, 462, 262">
                    <area href="http://cuihhsiutl12.clemson.edu/login.action?logout=true" shape="rect" coords="357, 274, 462, 298">
                  </map>
                  <img width="664" height="453" alt="MCTRA.PNG" src="https://schhs.sharepoint.com/sites/MCTRA/SiteAssets/SitePages/Home/MCTRA.PNG" usemap="#FPMap0" style="border-width:0px;margin:5px;width:486px;height:334px">
              </div>
            </div>
          </div>
        </div>
      </div>`;


      



  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
